import { NextResponse } from 'next/server';
import { createServerClient } from '@/lib/supabase/server';

export async function GET(request: Request) {
  const supabase = await createServerClient();
  const { searchParams } = new URL(request.url);
  const inquiryId = searchParams.get('inquiryId');

  if (inquiryId) {
    const { data, error } = await supabase
      .from('inquiries')
      .select('*')
      .eq('id', inquiryId)
      .single();

    if (error) {
      return NextResponse.json({ error: 'Inquiry not found' }, { status: 404 });
    }
    return NextResponse.json(data);
  }

  // List all inquiries (admin only in production)
  const { data, error } = await supabase
    .from('inquiries')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Supabase error:', error);
    return NextResponse.json({ error: 'Failed to fetch inquiries' }, { status: 500 });
  }

  return NextResponse.json(data || []);
}

export async function POST(request: Request) {
  const supabase = await createServerClient();

  try {
    const body = await request.json();

    const { name, email, phone, company, product_model, quantity, target_price, message, source } = body;

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required' },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from('inquiries')
      .insert({
        name,
        email,
        phone,
        company,
        product_model,
        quantity: quantity ? Number(quantity) : 1,
        target_price: target_price ? Number(target_price) : null,
        message,
        source: source || 'web',
        status: 'new',
      })
      .select()
      .single();

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json({ error: 'Failed to create inquiry' }, { status: 400 });
    }

    // TODO: Send email notification to sales team
    // await sendInquiryNotificationEmail(data);

    return NextResponse.json(data, { status: 201 });
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
  }
}

export async function PATCH(request: Request) {
  const supabase = await createServerClient();

  try {
    const body = await request.json();
    const { inquiryId, status, response, responded_by } = body;

    if (!inquiryId) {
      return NextResponse.json({ error: 'Inquiry ID is required' }, { status: 400 });
    }

    const updateData: Record<string, unknown> = {};

    if (status) {
      updateData.status = status;
    }

    if (response) {
      updateData.response = response;
      updateData.responded_by = responded_by;
      updateData.responded_at = new Date().toISOString();
    }

    const { data, error } = await supabase
      .from('inquiries')
      .update(updateData)
      .eq('id', inquiryId)
      .select()
      .single();

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json({ error: 'Failed to update inquiry' }, { status: 400 });
    }

    return NextResponse.json(data);
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
  }
}

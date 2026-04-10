import { createServerClient } from '@/lib/supabase/server';

export interface CreateInquiryInput {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  productModel?: string;
  quantity?: number;
  targetPrice?: number;
  message: string;
  source?: string;
}

export interface Inquiry {
  id: string;
  inquiry_number: string;
  status: 'new' | 'reviewed' | 'responded' | 'converted' | 'closed';
  name: string;
  email: string;
  phone?: string;
  company?: string;
  product_model?: string;
  quantity?: number;
  target_price?: number;
  message: string;
  response?: string;
  responded_by?: string;
  responded_at?: string;
  created_at: string;
}

export const inquiryService = {
  async create(input: CreateInquiryInput) {
    const supabase = await createServerClient();

    const { data, error } = await supabase
      .from('inquiries')
      .insert({
        name: input.name,
        email: input.email,
        phone: input.phone,
        company: input.company,
        product_model: input.productModel,
        quantity: input.quantity,
        target_price: input.targetPrice,
        message: input.message,
        source: input.source || 'web',
        status: 'new',
      })
      .select()
      .single();

    if (error) {
      throw new Error(error.message || 'Failed to create inquiry');
    }

    return data;
  },

  async getById(inquiryId: string) {
    const supabase = await createServerClient();

    const { data, error } = await supabase
      .from('inquiries')
      .select('*')
      .eq('id', inquiryId)
      .single();

    if (error) {
      throw new Error('Inquiry not found');
    }

    return data;
  },

  async getAll() {
    const supabase = await createServerClient();

    const { data, error } = await supabase
      .from('inquiries')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      throw new Error('Failed to fetch inquiries');
    }

    return data || [];
  },

  async updateStatus(
    inquiryId: string,
    status: 'new' | 'reviewed' | 'responded' | 'converted' | 'closed'
  ) {
    const supabase = await createServerClient();

    const { data, error } = await supabase
      .from('inquiries')
      .update({ status })
      .eq('id', inquiryId)
      .select()
      .single();

    if (error) {
      throw new Error('Failed to update inquiry status');
    }

    return data;
  },

  async addResponse(inquiryId: string, response: string, respondedBy: string) {
    const supabase = await createServerClient();

    const { data, error } = await supabase
      .from('inquiries')
      .update({
        response,
        responded_by: respondedBy,
        responded_at: new Date().toISOString(),
        status: 'responded',
      })
      .eq('id', inquiryId)
      .select()
      .single();

    if (error) {
      throw new Error('Failed to add response');
    }

    return data;
  },
};

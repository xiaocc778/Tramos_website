import type { Category } from '@/types';

const API_BASE = '/api';

export const categoryService = {
  async getAll(): Promise<Category[]> {
    const res = await fetch(`${API_BASE}/categories`, { cache: 'no-store' });
    if (!res.ok) return [];
    return res.json();
  },

  async getBySlug(slug: string): Promise<Category | null> {
    const res = await fetch(`${API_BASE}/categories?slug=${slug}`, { cache: 'no-store' });
    if (!res.ok) return null;
    const data = await res.json();
    return data.error ? null : data;
  },

  async getById(id: string): Promise<Category | null> {
    const categories = await this.getAll();
    return categories.find(c => c.id === id) || null;
  },
};
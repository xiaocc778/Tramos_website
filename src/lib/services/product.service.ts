import type { Product, ProductFilters } from '@/types';

const API_BASE = '/api';

export const productService = {
  async getAll(filters?: ProductFilters): Promise<Product[]> {
    const params = new URLSearchParams();
    if (filters?.category && filters.category !== 'all') {
      params.set('category', filters.category);
    }
    if (filters?.featured) {
      params.set('featured', 'true');
    }
    if (filters?.search) {
      params.set('search', filters.search);
    }
    if (filters?.minPrice !== undefined) {
      params.set('minPrice', String(filters.minPrice));
    }
    if (filters?.maxPrice !== undefined) {
      params.set('maxPrice', String(filters.maxPrice));
    }
    if (filters?.inStock) {
      params.set('inStock', 'true');
    }

    const query = params.toString();
    const url = query ? `${API_BASE}/products?${query}` : `${API_BASE}/products`;

    const res = await fetch(url, { cache: 'no-store' });
    if (!res.ok) return [];
    return res.json();
  },

  async getBySlug(slug: string): Promise<Product | null> {
    const res = await fetch(`${API_BASE}/products?slug=${slug}`, { cache: 'no-store' });
    if (!res.ok) return null;
    const data = await res.json();
    return data.error ? null : data;
  },

  async getFeatured(): Promise<Product[]> {
    return this.getAll({ featured: true });
  },

  async getByCategory(categoryId: string): Promise<Product[]> {
    return this.getAll({ category: categoryId });
  },

  async search(query: string): Promise<Product[]> {
    return this.getAll({ search: query });
  },

  async getRelated(productId: string, categoryId: string, limit = 4): Promise<Product[]> {
    const products = await this.getByCategory(categoryId);
    return products.filter(p => p.id !== productId).slice(0, limit);
  },
};
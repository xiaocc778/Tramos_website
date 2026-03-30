import type { Article, ArticleFilters } from '@/types';

const API_BASE = '/api';

export const articleService = {
  async getAll(filters?: ArticleFilters): Promise<Article[]> {
    const params = new URLSearchParams();
    if (filters?.type) {
      params.set('type', filters.type);
    }
    if (filters?.published !== false) {
      params.set('published', 'true');
    }

    const query = params.toString();
    const url = query ? `${API_BASE}/articles?${query}` : `${API_BASE}/articles`;

    const res = await fetch(url, { cache: 'no-store' });
    if (!res.ok) return [];
    return res.json();
  },

  async getBySlug(slug: string): Promise<Article | null> {
    const res = await fetch(`${API_BASE}/articles?slug=${slug}`, { cache: 'no-store' });
    if (!res.ok) return null;
    const data = await res.json();
    return data.error ? null : data;
  },

  async getPublished(): Promise<Article[]> {
    return this.getAll({ published: true });
  },

  async getByType(type: 'news' | 'case_study' | 'faq'): Promise<Article[]> {
    return this.getAll({ type, published: true });
  },

  async getCaseStudies(): Promise<Article[]> {
    return this.getByType('case_study');
  },

  async getNews(): Promise<Article[]> {
    return this.getByType('news');
  },

  async getFAQs(): Promise<Article[]> {
    return this.getByType('faq');
  },
};
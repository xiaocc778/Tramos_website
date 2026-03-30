import { useQuery } from '@tanstack/react-query';
import { articleService } from '@/lib/services/article.service';

// 文章列表 Hook
export function useArticles(type?: 'news' | 'case_study' | 'faq') {
  return useQuery({
    queryKey: ['articles', type],
    queryFn: () => articleService.getAll({ type }),
    staleTime: 1000 * 60 * 5,
  });
}

// 单篇文章 Hook
export function useArticle(slug: string) {
  return useQuery({
    queryKey: ['article', slug],
    queryFn: () => articleService.getBySlug(slug),
    enabled: !!slug,
    staleTime: 1000 * 60 * 10,
  });
}

// 已发布文章 Hook
export function usePublishedArticles() {
  return useQuery({
    queryKey: ['articles', 'published'],
    queryFn: () => articleService.getPublished(),
    staleTime: 1000 * 60 * 5,
  });
}

// 案例研究 Hook
export function useCaseStudies() {
  return useQuery({
    queryKey: ['articles', 'case_study'],
    queryFn: () => articleService.getCaseStudies(),
    staleTime: 1000 * 60 * 5,
  });
}

// 新闻 Hook
export function useNews() {
  return useQuery({
    queryKey: ['articles', 'news'],
    queryFn: () => articleService.getNews(),
    staleTime: 1000 * 60 * 5,
  });
}

// FAQ Hook
export function useFAQs() {
  return useQuery({
    queryKey: ['articles', 'faq'],
    queryFn: () => articleService.getFAQs(),
    staleTime: 1000 * 60 * 10,
  });
}

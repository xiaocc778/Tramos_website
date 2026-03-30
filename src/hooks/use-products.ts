import { useQuery } from '@tanstack/react-query';
import { productService } from '@/lib/services/product.service';
import type { ProductFilters } from '@/types';

// 产品列表 Hook
export function useProducts(filters?: ProductFilters) {
  return useQuery({
    queryKey: ['products', filters],
    queryFn: () => productService.getAll(filters),
    staleTime: 1000 * 60 * 5, // 5 分钟
  });
}

// 特色产品 Hook
export function useFeaturedProducts() {
  return useQuery({
    queryKey: ['products', 'featured'],
    queryFn: () => productService.getFeatured(),
    staleTime: 1000 * 60 * 5,
  });
}

// 单个产品 Hook
export function useProduct(slug: string) {
  return useQuery({
    queryKey: ['product', slug],
    queryFn: () => productService.getBySlug(slug),
    enabled: !!slug,
    staleTime: 1000 * 60 * 10,
  });
}

// 按分类获取产品 Hook
export function useProductsByCategory(categoryId: string) {
  return useQuery({
    queryKey: ['products', 'category', categoryId],
    queryFn: () => productService.getByCategory(categoryId),
    enabled: !!categoryId,
    staleTime: 1000 * 60 * 5,
  });
}

// 产品搜索 Hook
export function useProductSearch(query: string) {
  return useQuery({
    queryKey: ['products', 'search', query],
    queryFn: () => productService.search(query),
    enabled: query.length > 2,
    staleTime: 1000 * 60 * 2,
  });
}

// 相关产品 Hook
export function useRelatedProducts(productId: string, categoryId: string, limit = 4) {
  return useQuery({
    queryKey: ['products', 'related', productId],
    queryFn: () => productService.getRelated(productId, categoryId, limit),
    enabled: !!productId && !!categoryId,
    staleTime: 1000 * 60 * 10,
  });
}

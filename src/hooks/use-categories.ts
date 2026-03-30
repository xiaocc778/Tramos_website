import { useQuery } from '@tanstack/react-query';
import { categoryService } from '@/lib/services/category.service';

// 分类列表 Hook
export function useCategories() {
  return useQuery({
    queryKey: ['categories'],
    queryFn: () => categoryService.getAll(),
    staleTime: 1000 * 60 * 30, // 30 分钟，分类数据相对稳定
  });
}

// 单个分类 Hook
export function useCategory(slugOrId: string) {
  return useQuery({
    queryKey: ['category', slugOrId],
    queryFn: () => categoryService.getBySlug(slugOrId),
    enabled: !!slugOrId,
    staleTime: 1000 * 60 * 30,
  });
}

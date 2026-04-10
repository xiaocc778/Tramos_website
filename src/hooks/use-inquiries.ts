import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { inquiryService, type CreateInquiryInput } from '@/lib/services/inquiry.service';

// 创建询盘 Hook
export function useCreateInquiry() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (input: CreateInquiryInput) => inquiryService.create(input),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['inquiries'] });
    },
  });
}

// 询盘列表 Hook
export function useInquiries() {
  return useQuery({
    queryKey: ['inquiries'],
    queryFn: () => inquiryService.getAll(),
  });
}

// 单个询盘 Hook
export function useInquiry(inquiryId: string) {
  return useQuery({
    queryKey: ['inquiry', inquiryId],
    queryFn: () => inquiryService.getById(inquiryId),
    enabled: !!inquiryId,
  });
}

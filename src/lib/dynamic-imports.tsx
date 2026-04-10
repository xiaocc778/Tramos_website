import dynamic from 'next/dynamic';

export const DynamicProductDetail = dynamic(
  () => import('@/components/product/product-detail').then(mod => mod.ProductDetail),
  {
    loading: () => <ProductDetailSkeleton />,
    ssr: true,
  }
);

export const DynamicCartSidebar = dynamic(
  () => import('@/components/layout/cart-sidebar').then(mod => mod.CartSidebar),
  {
    loading: () => null,
    ssr: false,
  }
);

export const DynamicSearchModal = dynamic(
  () => import('@/components/layout/search-modal').then(mod => mod.SearchModal),
  {
    loading: () => null,
    ssr: false,
  }
);

function ProductDetailSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="grid lg:grid-cols-2 gap-8">
        <div className="aspect-square bg-surface-200 rounded-2xl" />
        <div className="space-y-4">
          <div className="h-8 bg-surface-200 rounded w-3/4" />
          <div className="h-6 bg-surface-200 rounded w-1/4" />
          <div className="h-24 bg-surface-200 rounded" />
          <div className="h-12 bg-surface-200 rounded w-1/3" />
        </div>
      </div>
    </div>
  );
}

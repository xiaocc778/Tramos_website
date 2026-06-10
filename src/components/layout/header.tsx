'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import { ClipboardList, Globe, Menu, Moon, Sun, X } from 'lucide-react';
import { Button } from '@/components/ui';
import { useCartStore } from '@/lib/store';
import { useUIStore } from '@/lib/ui-store';
import { cn } from '@/lib/utils';

interface NavItem {
  label: string;
  labelZh: string;
  href: string;
}

const navItems: NavItem[] = [
  { label: 'Products', labelZh: '产品中心', href: '/products' },
  { label: 'Solutions', labelZh: '解决方案', href: '/solutions' },
  { label: 'Projects', labelZh: '项目案例', href: '/projects' },
  { label: 'About', labelZh: '关于我们', href: '/about' },
  { label: 'Contact', labelZh: '联系我们', href: '/contact' },
];

function TramosLogo({ compact = false }: { compact?: boolean }) {
  return (
    <span className="inline-flex items-center gap-2.5" aria-hidden="true">
      <svg
        viewBox="0 0 72 58"
        className={cn('h-8 w-10 text-surface-950', compact ? 'h-7 w-9' : 'lg:h-9 lg:w-11')}
        role="img"
      >
        <path d="M6 7H66L56 17H40V36L32 44L24 36V17H16L6 7Z" fill="currentColor" />
        <path d="M16 20L32 36L48 20H62L34 49L16 31V45L6 55V20H16Z" fill="currentColor" />
        <path d="M56 20H66V55L56 45V31L38 49L32 43L56 20Z" fill="currentColor" />
        <path d="M27 17H45L36 28L27 17Z" fill="white" />
      </svg>
      <span
        className={cn(
          'font-semibold lowercase tracking-[0.12em] text-surface-950',
          compact ? 'text-xl' : 'text-2xl lg:text-[27px]'
        )}
      >
        tramos
      </span>
    </span>
  );
}

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { items } = useCartStore();
  const { preferences, setLanguage, setTheme } = useUIStore();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const isZh = preferences.language === 'zh';

  return (
    <>
      <header
        className={cn(
          'fixed left-0 right-0 top-0 z-50 transition-all duration-300',
          scrolled ? 'bg-white/95 shadow-soft backdrop-blur-md' : 'bg-white'
        )}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between lg:h-20">
            <Link href="/" className="flex items-center rounded-lg py-1" aria-label="Tramos home">
              <TramosLogo />
            </Link>

            <nav className="hidden items-center gap-1 lg:flex">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="rounded-lg px-4 py-2 font-medium text-surface-700 transition-colors hover:bg-orange-50 hover:text-orange-500"
                >
                  {isZh ? item.labelZh : item.label}
                </Link>
              ))}
            </nav>

            <div className="flex items-center gap-1">
              <button
                onClick={() => setLanguage(isZh ? 'en' : 'zh')}
                className="flex items-center p-2 text-surface-600 transition-colors hover:text-orange-500"
                aria-label="Toggle language"
              >
                <Globe className="h-5 w-5" />
                <span className="ml-1 text-sm font-medium">{isZh ? 'EN' : '中文'}</span>
              </button>

              <button
                onClick={() => setTheme(preferences.theme === 'dark' ? 'light' : 'dark')}
                className="p-2 text-surface-600 transition-colors hover:text-orange-500"
                aria-label="Toggle theme"
              >
                {preferences.theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </button>

              <Link
                href="/cart"
                className="relative p-2 text-surface-600 transition-colors hover:text-orange-500"
                aria-label={isZh ? '询盘清单' : 'Inquiry list'}
              >
                <ClipboardList className="h-5 w-5" />
                {itemCount > 0 && (
                  <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-orange-500 text-xs text-white">
                    {itemCount}
                  </span>
                )}
              </Link>

              <button
                onClick={() => setMobileOpen(true)}
                className="p-2 text-surface-600 transition-colors hover:text-orange-500 lg:hidden"
                aria-label="Menu"
              >
                <Menu className="h-6 w-6" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/50 lg:hidden"
            onClick={() => setMobileOpen(false)}
          >
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="absolute bottom-0 right-0 top-0 w-80 bg-white shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex h-full flex-col">
                <div className="flex items-center justify-between border-b p-4">
                  <Link href="/" onClick={() => setMobileOpen(false)} className="flex items-center" aria-label="Tramos home">
                    <TramosLogo compact />
                  </Link>
                  <button onClick={() => setMobileOpen(false)} className="p-2 text-surface-600 hover:text-orange-500" aria-label="Close menu">
                    <X className="h-6 w-6" />
                  </button>
                </div>

                <nav className="flex-1 space-y-1 p-4">
                  {navItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setMobileOpen(false)}
                      className="block rounded-lg px-4 py-3 text-lg font-medium text-surface-700 transition-colors hover:bg-orange-50 hover:text-orange-500"
                    >
                      {isZh ? item.labelZh : item.label}
                    </Link>
                  ))}
                </nav>

                <div className="space-y-2 border-t p-4">
                  <Link href="/inquiry" onClick={() => setMobileOpen(false)}>
                    <Button variant="primary" className="w-full">
                      {isZh ? '获取报价' : 'Get Quote'}
                    </Button>
                  </Link>
                  <Link href="/products" onClick={() => setMobileOpen(false)}>
                    <Button variant="secondary" className="w-full">
                      {isZh ? '浏览产品' : 'Browse Products'}
                    </Button>
                  </Link>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

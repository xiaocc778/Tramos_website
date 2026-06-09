'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Clock, Mail, MapPin, Phone } from 'lucide-react';
import { useUIStore } from '@/lib/ui-store';

const footerLinks = {
  products: {
    title: 'Products',
    titleZh: '产品',
    links: [
      { href: '/products', label: 'All Products', labelZh: '全部产品' },
      { href: '/products?category=electric', label: 'Electric Water Heaters', labelZh: '电热水器' },
      { href: '/products?category=gas', label: 'Gas Water Heaters', labelZh: '燃气热水器' },
      { href: '/products?category=solar', label: 'Solar Water Heaters', labelZh: '太阳能热水器' },
      { href: '/products?category=heat-pump', label: 'Heat Pump Water Heaters', labelZh: '空气能热泵热水器' },
      { href: '/products?category=commercial', label: 'Commercial Systems', labelZh: '商用热水系统' },
    ],
  },
  company: {
    title: 'Company',
    titleZh: '公司',
    links: [
      { href: '/about', label: 'About Tramos', labelZh: '关于 Tramos' },
      { href: '/projects', label: 'Projects', labelZh: '项目案例' },
      { href: '/solutions', label: 'Solutions', labelZh: '解决方案' },
      { href: '/contact', label: 'Contact', labelZh: '联系我们' },
    ],
  },
  support: {
    title: 'Buyer Support',
    titleZh: '采购支持',
    links: [
      { href: '/faq', label: 'FAQ', labelZh: '常见问题' },
      { href: '/inquiry', label: 'Request Quote', labelZh: '获取报价' },
      { href: '/solutions#b2b', label: 'OEM / ODM', labelZh: 'OEM / ODM' },
      { href: '/about#certifications', label: 'Certifications', labelZh: '资质认证' },
    ],
  },
};

export function Footer() {
  const { preferences } = useUIStore();
  const isZh = preferences.language === 'zh';
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#1B2A4A] text-gray-300">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4 lg:gap-12">
          <div>
            <Link href="/" className="mb-4 inline-flex rounded-lg bg-white px-3 py-2" aria-label="Tramos home">
              <Image
                src="/images/logo/3.png"
                alt="Tramos"
                width={170}
                height={43}
                className="h-9 w-auto object-contain"
              />
            </Link>
            <p className="mb-6 max-w-xs text-gray-400">
              {isZh
                ? '面向全球采购商的热水器与商用热水系统制造商，支持产品定制、项目配套与长期供货。'
                : 'A water heater and commercial hot water system manufacturer for global buyers, supporting OEM/ODM, project supply, and long-term distribution.'}
            </p>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 flex-shrink-0 text-orange-400" />
                <span className="text-sm">sales@tramos-heating.com</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5 flex-shrink-0 text-orange-400" />
                <span className="text-sm">+86 400-888-8888</span>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="h-5 w-5 flex-shrink-0 text-orange-400" />
                <span className="text-sm">{isZh ? '周一至周五 9:00-18:00' : 'Mon-Fri 9:00-18:00'}</span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="h-5 w-5 flex-shrink-0 text-orange-400" />
                <span className="text-sm">{isZh ? '广东佛山顺德' : 'Shunde District, Foshan, Guangdong'}</span>
              </div>
            </div>
          </div>

          {Object.entries(footerLinks).map(([key, section]) => (
            <div key={key}>
              <h3 className="mb-4 font-semibold text-white">
                {isZh ? section.titleZh : section.title}
              </h3>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-sm transition-colors hover:text-orange-400">
                      {isZh ? link.labelZh : link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-orange-900/30 pt-8 text-sm text-gray-500 md:flex-row md:items-center md:justify-between">
          <p>
            &copy; {currentYear} Tramos. {isZh ? '保留所有权利。' : 'All rights reserved.'}
          </p>
          <p>{isZh ? 'OEM/ODM | 项目方案 | 出口支持' : 'OEM/ODM | Project Solutions | Export Support'}</p>
        </div>
      </div>
    </footer>
  );
}

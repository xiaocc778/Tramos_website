'use client';

import Link from 'next/link';
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from 'lucide-react';
import { useUIStore } from '@/lib/ui-store';

const footerLinks = {
  products: {
    title: 'Products',
    titleZh: '产品',
    links: [
      { href: '/products', label: 'All Products', labelZh: '全部产品' },
      { href: '/products?category=water-heater', label: 'Water Heaters', labelZh: '热水器' },
      { href: '/products?category=solar-heater', label: 'Solar Heaters', labelZh: '太阳能热水器' },
      { href: '/products?category=boiler', label: 'Boilers', labelZh: '锅炉' },
    ],
  },
  company: {
    title: 'Company',
    titleZh: '公司',
    links: [
      { href: '/about', label: 'About Us', labelZh: '关于我们' },
      { href: '/projects', label: 'Projects', labelZh: '项目案例' },
      { href: '/blogs', label: 'Blogs', labelZh: '博客' },
      { href: '/contact', label: 'Contact', labelZh: '联系我们' },
    ],
  },
  support: {
    title: 'Support',
    titleZh: '支持',
    links: [
      { href: '/faq', label: 'FAQ', labelZh: '常见问题' },
      { href: '/shipping', label: 'Shipping Info', labelZh: '物流信息' },
      { href: '/returns', label: 'Returns', labelZh: '退换货' },
      { href: '/warranty', label: 'Warranty', labelZh: '质保服务' },
    ],
  },
};

const socialLinks = [
  { icon: Facebook, href: '#', label: 'Facebook' },
  { icon: Twitter, href: '#', label: 'Twitter' },
  { icon: Instagram, href: '#', label: 'Instagram' },
  { icon: Linkedin, href: '#', label: 'LinkedIn' },
];

export function Footer() {
  const isZh = useUIStore.getState().preferences.language === 'zh';
  
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-surface-900 text-surface-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="inline-block text-2xl font-bold text-white mb-4">
              {isZh ? '热能科技' : 'HeatTech'}
            </Link>
            <p className="text-surface-400 mb-6 max-w-sm">
              {isZh
                ? '专注于高品质热水器研发与制造，为全球客户提供可靠的热水解决方案。'
                : 'Specializing in high-quality water heater R&D and manufacturing, providing reliable hot water solutions for global customers.'}
            </p>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-primary-400" />
                <span>contact@heatertech.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-primary-400" />
                <span>+86 400-888-8888</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="w-5 h-5 text-primary-400" />
                <span>{isZh ? '广东省佛山市顺德区' : 'Shunde District, Foshan, Guangdong'}</span>
              </div>
            </div>
          </div>
          
          {/* Links */}
          {Object.entries(footerLinks).map(([key, section]) => (
            <div key={key}>
              <h3 className="text-white font-semibold mb-4">
                {isZh ? section.titleZh : section.title}
              </h3>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="hover:text-primary-400 transition-colors"
                    >
                      {isZh ? link.labelZh : link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        
        {/* Bottom */}
        <div className="border-t border-surface-800 mt-12 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-surface-500">
            © {currentYear} HeatTech. {isZh ? '保留所有权利。' : 'All rights reserved.'}
          </p>
          <div className="flex items-center space-x-4">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                className="p-2 text-surface-400 hover:text-primary-400 transition-colors"
                aria-label={social.label}
              >
                <social.icon className="w-5 h-5" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

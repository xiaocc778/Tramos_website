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
      { href: '/products?category=gas', label: 'Gas Heaters', labelZh: '燃气热水器' },
      { href: '/products?category=electric', label: 'Electric Heaters', labelZh: '电热水器' },
      { href: '/products?category=solar', label: 'Solar Heaters', labelZh: '太阳能热水器' },
      { href: '/products?category=heat-pump', label: 'Heat Pumps', labelZh: '空气能热泵' },
    ],
  },
  company: {
    title: 'Company',
    titleZh: '公司',
    links: [
      { href: '/about', label: 'About Us', labelZh: '关于我们' },
      { href: '/projects', label: 'Projects', labelZh: '项目案例' },
      { href: '/solutions', label: 'Solutions', labelZh: '解决方案' },
      { href: '/contact', label: 'Contact', labelZh: '联系我们' },
    ],
  },
  support: {
    title: 'Support',
    titleZh: '支持',
    links: [
      { href: '/faq', label: 'FAQ', labelZh: '常见问题' },
      { href: '/inquiry', label: 'Get Quote', labelZh: '询价' },
      { href: '/contact', label: 'Contact Us', labelZh: '联系我们' },
      { href: '/about#certifications', label: 'Certifications', labelZh: '资质认证' },
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
    <footer className="bg-[#1B2A4A] text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand */}
          <div>
            <Link href="/" className="inline-block text-2xl font-bold text-white mb-4">
              {isZh ? '热能科技' : 'HeatTech'}
            </Link>
            <p className="text-gray-400 mb-6 max-w-xs">
              {isZh
                ? '专注于高品质热水器研发与制造，为全球客户提供可靠的热水解决方案。'
                : 'Specializing in high-quality water heater R&D and manufacturing, providing reliable hot water solutions for global customers.'}
            </p>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-orange-400 flex-shrink-0" />
                <span className="text-sm">contact@heatertech.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-orange-400 flex-shrink-0" />
                <span className="text-sm">+86 400-888-8888</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="w-5 h-5 text-orange-400 flex-shrink-0" />
                <span className="text-sm">{isZh ? '广东省佛山市顺德区' : 'Shunde District, Foshan, Guangdong'}</span>
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
                      className="text-sm hover:text-orange-400 transition-colors"
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
        <div className="border-t border-orange-900/30 mt-12 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-500">
            &copy; {currentYear} HeatTech. {isZh ? '保留所有权利。' : 'All rights reserved.'}
          </p>
          <div className="flex items-center space-x-4">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                className="p-2 text-gray-400 hover:text-orange-400 transition-colors rounded-lg hover:bg-orange-500/10"
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

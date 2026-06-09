'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Building2, Factory, Home, Users } from 'lucide-react';
import { ScrollReveal } from '@/components/shared';
import { imageAssets } from '@/lib/assets';
import { useUIStore } from '@/lib/ui-store';

type SolutionKey = 'residential' | 'commercial' | 'industrial' | 'b2b';

const tabs: Array<{ key: SolutionKey; label: string; labelZh: string; icon: typeof Home }> = [
  { key: 'residential', label: 'Residential', labelZh: '住宅', icon: Home },
  { key: 'commercial', label: 'Commercial', labelZh: '商用', icon: Building2 },
  { key: 'industrial', label: 'Industrial', labelZh: '工业', icon: Factory },
  { key: 'b2b', label: 'B2B Partnership', labelZh: 'B2B 合作', icon: Users },
];

const solutions: Record<SolutionKey, {
  title: string;
  titleZh: string;
  intro: string;
  introZh: string;
  image: string;
  painPoints: string[];
  painPointsZh: string[];
  recommended: string[];
  recommendedZh: string[];
  scenes: string[];
  scenesZh: string[];
  advantages: string[];
  advantagesZh: string[];
  products: { label: string; href: string }[];
  cta: string;
}> = {
  residential: {
    title: 'Residential Hot Water Solutions',
    titleZh: '住宅热水解决方案',
    intro: 'Compact, safe, and easy-to-install products for apartments, villas, rental housing, and retail channels.',
    introZh: '面向公寓、别墅、租赁住宅和零售渠道的紧凑、安全、易安装产品。',
    image: imageAssets.lifestyle.kitchen,
    painPoints: ['Limited installation space', 'Different voltage and energy conditions', 'Need for safe daily use'],
    painPointsZh: ['安装空间有限', '电压和能源条件不同', '日常使用安全要求高'],
    recommended: ['Electric storage heaters', 'Instant gas water heaters', 'Solar systems for sunny regions'],
    recommendedZh: ['储水电热水器', '即热式燃气热水器', '日照地区太阳能系统'],
    scenes: ['Apartment bathrooms', 'Villas', 'Rental housing', 'Retail distributor programs'],
    scenesZh: ['公寓浴室', '别墅', '租赁住宅', '零售经销项目'],
    advantages: ['Compact model selection', 'OEM panels and packaging', 'Clear spare-part planning'],
    advantagesZh: ['紧凑型号选择', '支持 OEM 面板与包装', '备件规划清晰'],
    products: [
      { label: 'Electric Water Heaters', href: '/products?category=electric' },
      { label: 'Gas Water Heaters', href: '/products?category=gas' },
      { label: 'Solar Water Heaters', href: '/products?category=solar' },
    ],
    cta: 'Request Residential Quote',
  },
  commercial: {
    title: 'Commercial Hot Water Solutions',
    titleZh: '商用热水解决方案',
    intro: 'Centralized and high-capacity systems for hotels, apartments, schools, gyms, hospitals, and office facilities.',
    introZh: '面向酒店、公寓、学校、健身房、医院和办公设施的集中式大容量热水系统。',
    image: imageAssets.lifestyle.hotel,
    painPoints: ['Peak-time hot water demand', 'Maintenance access', 'System redundancy and stable supply'],
    painPointsZh: ['高峰期用水需求集中', '需要方便维护', '需要冗余与稳定供应'],
    recommended: ['Commercial central systems', 'Gas/electric backup systems', 'Heat pump systems for energy saving'],
    recommendedZh: ['商用集中热水系统', '燃气/电备份系统', '节能热泵系统'],
    scenes: ['Hotels', 'Student dormitories', 'Gyms and spas', 'Apartment buildings'],
    scenesZh: ['酒店', '学生宿舍', '健身房和水疗场所', '公寓楼'],
    advantages: ['Load-based selection', 'Scalable procurement list', 'Project quote support'],
    advantagesZh: ['按负载选型', '可扩展采购清单', '支持项目报价'],
    products: [
      { label: 'Commercial Systems', href: '/products?category=commercial' },
      { label: 'Heat Pump Water Heaters', href: '/products?category=heat-pump' },
      { label: 'Gas Water Heaters', href: '/products?category=gas' },
    ],
    cta: 'Get Commercial Plan',
  },
  industrial: {
    title: 'Industrial Heating Solutions',
    titleZh: '工业加热解决方案',
    intro: 'Durable heating and hot water configurations for factories, workshops, facilities, and staff service areas.',
    introZh: '面向工厂、车间、设施和员工服务区域的耐用热水与加热配置。',
    image: imageAssets.lifestyle.factoryProduction,
    painPoints: ['Large-volume demand', 'Long operating hours', 'Energy cost and equipment access'],
    painPointsZh: ['大水量需求', '长时间运行', '能源成本和设备检修空间'],
    recommended: ['Commercial central systems', 'Industrial heat pump configurations', 'Hybrid gas/electric plans'],
    recommendedZh: ['商用集中系统', '工业热泵配置', '燃气/电混合方案'],
    scenes: ['Factories', 'Staff shower rooms', 'Food processing support areas', 'Public facilities'],
    scenesZh: ['工厂', '员工淋浴间', '食品加工配套区域', '公共设施'],
    advantages: ['Engineering selection support', 'Installation zone planning', 'Bulk order coordination'],
    advantagesZh: ['工程选型支持', '安装区域规划', '批量订单协同'],
    products: [
      { label: 'Commercial Systems', href: '/products?category=commercial' },
      { label: 'Heat Pump Water Heaters', href: '/products?category=heat-pump' },
    ],
    cta: 'Consult Engineering Team',
  },
  b2b: {
    title: 'B2B Partnership Program',
    titleZh: 'B2B 合作方案',
    intro: 'Supply support for importers, distributors, project buyers, and brands that need OEM/ODM production.',
    introZh: '面向进口商、经销商、工程采购商和 OEM/ODM 品牌客户的供货支持。',
    image: imageAssets.company.reception,
    painPoints: ['Need stable product families', 'Need market-specific documentation', 'Need controllable samples and bulk lead time'],
    painPointsZh: ['需要稳定产品系列', '需要目标市场资料支持', '需要可控的样品和批量交期'],
    recommended: ['OEM/ODM model adaptation', 'Distributor product mix', 'Certification and packaging support'],
    recommendedZh: ['OEM/ODM 型号适配', '经销产品组合', '认证与包装支持'],
    scenes: ['Import distribution', 'Private label programs', 'Project procurement', 'Long-term channel supply'],
    scenesZh: ['进口分销', '自有品牌项目', '工程采购', '长期渠道供货'],
    advantages: ['Logo and packaging support', 'Voltage and certification matching', 'Dedicated sales follow-up'],
    advantagesZh: ['品牌与包装支持', '电压和认证匹配', '专人销售跟进'],
    products: [
      { label: 'All Product Families', href: '/products' },
      { label: 'Projects', href: '/projects' },
      { label: 'Request Quote', href: '/inquiry' },
    ],
    cta: 'Apply for Partnership',
  },
};

function SectionList({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="rounded-2xl bg-white p-6 shadow-soft">
      <h3 className="mb-4 text-lg font-bold text-surface-900">{title}</h3>
      <ul className="space-y-3 text-sm leading-6 text-surface-600">
        {items.map((item) => (
          <li key={item} className="flex gap-2">
            <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-orange-500" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function SolutionsPage() {
  const [activeTab, setActiveTab] = useState<SolutionKey>('residential');
  const { preferences } = useUIStore();
  const isZh = preferences.language === 'zh';
  const active = solutions[activeTab];

  return (
    <div className="min-h-screen bg-surface-50">
      <div className="bg-gradient-to-r from-[#1B2A4A] to-orange-700 py-16">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="mb-4 text-4xl font-bold text-white">
              {isZh ? '解决方案' : 'Solutions'}
            </h1>
            <p className="mx-auto max-w-2xl text-lg text-orange-200">
              {isZh
                ? '按住宅、商用、工业与 B2B 合作场景匹配产品、规格和询盘路径。'
                : 'Match products, specifications, and inquiry paths across residential, commercial, industrial, and B2B scenarios.'}
            </p>
          </motion.div>
        </div>
      </div>

      <div className="sticky top-16 z-40 border-b bg-white lg:top-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="-mx-4 flex overflow-x-auto px-4">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`flex items-center gap-2 whitespace-nowrap border-b-2 px-5 py-4 text-sm font-medium transition-colors ${
                  activeTab === tab.key
                    ? 'border-orange-500 text-orange-600'
                    : 'border-transparent text-surface-500 hover:text-surface-900'
                }`}
                aria-current={activeTab === tab.key ? 'page' : undefined}
              >
                <tab.icon className="h-4 w-4" />
                {isZh ? tab.labelZh : tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <motion.div key={activeTab} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25 }}>
          <div className="relative mb-10 h-64 overflow-hidden rounded-2xl sm:h-80 lg:h-96">
            <Image
              src={active.image}
              alt={isZh ? active.titleZh : active.title}
              fill
              className="object-cover"
              sizes="100vw"
            />
            <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/70 to-black/10">
              <div className="max-w-3xl p-8">
                <h2 className="mb-3 text-2xl font-bold text-white sm:text-3xl">
                  {isZh ? active.titleZh : active.title}
                </h2>
                <p className="leading-relaxed text-white/84">{isZh ? active.introZh : active.intro}</p>
              </div>
            </div>
          </div>

          <div className="grid gap-6 lg:grid-cols-4">
            <ScrollReveal>
              <SectionList title={isZh ? '痛点' : 'Pain Points'} items={isZh ? active.painPointsZh : active.painPoints} />
            </ScrollReveal>
            <ScrollReveal delay={0.05}>
              <SectionList title={isZh ? '推荐产品' : 'Recommended Products'} items={isZh ? active.recommendedZh : active.recommended} />
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <SectionList title={isZh ? '应用场景' : 'Application Scenes'} items={isZh ? active.scenesZh : active.scenes} />
            </ScrollReveal>
            <ScrollReveal delay={0.15}>
              <SectionList title={isZh ? '关键优势' : 'Key Advantages'} items={isZh ? active.advantagesZh : active.advantages} />
            </ScrollReveal>
          </div>

          <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_360px]">
            <div className="rounded-2xl bg-white p-6 shadow-soft">
              <h3 className="mb-4 text-lg font-bold text-surface-900">{isZh ? '相关产品入口' : 'Related Product Links'}</h3>
              <div className="grid gap-3 sm:grid-cols-2">
                {active.products.map((product) => (
                  <Link key={product.label} href={product.href} className="flex items-center justify-between rounded-xl bg-surface-50 p-4 text-sm font-medium text-surface-800 transition-colors hover:bg-orange-50 hover:text-orange-600">
                    {product.label}
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                ))}
              </div>
            </div>
            <div className="rounded-2xl bg-orange-50 p-6 shadow-soft">
              <h3 className="mb-3 text-lg font-bold text-surface-900">{isZh ? '发送您的项目参数' : 'Send Your Project Parameters'}</h3>
              <p className="mb-5 text-sm leading-6 text-surface-600">
                {isZh
                  ? '告诉我们容量、功率、电压、用水点、认证和目的地国家，Tramos 会协助匹配产品和报价。'
                  : 'Share capacity, power, voltage, water points, certification, and destination country. Tramos will help match products and quote.'}
              </p>
              <Link href={`/inquiry?product=${encodeURIComponent(active.title)}`}>
                <button className="w-full rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 py-4 font-semibold text-white transition-colors hover:from-orange-600 hover:to-amber-600">
                  {isZh ? '获取报价' : active.cta}
                </button>
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

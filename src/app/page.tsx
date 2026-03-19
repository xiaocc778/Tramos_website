'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { 
  ArrowRight, CheckCircle, Shield, Truck, Zap, Flame, 
  Wind, Sun, Star, Quote, Factory
} from 'lucide-react';
import { Button } from '@/components/ui';
import { useUIStore } from '@/lib/ui-store';

// Product Categories Data
const categories = [
  {
    id: 'gas',
    icon: Flame,
    name: 'Gas Water Heaters',
    nameZh: '燃气热水器',
    desc: 'Instant hot water with advanced safety features',
    descZh: '先进安全功能的即时热水',
    color: 'from-orange-500 to-red-500',
    features: ['Instant Heating', 'Smart Control', 'Safety Lock'],
  },
  {
    id: 'electric',
    icon: Zap,
    name: 'Electric Heaters',
    nameZh: '电热水器',
    desc: 'Compact and efficient for any space',
    descZh: '紧凑高效，适合任何空间',
    color: 'from-blue-500 to-cyan-500',
    features: ['Energy Saving', 'Quick Install', 'Quiet Operation'],
  },
  {
    id: 'solar',
    icon: Sun,
    name: 'Solar Heaters',
    nameZh: '太阳能热水器',
    desc: 'Eco-friendly with free energy',
    descZh: '环保节能，免费能源',
    color: 'from-yellow-500 to-amber-500',
    features: ['Zero Cost', 'Environmental', 'Long Lifespan'],
  },
  {
    id: 'heat-pump',
    icon: Wind,
    name: 'Heat Pumps',
    nameZh: '空气能热泵',
    desc: 'Smart temperature control technology',
    descZh: '智能温控技术',
    color: 'from-green-500 to-emerald-500',
    features: ['AI Control', 'High Efficiency', 'All Weather'],
  },
  {
    id: 'boiler',
    icon: Factory,
    name: 'Commercial Boiler',
    nameZh: '商用锅炉',
    desc: 'High capacity industrial solutions',
    descZh: '大容量工业解决方案',
    color: 'from-purple-500 to-pink-500',
    features: ['High Capacity', 'Customizable', 'Industrial Grade'],
  },
];

// Stats Data
const stats = [
  { value: 20, suffix: '+', label: 'Years Experience', labelZh: '年行业经验' },
  { value: 50, suffix: '+', label: 'Countries Served', labelZh: '服务国家' },
  { value: 100, suffix: 'K+', label: 'Happy Customers', labelZh: '满意客户' },
  { value: 98, suffix: '%', label: 'Satisfaction Rate', labelZh: '满意度' },
];

// Scenarios Data
const scenarios = [
  {
    id: 'residential',
    name: 'Residential Home',
    nameZh: '住宅家庭',
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=600&fit=crop',
  },
  {
    id: 'hotel',
    name: 'Hotels & Resorts',
    nameZh: '酒店度假村',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&h=600&fit=crop',
  },
  {
    id: 'school',
    name: 'Schools & Universities',
    nameZh: '学校大学',
    image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&h=600&fit=crop',
  },
  {
    id: 'hospital',
    name: 'Hospitals',
    nameZh: '医院',
    image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800&h=600&fit=crop',
  },
  {
    id: 'industrial',
    name: 'Industrial Facilities',
    nameZh: '工业设施',
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&h=600&fit=crop',
  },
];

// Testimonials Data
const testimonials = [
  {
    id: 1,
    name: 'John Smith',
    company: 'ABC Hotels',
    role: 'Operations Manager',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop',
    content: 'HeatTech has been an excellent partner for our hotel chain. Their products are reliable and the after-sales support is outstanding.',
    rating: 5,
  },
  {
    id: 2,
    name: 'Sarah Chen',
    company: 'Green Energy Co',
    role: 'CEO',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
    content: 'The solar water heaters have significantly reduced our energy costs. A game-changer for our business.',
    rating: 5,
  },
  {
    id: 3,
    name: 'Michael Brown',
    company: 'Tech University',
    role: 'Facility Director',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
    content: 'We serve 10,000+ students daily. HeatTech\'s commercial solutions handle the demand perfectly.',
    rating: 5,
  },
];

// Partners Data
const partners = [
  { name: 'ISO', logo: 'https://upload.wikimedia.org/wikipedia/commons/3/3f/ISO_Logo.svg' },
  { name: 'CE', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/CE_Logo.svg/200px-CE_Logo.svg.png' },
  { name: 'UL', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/UL_Logo.svg/200px-UL_Logo.svg.png' },
  { name: 'CCC', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1c/China_Compulsory_Certification.svg/200px-China_Compulsory_Certification.svg.png' },
];

// Animated Counter Component
function AnimatedCounter({ value, suffix, label, labelZh, isZh }: { value: number; suffix: string; label: string; labelZh: string; isZh: boolean }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [isVisible]);

  useEffect(() => {
    if (!isVisible) return;
    const duration = 2000;
    const steps = 60;
    const increment = value / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);
    return () => clearInterval(timer);
  }, [isVisible, value]);

  return (
    <div ref={ref} className="text-center">
      <div className="text-4xl sm:text-5xl font-bold text-primary-600 mb-2">
        {count}{suffix}
      </div>
      <div className="text-surface-600 font-medium">
        {isZh ? labelZh : label}
      </div>
    </div>
  );
}

// 3D Tilt Card Component
function TiltCard({ children, className }: { children: React.ReactNode; className?: string }) {
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = (y - centerY) / 10;
    const rotateY = (centerX - x) / 10;
    setRotation({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setRotation({ x: 0, y: 0 });
  };

  return (
    <motion.div
      ref={cardRef}
      className={className}
      style={{ perspective: 1000 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        style={{
          rotateX: rotation.x,
          rotateY: rotation.y,
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}

// Testimonial Carousel
function TestimonialCarousel() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative max-w-4xl mx-auto">
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-2xl p-8 shadow-soft"
        >
          <Quote className="w-12 h-12 text-primary-200 mb-4" />
          <p className="text-lg text-surface-700 mb-6 italic">
            &ldquo;{testimonials[current].content}&rdquo;
          </p>
          <div className="flex items-center gap-4">
            <img
              src={testimonials[current].avatar}
              alt={testimonials[current].name}
              className="w-12 h-12 rounded-full object-cover"
            />
            <div>
              <div className="font-semibold text-surface-900">{testimonials[current].name}</div>
              <div className="text-sm text-surface-500">
                {testimonials[current].role}, {testimonials[current].company}
              </div>
            </div>
            <div className="flex ml-auto">
              {[...Array(testimonials[current].rating)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
              ))}
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
      <div className="flex justify-center gap-2 mt-6">
        {testimonials.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`w-2 h-2 rounded-full transition-colors ${
              index === current ? 'bg-primary-600' : 'bg-surface-300'
            }`}
          />
        ))}
      </div>
    </div>
  );
}

export default function HomePage() {
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 500], [0, 150]);
  const heroOpacity = useTransform(scrollY, [0, 300], [1, 0]);
  const isZh = useUIStore.getState().preferences.language === 'zh';

  return (
    <div className="min-h-screen overflow-x-hidden">
      {/* Hero Section with Parallax */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-surface-50 via-white to-primary-50">
          <motion.div
            className="absolute inset-0"
            style={{ y: heroY }}
          >
            <div className="absolute top-20 -left-20 w-[600px] h-[600px] bg-primary-200/30 rounded-full blur-3xl" />
            <div className="absolute bottom-20 -right-20 w-[500px] h-[500px] bg-accent-200/30 rounded-full blur-3xl" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary-100/20 rounded-full blur-3xl" />
          </motion.div>
          
          {/* Floating Elements */}
          <motion.div
            animate={{ y: [0, -20, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute top-32 right-1/4 w-4 h-4 bg-primary-400/50 rounded-full"
          />
          <motion.div
            animate={{ y: [0, 15, 0], x: [0, 10, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
            className="absolute top-1/3 left-1/6 w-3 h-3 bg-accent-400/50 rounded-full"
          />
          <motion.div
            animate={{ y: [0, -25, 0], x: [0, -15, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
            className="absolute bottom-1/3 right-1/3 w-5 h-5 bg-primary-300/40 rounded-full"
          />
        </div>

        <motion.div
          style={{ y: heroY, opacity: heroOpacity }}
          className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32"
        >
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="inline-block px-4 py-1.5 bg-primary-100 text-primary-700 rounded-full text-sm font-medium mb-6"
              >
                {isZh ? '专业热水器制造商' : 'Professional Water Heater Manufacturer'}
              </motion.span>
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="text-4xl sm:text-5xl lg:text-7xl font-bold text-surface-900 leading-tight mb-6"
              >
                {isZh ? '为您的家提供' : 'Premium Hot Water'}
                <span className="text-primary-600 block mt-2">
                  {isZh ? '卓越热水解决方案' : 'Solutions for Your Home'}
                </span>
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="text-lg text-surface-600 mb-8 max-w-lg"
              >
                {isZh
                  ? '20年行业经验，专注研发高品质热水器产品。提供燃气、电热、太阳能等多种解决方案，满足全球家庭和商业需求。'
                  : '20 years of industry expertise in developing premium water heaters. Offering gas, electric, and solar solutions for homes and businesses worldwide.'}
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="flex flex-wrap gap-4"
              >
                <Link href="/products">
                  <Button size="lg" className="group">
                    {isZh ? '浏览产品' : 'Browse Products'}
                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <Link href="/inquiry">
                  <Button variant="secondary" size="lg">
                    {isZh ? '获取报价' : 'Get Quote'}
                  </Button>
                </Link>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="relative hidden lg:block"
            >
              <motion.div
                animate={{ rotate: [0, 2, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                className="relative aspect-square"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary-400 to-primary-600 rounded-3xl transform rotate-6" />
                <div className="absolute inset-0 bg-gradient-to-br from-primary-300 to-primary-500 rounded-3xl transform -rotate-3" />
                <img
                  src="https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=800&h=800&fit=crop"
                  alt="Premium Water Heater"
                  className="relative rounded-3xl shadow-2xl object-cover w-full h-full"
                />
              </motion.div>
            </motion.div>
          </div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-6 h-10 border-2 border-surface-400 rounded-full flex justify-center pt-2"
          >
            <div className="w-1 h-2 bg-surface-400 rounded-full" />
          </motion.div>
        </motion.div>
      </section>

      {/* Features Strip */}
      <section className="py-8 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon: Shield, label: 'ISO 9001 Certified', labelZh: 'ISO 9001认证' },
              { icon: Zap, label: 'Energy Efficient', labelZh: '节能高效' },
              { icon: Truck, label: 'Global Shipping', labelZh: '全球配送' },
              { icon: CheckCircle, label: '5-Year Warranty', labelZh: '五年质保' },
            ].map((item, index) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="flex items-center gap-3 p-3 rounded-xl hover:bg-surface-50 transition-colors"
              >
                <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
                  <item.icon className="w-5 h-5 text-primary-600" />
                </div>
                <span className="text-sm font-medium text-surface-700">
                  {isZh ? item.labelZh : item.label}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Product Categories Section */}
      <section className="py-24 bg-surface-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-surface-900 mb-4">
              {isZh ? '产品分类' : 'Product Categories'}
            </h2>
            <p className="text-surface-600 max-w-2xl mx-auto">
              {isZh
                ? '全面的热水器解决方案，满足不同场景需求'
                : 'Comprehensive water heating solutions for every need'}
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {categories.map((category, index) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <TiltCard className="h-full">
                  <Link href={`/products?category=${category.id}`}>
                    <div className="group h-full bg-white rounded-2xl p-6 shadow-soft hover:shadow-soft-hover transition-all duration-300">
                      <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${category.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                        <category.icon className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="text-lg font-semibold text-surface-900 mb-2 group-hover:text-primary-600 transition-colors">
                        {isZh ? category.nameZh : category.name}
                      </h3>
                      <p className="text-sm text-surface-600 mb-4">
                        {isZh ? category.descZh : category.desc}
                      </p>
                      <div className="space-y-1">
                        {category.features.map((feature, i) => (
                          <div key={i} className="flex items-center gap-2 text-xs text-surface-500">
                            <CheckCircle className="w-3 h-3 text-green-500" />
                            {feature}
                          </div>
                        ))}
                      </div>
                    </div>
                  </Link>
                </TiltCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24 bg-primary-600 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <AnimatedCounter
                key={stat.label}
                value={stat.value}
                suffix={stat.suffix}
                label={stat.label}
                labelZh={stat.labelZh}
                isZh={isZh}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Scenarios Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-surface-900 mb-4">
              {isZh ? '应用场景' : 'Application Scenarios'}
            </h2>
            <p className="text-surface-600 max-w-2xl mx-auto">
              {isZh
                ? '从家庭到工业，满足各类热水需求'
                : 'From residential to industrial, meeting all hot water needs'}
            </p>
          </motion.div>

          <div className="flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide -mx-4 px-4">
            {scenarios.map((scenario, idx) => (
              <motion.div
                key={scenario.id}
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="flex-shrink-0 w-72 sm:w-80 snap-center"
              >
                <Link href={`/solutions/${scenario.id}`}>
                  <div className="group relative rounded-2xl overflow-hidden aspect-[4/5]">
                    <img
                      src={scenario.image}
                      alt={isZh ? scenario.nameZh : scenario.name}
                      className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <h3 className="text-xl font-bold text-white mb-1">
                        {isZh ? scenario.nameZh : scenario.name}
                      </h3>
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        whileHover={{ opacity: 1, y: 0 }}
                        className="flex items-center text-white/80 text-sm"
                      >
                        {isZh ? '了解更多' : 'Learn More'}
                        <ArrowRight className="ml-2 w-4 h-4" />
                      </motion.div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 bg-surface-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-surface-900 mb-4">
              {isZh ? '客户见证' : 'Customer Testimonials'}
            </h2>
            <p className="text-surface-600 max-w-2xl mx-auto">
              {isZh
                ? '来自全球客户的口碑反馈'
                : 'Trusted by customers worldwide'}
            </p>
          </motion.div>

          <TestimonialCarousel />
        </div>
      </section>

      {/* Partners Section */}
      <section className="py-16 bg-white border-t">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h3 className="text-lg font-semibold text-surface-500 uppercase tracking-wider">
              {isZh ? '认证与合作' : 'Certifications & Partners'}
            </h3>
          </motion.div>

          <div className="flex justify-center items-center gap-8 sm:gap-16 flex-wrap">
            {partners.map((partner, idx) => (
              <motion.div
                key={partner.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="grayscale hover:grayscale-0 opacity-60 hover:opacity-100 transition-all duration-300"
              >
                <div className="w-24 h-24 flex items-center justify-center bg-surface-100 rounded-xl">
                  <span className="text-xl font-bold text-surface-400">{partner.name}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section with Animation */}
      <section className="py-24 bg-primary-600 relative overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0">
          <motion.div
            className="absolute top-0 left-0 w-full h-full"
            style={{
              background: 'radial-gradient(circle at 20% 50%, rgba(255,255,255,0.1) 0%, transparent 50%)',
            }}
            animate={{
              background: [
                'radial-gradient(circle at 20% 50%, rgba(255,255,255,0.1) 0%, transparent 50%)',
                'radial-gradient(circle at 80% 50%, rgba(255,255,255,0.1) 0%, transparent 50%)',
                'radial-gradient(circle at 20% 50%, rgba(255,255,255,0.1) 0%, transparent 50%)',
              ],
            }}
            transition={{ duration: 8, repeat: Infinity }}
          />
          <div className="absolute top-10 right-10 w-32 h-32 border border-white/20 rounded-full" />
          <div className="absolute bottom-10 left-10 w-20 h-20 border border-white/20 rounded-full" />
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-white/5 rounded-full"
          />
        </div>

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
              {isZh ? '需要定制方案？' : 'Need a Custom Solution?'}
            </h2>
            <p className="text-primary-100 text-lg mb-8 max-w-2xl mx-auto">
              {isZh
                ? '我们的专业团队可以根据您的具体需求提供定制化的热水解决方案。'
                : 'Our professional team can provide customized hot water solutions tailored to your specific needs.'}
            </p>
            <Link href="/inquiry">
              <Button 
                variant="secondary" 
                size="lg" 
                className="bg-white text-primary-600 hover:bg-primary-50 text-lg px-8"
              >
                {isZh ? '立即咨询' : 'Contact Us Today'}
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

-- =====================================================
-- Supabase 数据库初始化数据
-- HeatTech Water Heater E-commerce
-- =====================================================

-- =====================================================
-- 1. 插入分类数据 (categories)
-- =====================================================
INSERT INTO categories (slug, name_en, name_zh, description_en, description_zh, icon, color, sort_order) VALUES
('gas', 'Gas Heaters', '燃气热水器', 'Efficient gas-powered water heating solutions', '高效的燃气热水解决方案', 'Flame', 'from-orange-500 to-red-600', 1),
('electric', 'Electric Heaters', '电热水器', 'Electric water heaters for home and commercial use', '家用和商用热水器', 'Zap', 'from-blue-500 to-cyan-600', 2),
('solar', 'Solar Heaters', '太阳能热水器', 'Eco-friendly solar thermal systems', '环保的太阳能热水系统', 'Sun', 'from-yellow-500 to-orange-500', 3),
('heat-pump', 'Heat Pumps', '空气能热泵', 'Energy-efficient heat pump water heaters', '节能型空气能热泵热水器', 'Wind', 'from-teal-500 to-green-600', 4),
('boiler', 'Boilers', '锅炉', 'Industrial and commercial boiler systems', '工业和商用锅炉系统', 'Factory', 'from-gray-600 to-gray-800', 5)
ON CONFLICT (slug) DO NOTHING;

-- =====================================================
-- 2. 插入产品数据 (products)
-- =====================================================

-- 燃气热水器产品
INSERT INTO products (slug, name_en, name_zh, description_en, description_zh, price, compare_price, category_id, specifications, images, stock_quantity, stock_status, is_featured) 
SELECT 
  'smart-gas-water-heater-12l',
  'Smart Gas Water Heater 12L',
  '智能燃气热水器 12L',
  'Advanced smart gas water heater with digital temperature control, multiple safety protection features, and energy-efficient design. Perfect for families of 3-5 people.',
  '先进的智能燃气热水器，配备数字温度控制、多重安全保护功能和节能设计。非常适合3-5口之家使用。',
  599.00,
  699.00,
  (SELECT id FROM categories WHERE slug = 'gas'),
  '{"capacity": "12L", "type": "Gas", "energy_rating": "A+", "warranty": "5 Years", "heating_method": "Instant", "gas_type": "Natural/LPG", "ignition": "Electronic", "safety": "CO Detection, Overheating, Anti-freeze"}',
  ARRAY['https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=600'],
  50,
  'in_stock',
  true
WHERE EXISTS (SELECT 1 FROM categories WHERE slug = 'gas')
  AND NOT EXISTS (SELECT 1 FROM products WHERE slug = 'smart-gas-water-heater-12l');

INSERT INTO products (slug, name_en, name_zh, description_en, description_zh, price, compare_price, category_id, specifications, images, stock_quantity, stock_status, is_featured) 
SELECT 
  'smart-gas-water-heater-16l',
  'Smart Gas Water Heater 16L',
  '智能燃气热水器 16L',
  'High-capacity smart gas water heater with digital temperature control, suitable for larger families or commercial use. Features intelligent water flow detection and constant temperature technology.',
  '大容量智能燃气热水器，配备数字温度控制，适合较大家庭或商业使用。具有智能水流检测和恒温技术。',
  799.00,
  899.00,
  (SELECT id FROM categories WHERE slug = 'gas'),
  '{"capacity": "16L", "type": "Gas", "energy_rating": "A+", "warranty": "5 Years", "heating_method": "Instant", "gas_type": "Natural/LPG", "ignition": "Electronic", "safety": "CO Detection, Overheating, Anti-freeze"}',
  ARRAY['https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=600'],
  35,
  'in_stock',
  true
WHERE EXISTS (SELECT 1 FROM categories WHERE slug = 'gas')
  AND NOT EXISTS (SELECT 1 FROM products WHERE slug = 'smart-gas-water-heater-16l');

-- 电热水器产品
INSERT INTO products (slug, name_en, name_zh, description_en, description_zh, price, compare_price, category_id, specifications, images, stock_quantity, stock_status, is_featured) 
SELECT 
  'electric-instant-water-heater',
  'Electric Instant Water Heater',
  '电即热式热水器',
  'Compact electric instant water heater, perfect for small spaces. Features rapid heating technology and precise temperature control.',
  '紧凑型电即热式热水器，非常适合小空间使用。配备快速加热技术和精确温度控制。',
  299.00,
  399.00,
  (SELECT id FROM categories WHERE slug = 'electric'),
  '{"capacity": "6L", "type": "Electric", "energy_rating": "A", "warranty": "3 Years", "heating_method": "Instant", "power": "5500W", "voltage": "220V", "installation": "Wall-mounted"}',
  ARRAY['https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600'],
  100,
  'in_stock',
  true
WHERE EXISTS (SELECT 1 FROM categories WHERE slug = 'electric')
  AND NOT EXISTS (SELECT 1 FROM products WHERE slug = 'electric-instant-water-heater');

INSERT INTO products (slug, name_en, name_zh, description_en, description_zh, price, compare_price, category_id, specifications, images, stock_quantity, stock_status, is_featured) 
SELECT 
  'tankless-electric-heater',
  'Tankless Electric Heater',
  '即热式电热水器',
  'Premium tankless electric water heater with smart temperature control. Unlimited hot water supply with 99% thermal efficiency.',
  '高端即热式电热水器，配备智能温度控制。无限量热水供应，热效率达99%。',
  399.00,
  499.00,
  (SELECT id FROM categories WHERE slug = 'electric'),
  '{"capacity": "8L", "type": "Electric", "energy_rating": "A+", "warranty": "3 Years", "heating_method": "Instant", "power": "7500W", "voltage": "220V", "efficiency": "99%"}',
  ARRAY['https://images.unsplash.com/photo-1585704032915-c3400ca199e7?w=600'],
  75,
  'in_stock',
  true
WHERE EXISTS (SELECT 1 FROM categories WHERE slug = 'electric')
  AND NOT EXISTS (SELECT 1 FROM products WHERE slug = 'tankless-electric-heater');

INSERT INTO products (slug, name_en, name_zh, description_en, description_zh, price, category_id, specifications, images, stock_quantity, stock_status, is_featured) 
SELECT 
  'storage-electric-water-heater-50l',
  'Storage Electric Water Heater 50L',
  '储水式电热水器 50L',
  '50L capacity storage electric water heater with advanced insulation technology. Energy-saving design with multiple safety features.',
  '50升容量储水式电热水器，采用先进保温技术。节能设计配有多重安全功能。',
  349.00,
  (SELECT id FROM categories WHERE slug = 'electric'),
  '{"capacity": "50L", "type": "Electric", "energy_rating": "A", "warranty": "3 Years", "heating_method": "Storage", "power": "2000W", "heating_time": "30min", "insulation": "72h"}',
  ARRAY['https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600'],
  60,
  'in_stock',
  false
WHERE EXISTS (SELECT 1 FROM categories WHERE slug = 'electric')
  AND NOT EXISTS (SELECT 1 FROM products WHERE slug = 'storage-electric-water-heater-50l');

-- 太阳能热水器产品
INSERT INTO products (slug, name_en, name_zh, description_en, description_zh, price, compare_price, category_id, specifications, images, stock_quantity, stock_status, is_featured) 
SELECT 
  'solar-thermal-system-300l',
  'Solar Thermal System 300L',
  '太阳能热水系统 300L',
  'Eco-friendly solar thermal system with 300L capacity for whole home heating. Includes backup electric heating element for cloudy days.',
  '环保的太阳能热水系统，300升容量，可为整屋供暖。包含阴天备用电加热元件。',
  1299.00,
  1599.00,
  (SELECT id FROM categories WHERE slug = 'solar'),
  '{"capacity": "300L", "type": "Solar", "energy_rating": "A++", "warranty": "10 Years", "collector_type": "Flat Plate", "backup_heating": "2000W", "max_temp": "75°C", "panels": 2}',
  ARRAY['https://images.unsplash.com/photo-1509391366360-2e959784a276?w=600'],
  30,
  'in_stock',
  true
WHERE EXISTS (SELECT 1 FROM categories WHERE slug = 'solar')
  AND NOT EXISTS (SELECT 1 FROM products WHERE slug = 'solar-thermal-system-300l');

INSERT INTO products (slug, name_en, name_zh, description_en, description_zh, price, category_id, specifications, images, stock_quantity, stock_status, is_featured) 
SELECT 
  'solar-thermal-system-200l',
  'Solar Thermal System 200L',
  '太阳能热水系统 200L',
  'Compact solar thermal system with 200L capacity. Ideal for small to medium households. High-efficiency vacuum tube collectors.',
  '紧凑型太阳能热水系统，200升容量。是中小型家庭的理想选择。高效率真空管集热器。',
  899.00,
  (SELECT id FROM categories WHERE slug = 'solar'),
  '{"capacity": "200L", "type": "Solar", "energy_rating": "A+", "warranty": "10 Years", "collector_type": "Vacuum Tube", "backup_heating": "1500W", "max_temp": "80°C", "panels": 1}',
  ARRAY['https://images.unsplash.com/photo-1509391366360-2e959784a276?w=600'],
  25,
  'in_stock',
  false
WHERE EXISTS (SELECT 1 FROM categories WHERE slug = 'solar')
  AND NOT EXISTS (SELECT 1 FROM products WHERE slug = 'solar-thermal-system-200l');

-- 空气能热泵产品
INSERT INTO products (slug, name_en, name_zh, description_en, description_zh, price, compare_price, category_id, specifications, images, stock_quantity, stock_status, is_featured) 
SELECT 
  'commercial-heat-pump-10p',
  'Commercial Heat Pump 10P',
  '商用空气能热泵 10P',
  'High-capacity commercial heat pump water heater suitable for hotels, gyms, and large residential buildings. Energy efficiency ratio up to 4.5.',
  '大容量商用空气能热泵热水器，适用于酒店、健身房和大型住宅楼。能效比高达4.5。',
  2499.00,
  2999.00,
  (SELECT id FROM categories WHERE slug = 'heat-pump'),
  '{"capacity": "300L", "type": "Heat Pump", "energy_rating": "A++", "warranty": "5 Years", "cop": "4.5", "power": "2800W", "noise_level": "45dB", "coverage": "300-500m²"}',
  ARRAY['https://images.unsplash.com/photo-1631545806609-8da5563e6a5d?w=600'],
  20,
  'in_stock',
  false
WHERE EXISTS (SELECT 1 FROM categories WHERE slug = 'heat-pump')
  AND NOT EXISTS (SELECT 1 FROM products WHERE slug = 'commercial-heat-pump-10p');

INSERT INTO products (slug, name_en, name_zh, description_en, description_zh, price, category_id, specifications, images, stock_quantity, stock_status, is_featured) 
SELECT 
  'residential-heat-pump-3p',
  'Residential Heat Pump 3P',
  '家用空气能热泵 3P',
  'Residential heat pump water heater with 3P capacity. Compact design with smart control system. Operates efficiently in temperatures as low as -15°C.',
  '家用空气能热泵热水器，3P容量。紧凑设计与智能控制系统。在低至-15°C的温度下高效运行。',
  1299.00,
  (SELECT id FROM categories WHERE slug = 'heat-pump'),
  '{"capacity": "200L", "type": "Heat Pump", "energy_rating": "A++", "warranty": "5 Years", "cop": "4.2", "power": "900W", "noise_level": "38dB", "min_temp": "-15°C"}',
  ARRAY['https://images.unsplash.com/photo-1631545806609-8da5563e6a5d?w=600'],
  40,
  'in_stock',
  true
WHERE EXISTS (SELECT 1 FROM categories WHERE slug = 'heat-pump')
  AND NOT EXISTS (SELECT 1 FROM products WHERE slug = 'residential-heat-pump-3p');

-- 锅炉产品
INSERT INTO products (slug, name_en, name_zh, description_en, description_zh, price, category_id, specifications, images, stock_quantity, stock_status, is_featured) 
SELECT 
  'industrial-boiler-500l',
  'Industrial Boiler 500L',
  '工业锅炉 500L',
  'Heavy-duty industrial boiler system with 500L capacity. Designed for factories, hospitals, and large commercial facilities. Multiple fuel options available.',
  '重型工业锅炉系统，500升容量。为工厂、医院和大型商业设施设计。可选多种燃料类型。',
  4999.00,
  (SELECT id FROM categories WHERE slug = 'boiler'),
  '{"capacity": "500L", "type": "Boiler", "energy_rating": "A", "warranty": "2 Years", "fuel_type": "Gas/Oil/Electric", "power": "15000W", "pressure": "8 bar", "efficiency": "92%"}',
  ARRAY['https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600'],
  10,
  'low_stock',
  false
WHERE EXISTS (SELECT 1 FROM categories WHERE slug = 'boiler')
  AND NOT EXISTS (SELECT 1 FROM products WHERE slug = 'industrial-boiler-500l');

INSERT INTO products (slug, name_en, name_zh, description_en, description_zh, price, category_id, specifications, images, stock_quantity, stock_status, is_featured) 
SELECT 
  'commercial-condensing-boiler-300l',
  'Commercial Condensing Boiler 300L',
  '商用冷凝锅炉 300L',
  'High-efficiency commercial condensing boiler with 300L capacity. Features advanced condensing technology for maximum energy savings.',
  '高效商用冷凝锅炉，300升容量。采用先进冷凝技术，实现最大节能效果。',
  2999.00,
  (SELECT id FROM categories WHERE slug = 'boiler'),
  '{"capacity": "300L", "type": "Boiler", "energy_rating": "A+", "warranty": "3 Years", "fuel_type": "Gas", "power": "8000W", "efficiency": "98%", "condensing": true}',
  ARRAY['https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600'],
  15,
  'in_stock',
  false
WHERE EXISTS (SELECT 1 FROM categories WHERE slug = 'boiler')
  AND NOT EXISTS (SELECT 1 FROM products WHERE slug = 'commercial-condensing-boiler-300l');

-- =====================================================
-- 3. 插入文章/案例数据 (articles)
-- =====================================================

INSERT INTO articles (slug, title_en, title_zh, content_en, content_zh, summary_en, summary_zh, type, is_published, featured) VALUES
('energy-saving-tips-gas-heater', 
 '5 Energy-Saving Tips for Your Gas Water Heater', 
 '燃气热水器节能技巧Top 5',
 'Learn how to maximize the efficiency of your gas water heater and reduce energy costs...',
 '了解如何最大化燃气热水器的效率并降低能源成本...',
 'Practical tips to reduce your gas bill while maintaining optimal hot water supply.',
 '实用的技巧，在保持最佳热水供应的同时降低燃气费用。',
 'news', true, true),
 
('solar-water-heater-installation-guide',
 'Complete Guide to Solar Water Heater Installation',
 '太阳能热水器安装完整指南',
 'A comprehensive guide covering site assessment, installation steps, and maintenance tips...',
 '涵盖现场评估、安装步骤和维护技巧的完整指南...',
 'Everything you need to know before installing a solar water heating system.',
 '安装太阳能热水系统前需要了解的一切。',
 'news', true, false),

('hotel-case-study-dubai',
 'How We Helped a 5-Star Hotel Reduce Energy Costs by 40%',
 '我们如何帮助一家五星级酒店降低40%的能源成本',
 'A detailed case study of implementing commercial heat pump solutions in a luxury hotel...',
 '在豪华酒店实施商用热泵解决方案的详细案例研究...',
 'Discover how HeatTech solutions transformed this Dubai hotel energy consumption.',
 '了解HeatTech解决方案如何改变了这家迪拜酒店的能源消耗。',
 'case_study', true, true),

('residential-case-study-singapore',
 'Modern Villa in Singapore Achieves Net-Zero Energy',
 '新加坡现代别墅实现净零能耗',
 'How a high-end residential project achieved net-zero energy using our integrated solar and heat pump system...',
 '高端住宅项目如何利用我们的综合太阳能和热泵系统实现净零能耗...',
 'A breakthrough in residential energy efficiency for tropical climates.',
 '热带气候住宅能源效率的突破。',
 'case_study', true, false),

('faq-maintenance',
 'Frequently Asked Questions: Water Heater Maintenance',
 '常见问题解答：热水器维护',
 'Answers to common questions about maintaining your water heater, including seasonal maintenance tips...',
 '关于维护热水器的常见问题解答，包括季节性维护技巧...',
 'Everything you need to know about keeping your water heater running efficiently.',
 '保持热水器高效运行所需了解的一切。',
 'faq', true, false)
ON CONFLICT (slug) DO NOTHING;

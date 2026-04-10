-- HeatTech E-commerce Seed Data
-- Version: 1.0.0
-- Date: 2026-04-04

-- ============================================
-- Categories Seed Data
-- ============================================
INSERT INTO categories (slug, name_en, name_zh, description_en, description_zh, sort_order, featured, is_active) VALUES
('all', 'All Products', '全部产品', 'Browse our complete product range', '浏览我们全部产品', 0, TRUE, TRUE),
('gas', 'Gas Heaters', '燃气热水器', 'High-efficiency gas water heaters with instant heating technology', '采用即热技术的高效燃气热水器', 1, TRUE, TRUE),
('electric', 'Electric Heaters', '电热水器', 'Safe and convenient electric water heaters for home use', '家用安全便捷的电热水器', 2, TRUE, TRUE),
('solar', 'Solar Heaters', '太阳能热水器', 'Eco-friendly solar hot water systems using renewable energy', '利用可再生能源的环保太阳能热水系统', 3, TRUE, TRUE),
('heat-pump', 'Heat Pumps', '空气能热泵', 'Energy-efficient heat pump water heaters for commercial and residential', '适用于商业和住宅的节能空气能热泵热水器', 4, TRUE, TRUE),
('boiler', 'Boilers', '锅炉', 'Commercial and industrial boilers for large-scale heating needs', '满足大规模供热需求的商业和工业锅炉', 5, FALSE, TRUE);

-- ============================================
-- Products Seed Data
-- ============================================
INSERT INTO products (slug, name_en, name_zh, description_en, description_zh, price, compare_price, category_id, category_slug, stock_status, is_featured, specifications, tags, images) VALUES

-- Gas Heaters
('gas-instant-10l', 'Instant Gas Water Heater 10L', '即热式燃气热水器 10L',
'Compact instant gas water heater with 10L/min flow rate. Digital temperature display and automatic ignition.',
'紧凑型即热式燃气热水器，10L/分钟流量。数字温度显示和自动点火功能。',
599.00, 699.00,
(SELECT id FROM categories WHERE slug = 'gas'), 'gas',
'in_stock', TRUE,
'{"capacity": "10L/min", "type": "instant", "ignition": "automatic", "display": "LED", "safety": "flue-gas", "rated_power": "20kW"}'::jsonb,
'["gas", "instant", "compact"],["10L", "digital"]'::text[],
'{"images": ["/images/products/wall-water-heater.jpg"]}'::jsonb),

('gas-instant-16l-pro', 'Pro Instant Gas Water Heater 16L', 'Pro 即热式燃气热水器 16L',
'Professional grade instant gas water heater with 16L/min flow rate. Suitable for multi-bathroom homes.',
'专业级即热式燃气热水器，16L/分钟流量。适合多浴室家庭使用。',
899.00, NULL,
(SELECT id FROM categories WHERE slug = 'gas'), 'gas',
'in_stock', TRUE,
'{"capacity": "16L/min", "type": "instant", "ignition": "automatic", "display": "LCD", "safety": "flue-gas, overheat", "rated_power": "32kW", "water_pressure": "0.02-1.0MPa"}'::jsonb,
'["gas", "instant", "professional"]'::text[],
'{"images": ["/images/products/wall-water-heater.jpg"]}'::jsonb),

('gas-storage-50l', 'Storage Gas Water Heater 50L', '储水式燃气热水器 50L',
'50L storage gas water heater with enamel coating tank for durability. Suitable for small families.',
'50L搪瓷内胆储水式燃气热水器，经久耐用。适合小家庭使用。',
749.00, 849.00,
(SELECT id FROM categories WHERE slug = 'gas'), 'gas',
'in_stock', FALSE,
'{"capacity": "50L", "type": "storage", "tank": "enamel", "rated_power": "12kW", "water_pressure": "0.02-0.8MPa", "energy_rating": "2-star"}'::jsonb,
'["gas", "storage", "50L"]'::text[],
'{"images": ["/images/products/gas-storage-heater.jpg"]}'::jsonb),

-- Electric Heaters
('electric-tank-30l', 'Electric Water Heater Tank 30L', '电热水器 储水式 30L',
'30L compact electric water heater with glass enamel tank. Perfect for kitchen or single bathroom.',
'30L紧凑型玻璃内胆电热水器。适合厨房或单浴室使用。',
349.00, NULL,
(SELECT id FROM categories WHERE slug = 'electric'), 'electric',
'in_stock', TRUE,
'{"capacity": "30L", "type": "storage", "tank": "glass enamel", "rated_power": "1.5kW", "voltage": "220V", "water_pressure": "0.8MPa", "heating_time": "50min"}'::jsonb,
'["electric", "storage", "compact"]'::text[],
'{"images": ["/images/products/water-heater-sink.jpg"]}'::jsonb),

('electric-tank-60l', 'Electric Water Heater Tank 60L', '电热水器 储水式 60L',
'60L mid-size electric water heater with smart temperature control. Suitable for 2-3 person household.',
'60L智能控温中型电热水器。适合2-3人家庭使用。',
499.00, 549.00,
(SELECT id FROM categories WHERE slug = 'electric'), 'electric',
'in_stock', TRUE,
'{"capacity": "60L", "type": "storage", "tank": "glass enamel", "rated_power": "2kW", "voltage": "220V", "water_pressure": "0.8MPa", "heating_time": "75min", "smart_control": true}'::jsonb,
'["electric", "storage", "smart"]'::text[],
'{"images": ["/images/products/water-heater-sink.jpg"]}'::jsonb),

('electric-tank-80l', 'Electric Water Heater Tank 80L', '电热水器 储水式 80L',
'80L large capacity electric water heater with rapid heating. Suitable for family of 4-5.',
'80L快速加热大容量电热水器。适合4-5口家庭使用。',
649.00, NULL,
(SELECT id FROM categories WHERE slug = 'electric'), 'electric',
'low_stock', FALSE,
'{"capacity": "80L", "type": "storage", "tank": "glass enamel", "rated_power": "2.5kW", "voltage": "220V", "water_pressure": "0.8MPa", "heating_time": "60min", "rapid_heating": true}''::jsonb,
'["electric", "storage", "large"]'::text[],
'{"images": ["/images/products/water-heater-sink.jpg"]}'::jsonb),

-- Solar Heaters
('solar-flat-200l', 'Flat Panel Solar Water Heater 200L', '平板太阳能热水器 200L',
'200L flat panel solar water heater with electric backup. Year-round hot water supply.',
'200L平板型太阳能热水器，带电加热功能。全年供应热水。',
1599.00, 1799.00,
(SELECT id FROM categories WHERE slug = 'solar'), 'solar',
'in_stock', TRUE,
'{"capacity": "200L", "type": "flat panel", "collector_area": "2.5m2", "backup_power": "1.5kW", "tank": "stainless steel", "working_pressure": "0.6MPa", "heat_preservation": "72h"}'::jsonb,
'["solar", "flat panel", "eco-friendly"]'::text[],
'{"images": ["/images/products/solar-water-heater.jpg", "/images/products/solar-house-roof.jpg"]}'::jsonb),

('solar-evacuated-180l', 'Evacuated Tube Solar Heater 180L', '真空管太阳能热水器 180L',
'High-efficiency evacuated tube solar water heater with 180L capacity. Excellent winter performance.',
'高效真空管太阳能热水器，180L容量。优异的冬季性能。',
1399.00, NULL,
(SELECT id FROM categories WHERE slug = 'solar'), 'solar',
'in_stock', FALSE,
'{"capacity": "180L", "type": "evacuated tube", "tubes": "20", "collector_efficiency": "95%", "tank": "stainless steel", "working_pressure": "0.6MPa", "heat_preservation": "48h"}'::jsonb,
'["solar", "evacuated tube", "high-efficiency"]'::text[],
'{"images": ["/images/products/solar-water-heater.jpg"]}'::jsonb),

-- Heat Pumps
('heatpump-200l', 'Heat Pump Water Heater 200L', '空气能热泵热水器 200L',
'Energy-efficient heat pump water heater with 200L capacity. COP 4.0, uses 75% less energy than electric.',
'节能空气能热泵热水器，200L容量。COP 4.0，比电热水器节能75%。',
2299.00, 2599.00,
(SELECT id FROM categories WHERE slug = 'heat-pump'), 'heat-pump',
'in_stock', TRUE,
'{"capacity": "200L", "type": "heat pump", "cop": "4.0", "rated_power": "0.75kW", "voltage": "220V", "working_temp": "-10 to 45C", "noise_level": "45dB", "refrigerant": "R410A"}'::jsonb,
'["heat pump", "energy-saving", "eco"]'::text[],
'{"images": ["/images/products/heat-pump-heater.jpg"]}'::jsonb),

('heatpump-300l-commercial', 'Commercial Heat Pump 300L', '商用空气能热泵 300L',
'Commercial grade heat pump water heater with 300L capacity. Built for heavy-duty use in hotels and gyms.',
'商用级空气能热泵热水器，300L容量。为酒店和健身房重载使用而建造。',
3599.00, NULL,
(SELECT id FROM categories WHERE slug = 'heat-pump'), 'heat-pump',
'in_stock', FALSE,
'{"capacity": "300L", "type": "heat pump", "cop": "4.2", "rated_power": "1.2kW", "voltage": "380V", "working_temp": "-15 to 45C", "noise_level": "55dB", "refrigerant": "R410A", "commercial": true}'::jsonb,
'["heat pump", "commercial", "heavy-duty"]'::text[],
'{"images": ["/images/products/heat-pump-heater.jpg"]}'::jsonb),

-- Boilers
('boiler-gas-98kw', 'Commercial Gas Boiler 98kW', '商用燃气锅炉 98kW',
'98kW commercial gas boiler for large-scale heating. High efficiency and low emissions.',
'98kW商用燃气锅炉，用于大规模供热。高效率低排放。',
4999.00, NULL,
(SELECT id FROM categories WHERE slug = 'boiler'), 'boiler',
'in_stock', TRUE,
'{"power": "98kW", "type": "gas", "efficiency": "95%", "fuel": "natural gas/LPG", "voltage": "220V", "water_pressure": "1.0MPa", "weight": "120kg", "dimensions": "800x600x1200mm"}'::jsonb,
'["boiler", "commercial", "gas"]'::text[],
'{"images": ["/images/products/commercial-boiler.jpg"]}'::jsonb),

('boiler-electric-36kw', 'Electric Steam Boiler 36kW', '电蒸汽锅炉 36kW',
'36kW electric steam boiler for light commercial use. Clean and easy to install.',
'36kW电蒸汽锅炉，适用于轻商业用途。清洁易于安装。',
2999.00, 3299.00,
(SELECT id FROM categories WHERE slug = 'boiler'), 'boiler',
'low_stock', FALSE,
'{"power": "36kW", "type": "electric steam", "efficiency": "98%", "voltage": "380V", "steam_output": "50kg/h", "working_pressure": "0.7MPa", "weight": "80kg"}'::jsonb,
'["boiler", "electric", "steam"]'::text[],
'{"images": ["/images/products/electric-boiler.jpg"]}'::jsonb);

-- ============================================
-- Articles Seed Data
-- ============================================
INSERT INTO articles (slug, type, title_en, title_zh, excerpt_en, excerpt_zh, content_en, content_zh, is_published, published_at, tags) VALUES

('how-to-choose-water-heater', 'faq',
'How to Choose the Right Water Heater',
'如何选择合适的热水器',
'Learn how to select the perfect water heater for your home based on your needs, budget, and energy source.',
'了解如何根据您的需求、预算和能源类型选择合适的热水器。',
'# How to Choose the Right Water Heater

## Factors to Consider

### 1. Household Size
- 1-2 people: 30-50L electric or 10L gas
- 3-4 people: 60-80L electric or 12-16L gas
- 5+ people: 100L+ storage or commercial system

### 2. Available Energy Source
- **Natural Gas**: Most economical for gas-connected homes
- **Electricity**: Clean and easy to install
- **Solar**: Best for sunny climates, long-term savings
- **Heat Pump**: Best efficiency, works in various climates

### 3. Installation Space
- Instant heaters: Wall-mounted, minimal space
- Storage heaters: Floor or wall, needs clearance
- Solar: Requires roof space

### 4. Budget
- Electric: $200-800
- Gas: $400-1500
- Solar: $1000-3000
- Heat Pump: $1500-4000

## Conclusion
Consider your specific needs and consult with our experts for personalized advice.',
'# 如何选择合适的热水器

## 需要考虑的因素

### 1. 家庭人口
- 1-2人：30-50L电热水器或10L燃气热水器
- 3-4人：60-80L电热水器或12-16L燃气热水器
- 5人以上：100L以上储水式或商用系统

### 2. 可用能源类型
- **燃气**：连接燃气管道家庭最经济
- **电能**：清洁易于安装
- **太阳能**：阳光充足地区最佳，长期节省
- **空气能热泵**：效率最高，适应各种气候

### 3. 安装空间
- 即热式：壁挂式，占用空间小
- 储水式：落地或壁挂，需要净空
- 太阳能：需要屋顶空间

### 4. 预算
- 电热水器：$200-800
- 燃气热水器：$400-1500
- 太阳能热水器：$1000-3000
- 空气能热泵：$1500-4000

## 结论
考虑您的具体需求，并咨询我们的专家获取个性化建议。',
TRUE, NOW() - INTERVAL '30 days', ARRAY['guide', 'selection', 'tips']),

('solar-heater-winter-maintenance', 'faq',
'Solar Water Heater Winter Maintenance Guide',
'太阳能热水器冬季维护指南',
'Essential maintenance tips to keep your solar water heater running efficiently during winter months.',
'冬季保持太阳能热水器高效运行的重要维护技巧。',
'# Solar Water Heater Winter Maintenance

## Pre-Winter Checklist

1. Check insulation on pipes
2. Verify backup heating element works
3. Clean solar collector panels
4. Check antifreeze levels
5. Inspect mounting brackets

## Winter Operation Tips

- Do not drain the system in winter
- Keep snow cleared from collectors
- Monitor temperature settings
- Use backup heating when needed

## Professional Service
Schedule annual maintenance with certified technicians.',
'# 太阳能热水器冬季维护

## 入冬前检查清单

1. 检查管道保温
2. 验证备用加热元件正常工作
3. 清洁太阳能集热板
4. 检查防冻液液位
5. 检查安装支架

## 冬季使用技巧

- 冬季不要排空系统
- 保持集热器上无积雪
- 监控温度设置
- 必要时使用备用加热

## 专业维护
安排认证技术人员进行年度维护。',
TRUE, NOW() - INTERVAL '45 days', ARRAY['solar', 'maintenance', 'winter']),

('hotel-project-case-study', 'case_study',
'Hotel Chain Hot Water System Upgrade - Case Study',
'连锁酒店热水系统升级案例',
'A major hotel chain reduced energy costs by 40% after upgrading to our heat pump water heaters.',
'一家大型连锁酒店升级使用我们的空气能热泵热水器后，能源成本降低了40%。',
'# Hotel Chain Hot Water System Upgrade

## Project Overview
A 50-property hotel chain needed to upgrade their aging electric water heaters to more efficient solutions.

## Solution
Installation of 300L commercial heat pump water heaters in each property.

## Results
- 40% reduction in energy costs
- Payback period: 2.5 years
- Improved guest satisfaction scores
- Reduced carbon footprint by 35%

## Testimonial
"The upgrade has been transformative for our operations. The ROI exceeded our expectations." - Operations Director',
'# 连锁酒店热水系统升级

## 项目概述
一家拥有50家酒店的连锁酒店集团需要升级老化的电热水器，采用更高效的解决方案。

## 解决方案
在每家酒店安装300L商用空气能热泵热水器。

## 成果
- 能源成本降低40%
- 投资回收期：2.5年
- 客户满意度提升
- 碳排放减少35%

## 客户评价
"升级改变了我们的运营方式。投资回报超出了我们的预期。" - 运营总监',
TRUE, NOW() - INTERVAL '60 days', ARRAY['case study', 'commercial', 'hotel']),

('new-energy-efficient-products-2026', 'news',
'HeatTech Launches New Energy-Efficient Product Line for 2026',
'热能科技发布2026年新型节能产品线',
'We are excited to announce our latest generation of water heaters featuring breakthrough energy efficiency technology.',
'我们很高兴宣布最新一代热水器，搭载突破性能效技术。',
'# HeatTech Launches New Energy-Efficient Products

## Product Highlights

### Heat Pump Pro Series
- COP 5.0 (20% improvement)
- Smart AI temperature control
- Whisper-quiet operation at 38dB
- 15-year warranty

### Solar Hybrid System
- Integrated heat pump backup
- 15% more efficient collectors
- Smart weather monitoring
- 10-year warranty

## Availability
New products available for order starting Q2 2026.

## Contact
For bulk orders and B2B inquiries, contact our sales team.',
'# 热能科技发布新型节能产品

## 产品亮点

### 空气能Pro系列
- COP 5.0（提升20%）
- 智能AI温度控制
- 超静音运行38dB
- 15年质保

### 太阳能混合系统
- 集成空气能备用
- 集热器效率提升15%
- 智能天气监测
- 10年质保

## 上市时间
新产品将于2026年第二季度开始接受订购。

## 联系方式
批量订单和B2B询价，请联系我们的销售团队。',
TRUE, NOW() - INTERVAL '7 days', ARRAY['news', 'product launch', '2026']);

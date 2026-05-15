-- =====================================================
-- Supabase 鏁版嵁搴撳垵濮嬪寲鏁版嵁
-- HeatTech Water Heater E-commerce
-- =====================================================

-- =====================================================
-- 1. 鎻掑叆鍒嗙被鏁版嵁 (categories)
-- =====================================================
INSERT INTO categories (slug, name_en, name_zh, description_en, description_zh, icon, color, sort_order) VALUES
('gas', 'Gas Heaters', '鐕冩皵鐑按鍣?, 'Efficient gas-powered water heating solutions', '楂樻晥鐨勭噧姘旂儹姘磋В鍐虫柟妗?, 'Flame', 'from-orange-500 to-red-600', 1),
('electric', 'Electric Heaters', '鐢电儹姘村櫒', 'Electric water heaters for home and commercial use', '瀹剁敤鍜屽晢鐢ㄧ儹姘村櫒', 'Zap', 'from-blue-500 to-cyan-600', 2),
('solar', 'Solar Heaters', '澶槼鑳界儹姘村櫒', 'Eco-friendly solar thermal systems', '鐜繚鐨勫お闃宠兘鐑按绯荤粺', 'Sun', 'from-yellow-500 to-orange-500', 3),
('heat-pump', 'Heat Pumps', '绌烘皵鑳界儹娉?, 'Energy-efficient heat pump water heaters', '鑺傝兘鍨嬬┖姘旇兘鐑车鐑按鍣?, 'Wind', 'from-teal-500 to-green-600', 4),
('boiler', 'Boilers', '閿呯倝', 'Industrial and commercial boiler systems', '宸ヤ笟鍜屽晢鐢ㄩ攨鐐夌郴缁?, 'Factory', 'from-gray-600 to-gray-800', 5)
ON CONFLICT (slug) DO NOTHING;

-- =====================================================
-- 2. 鎻掑叆浜у搧鏁版嵁 (products)
-- =====================================================

-- 鐕冩皵鐑按鍣ㄤ骇鍝?
INSERT INTO products (slug, name_en, name_zh, description_en, description_zh, price, compare_price, category_id, specifications, images, stock_quantity, stock_status, is_featured) 
SELECT 
  'smart-gas-water-heater-12l',
  'Smart Gas Water Heater 12L',
  '鏅鸿兘鐕冩皵鐑按鍣?12L',
  'Advanced smart gas water heater with digital temperature control, multiple safety protection features, and energy-efficient design. Perfect for families of 3-5 people.',
  '鍏堣繘鐨勬櫤鑳界噧姘旂儹姘村櫒锛岄厤澶囨暟瀛楁俯搴︽帶鍒躲€佸閲嶅畨鍏ㄤ繚鎶ゅ姛鑳藉拰鑺傝兘璁捐銆傞潪甯搁€傚悎3-5鍙ｄ箣瀹朵娇鐢ㄣ€?,
  599.00,
  699.00,
  (SELECT id FROM categories WHERE slug = 'gas'),
  '{"capacity": "12L", "type": "Gas", "energy_rating": "A+", "warranty": "5 Years", "heating_method": "Instant", "gas_type": "Natural/LPG", "ignition": "Electronic", "safety": "CO Detection, Overheating, Anti-freeze"}',
  ARRAY['/images/products/New_model_product/no.1/微信图片_20260515153010_425_34.jpg'],
  50,
  'in_stock',
  true
WHERE EXISTS (SELECT 1 FROM categories WHERE slug = 'gas')
  AND NOT EXISTS (SELECT 1 FROM products WHERE slug = 'smart-gas-water-heater-12l');

INSERT INTO products (slug, name_en, name_zh, description_en, description_zh, price, compare_price, category_id, specifications, images, stock_quantity, stock_status, is_featured) 
SELECT 
  'smart-gas-water-heater-16l',
  'Smart Gas Water Heater 16L',
  '鏅鸿兘鐕冩皵鐑按鍣?16L',
  'High-capacity smart gas water heater with digital temperature control, suitable for larger families or commercial use. Features intelligent water flow detection and constant temperature technology.',
  '澶у閲忔櫤鑳界噧姘旂儹姘村櫒锛岄厤澶囨暟瀛楁俯搴︽帶鍒讹紝閫傚悎杈冨ぇ瀹跺涵鎴栧晢涓氫娇鐢ㄣ€傚叿鏈夋櫤鑳芥按娴佹娴嬪拰鎭掓俯鎶€鏈€?,
  799.00,
  899.00,
  (SELECT id FROM categories WHERE slug = 'gas'),
  '{"capacity": "16L", "type": "Gas", "energy_rating": "A+", "warranty": "5 Years", "heating_method": "Instant", "gas_type": "Natural/LPG", "ignition": "Electronic", "safety": "CO Detection, Overheating, Anti-freeze"}',
  ARRAY['/images/products/New_model_product/no.1/微信图片_20260515153010_425_34.jpg'],
  35,
  'in_stock',
  true
WHERE EXISTS (SELECT 1 FROM categories WHERE slug = 'gas')
  AND NOT EXISTS (SELECT 1 FROM products WHERE slug = 'smart-gas-water-heater-16l');

-- 鐢电儹姘村櫒浜у搧
INSERT INTO products (slug, name_en, name_zh, description_en, description_zh, price, compare_price, category_id, specifications, images, stock_quantity, stock_status, is_featured) 
SELECT 
  'electric-instant-water-heater',
  'Electric Instant Water Heater',
  '鐢靛嵆鐑紡鐑按鍣?,
  'Compact electric instant water heater, perfect for small spaces. Features rapid heating technology and precise temperature control.',
  '绱у噾鍨嬬數鍗崇儹寮忕儹姘村櫒锛岄潪甯搁€傚悎灏忕┖闂翠娇鐢ㄣ€傞厤澶囧揩閫熷姞鐑妧鏈拰绮剧‘娓╁害鎺у埗銆?,
  299.00,
  399.00,
  (SELECT id FROM categories WHERE slug = 'electric'),
  '{"capacity": "6L", "type": "Electric", "energy_rating": "A", "warranty": "3 Years", "heating_method": "Instant", "power": "5500W", "voltage": "220V", "installation": "Wall-mounted"}',
  ARRAY['/images/products/New_model_product/no.2/微信图片_20260515153032_432_34.jpg'],
  100,
  'in_stock',
  true
WHERE EXISTS (SELECT 1 FROM categories WHERE slug = 'electric')
  AND NOT EXISTS (SELECT 1 FROM products WHERE slug = 'electric-instant-water-heater');

INSERT INTO products (slug, name_en, name_zh, description_en, description_zh, price, compare_price, category_id, specifications, images, stock_quantity, stock_status, is_featured) 
SELECT 
  'tankless-electric-heater',
  'Tankless Electric Heater',
  '鍗崇儹寮忕數鐑按鍣?,
  'Premium tankless electric water heater with smart temperature control. Unlimited hot water supply with 99% thermal efficiency.',
  '楂樼鍗崇儹寮忕數鐑按鍣紝閰嶅鏅鸿兘娓╁害鎺у埗銆傛棤闄愰噺鐑按渚涘簲锛岀儹鏁堢巼杈?9%銆?,
  399.00,
  499.00,
  (SELECT id FROM categories WHERE slug = 'electric'),
  '{"capacity": "8L", "type": "Electric", "energy_rating": "A+", "warranty": "3 Years", "heating_method": "Instant", "power": "7500W", "voltage": "220V", "efficiency": "99%"}',
  ARRAY['/images/products/New_model_product/no.3/微信图片_20260515153034_433_34.jpg'],
  75,
  'in_stock',
  true
WHERE EXISTS (SELECT 1 FROM categories WHERE slug = 'electric')
  AND NOT EXISTS (SELECT 1 FROM products WHERE slug = 'tankless-electric-heater');

INSERT INTO products (slug, name_en, name_zh, description_en, description_zh, price, category_id, specifications, images, stock_quantity, stock_status, is_featured) 
SELECT 
  'storage-electric-water-heater-50l',
  'Storage Electric Water Heater 50L',
  '鍌ㄦ按寮忕數鐑按鍣?50L',
  '50L capacity storage electric water heater with advanced insulation technology. Energy-saving design with multiple safety features.',
  '50鍗囧閲忓偍姘村紡鐢电儹姘村櫒锛岄噰鐢ㄥ厛杩涗繚娓╂妧鏈€傝妭鑳借璁￠厤鏈夊閲嶅畨鍏ㄥ姛鑳姐€?,
  349.00,
  (SELECT id FROM categories WHERE slug = 'electric'),
  '{"capacity": "50L", "type": "Electric", "energy_rating": "A", "warranty": "3 Years", "heating_method": "Storage", "power": "2000W", "heating_time": "30min", "insulation": "72h"}',
  ARRAY['/images/products/New_model_product/no.2/微信图片_20260515153032_432_34.jpg'],
  60,
  'in_stock',
  false
WHERE EXISTS (SELECT 1 FROM categories WHERE slug = 'electric')
  AND NOT EXISTS (SELECT 1 FROM products WHERE slug = 'storage-electric-water-heater-50l');

-- 澶槼鑳界儹姘村櫒浜у搧
INSERT INTO products (slug, name_en, name_zh, description_en, description_zh, price, compare_price, category_id, specifications, images, stock_quantity, stock_status, is_featured) 
SELECT 
  'solar-thermal-system-300l',
  'Solar Thermal System 300L',
  '澶槼鑳界儹姘寸郴缁?300L',
  'Eco-friendly solar thermal system with 300L capacity for whole home heating. Includes backup electric heating element for cloudy days.',
  '鐜繚鐨勫お闃宠兘鐑按绯荤粺锛?00鍗囧閲忥紝鍙负鏁村眿渚涙殩銆傚寘鍚槾澶╁鐢ㄧ數鍔犵儹鍏冧欢銆?,
  1299.00,
  1599.00,
  (SELECT id FROM categories WHERE slug = 'solar'),
  '{"capacity": "300L", "type": "Solar", "energy_rating": "A++", "warranty": "10 Years", "collector_type": "Flat Plate", "backup_heating": "2000W", "max_temp": "75掳C", "panels": 2}',
  ARRAY['/images/products/general_materials/solar-water-heater.jpg'],
  30,
  'in_stock',
  true
WHERE EXISTS (SELECT 1 FROM categories WHERE slug = 'solar')
  AND NOT EXISTS (SELECT 1 FROM products WHERE slug = 'solar-thermal-system-300l');

INSERT INTO products (slug, name_en, name_zh, description_en, description_zh, price, category_id, specifications, images, stock_quantity, stock_status, is_featured) 
SELECT 
  'solar-thermal-system-200l',
  'Solar Thermal System 200L',
  '澶槼鑳界儹姘寸郴缁?200L',
  'Compact solar thermal system with 200L capacity. Ideal for small to medium households. High-efficiency vacuum tube collectors.',
  '绱у噾鍨嬪お闃宠兘鐑按绯荤粺锛?00鍗囧閲忋€傛槸涓皬鍨嬪搴殑鐞嗘兂閫夋嫨銆傞珮鏁堢巼鐪熺┖绠￠泦鐑櫒銆?,
  899.00,
  (SELECT id FROM categories WHERE slug = 'solar'),
  '{"capacity": "200L", "type": "Solar", "energy_rating": "A+", "warranty": "10 Years", "collector_type": "Vacuum Tube", "backup_heating": "1500W", "max_temp": "80掳C", "panels": 1}',
  ARRAY['/images/products/general_materials/solar-water-heater.jpg'],
  25,
  'in_stock',
  false
WHERE EXISTS (SELECT 1 FROM categories WHERE slug = 'solar')
  AND NOT EXISTS (SELECT 1 FROM products WHERE slug = 'solar-thermal-system-200l');

-- 绌烘皵鑳界儹娉典骇鍝?
INSERT INTO products (slug, name_en, name_zh, description_en, description_zh, price, compare_price, category_id, specifications, images, stock_quantity, stock_status, is_featured) 
SELECT 
  'commercial-heat-pump-10p',
  'Commercial Heat Pump 10P',
  '鍟嗙敤绌烘皵鑳界儹娉?10P',
  'High-capacity commercial heat pump water heater suitable for hotels, gyms, and large residential buildings. Energy efficiency ratio up to 4.5.',
  '澶у閲忓晢鐢ㄧ┖姘旇兘鐑车鐑按鍣紝閫傜敤浜庨厭搴椼€佸仴韬埧鍜屽ぇ鍨嬩綇瀹呮ゼ銆傝兘鏁堟瘮楂樿揪4.5銆?,
  2499.00,
  2999.00,
  (SELECT id FROM categories WHERE slug = 'heat-pump'),
  '{"capacity": "300L", "type": "Heat Pump", "energy_rating": "A++", "warranty": "5 Years", "cop": "4.5", "power": "2800W", "noise_level": "45dB", "coverage": "300-500m虏"}',
  ARRAY['/images/products/general_materials/industrial-boiler-closeup.jpg'],
  20,
  'in_stock',
  false
WHERE EXISTS (SELECT 1 FROM categories WHERE slug = 'heat-pump')
  AND NOT EXISTS (SELECT 1 FROM products WHERE slug = 'commercial-heat-pump-10p');

INSERT INTO products (slug, name_en, name_zh, description_en, description_zh, price, category_id, specifications, images, stock_quantity, stock_status, is_featured) 
SELECT 
  'residential-heat-pump-3p',
  'Residential Heat Pump 3P',
  '瀹剁敤绌烘皵鑳界儹娉?3P',
  'Residential heat pump water heater with 3P capacity. Compact design with smart control system. Operates efficiently in temperatures as low as -15掳C.',
  '瀹剁敤绌烘皵鑳界儹娉电儹姘村櫒锛?P瀹归噺銆傜揣鍑戣璁′笌鏅鸿兘鎺у埗绯荤粺銆傚湪浣庤嚦-15掳C鐨勬俯搴︿笅楂樻晥杩愯銆?,
  1299.00,
  (SELECT id FROM categories WHERE slug = 'heat-pump'),
  '{"capacity": "200L", "type": "Heat Pump", "energy_rating": "A++", "warranty": "5 Years", "cop": "4.2", "power": "900W", "noise_level": "38dB", "min_temp": "-15掳C"}',
  ARRAY['/images/products/general_materials/industrial-boiler-closeup.jpg'],
  40,
  'in_stock',
  true
WHERE EXISTS (SELECT 1 FROM categories WHERE slug = 'heat-pump')
  AND NOT EXISTS (SELECT 1 FROM products WHERE slug = 'residential-heat-pump-3p');

-- 閿呯倝浜у搧
INSERT INTO products (slug, name_en, name_zh, description_en, description_zh, price, category_id, specifications, images, stock_quantity, stock_status, is_featured) 
SELECT 
  'industrial-boiler-500l',
  'Industrial Boiler 500L',
  '宸ヤ笟閿呯倝 500L',
  'Heavy-duty industrial boiler system with 500L capacity. Designed for factories, hospitals, and large commercial facilities. Multiple fuel options available.',
  '閲嶅瀷宸ヤ笟閿呯倝绯荤粺锛?00鍗囧閲忋€備负宸ュ巶銆佸尰闄㈠拰澶у瀷鍟嗕笟璁炬柦璁捐銆傚彲閫夊绉嶇噧鏂欑被鍨嬨€?,
  4999.00,
  (SELECT id FROM categories WHERE slug = 'boiler'),
  '{"capacity": "500L", "type": "Boiler", "energy_rating": "A", "warranty": "2 Years", "fuel_type": "Gas/Oil/Electric", "power": "15000W", "pressure": "8 bar", "efficiency": "92%"}',
  ARRAY['/images/products/general_materials/gas-boiler.jpg'],
  10,
  'low_stock',
  false
WHERE EXISTS (SELECT 1 FROM categories WHERE slug = 'boiler')
  AND NOT EXISTS (SELECT 1 FROM products WHERE slug = 'industrial-boiler-500l');

INSERT INTO products (slug, name_en, name_zh, description_en, description_zh, price, category_id, specifications, images, stock_quantity, stock_status, is_featured) 
SELECT 
  'commercial-condensing-boiler-300l',
  'Commercial Condensing Boiler 300L',
  '鍟嗙敤鍐峰嚌閿呯倝 300L',
  'High-efficiency commercial condensing boiler with 300L capacity. Features advanced condensing technology for maximum energy savings.',
  '楂樻晥鍟嗙敤鍐峰嚌閿呯倝锛?00鍗囧閲忋€傞噰鐢ㄥ厛杩涘喎鍑濇妧鏈紝瀹炵幇鏈€澶ц妭鑳芥晥鏋溿€?,
  2999.00,
  (SELECT id FROM categories WHERE slug = 'boiler'),
  '{"capacity": "300L", "type": "Boiler", "energy_rating": "A+", "warranty": "3 Years", "fuel_type": "Gas", "power": "8000W", "efficiency": "98%", "condensing": true}',
  ARRAY['/images/products/general_materials/gas-boiler.jpg'],
  15,
  'in_stock',
  false
WHERE EXISTS (SELECT 1 FROM categories WHERE slug = 'boiler')
  AND NOT EXISTS (SELECT 1 FROM products WHERE slug = 'commercial-condensing-boiler-300l');

-- =====================================================
-- 3. 鎻掑叆鏂囩珷/妗堜緥鏁版嵁 (articles)
-- =====================================================

INSERT INTO articles (slug, title_en, title_zh, content_en, content_zh, summary_en, summary_zh, type, is_published, featured) VALUES
('energy-saving-tips-gas-heater', 
 '5 Energy-Saving Tips for Your Gas Water Heater', 
 '鐕冩皵鐑按鍣ㄨ妭鑳芥妧宸op 5',
 'Learn how to maximize the efficiency of your gas water heater and reduce energy costs...',
 '浜嗚В濡備綍鏈€澶у寲鐕冩皵鐑按鍣ㄧ殑鏁堢巼骞堕檷浣庤兘婧愭垚鏈?..',
 'Practical tips to reduce your gas bill while maintaining optimal hot water supply.',
 '瀹炵敤鐨勬妧宸э紝鍦ㄤ繚鎸佹渶浣崇儹姘翠緵搴旂殑鍚屾椂闄嶄綆鐕冩皵璐圭敤銆?,
 'news', true, true),
 
('solar-water-heater-installation-guide',
 'Complete Guide to Solar Water Heater Installation',
 '澶槼鑳界儹姘村櫒瀹夎瀹屾暣鎸囧崡',
 'A comprehensive guide covering site assessment, installation steps, and maintenance tips...',
 '娑电洊鐜板満璇勪及銆佸畨瑁呮楠ゅ拰缁存姢鎶€宸х殑瀹屾暣鎸囧崡...',
 'Everything you need to know before installing a solar water heating system.',
 '瀹夎澶槼鑳界儹姘寸郴缁熷墠闇€瑕佷簡瑙ｇ殑涓€鍒囥€?,
 'news', true, false),

('hotel-case-study-dubai',
 'How We Helped a 5-Star Hotel Reduce Energy Costs by 40%',
 '鎴戜滑濡備綍甯姪涓€瀹朵簲鏄熺骇閰掑簵闄嶄綆40%鐨勮兘婧愭垚鏈?,
 'A detailed case study of implementing commercial heat pump solutions in a luxury hotel...',
 '鍦ㄨ豹鍗庨厭搴楀疄鏂藉晢鐢ㄧ儹娉佃В鍐虫柟妗堢殑璇︾粏妗堜緥鐮旂┒...',
 'Discover how HeatTech solutions transformed this Dubai hotel energy consumption.',
 '浜嗚ВHeatTech瑙ｅ喅鏂规濡備綍鏀瑰彉浜嗚繖瀹惰开鎷滈厭搴楃殑鑳芥簮娑堣€椼€?,
 'case_study', true, true),

('residential-case-study-singapore',
 'Modern Villa in Singapore Achieves Net-Zero Energy',
 '鏂板姞鍧＄幇浠ｅ埆澧呭疄鐜板噣闆惰兘鑰?,
 'How a high-end residential project achieved net-zero energy using our integrated solar and heat pump system...',
 '楂樼浣忓畢椤圭洰濡備綍鍒╃敤鎴戜滑鐨勭患鍚堝お闃宠兘鍜岀儹娉电郴缁熷疄鐜板噣闆惰兘鑰?..',
 'A breakthrough in residential energy efficiency for tropical climates.',
 '鐑甫姘斿€欎綇瀹呰兘婧愭晥鐜囩殑绐佺牬銆?,
 'case_study', true, false),

('faq-maintenance',
 'Frequently Asked Questions: Water Heater Maintenance',
 '甯歌闂瑙ｇ瓟锛氱儹姘村櫒缁存姢',
 'Answers to common questions about maintaining your water heater, including seasonal maintenance tips...',
 '鍏充簬缁存姢鐑按鍣ㄧ殑甯歌闂瑙ｇ瓟锛屽寘鎷鑺傛€х淮鎶ゆ妧宸?..',
 'Everything you need to know about keeping your water heater running efficiently.',
 '淇濇寔鐑按鍣ㄩ珮鏁堣繍琛屾墍闇€浜嗚В鐨勪竴鍒囥€?,
 'faq', true, false)
ON CONFLICT (slug) DO NOTHING;


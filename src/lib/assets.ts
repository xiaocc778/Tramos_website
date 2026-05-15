export const imageAssets = {
  company: {
    reception: '/images/Company_qualifications/Company receptionist.jpg',
    introduction: '/images/Company_qualifications/1.jpg',
    qualificationA: '/images/Company_qualifications/17.jpg',
    qualificationB: '/images/Company_qualifications/18.jpg',
  },
  lifestyle: {
    factoryProduction: '/images/lifestyle/factory-production.jpg',
    factoryMachinery: '/images/lifestyle/factory-machinery.jpg',
    kitchen: '/images/lifestyle/modern-kitchen.jpg',
    shower: '/images/lifestyle/modern-walkin-shower.jpg',
    hotel: '/images/lifestyle/hotel-lobby.jpg',
    office: '/images/lifestyle/office-building.jpg',
  },
  productGeneral: {
    wallHeater: '/images/products/general_materials/wall-water-heater.jpg',
    sinkHeater: '/images/products/general_materials/water-heater-sink.jpg',
    solarHeater: '/images/products/general_materials/solar-water-heater.jpg',
    solarRoof: '/images/products/general_materials/solar-house-roof.jpg',
    solarPanel: '/images/products/general_materials/solar-panel-rooftop.jpg',
    gasBoiler: '/images/products/general_materials/gas-boiler.jpg',
    industrialBoiler: '/images/products/general_materials/industrial-boiler-closeup.jpg',
  },
  productModels: {
    compactHorizontal: [
      '/images/products/New_model_product/no.1/微信图片_20260515153010_425_34.jpg',
      '/images/products/New_model_product/no.1/微信图片_20260515153011_427_34.jpg',
      '/images/products/New_model_product/no.1/微信图片_20260515153012_428_34.jpg',
      '/images/products/New_model_product/no.1/微信图片_20260515153015_431_34.jpg',
    ],
    digitalWall: [
      '/images/products/New_model_product/no.2/微信图片_20260515153032_432_34.jpg',
      '/images/products/New_model_product/no.2/微信图片_20260515153041_436_34.jpg',
      '/images/products/New_model_product/no.2/微信图片_20260515153043_438_34.jpg',
    ],
    cylinderSeries: [
      '/images/products/New_model_product/no.3/微信图片_20260515153034_433_34.jpg',
      '/images/products/New_model_product/no.3/微信图片_20260515153040_435_34.jpg',
      '/images/products/New_model_product/no.3/微信图片_20260515153105_441_34.jpg',
    ],
    premiumSeries: [
      '/images/products/New_model_product/no.4/微信图片_20260515153106_442_34.jpg',
      '/images/products/New_model_product/no.4/微信图片_20260515153108_444_34.jpg',
      '/images/products/New_model_product/no.4/微信图片_20260515153111_447_34.jpg',
    ],
  },
  technicalProof: {
    heatingRod: '/images/products/negative_materials/微信图片_20260515153011_426_34.jpg',
    sealedTank: '/images/products/negative_materials/微信图片_20260515153013_429_34.jpg',
    insulationLayer: '/images/products/negative_materials/微信图片_20260515153014_430_34.jpg',
  },
  placeholder: '/images/placeholder.svg',
} as const;

export const featuredModelAssets = [
  {
    key: 'compact-horizontal',
    title: 'Compact Horizontal Series',
    titleZh: '卧式速热系列',
    image: imageAssets.productModels.compactHorizontal[0],
    gallery: imageAssets.productModels.compactHorizontal,
    capacity: '60L',
  },
  {
    key: 'digital-wall',
    title: 'Digital Wall-Mounted Series',
    titleZh: '智能壁挂系列',
    image: imageAssets.productModels.digitalWall[0],
    gallery: imageAssets.productModels.digitalWall,
    capacity: '6-8L/min',
  },
  {
    key: 'cylinder',
    title: 'Vertical Storage Series',
    titleZh: '立式储水系列',
    image: imageAssets.productModels.cylinderSeries[0],
    gallery: imageAssets.productModels.cylinderSeries,
    capacity: '80-120L',
  },
  {
    key: 'premium',
    title: 'Premium Safety Series',
    titleZh: '高端安全系列',
    image: imageAssets.productModels.premiumSeries[0],
    gallery: imageAssets.productModels.premiumSeries,
    capacity: 'Custom',
  },
] as const;

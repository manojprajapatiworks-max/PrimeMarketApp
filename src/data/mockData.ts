import { Category, Product, ServiceItem, GovtServiceItem, JobItem, Seller, UserProfile, Address, Order } from '../types';

export const INITIAL_USER: UserProfile = {
  id: 'usr_7721',
  fullName: 'राम प्रकाश वर्मा (Ram Prakash Verma)',
  mobile: '9839120485',
  email: 'ramprakash.v@gmail.com',
  village: 'मलिहाबाद (Malihabad)',
  block: 'मलिहाबाद',
  district: 'लखनऊ (Lucknow)',
  state: 'उत्तर प्रदेश (Uttar Pradesh)',
  walletBalance: 450,
  aadhaarVerified: true,
  addresses: [
    {
      id: 'addr_101',
      fullName: 'राम प्रकाश वर्मा',
      mobile: '9839120485',
      house: 'मकान नं. 45, निकट प्राथमिक विद्यालय',
      village: 'मलिहाबाद',
      post: 'मलिहाबाद',
      block: 'मलिहाबाद',
      district: 'लखनऊ',
      pinCode: '226102',
      isDefault: true
    },
    {
      id: 'addr_102',
      fullName: 'राम प्रकाश वर्मा (खेत का पता)',
      mobile: '9839120485',
      house: 'खसरा नं. 112, ट्यूबवेल के पास',
      village: 'रहीमाबाद',
      post: 'रहीमाबाद',
      block: 'मलिहाबाद',
      district: 'लखनऊ',
      pinCode: '226103',
      isDefault: false
    }
  ]
};

export const MOCK_CATEGORIES: Category[] = [
  {
    id: 'cat_grocery',
    name: 'Grocery & Ration',
    nameHi: 'किराना एवं राशन',
    icon: 'ShoppingBag',
    image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=500&auto=format&fit=crop&q=80',
    itemCount: 1420,
    subcategories: ['आटा, दाल व चावल', 'सरसों तेल व मसाले', 'डेयरी व दूध उत्पाद', 'चाय व चीनी']
  },
  {
    id: 'cat_agriculture',
    name: 'Agriculture & Farming',
    nameHi: 'कृषि एवं खाद-बीज',
    icon: 'Sprout',
    image: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=500&auto=format&fit=crop&q=80',
    itemCount: 890,
    subcategories: ['प्रमाणित बीज (Seeds)', 'जैविक खाद व यूरिया', 'कीटनाशक (Pesticides)', 'सोलर पंप व औजार', 'ट्रैक्टर किराया (Tractor)']
  },
  {
    id: 'cat_electronics',
    name: 'Electronics & Solar',
    nameHi: 'इलेक्ट्रॉनिक्स व सोलर',
    icon: 'Smartphone',
    image: 'https://images.unsplash.com/photo-1550009158-9ebf69173e03?w=500&auto=format&fit=crop&q=80',
    itemCount: 640,
    subcategories: ['स्मार्टफोन व कीपैड फोन', 'सोलर लाइट व पैनल', 'पंखा व कूलर', 'एलईडी बल्ब व तार']
  },
  {
    id: 'cat_services',
    name: 'Local Services',
    nameHi: 'स्थानीय कारीगर व सेवाएं',
    icon: 'Wrench',
    image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=500&auto=format&fit=crop&q=80',
    itemCount: 320,
    subcategories: ['बिजली मिस्त्री', 'प्लंबर व बोरिंग', 'डॉक्टर परामर्श', 'मोटर मिस्त्री', 'ब्यूटी व सैलून']
  },
  {
    id: 'cat_csc',
    name: 'Government Services (CSC)',
    nameHi: 'सरकारी सेवाएं व सीएससी',
    icon: 'Landmark',
    image: 'https://images.unsplash.com/photo-1577495508048-b635879837f1?w=500&auto=format&fit=crop&q=80',
    itemCount: 45,
    subcategories: ['पीएम किसान सम्मान निधि', 'खतौनी / भूलेख', 'आधार व पैन कार्ड', 'आयुष्मान भारत कार्ड', 'राशन कार्ड']
  },
  {
    id: 'cat_fashion',
    name: 'Clothing & Footwear',
    nameHi: 'कपड़े एवं जूते-चप्पल',
    icon: 'Shirt',
    image: 'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=500&auto=format&fit=crop&q=80',
    itemCount: 510,
    subcategories: ['कुर्ता-पायजामा व साड़ी', 'बच्चों के कपड़े', 'चप्पल व मोजे']
  },
  {
    id: 'cat_jobs',
    name: 'Jobs & Daily Wage Work',
    nameHi: 'रोजगार व मजदूरी',
    icon: 'Briefcase',
    image: 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=500&auto=format&fit=crop&q=80',
    itemCount: 180,
    subcategories: ['दैनिक मजदूरी', 'ड्राइवर व ऑपरेटर', 'दुकानदार सहायक']
  }
];

export const MOCK_SELLERS: Seller[] = [
  {
    id: 'sel_101',
    shopName: 'किसान बीज एवं खाद भंडार',
    ownerName: 'महेश चंद्र गुप्ता',
    gst: '09AABCK1234F1Z5',
    pan: 'AABCK1234F',
    district: 'लखनऊ',
    village: 'मलिहाबाद',
    rating: 4.8,
    totalOrders: 1420,
    revenue: 485000,
    walletBalance: 12450,
    commissionRate: 2.5
  },
  {
    id: 'sel_102',
    shopName: 'अवध किराना सुपरस्टोर',
    ownerName: 'सुरेश कुमार यादव',
    gst: '09BCDFG5678H1Z2',
    pan: 'BCDFG5678H',
    district: 'लखनऊ',
    village: 'रहीमाबाद',
    rating: 4.7,
    totalOrders: 2890,
    revenue: 890000,
    walletBalance: 24100,
    commissionRate: 2.0
  },
  {
    id: 'sel_103',
    shopName: 'सूर्योदय सोलर एवं इलेक्ट्रॉनिक्स',
    ownerName: 'राजेश पटेल',
    gst: '09CDEFG9012I1Z9',
    pan: 'CDEFG9012I',
    district: 'गोरखपुर',
    village: 'सहानपुर',
    rating: 4.9,
    totalOrders: 640,
    revenue: 1250000,
    walletBalance: 45000,
    commissionRate: 3.0
  }
];

export const MOCK_PRODUCTS: Product[] = [
  {
    id: 'prod_1',
    sellerId: 'sel_101',
    sellerName: 'किसान बीज एवं खाद भंडार',
    sellerRating: 4.8,
    brand: 'Nandi Seeds',
    name: 'Nandi Hybrid Wheat Seeds HD-3086 (20 Kg)',
    nameHi: 'नंदी हाइब्रिड गेहूं बीज HD-3086 (20 किग्रा)',
    category: 'cat_agriculture',
    subCategory: 'प्रमाणित बीज (Seeds)',
    price: 980,
    mrp: 1250,
    unit: '20 Kg Bag',
    inStock: true,
    stockCount: 140,
    rating: 4.9,
    reviewCount: 312,
    images: [
      'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=600&auto=format&fit=crop&q=80'
    ],
    description: 'Government certified high yield HD-3086 wheat seeds with high disease tolerance for UP soil conditions.',
    descriptionHi: 'यूपी की मिट्टी और मौसम के अनुकूल, उच्च पैदावार वाला सरकारी प्रमाणित HD-3086 गेहूं बीज। रोगों से लड़ने की उच्च क्षमता।',
    hsnCode: '10019910',
    gstRate: 0,
    village: 'मलिहाबाद',
    district: 'लखनऊ',
    isFeatured: true,
    isOrganic: false,
    badge: 'Best Seller'
  },
  {
    id: 'prod_2',
    sellerId: 'sel_101',
    sellerName: 'किसान बीज एवं खाद भंडार',
    sellerRating: 4.8,
    brand: 'IFFCO',
    name: 'IFFCO Nano Urea Liquid (500 ml)',
    nameHi: 'इफको नैनो यूरिया लिक्विड (500 मिली)',
    category: 'cat_agriculture',
    subCategory: 'जैविक खाद व यूरिया',
    price: 240,
    mrp: 275,
    unit: '500 ml Bottle',
    inStock: true,
    stockCount: 220,
    rating: 4.8,
    reviewCount: 520,
    images: [
      'https://images.unsplash.com/photo-1628352081506-83c43123ed6d?w=600&auto=format&fit=crop&q=80'
    ],
    description: 'Equivalent to 1 bag of traditional granular urea. Increases crop yield and reduces groundwater pollution.',
    descriptionHi: '1 बोरी पारंपरिक यूरिया के बराबर असरदार। फसलों की हरियाली और वृद्धि के लिए सर्वोत्तम नैनो तकनीक।',
    hsnCode: '31021000',
    gstRate: 5,
    village: 'मलिहाबाद',
    district: 'लखनऊ',
    isFeatured: true,
    isOrganic: true,
    badge: 'IFFCO Original'
  },
  {
    id: 'prod_3',
    sellerId: 'sel_102',
    sellerName: 'अवध किराना सुपरस्टोर',
    sellerRating: 4.7,
    brand: 'Fortune',
    name: 'Fortune Kachi Ghani Pure Mustard Oil (5 Liter Can)',
    nameHi: 'फॉर्च्यून कच्ची घानी शुद्ध सरसों तेल (5 लीटर केन)',
    category: 'cat_grocery',
    subCategory: 'सरसों तेल व मसाले',
    price: 740,
    mrp: 850,
    unit: '5 Liter Can',
    inStock: true,
    stockCount: 85,
    rating: 4.7,
    reviewCount: 189,
    images: [
      'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=600&auto=format&fit=crop&q=80'
    ],
    description: '100% pure cold pressed mustard oil rich in Omega 3 and Omega 6 fatty acids.',
    descriptionHi: '100% शुद्ध कच्ची घानी सरसों का तेल। प्राकृतिक खुशबू और स्वाद के साथ ओमेगा-3 से भरपूर।',
    hsnCode: '15149110',
    gstRate: 5,
    village: 'रहीमाबाद',
    district: 'लखनऊ',
    isFeatured: true,
    badge: 'Fresh Stock'
  },
  {
    id: 'prod_4',
    sellerId: 'sel_102',
    sellerName: 'अवध किराना सुपरस्टोर',
    sellerRating: 4.7,
    brand: 'Aashirvaad',
    name: 'Aashirvaad Shuddh Chakki Atta (10 Kg Bag)',
    nameHi: 'आशीर्वाद शुद्ध चक्की आटा (10 किग्रा बैग)',
    category: 'cat_grocery',
    subCategory: 'आटा, दाल व चावल',
    price: 410,
    mrp: 460,
    unit: '10 Kg Bag',
    inStock: true,
    stockCount: 110,
    rating: 4.8,
    reviewCount: 410,
    images: [
      'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=600&auto=format&fit=crop&q=80'
    ],
    description: '100% MP Sharbati wheat grains chakki fresh whole wheat flour.',
    descriptionHi: '100% एमपी शरबती गेहूं से बना शुद्ध चक्की आटा। नरम और फूली रोटियों के लिए।',
    hsnCode: '11010000',
    gstRate: 5,
    village: 'रहीमाबाद',
    district: 'लखनऊ',
    isFeatured: false,
    badge: 'Chakki Fresh'
  },
  {
    id: 'prod_5',
    sellerId: 'sel_103',
    sellerName: 'सूर्योदय सोलर एवं इलेक्ट्रॉनिक्स',
    sellerRating: 4.9,
    brand: 'Exide Solar',
    name: 'Exide 150Ah Solar Tubular Battery + 100W Panel Kit',
    nameHi: 'एक्साइड 150Ah सोलर ट्यूबुलर बैटरी + 100W पैनल किट',
    category: 'cat_electronics',
    subCategory: 'सोलर लाइट व पैनल',
    price: 14200,
    mrp: 18000,
    unit: 'Complete Set',
    inStock: true,
    stockCount: 18,
    rating: 4.9,
    reviewCount: 94,
    images: [
      'https://images.unsplash.com/photo-1508873696983-2df515122519?w=600&auto=format&fit=crop&q=80'
    ],
    description: 'Heavy duty long backup solar power storage system with 5 years manufacturer warranty.',
    descriptionHi: 'गांवों में बिजली कटौती का स्थायी समाधान। 5 साल की फुल वारंटी के साथ भारी क्षमता वाली सोलर बैटरी और पैनल।',
    hsnCode: '85072000',
    gstRate: 12,
    village: 'सहानपुर',
    district: 'गोरखपुर',
    isFeatured: true,
    badge: '5 Yrs Warranty'
  },
  {
    id: 'prod_6',
    sellerId: 'sel_103',
    sellerName: 'सूर्योदय सोलर एवं इलेक्ट्रॉनिक्स',
    sellerRating: 4.9,
    brand: 'Luminous',
    name: 'Luminous Solar Rechargeable Emergency LED Fan',
    nameHi: 'लुमिनस सोलर रीचार्जबल इमरजेंसी एलईडी फैन',
    category: 'cat_electronics',
    subCategory: 'पंखा व कूलर',
    price: 2490,
    mrp: 3200,
    unit: '1 Unit',
    inStock: true,
    stockCount: 45,
    rating: 4.7,
    reviewCount: 132,
    images: [
      'https://images.unsplash.com/photo-1585338107529-13afc5f02586?w=600&auto=format&fit=crop&q=80'
    ],
    description: 'Operates up to 8 hours on a single battery charge or direct solar plug.',
    descriptionHi: 'एक बार चार्ज करने पर 8 घंटे तक ठंडी हवा। सोलर लाइट व मोबाइल चार्जिंग पोर्ट के साथ।',
    hsnCode: '84145190',
    gstRate: 18,
    village: 'सहानपुर',
    district: 'गोरखपुर',
    isFeatured: false
  },
  {
    id: 'prod_7',
    sellerId: 'sel_101',
    sellerName: 'किसान बीज एवं खाद भंडार',
    sellerRating: 4.8,
    brand: 'Mahindra Rental',
    name: 'Mahindra 575 DI Tractor Hourly Rental Service',
    nameHi: 'महिंद्रा 575 डीआई ट्रैक्टर जुताई किराया प्रति घंटा',
    category: 'cat_agriculture',
    subCategory: 'ट्रैक्टर किराया (Tractor)',
    price: 600,
    mrp: 700,
    unit: 'Per Hour',
    inStock: true,
    stockCount: 5,
    rating: 4.9,
    reviewCount: 210,
    images: [
      'https://images.unsplash.com/photo-1527847263472-aa5338d178b8?w=600&auto=format&fit=crop&q=80'
    ],
    description: 'Book Mahindra 45HP Tractor with Driver & Rotavator for farm tilling at your field.',
    descriptionHi: 'ड्राइवर और रोटावेटर के साथ महिंद्रा 45 एचपी ट्रैक्टर की बुकिंग। आपके खेत पर तुरंत डिलीवरी।',
    hsnCode: '87019100',
    gstRate: 12,
    village: 'मलिहाबाद',
    district: 'लखनऊ',
    isFeatured: true,
    badge: 'Fast Booking'
  }
];

export const MOCK_SERVICES: ServiceItem[] = [
  {
    id: 'srv_1',
    providerId: 'prv_101',
    providerName: 'धर्मेन्द्र कुशवाहा (Dharmendra)',
    providerPhoto: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&auto=format&fit=crop&q=80',
    title: 'Master Electrician & Motor Rewinding',
    titleHi: 'मास्टर बिजली मिस्त्री व मोटर रिपेयरिंग',
    category: 'बिजली मिस्त्री',
    price: 250,
    rating: 4.9,
    experienceYears: 11,
    district: 'लखनऊ',
    block: 'मलिहाबाद',
    availableSlots: ['आज सुबह 10:00', 'आज दोपहर 02:00', 'कल सुबह 09:00'],
    mobile: '9792019481',
    verified: true
  },
  {
    id: 'srv_2',
    providerId: 'prv_102',
    providerName: 'डॉ. आनंद शुक्ला (BAMS)',
    providerPhoto: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=300&auto=format&fit=crop&q=80',
    title: 'Tele-Consultation & Home Doctor Visit',
    titleHi: 'डॉक्टर परामर्श व घरेलू स्वास्थ्य जांच',
    category: 'डॉक्टर परामर्श',
    price: 200,
    rating: 4.8,
    experienceYears: 14,
    district: 'लखनऊ',
    block: 'मलिहाबाद',
    availableSlots: ['आज शाम 05:00', 'कल सुबह 11:00'],
    mobile: '9415029311',
    verified: true
  },
  {
    id: 'srv_3',
    providerId: 'prv_103',
    providerName: 'राम लखन विश्वकर्मा',
    providerPhoto: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&auto=format&fit=crop&q=80',
    title: 'Tube-well Pump Plumber & Fitting',
    titleHi: 'ट्यूबवेल पंप व नल प्लंबर फिटिंग',
    category: 'प्लंबर व बोरिंग',
    price: 300,
    rating: 4.7,
    experienceYears: 8,
    district: 'लखनऊ',
    block: 'रहीमाबाद',
    availableSlots: ['आज दोपहर 12:00', 'कल सुबह 10:00'],
    mobile: '9838012932',
    verified: true
  }
];

export const MOCK_GOVT_SERVICES: GovtServiceItem[] = [
  {
    id: 'csc_1',
    title: 'PM Kisan Samman Nidhi Status & E-KYC',
    titleHi: 'पीएम किसान सम्मान निधि स्थिति व ई-केवाईसी',
    dept: 'Ministry of Agriculture',
    deptHi: 'कृषि मंत्रालय भारत सरकार',
    fee: 30,
    docRequired: ['आधार कार्ड (Aadhaar)', 'बैंक पासबुक (Bank Passbook)', 'मोबाइल नंबर'],
    icon: 'Landmark',
    urlLabel: 'सीएससी डिजिटल सेवा केंद्र'
  },
  {
    id: 'csc_2',
    title: 'UP Bhulekh Land Records (Khatauni)',
    titleHi: 'यूपी भूलेख खतौनी / खेत का नक्शा',
    dept: 'Revenue Department UP',
    deptHi: 'राजस्व विभाग उत्तर प्रदेश',
    fee: 20,
    docRequired: ['गाटा संख्या / खाता संख्या', 'खातेदार का नाम'],
    icon: 'FileText'
  },
  {
    id: 'csc_3',
    title: 'Ayushman Bharat Card Generation',
    titleHi: 'आयुष्मान भारत 5 लाख स्वास्थ्य कार्ड',
    dept: 'National Health Authority',
    deptHi: 'राष्ट्रीय स्वास्थ्य प्राधिकरण',
    fee: 0,
    docRequired: ['राशन कार्ड या पीएम पत्र', 'आधार कार्ड'],
    icon: 'HeartPulse'
  },
  {
    id: 'csc_4',
    title: 'Aadhaar Card Address Update & Mobile Link',
    titleHi: 'आधार कार्ड पता सुधार व मोबाइल लिंक',
    dept: 'UIDAI',
    deptHi: 'भारतीय विशिष्ट पहचान प्राधिकरण',
    fee: 50,
    docRequired: ['मूल आधार कार्ड', 'निवास प्रमाण पत्र / प्रधान सत्यापन'],
    icon: 'ShieldCheck'
  }
];

export const MOCK_JOBS: JobItem[] = [
  {
    id: 'job_1',
    title: 'E-commerce Delivery Rider (Bike / E-rickshaw)',
    titleHi: 'प्राइममार्केट डिलीवरी राइडर (बाइक या ई-रिक्शा)',
    company: 'PrimeMarket Logistics Malihabad Hub',
    type: 'full_time',
    salary: '₹14,000 - ₹18,000 / महीना',
    village: 'मलिहाबाद',
    district: 'लखनऊ',
    contact: '9839001122',
    openings: 8
  },
  {
    id: 'job_2',
    title: 'Mango Orchard Caretaker & Harvesting Worker',
    titleHi: 'आम बागान देखभाल व फल तुड़ाई मजदूर',
    company: 'Malihabad Organic Mango Farms',
    type: 'daily_wage',
    salary: '₹550 / प्रति दिन + चाय नाश्ता',
    village: 'रहीमाबाद',
    district: 'लखनऊ',
    contact: '9415011999',
    openings: 15
  }
];

export const INITIAL_ORDERS: Order[] = [
  {
    id: 'ord_9012',
    orderNumber: 'PM-UP-2026-9012',
    createdAt: '2026-07-23T11:20:00.000Z',
    items: [
      {
        product: MOCK_PRODUCTS[0],
        quantity: 1
      },
      {
        product: MOCK_PRODUCTS[1],
        quantity: 2
      }
    ],
    totalAmount: 1460,
    discountAmount: 100,
    deliveryFee: 0,
    taxAmount: 24,
    finalAmount: 1384,
    paymentMethod: 'upi',
    paymentStatus: 'success',
    transactionId: 'TXN_UPI_9812401923',
    address: INITIAL_USER.addresses[0],
    trackingStage: 'out_for_delivery',
    rider: {
      id: 'rdr_501',
      name: 'सतीश यादव (Satish Yadav)',
      phone: '9839912044',
      photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80',
      vehicleNo: 'UP 32 ER 8920',
      vehicleType: 'TVS Heavy Duty XL100',
      rating: 4.9,
      totalDeliveries: 840
    },
    deliveryOtp: '4829',
    estimatedDeliveryMinutes: 12,
    riderProgressPercentage: 68,
    couponApplied: 'KISAN100',
    invoiceNumber: 'INV-2026-9012'
  }
];

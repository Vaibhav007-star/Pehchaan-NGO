import { KOMAL_PHOTO_BASE64, NEELESH_PHOTO_BASE64, ROHIT_PHOTO_BASE64, PUSHPENDRA_PHOTO_BASE64 } from './assetsBase64';
// Scraped and structured data from Pehchaan NGO official records
export const NGO_INFO = {
  name: "Pehchaan NGO",
  societyName: "Pehchaan Welfare Society (Pehchaan NGO)",
  tagline: "The Power Of Re-Use...",
  subTagline: "Education, Malnutrition Relief & Circular Welfare for All",
  registrationNumber: "1122/6164M (Renewed: R/GHA/17643/2020-2021)",
  nitiAayogDarpanId: "UP/2017/0153557",
  establishedDate: "28th January 2016",
  registeredUnder: "Societies Registration Act XXI of 1860",
  taxExemption80G: "CIT(E)/80G/2020-21/GHA-10492",
  taxExemption12A: "CIT(E)/12A/2020-21/GHA-08914",
  founderDirector: "Dr. Neelesh Singh",
  director: "Mr Ved Prakash Singh",
  treasurer: "Mr Neelesh Singh (Treasurer & MSW)",
  phone: "+91 9457320905",
  email: "itc.singha@gmail.com",
  officialEmail: "ngo.pehchaan@gmail.com",
  noidaContact: "Mr. Pawan Sharma",
  headOffice: "BH 1/85 KA Block Sector-12, Pratap Vihar, Ghaziabad, UP-201009",
  noidaOffice: "E-251, E-118, Aditi General Store / Pawan Store, Sector 22, Noida, Uttar Pradesh",
  collectionCenter: "274/6, Charan Singh Colony, L Block, Sector 12, Pratap Vihar, Ghaziabad, UP - 201009",
  operatingHours: "Sundays & Weekdays: 10:00 AM - 5:00 PM",
  inspiration: "Inspired by the vision of Dr. A.P.J. Abdul Kalam to empower youth and transform lives through knowledge, dignity, and shared humanity.",
  stats: {
    internsTrained: "1,500+",
    childrenRescued: "1,800+",
    clothesDonated: "45,000+",
    slumCenters: "12+",
    activeVolunteers: "350+"
  }
};

export const PROJECTS = [
  {
    id: "gyan-jyoti",
    title: "Gyan Jyoti Street School & Education",
    tag: "Education & Literacy",
    summary: "Free street education, awareness of fundamental constitutional rights, and vocational skills for beggar and slum youth in Noida & Ghaziabad.",
    description: "Pehchaan NGO runs the Gyan Jyoti program across Ghaziabad and Noida slum settlements. We provide free quality education, stationary, bags, and awareness about fundamental rights and personal health. Beyond basic literacy, we provide vocational courses for slum teenagers to impart practical digital and technical skills that make them financially self-sufficient.",
    impact: "Over 800+ street children enrolled; dozens transitioned into mainstream government schools.",
    image: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=800&q=80",
    color: "from-blue-600 to-indigo-700"
  },
  {
    id: "ankur",
    title: "Project Ankur (Child Malnutrition Relief)",
    tag: "Health & Nutrition",
    summary: "Targeted pediatric medical camps, free essential medicines, and nutrition supplements for severely malnourished children in slum colonies and rural pockets.",
    description: "Initiated on April 1, 2017, Project Ankur has successfully rescued over 1,800 malnourished children. In partnership with community health centers like Mahewa Etawah and local medical teams (headed by Superintendent Dr. Yatendra Rajput), we conduct regular bi-weekly camps providing multi-vitamins, iron supplements, and pediatric nutrition kits.",
    impact: "1,800+ children rescued from severe acute malnutrition; comprehensive 2020-2024 Malnutrition surveys conducted in Bhood Bharat Chand Wari, Sarvoday Nagar, and Sector 12 Ghaziabad.",
    image: "https://images.unsplash.com/photo-1542810634-71277d95dcbb?auto=format&fit=crop&w=800&q=80",
    color: "from-emerald-600 to-teal-700"
  },
  {
    id: "power-of-re-use",
    title: "The Power of Re-Use (Cloth & In-Kind Drive)",
    tag: "Circular Welfare",
    summary: "Year-round collection and sanitization of wearable summer/winter clothes, blankets, books, and household goods for flood victims, daily wagers, and street children.",
    description: "Every year during severe winters and scorching summers, millions of homeless individuals suffer due to inadequate clothing. Pehchaan NGO operates a continuous collection and redistribution drive across Ghaziabad, Bundelkhand, Chambal Sanctuary, railway track settlements, and construction site camps.",
    impact: "45,000+ items redistributed across 30+ underprivileged colonies and disaster-affected zones.",
    image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=800&q=80",
    color: "from-amber-600 to-orange-700"
  },
  {
    id: "women-empowerment",
    title: "Nari Shakti (Women Empowerment)",
    tag: "Livelihood & Rights",
    summary: "Skill training, stitching workshops, self-help groups, and menstrual hygiene awareness drives for women in informal urban settlements.",
    description: "Empowering mothers and young women through tailor training, sanitary hygiene kit distributions, financial literacy classes, and awareness of government schemes.",
    impact: "300+ women equipped with self-employment vocational skills and micro-livelihoods.",
    image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=800&q=80",
    color: "from-rose-600 to-pink-700"
  }
];

export const CROWDFUNDING_CAMPAIGNS = [
  {
    id: "camp-gyan-jyoti",
    title: "Sponsor a Street Child's Complete Education Kit",
    category: "Education",
    targetAmount: 250000,
    raisedAmount: 184500,
    donorsCount: 142,
    suggestedAmounts: [500, 1000, 2500, 5000],
    description: "Provide school bags, notebooks, stationery, uniform, and tutoring fees for 100 slum children attending our Gyan Jyoti street centers.",
    taxBenefit: "Eligible for 50% Tax Exemption under Section 80G",
    image: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "camp-malnutrition",
    title: "Project Ankur: Emergency Nutrition for 50 Malnourished Kids",
    category: "Child Health",
    targetAmount: 180000,
    raisedAmount: 132000,
    donorsCount: 98,
    suggestedAmounts: [750, 1500, 3000, 6000],
    description: "Supply high-protein therapeutic foods, pediatric vitamins, deworming syrups, and bi-weekly pediatric doctor consultations for infants in Ghaziabad slums.",
    taxBenefit: "Eligible for 50% Tax Exemption under Section 80G",
    image: "https://images.unsplash.com/photo-1542810634-71277d95dcbb?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "camp-winter-clothes",
    title: "Winter Warmth Drive: Blankets & Jackets for Daily Wagers",
    category: "Relief",
    targetAmount: 120000,
    raisedAmount: 94000,
    donorsCount: 115,
    suggestedAmounts: [400, 800, 2000, 4000],
    description: "Procure and distribute thermal jackets, woolen blankets, and sweaters to homeless families living under flyovers and construction sites.",
    taxBenefit: "Eligible for 50% Tax Exemption under Section 80G",
    image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=600&q=80"
  }
];

export const INITIAL_MEMBERS = [
  {
    id: "M1122PWS001",
    fullName: "KOMAL TIWARI",
    role: "Member",
    email: "itc.singha@gmail.com",
    phone: "+91 8081821480",
    location: "ALL India",
    center: "ALL India / Ghaziabad HQ",
    validTill: "31 March 2028",
    joinedDate: "2024-03-01",
    status: "Active",
    bloodGroup: "B+",
    skills: "Women Welfare, Community Mobilization, Coordination",
    emergencyContact: "+91 8081821480",
    certificateIssued: true,
    certificateId: "PWS/2024-25/1101",
    photoUrl: KOMAL_PHOTO_BASE64
  },
  {
    id: "M1122PWS002",
    fullName: "DR. NEELESH SINGH",
    role: "MSW & Treasurer",
    email: "itc.singha@gmail.com",
    phone: "+91 9457320905",
    location: "ALL India",
    center: "Ghaziabad Head Office & NCR",
    validTill: "31 March 2028",
    joinedDate: "2016-01-28",
    status: "Active",
    bloodGroup: "O+",
    skills: "Master of Social Work, Street School Leadership, Governance",
    emergencyContact: "+91 9457320905",
    certificateIssued: true,
    certificateId: "PWS/2024-25/1001",
    photoUrl: NEELESH_PHOTO_BASE64
  },
  {
    id: "M1122PWS003",
    fullName: "ROHIT AHIRWAL",
    role: "Volunteer",
    email: "N/A",
    phone: "+91 8305607155",
    location: "Noida And Ghaziabad",
    center: "Noida And Ghaziabad Centers",
    validTill: "31 March 2028",
    joinedDate: "2024-04-10",
    status: "Active",
    bloodGroup: "A+",
    skills: "Field Teaching, Cloth Redistribution, Street Engagement",
    emergencyContact: "+91 8305607155",
    certificateIssued: true,
    certificateId: "PWS/2024-25/1315",
    photoUrl: ROHIT_PHOTO_BASE64
  },
  {
    id: "M1122PWS004",
    fullName: "PUSHPENDRA",
    role: "Volunteer",
    email: "N/A",
    phone: "+91 6232023341",
    location: "Noida And Ghaziabad",
    center: "Noida And Ghaziabad Centers",
    validTill: "31 March 2028",
    joinedDate: "2024-05-15",
    status: "Active",
    bloodGroup: "O+",
    skills: "Logistics, Child Nutrition Drives, Gyan Jyoti Support",
    emergencyContact: "+91 6232023341",
    certificateIssued: true,
    certificateId: "PWS/2024-25/1316",
    photoUrl: PUSHPENDRA_PHOTO_BASE64
  },
  {
    id: "M1122PWS005",
    fullName: "SUSHMA SINGH",
    role: "Volunteer",
    email: "sushma.singh@gmail.com",
    phone: "+91 9457320905",
    location: "Ghaziabad",
    center: "Ghaziabad Sector 12 Center",
    validTill: "31 March 2028",
    joinedDate: "2024-10-01",
    status: "Active",
    bloodGroup: "AB+",
    skills: "Primary Education, Child Welfare, Community Upliftment",
    emergencyContact: "+91 9457320905",
    certificateIssued: true,
    certificateId: "PWS/2024-25/1310",
    photoUrl: KOMAL_PHOTO_BASE64
  }
];

export const INITIAL_DONATIONS = [
  {
    id: "DON-2024-8841",
    donorName: "Sunita Agarwal",
    donorEmail: "sunita.ag@example.com",
    donorPhone: "+91 9810123456",
    panNumber: "ABCPA1234F",
    amount: 5000,
    campaignId: "camp-gyan-jyoti",
    campaignTitle: "Sponsor a Street Child's Complete Education Kit",
    paymentMethod: "Razorpay (UPI / NetBanking)",
    transactionId: "pay_Nkl91k28Xqa01",
    receiptNumber: "80G-2024-0194",
    date: "2024-09-14",
    status: "Success",
    tax80GIssued: true
  },
  {
    id: "DON-2024-8842",
    donorName: "Rakesh Mehra",
    donorEmail: "rmehra@example.com",
    donorPhone: "+91 9920334455",
    panNumber: "BRKPM5678G",
    amount: 2500,
    campaignId: "camp-malnutrition",
    campaignTitle: "Project Ankur: Emergency Nutrition for Malnourished Kids",
    paymentMethod: "Razorpay (Credit Card)",
    transactionId: "pay_Nkl92k39Yqb02",
    receiptNumber: "80G-2024-0195",
    date: "2024-09-18",
    status: "Success",
    tax80GIssued: true
  }
];


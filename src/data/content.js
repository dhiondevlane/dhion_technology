export const company = {
  name: 'Dhion Technologies',
  tagline: 'Your Business. Your Workflow. Your Software.',
  udyam: 'UDYAM-MH-15-0280678',
  email: 'support@dhion.in',
  phone: '+91 7721888623 | +91 7057027171',
}

export const nav = [
  { label: 'Home', to: '/' },
  { label: 'About Us', to: '/about' },
  { label: 'Services', to: '/services' },
  {
    label: 'Solutions',
    to: '#',
    children: [
      { label: 'ParkingBay', to: '/parkingbay' },
      { label: 'Hotel Home Delivery', to: '/homedelivery' },
    ],
  },
  { label: 'Our Process', to: '/process' },
]

export const services = [
  {
    slug: 'custom-software',
    title: 'Custom Software Development',
    summary:
      'Software designed specifically around your business processes, users, roles, and operational requirements.',
    points: [
      'Business Management Systems',
      'Custom Web Applications',
      'Mobile Applications',
      'Admin Panels',
      'Dashboards',
      'Workflow Management',
      'Custom Business Platforms',
    ],
  },
  {
    slug: 'web-application-development',
    title: 'Web Application Development',
    summary:
      'Modern, responsive, and scalable web applications designed for businesses and organizations.',
    description:
      'We develop applications that are easy to use, secure, maintainable, and ready to scale as your business grows.',
    highlight: 'From simple business portals to complex multi-user platforms.',
  },
  {
    slug: 'mobile-application-development',
    title: 'Mobile Application Development',
    summary: 'Turn your business workflow into a powerful mobile experience.',
    description:
      'We build custom mobile applications for customers, employees, managers, delivery teams, field staff, and other business users.',
    highlight: 'Android • Cross-Platform • Business Applications',
  },
  {
    slug: 'business-management-systems',
    title: 'Business Management Systems',
    summary: 'Bring your business operations into one centralized platform.',
    points: [
      'Customer Management',
      'Staff Management',
      'Branch Management',
      'Order Management',
      'Inventory & Menu Management',
      'Billing & Payments',
      'Reports & Analytics',
      'Notifications',
      'Role-Based Access',
      'Multi-Branch Operations',
    ],
  },
  {
    slug: 'automation',
    title: 'Automation & Intelligent Solutions',
    summary: 'Reduce repetitive work and improve operational efficiency.',
    description:
      'We build software that can automate business processes, connect different systems, process data, generate insights, and reduce dependency on manual operations.',
    highlight: 'Less Manual Work. More Productivity.',
  },
  {
    slug: 'trading-technology',
    title: 'Trading Technology',
    summary: 'Technology solutions for modern trading workflows.',
    description:
      'We develop customized trading tools that can connect market-data APIs with dashboards, analytics, option-chain information, and decision-support workflows.',
    points: [
      'Live Market Data',
      'Option Chain',
      'CE / PE Analysis',
      'Trading Dashboards',
      'API Integrations',
      'Market Data Processing',
      'Custom Alerts',
      'Analytics & Decision Support',
    ],
    note: 'Technology for analysis and workflow — not financial advice.',
  },
  {
    slug: 'api-backend',
    title: 'API & Backend Development',
    summary: 'A strong application needs a reliable backend.',
    points: [
      'REST APIs',
      'Authentication & Authorization',
      'Database Architecture',
      'Third-Party Integrations',
      'Notifications',
      'Payment Integrations',
      'Real-Time Data',
      'Cloud-Ready Architecture',
    ],
  },
  {
    slug: 'cloud-deployment',
    title: 'Cloud & Deployment',
    summary: 'We help take applications from development to production.',
    points: [
      'Cloud Server Setup',
      'Application Deployment',
      'API Deployment',
      'Database Deployment',
      'Nginx Reverse Proxy',
      'SSL Configuration',
      'Domain Configuration',
      'Server Monitoring',
      'Scalable Architecture',
    ],
  },
]

export const solutions = [
  {
    slug: 'parkingbay',
    name: 'ParkingBay',
    tagline: 'Smart Parking Management Software',
    summary:
      'A customized parking management solution designed to bring parking operations into a centralized digital platform.',
    intro:
      'Managing parking operations manually can lead to unnecessary paperwork, delays, and difficulty tracking transactions. ParkingBay is a customized parking management solution designed to bring parking operations into a centralized digital platform.',
    description:
      'The system can be tailored around the requirements of parking operators, organizations, commercial properties, and other parking environments.',
    capabilities: [
      'Parking Management',
      'Vehicle Management',
      'Customer Records',
      'Digital Transactions',
      'Staff Management',
      'Parking Records',
      'Reports & Dashboards',
      'Customized Workflows',
    ],
  },
  {
    slug: 'tandoor-hotel',
    name: 'Tandoor Hotel',
    tagline: 'Complete Food Ordering & Delivery Management System',
    summary:
      'A customized digital ecosystem connecting customer ordering, kitchen operations, and delivery through multiple applications.',
    intro:
      'Running a hotel or restaurant involves much more than taking orders. Orders need to reach the kitchen, food needs to be prepared, delivery staff need to be assigned, customers need updates, payments need to be tracked, and managers need visibility over the entire operation.',
    description:
      'Tandoor Hotel is a customized digital ecosystem designed to connect these operations through multiple applications.',
    apps: [
      {
        name: 'Customer App',
        description:
          'A convenient platform for customers to browse food, place orders, manage addresses, track orders, receive notifications, and get support.',
      },
      {
        name: 'Manager App',
        description:
          'A centralized management system for monitoring sales, orders, kitchen operations, staff, menu items, delivery operations, and business settings.',
      },
      {
        name: 'Delivery Boy App',
        description:
          'A dedicated application that helps delivery staff manage their duty status, receive delivery tasks, navigate to customers, collect payments, and share live delivery status.',
      },
    ],
    highlight:
      'The delivered system includes customer ordering, manager operations, kitchen workflow, delivery management, QR-based workflows, live location tracking, payment collection, notifications, and order history.',
    capabilities: [
      'Customer Management',
      'Online & Manual Orders',
      'Kitchen Management',
      'Menu & Price Management',
      'Delivery Management',
      'Staff Management',
      'COD & Online Payments',
      'Live Delivery Tracking',
      'Notifications',
      'Order History',
      'Multi-Branch Workflows',
      'Business Dashboards',
    ],
  },
  {
    slug: 'trading',
    name: 'Trading Solutions',
    tagline: 'Build Your Own Trading Workflow',
    summary:
      'Customized technology solutions that connect market data, APIs, analytics, dashboards, and automated workflows into a single platform.',
    intro:
      'Trading applications often require more than simply displaying market prices. Dhion Technologies develops customized technology solutions that connect market data, APIs, analytics, dashboards, and automated workflows into a single platform.',
    offerings: [
      { name: 'Live Market Data', description: 'Access and process real-time market information.' },
      {
        name: 'Option Chain Analysis',
        description: 'Build customized views for option-chain data and strike analysis.',
      },
      {
        name: 'Trading Dashboards',
        description: 'Monitor important market information through a centralized interface.',
      },
      {
        name: 'API Integration',
        description:
          'Connect your application with supported brokers, market-data providers, and external services.',
      },
      {
        name: 'Analytics & Decision Support',
        description: 'Convert market information into useful data-driven insights.',
      },
      {
        name: 'Custom Trading Tools',
        description: 'Build workflows according to your specific requirements.',
      },
    ],
    note: 'Technology for analysis and workflow — not financial advice.',
  },
  {
    slug: 'custom',
    name: 'Custom Business Solutions',
    tagline: "Don't See Exactly What You Need?",
    summary:
      "Every business is different. If your workflow doesn't fit an existing category, we design software from scratch around your requirements.",
    intro:
      "Not every business fits neatly into a category. If you have a workflow, process, or operational challenge that doesn't match an existing product, we can design and build a custom solution from the ground up.",
    capabilities: [
      'Requirement Discovery',
      'Custom Architecture',
      'Bespoke Workflows',
      'Third-Party Integrations',
      'Internal Tools',
      'Legacy System Modernization',
    ],
  },
]

export const processSteps = [
  { step: '01', title: 'Understand', description: 'We first understand your business, users, workflow, and challenges.' },
  { step: '02', title: 'Plan', description: 'We convert your requirements into a clear software architecture and development plan.' },
  { step: '03', title: 'Design', description: 'We create intuitive interfaces and workflows designed around your users.' },
  { step: '04', title: 'Develop', description: 'Our development team builds the frontend, backend, database, APIs, integrations, and required functionality.' },
  { step: '05', title: 'Test', description: 'We test the system across workflows, devices, users, and business scenarios.' },
  { step: '06', title: 'Deploy', description: 'We deploy your application to the required cloud or production environment.' },
  { step: '07', title: 'Improve', description: 'As your business grows, your software can evolve with new features, integrations, and workflows.' },
]

export const whyChooseUs = [
  {
    title: 'Business-Focused Development',
    description: 'We start with your business problem — not just a technology stack.',
  },
  {
    title: 'Customized Solutions',
    description:
      'Your software is designed around your requirements rather than forcing your workflow into a pre-built system.',
  },
  {
    title: 'End-to-End Development',
    description:
      'From frontend and mobile applications to backend, APIs, databases, and deployment — we can manage the complete development lifecycle.',
  },
  {
    title: 'Scalable Architecture',
    description: 'We build systems that can evolve as your users, data, and business requirements grow.',
  },
  {
    title: 'Real-World Applications',
    description:
      'Our solutions are designed for practical business operations, including customers, managers, staff, delivery teams, and administrators.',
  },
  {
    title: 'Long-Term Technology Partner',
    description:
      'We aim to build long-term relationships with our clients through continuous improvement and technology support.',
  },
]

export const techStack = [
  { category: 'Frontend', items: ['React.js', 'Vue.js', 'Angular', 'Next.js', 'JavaScript', 'TypeScript'] },
  { category: 'Backend', items: ['Node.js', 'Express.js', 'NestJS', 'Python', 'Flask', 'REST APIs'] },
  { category: 'Mobile', items: ['React Native', 'Android', 'Cross-Platform Applications'] },
  { category: 'Databases', items: ['MongoDB', 'MySQL', 'PostgreSQL', 'SQL Server'] },
  { category: 'Cloud & DevOps', items: ['AWS', 'Docker', 'Nginx', 'SSL', 'Cloud Deployment'] },
  { category: 'Integrations', items: ['Payment Gateways', 'Maps', 'Notifications', 'WhatsApp', 'SMS', 'Third-Party APIs'] },
]

export const whoWeBuildFor = [
  {
    title: 'Restaurants & Hotels',
    description: 'Ordering, kitchen, delivery, staff, billing, and management systems.',
  },
  {
    title: 'Retail & Businesses',
    description: 'Customer, inventory, operations, reports, and workflow management.',
  },
  {
    title: 'Parking Operators',
    description: 'Parking, vehicle, transactions, staff, and reporting systems.',
  },
  {
    title: 'Startups',
    description: 'MVP development, SaaS platforms, APIs, dashboards, and mobile applications.',
  },
  {
    title: 'Trading & Financial Technology',
    description: 'Market-data tools, dashboards, APIs, analytics, and workflow solutions.',
  },
  {
    title: 'Organizations',
    description: 'Custom portals, internal systems, automation, and centralized management platforms.',
  },
]

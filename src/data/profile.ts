import type { Bi, BiList, Credential, Metric, Role } from './types'

/* ------------------------------------------------------------------
   Every string below is sourced from one of three places only:
   (1) mousa-alfaify.github.io  (2) the CV PDF  (3) the 2025 work profile PDF.
   Nothing is invented.
------------------------------------------------------------------ */

export const identity = {
  name: { ar: 'موسى الفيفي', en: 'Mousa Alfaify' } as Bi,
  fullName: { ar: 'موسى يحيى الفيفي', en: 'Mousa Yahya Alfaify' } as Bi,
  first: { ar: 'موسى', en: 'MOUSA' } as Bi,
  last: { ar: 'الفيفي', en: 'ALFAIFY' } as Bi,
  role: {
    ar: 'أخصائي رقابة عمليات — حوكمة وذكاء تشغيلي',
    en: 'Operations Control Specialist — Governance & Operational Intelligence',
  } as Bi,
  location: { ar: 'الرياض، المملكة العربية السعودية', en: 'Riyadh, Saudi Arabia' } as Bi,
  email: 'mousealfaifi@gmail.com',
  phone: '+966 54 674 8590',
  phoneRaw: '+966546748590',
  linkedin: 'https://www.linkedin.com/in/mousa-alfaify',
  linkedinLabel: 'mousa-alfaify',
  whatsapp: 'https://wa.me/966546748590',
  site: 'https://mousa-alfaify.github.io/',
}

export const heroStatement: Bi = {
  ar: 'متخصص معتمد في الحوكمة والامتثال وإدارة المخاطر يحمل 8 شهادات دولية معتمدة (GRCP, GRCA, IAAP وغيرها)، مع خلفية تحليلية عميقة في القطاع الصحي. قدمت نتائج قابلة للقياس: تطبيق ISO 9001 خفّض الأخطاء التشغيلية 45%، وتحسين دقة البيانات وصل لـ99.2%. أجمع بين الإطار الرقابي والأدوات التقنية لبناء بيئات عمل أكثر شفافية وكفاءة.',
  en: 'A certified governance, risk and compliance specialist holding 8 international credentials (GRCP, GRCA, IAAP and others), with deep analytical grounding in the healthcare sector. The results are measurable: an ISO 9001 rollout that cut operational errors by 45%, and a data-accuracy programme that reached 99.2%. I bring the control framework and the technical tooling together to build workplaces that run with more transparency and less waste.',
}

export const heroDomains: Bi[] = [
  { ar: 'حوكمة', en: 'Governance' },
  { ar: 'مخاطر', en: 'Risk' },
  { ar: 'امتثال', en: 'Compliance' },
  { ar: 'عمليات', en: 'Operations' },
  { ar: 'بيانات', en: 'Data' },
  { ar: 'أتمتة وذكاء اصطناعي', en: 'AI & Automation' },
]

/* ---------------- Philosophy ---------------- */

export const philosophy = {
  eyebrow: { ar: 'المنهج', en: 'Practice' } as Bi,
  title: {
    ar: 'الحوكمة التي تُنفَّذ،\nلا التي تُوثَّق فقط.',
    en: 'Governance that runs,\nnot governance that is filed.',
  } as Bi,
  lede: {
    ar: 'المنظمات نادراً ما تتعثر في كتابة الأطر. تتعثر في تنفيذها. دوري ليس إنتاج سياسة أو لوحة مؤشرات، بل بناء المنظومة التي تربط الإطار الرقابي بالبيانات اليومية وبالقرار الذي يُتخذ فعلاً.',
    en: 'Organizations rarely fail at writing frameworks. They fail at running them. My work is not producing a policy or a dashboard — it is building the system that connects the control framework to daily data, and to the decision actually being made.',
  } as Bi,
  pillars: [
    {
      k: '01',
      t: { ar: 'التشخيص قبل الحل', en: 'Diagnosis before solution' } as Bi,
      d: {
        ar: 'أبدأ بفهم المنظمة وفجواتها الرقابية قبل اقتراح أي تغيير. الحلول الجاهزة تُنتج امتثالاً شكلياً.',
        en: 'I start by mapping the organization and its control gaps before proposing change. Pre-built solutions produce paper compliance.',
      } as Bi,
    },
    {
      k: '02',
      t: { ar: 'التنفيذ حتى التبنّي', en: 'Delivery through adoption' } as Bi,
      d: {
        ar: 'من التقييم إلى التشغيل والتبنّي. لا تسليم ناقص ولا مسؤولية معلّقة بين الأطراف.',
        en: 'From assessment through deployment and adoption. No partial handoff, no ownership left hanging between parties.',
      } as Bi,
    },
    {
      k: '03',
      t: { ar: 'الأثر مربوط بمؤشر', en: 'Impact tied to a metric' } as Bi,
      d: {
        ar: 'كل نظام أبنيه مرتبط بمؤشر تقيسه المنظمة أصلاً: دقة، كفاءة، خطأ تشغيلي، أو زمن استجابة.',
        en: 'Every system I build is tied to a metric the organization already tracks: accuracy, efficiency, operational error, or response time.',
      } as Bi,
    },
  ],
}

/* ---------------- Impact numbers ---------------- */

export const impact: Metric[] = [
  {
    value: '99.2',
    suffix: '%',
    label: { ar: 'دقة البيانات التشغيلية', en: 'Operational data accuracy' },
    note: { ar: 'ارتفعت من 92% خلال ستة أشهر', en: 'Up from 92% within six months' },
  },
  {
    value: '45',
    suffix: '%',
    label: { ar: 'انخفاض الأخطاء التشغيلية', en: 'Reduction in operational errors' },
    note: { ar: 'بعد تطبيق معايير ISO 9001', en: 'After implementing ISO 9001 standards' },
  },
  {
    value: '68',
    suffix: '%',
    label: { ar: 'مشاركة الموظفين', en: 'Employee engagement' },
    note: { ar: 'ارتفعت من 35% عبر منظومة تواصل داخلي', en: 'Up from 35% via an internal communications system' },
  },
  {
    value: '500',
    prefix: '+',
    label: { ar: 'عملية إسعافية تُحلَّل شهرياً', en: 'Emergency operations analysed monthly' },
    note: { ar: 'تغذّي توصيات تشغيلية للإدارة', en: 'Feeding operational recommendations to leadership' },
  },
]

export const impactSecondary: Metric[] = [
  { value: '9', label: { ar: 'اعتماد مهني دولي', en: 'International credentials' } },
  { value: '15', prefix: '+', label: { ar: 'مؤشر أداء على لوحة حيّة', en: 'Live KPIs on one dashboard' } },
  { value: '25', prefix: '+', label: { ar: 'جهة تعاونت معها', en: 'Entities worked with' } },
  { value: '420', prefix: '+', label: { ar: 'مشروع سُلِّم للسوق', en: 'Projects delivered' } },
]

/* ---------------- Experience ---------------- */

export const roles: Role[] = [
  {
    id: 'nacc',
    org: { ar: 'هيئة الهلال الأحمر السعودي', en: 'Saudi Red Crescent Authority' },
    unit: {
      ar: 'المركز الوطني الإسعافي للقيادة والتوجيه',
      en: 'National Ambulatory Command & Control Center',
    },
    title: { ar: 'أخصائي رقابة عمليات', en: 'Operations Control Specialist' },
    period: { ar: 'سبتمبر 2022 — حتى الآن', en: 'September 2022 — Present' },
    years: '2022',
    context: {
      ar: 'مركز القيادة الوطني الذي تمر عبره العمليات الإسعافية على مستوى المملكة، حيث يتحول كل بلاغ إلى بيانات، وكل بيانات إلى قرار تحت ضغط الوقت.',
      en: 'The national command center that every emergency operation passes through — where each call becomes data, and data becomes a decision under time pressure.',
    },
    challenge: {
      ar: 'أنظمة بيانات مجزأة بدقة لا تتجاوز 92%، بلا رؤية فورية لأداء أكثر من 500 عملية شهرياً، وقيادة تعتمد على تقارير متأخرة وفجوات امتثال واضحة.',
      en: 'Fragmented data systems at 92% accuracy, no real-time visibility over 500+ monthly operations, and leadership working from delayed reporting with visible compliance gaps.',
    },
    contribution: {
      ar: [
        'تصميم وإدارة أكثر من 12 مؤشر أداء رئيسي لتتبع العمليات الإسعافية.',
        'بناء لوحة تحكم ديناميكية في Power BI لمتابعة الأداء الفوري.',
        'تطبيق معايير ISO 9001 على دورة البيانات والعمليات.',
        'قيادة تحليل أكثر من 500 عملية إسعافية شهرياً وتقديم توصيات استراتيجية دعمت قرارات تشغيلية حرجة.',
      ],
      en: [
        'Designed and managed 12+ key performance indicators tracking emergency operations.',
        'Built a dynamic Power BI dashboard for real-time performance monitoring.',
        'Applied ISO 9001 standards across the data and operations cycle.',
        'Led analysis of 500+ monthly emergency operations, delivering strategic recommendations that supported critical operational decisions.',
      ],
    },
    impact: [
      { value: '99.2', suffix: '%', label: { ar: 'دقة البيانات', en: 'Data accuracy' } },
      { value: '45', suffix: '%', label: { ar: 'خفض الأخطاء', en: 'Error reduction' } },
      { value: '12', prefix: '+', label: { ar: 'مؤشر أداء', en: 'KPIs designed' } },
    ],
    capabilities: {
      ar: ['تطبيق ISO 9001', 'تصميم مؤشرات الأداء', 'هندسة البيانات', 'Power BI المتقدم', 'SQL', 'Excel VBA', 'تحسين العمليات', 'أطر الحوكمة'],
      en: ['ISO 9001 Implementation', 'KPI Design', 'Data Architecture', 'Advanced Power BI', 'SQL', 'Excel VBA', 'Process Optimization', 'Governance Frameworks'],
    },
  },
  {
    id: 'internal-comms',
    org: { ar: 'هيئة الهلال الأحمر السعودي', en: 'Saudi Red Crescent Authority' },
    title: { ar: 'أخصائي تواصل داخلي', en: 'Internal Communications Specialist' },
    period: { ar: 'مايو 2020 — سبتمبر 2022', en: 'May 2020 — September 2022' },
    years: '2020',
    context: {
      ar: 'هيئة وطنية تتجاوز 500 موظف موزعين على إدارات متعددة، كل إدارة تتواصل برسائلها الخاصة ومعاييرها الخاصة.',
      en: 'A national authority of 500+ employees across multiple departments — each communicating with its own messages and its own standards.',
    },
    challenge: {
      ar: 'غياب استراتيجية تواصل داخلي موحّدة، ورسائل مجزأة بين الإدارات، ومشاركة موظفين لا تتجاوز 35%.',
      en: 'No unified internal communications strategy, fragmented departmental messaging, and employee engagement stuck at 35%.',
    },
    contribution: {
      ar: [
        'تطوير استراتيجية تواصل داخلية شاملة موحّدة المعايير.',
        'قيادة تنسيق مؤسسي مع 6 إدارات لبناء منظومة اتصال داخلي متكاملة.',
        'إعداد أكثر من 40 تعميماً وإعلاناً داخلياً وفقاً لمعايير الاتصال المؤسسية.',
        'إنتاج أكثر من 50 محتوى متخصص سنوياً للمناسبات والفعاليات.',
      ],
      en: [
        'Developed a comprehensive internal communications strategy with unified standards.',
        'Led institutional coordination across 6 departments to build one integrated communications system.',
        'Produced 40+ internal circulars and announcements to institutional communication standards.',
        'Created 50+ specialized content pieces annually for events and occasions.',
      ],
    },
    impact: [
      { value: '68', suffix: '%', label: { ar: 'مشاركة الموظفين', en: 'Employee engagement' } },
      { value: '55', suffix: '%', label: { ar: 'ارتفاع التفاعل', en: 'Interaction increase' } },
      { value: '6', label: { ar: 'إدارات منسّقة', en: 'Departments aligned' } },
    ],
    capabilities: {
      ar: ['التواصل الاستراتيجي', 'التنسيق بين الإدارات', 'إدارة المحتوى', 'الكتابة المؤسسية', 'إشراك الموظفين', 'قيادة الفريق'],
      en: ['Strategic Communication', 'Cross-departmental Coordination', 'Content Management', 'Institutional Writing', 'Employee Engagement', 'Team Leadership'],
    },
  },
]

export const education = [
  {
    degree: { ar: 'دبلوم عالٍ — إدارة الكوارث والأزمات', en: 'Higher Diploma — Disaster & Crisis Management' } as Bi,
    org: { ar: 'جامعة المعرفة', en: 'Al Maarefa University' } as Bi,
    period: { ar: 'يناير 2026 — سبتمبر 2026', en: 'January 2026 — September 2026' } as Bi,
  },
  {
    degree: { ar: 'بكالوريوس إدارة أعمال — إدارة عامة', en: 'BBA — Public Administration' } as Bi,
    org: { ar: 'جامعة تبوك', en: 'University of Tabuk' } as Bi,
    period: { ar: 'أكتوبر 2017 — مايو 2020', en: 'October 2017 — May 2020' } as Bi,
  },
]

/* ---------------- Credentials ---------------- */

export const credentialGroups: Record<string, Bi> = {
  governance: { ar: 'حوكمة', en: 'Governance' },
  risk: { ar: 'مخاطر', en: 'Risk' },
  compliance: { ar: 'امتثال', en: 'Compliance' },
  audit: { ar: 'تدقيق وضمان', en: 'Audit & Assurance' },
  data: { ar: 'حماية البيانات', en: 'Data Protection' },
  ops: { ar: 'عمليات وفعاليات', en: 'Operations & Events' },
  marketing: { ar: 'تسويق رقمي', en: 'Digital Marketing' },
}

export const credentials: Credential[] = [
  { abbr: 'GRCP', group: 'governance', name: { ar: 'محترف معتمد في حوكمة المخاطر والامتثال', en: 'Governance, Risk & Compliance Professional' } },
  { abbr: 'IPMP', group: 'governance', name: { ar: 'محترف إدارة السياسات المتكاملة', en: 'Integrated Policy Management Professional' } },
  { abbr: 'IRMP', group: 'risk', name: { ar: 'محترف إدارة المخاطر المتكاملة', en: 'Integrated Risk Management Professional' } },
  { abbr: 'ICEP', group: 'compliance', name: { ar: 'محترف الامتثال والأخلاقيات المتكاملة', en: 'Integrated Compliance & Ethics Professional' } },
  { abbr: 'GRCA', group: 'audit', name: { ar: 'مدقق معتمد في حوكمة المخاطر والامتثال', en: 'Governance, Risk & Compliance Auditor' } },
  { abbr: 'IAAP', group: 'audit', name: { ar: 'محترف التدقيق والضمان المتكامل', en: 'Integrated Audit & Assurance Professional' } },
  { abbr: 'IDPP', group: 'data', name: { ar: 'محترف حماية البيانات المتكاملة', en: 'Integrated Data Protection Professional' } },
  { abbr: 'CEM', group: 'ops', name: { ar: 'محترف معتمد في إدارة المعارض', en: 'Certified Exhibition Manager' } },
  { abbr: 'Google', group: 'marketing', name: { ar: 'شهادة التسويق الرقمي من Google', en: 'Google Digital Marketing Certification' } },
]

/* ---------------- Tools ---------------- */

export const tools: { name: string; level: Bi }[] = [
  { name: 'Power BI', level: { ar: 'متقدّم', en: 'Advanced' } },
  { name: 'Excel VBA', level: { ar: 'متقدّم', en: 'Advanced' } },
  { name: 'SQL', level: { ar: 'متوسط', en: 'Intermediate' } },
  { name: 'Tableau', level: { ar: '', en: '' } },
  { name: 'Google Analytics', level: { ar: '', en: '' } },
]

/* ---------------- Personal brand story ---------------- */

export const story = {
  eyebrow: { ar: 'الخلفية', en: 'Background' } as Bi,
  title: { ar: 'من الرسالة\nإلى المنظومة.', en: 'From the message\nto the system.' } as Bi,
  body: {
    ar: [
      'بدأت من التواصل المؤسسي: كيف تُصاغ الرسالة، وكيف تصل، ولماذا يتجاهلها الناس أحياناً. عملت مع أكثر من 25 جهة، وسلّمت أكثر من 420 مشروعاً، واشتغلت على أكثر من 22 حملة اتصالية بين الفكرة والتنفيذ.',
      'ثم انتقلت إلى الرقابة التشغيلية، واكتشفت أن المشكلة واحدة في الحالتين: المعلومة موجودة، لكن لا أحد يثق بها بما يكفي ليبني عليها قراراً.',
      'ما يشدّني اليوم هو المسافة بين الإطار المكتوب والواقع اليومي — وسدّها بأنظمة تُقاس، لا بتوصيات تُؤرشف.',
    ],
    en: [
      'I started in institutional communication: how a message is written, how it lands, and why people sometimes ignore it. I worked with 25+ entities, delivered 420+ projects, and ran 22+ communication campaigns from idea to execution.',
      'Then I moved into operations control, and found the same problem in both worlds: the information exists, but nobody trusts it enough to build a decision on it.',
      'What holds my attention now is the distance between the written framework and the daily reality — and closing it with systems that get measured, not recommendations that get filed.',
    ],
  } as BiList,
}

/**
 * Official marks supplied by the site owner, shown at their original colours
 * and aspect ratios. `scale` is an optical correction only — it never
 * distorts a mark, it just balances how large each one reads in the grid.
 */
export const entityLogos: { file: string; name: Bi; w: number; h: number; scale?: number }[] = [
  { file: 'ministry-of-health', w: 110, h: 100, name: { ar: 'وزارة الصحة', en: 'Ministry of Health' } },
  { file: 'saudi-red-crescent', w: 420, h: 100, name: { ar: 'هيئة الهلال الأحمر السعودي', en: 'Saudi Red Crescent Authority' } },
  { file: 'ministry-of-finance', w: 297, h: 100, name: { ar: 'وزارة المالية', en: 'Ministry of Finance' } },
  { file: 'ministry-of-media', w: 262, h: 100, name: { ar: 'وزارة الإعلام', en: 'Ministry of Media' } },
  { file: 'ministry-of-culture', w: 159, h: 100, name: { ar: 'وزارة الثقافة', en: 'Ministry of Culture' } },
  { file: 'ministry-of-education', w: 197, h: 100, name: { ar: 'وزارة التعليم', en: 'Ministry of Education' }, scale: 1.12 },
  { file: 'hrsd', w: 126, h: 100, name: { ar: 'وزارة الموارد البشرية والتنمية الاجتماعية', en: 'Ministry of Human Resources & Social Development' }, scale: 1.35 },
  { file: 'tga', w: 171, h: 100, name: { ar: 'الهيئة العامة للنقل', en: 'Transport General Authority' } },
]

/* ---------------- Contact ---------------- */

export const contact = {
  eyebrow: { ar: 'التواصل', en: 'Contact' } as Bi,
  title: {
    ar: 'لنصنع الأثر معاً',
    en: "Let's create\nimpact together",
  } as Bi,
  lede: {
    ar: 'منفتح على الفرص في مجالات الحوكمة والمخاطر والامتثال (GRC)، وإدارة المخاطر، والتحول الرقمي، والعمليات الاستراتيجية. دعونا نتواصل.',
    en: 'Open to opportunities across governance, risk and compliance (GRC), risk management, digital transformation and strategic operations. Let’s connect.',
  } as Bi,
  expect: {
    ar: ['قراءة تشخيصية لفجوات الحوكمة لديك', 'تحديد واضح لمخاطر الامتثال والتشغيل', 'توصيات مبنية على سياقك، لا على قالب', 'مخرجات مرتبطة بمؤشر قابل للقياس'],
    en: ['A diagnostic read of your governance gaps', 'A clear view of compliance and operational risk', 'Recommendations built on your context, not a template', 'Outcomes tied to a measurable indicator'],
  } as BiList,
}

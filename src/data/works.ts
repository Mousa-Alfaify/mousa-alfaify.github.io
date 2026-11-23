import type { CapabilityNode, Work } from './types'

export const works: Work[] = [
  {
    id: 'operational-control',
    index: '01',
    scale: 'hero',
    visual: 'dashboard',
    title: { ar: 'منظومة الرقابة التشغيلية', en: 'Operational Control System' },
    kind: { ar: 'حوكمة · بيانات · ISO 9001', en: 'Governance · Data · ISO 9001' },
    period: { ar: 'المركز الوطني الإسعافي للقيادة والتوجيه', en: 'National Ambulatory Command & Control Center' },
    summary: {
      ar: 'إعادة بناء دورة البيانات في مركز القيادة الوطني: من 92% دقة وتقارير متأخرة، إلى 99.2% ولوحة أداء تعمل على مدار الساعة.',
      en: 'Rebuilding the data cycle of a national command center: from 92% accuracy and delayed reporting, to 99.2% and a dashboard that runs around the clock.',
    },
    problem: {
      ar: 'العمليات الإسعافية كانت تُدار على أنظمة بيانات مجزأة بدقة 92%. لا وجود لرؤية فورية لأداء أكثر من 500 عملية شهرياً، والقيادة تتخذ قراراتها بناءً على معلومات متأخرة وغير موثوقة، مع فجوات امتثال واضحة في دورة الجودة.',
      en: 'Emergency operations ran on fragmented data systems at 92% accuracy. There was no real-time view of 500+ monthly operations, leadership decided on delayed and unreliable information, and the quality cycle had visible compliance gaps.',
    },
    approach: {
      ar: 'بدأت من الإطار لا من الأداة: تطبيق معايير ISO 9001 على دورة البيانات نفسها — تعريف مصدر كل رقم، ومسؤول كل حقل، ونقطة التحقق قبل أن يصل إلى تقرير. بعدها فقط بُنيت طبقة القياس، ثم طبقة العرض.',
      en: 'I started from the framework, not the tool: applying ISO 9001 to the data cycle itself — defining the source of every number, the owner of every field, and the validation point before it reaches a report. Only then was the measurement layer built, and then the presentation layer.',
    },
    role: {
      ar: 'أخصائي رقابة عمليات — ملكية كاملة للتصميم والتنفيذ والتشغيل.',
      en: 'Operations Control Specialist — full ownership of design, implementation and operation.',
    },
    solution: {
      ar: [
        'تعريف وإدارة أكثر من 12 مؤشر أداء رئيسي يغطي دورة العملية الإسعافية من البلاغ حتى الإغلاق.',
        'بروتوكولات تحقق آلي من صحة البيانات قبل دخولها طبقة التقارير.',
        'لوحة تحكم ديناميكية في Power BI تعرض الأداء الفوري للقيادة.',
        'إطار مراقبة امتثال مرتبط بمعايير ISO 9001.',
      ],
      en: [
        'Defined and managed 12+ KPIs covering the emergency operation cycle from call to closure.',
        'Automated validation protocols verifying data before it enters the reporting layer.',
        'A dynamic Power BI dashboard exposing real-time performance to leadership.',
        'A compliance monitoring framework tied to ISO 9001 standards.',
      ],
    },
    tools: ['Power BI', 'SQL', 'Excel VBA', 'ISO 9001'],
    impact: [
      { value: '99.2', suffix: '%', label: { ar: 'دقة البيانات — من 92%', en: 'Data accuracy — from 92%' } },
      { value: '45', suffix: '%', label: { ar: 'انخفاض الأخطاء التشغيلية', en: 'Operational errors reduced' } },
      { value: '12', prefix: '+', label: { ar: 'مؤشر أداء مُصمّم ومُدار', en: 'KPIs designed and managed' } },
      { value: '500', prefix: '+', label: { ar: 'عملية تُحلَّل شهرياً', en: 'Operations analysed monthly' } },
    ],
    insight: {
      ar: 'التميّز التشغيلي لا يأتي من لوحة جميلة. يأتي من أن يثق القائد بالرقم بما يكفي ليتصرف بناءً عليه فوراً — والثقة تُبنى في طبقة الحوكمة، قبل طبقة العرض بكثير.',
      en: 'Operational excellence does not come from a beautiful dashboard. It comes from a leader trusting a number enough to act on it immediately — and that trust is built in the governance layer, long before the presentation layer.',
    },
  },
  {
    id: 'performance-dashboard',
    index: '02',
    scale: 'wide',
    visual: 'network',
    title: { ar: 'لوحة مؤشرات الأداء الذكية', en: 'Smart Performance Dashboard' },
    kind: { ar: 'ذكاء تشغيلي', en: 'Operational Intelligence' },
    period: { ar: 'العمليات الإسعافية', en: 'Emergency Operations' },
    summary: {
      ar: 'لوحة تحكم متقدمة تتابع أكثر من 15 مؤشراً لعمليات الاستجابة الطبية على مدار الساعة، مع تحليل فوري وتنبيهات آلية.',
      en: 'An advanced control dashboard tracking 15+ medical response indicators around the clock, with live analysis and automated alerts.',
    },
    problem: {
      ar: 'الأداء التشغيلي كان يُقرأ بأثر رجعي. حين يصل التقرير، يكون قرار التدخل قد فات وقته.',
      en: 'Operational performance was read retrospectively. By the time a report arrived, the window for intervention had closed.',
    },
    approach: {
      ar: 'نقل القياس من دورة شهرية إلى دورة لحظية، وربط كل مؤشر بحدّ تنبيه يعرف من يجب أن يُخطَر ومتى.',
      en: 'Moving measurement from a monthly cycle to a live one, and binding each indicator to an alert threshold that knows who must be notified and when.',
    },
    role: { ar: 'تصميم المؤشرات وبناء اللوحة وتشغيلها.', en: 'Indicator design, dashboard build and operation.' },
    solution: {
      ar: [
        'أكثر من 15 مؤشراً لمتابعة عمليات الاستجابة الطبية على مدار الساعة.',
        'تحليلات فورية تربط الحدث بالمؤشر لحظة وقوعه.',
        'تنبيهات آلية عند تجاوز الحدود المعرَّفة.',
      ],
      en: [
        '15+ indicators monitoring medical response operations 24/7.',
        'Real-time analytics linking each event to its indicator as it happens.',
        'Automated alerts when defined thresholds are crossed.',
      ],
    },
    tools: ['Power BI', 'SQL'],
    impact: [
      { value: '15', prefix: '+', label: { ar: 'مؤشر على لوحة واحدة', en: 'Indicators on one board' } },
      { value: '24/7', label: { ar: 'متابعة مستمرة', en: 'Continuous monitoring' } },
    ],
    insight: {
      ar: 'المؤشر الذي لا يعرف من يُخطِر عند تجاوزه ليس مؤشراً، بل رقماً على شاشة.',
      en: 'An indicator that does not know whom to notify when it is breached is not an indicator — it is a number on a screen.',
    },
  },
  {
    id: 'paramedic-bot',
    index: '03',
    scale: 'half',
    visual: 'assistant',
    title: { ar: 'بوت المسعف الذكي', en: 'Smart Paramedic Assistant' },
    kind: { ar: 'ذكاء اصطناعي · تمكين ميداني', en: 'AI · Field Enablement' },
    period: { ar: 'مشروع داخلي', en: 'Internal build' },
    summary: {
      ar: 'مساعد ذكي يوفّر تدريباً فورياً وإجابات للمسعفين، يعالج أكثر من 500 استفسار يومياً بدقة 94%.',
      en: 'An AI assistant giving paramedics instant training and answers — handling 500+ queries a day at 94% accuracy.',
    },
    problem: {
      ar: 'المعرفة التشغيلية موجودة في أدلة ومراجع، لكن المسعف في الميدان لا يملك وقت البحث فيها.',
      en: 'Operational knowledge lived in manuals and references, but a paramedic in the field has no time to search them.',
    },
    approach: {
      ar: 'نقل المعرفة المعتمدة إلى واجهة سؤال وجواب فورية، مع الالتزام بالمصدر الرسمي لا بالتوليد الحر.',
      en: 'Moving approved knowledge into an instant question-and-answer surface, anchored to the official source rather than free generation.',
    },
    role: { ar: 'الفكرة والتصميم والبناء.', en: 'Concept, design and build.' },
    solution: {
      ar: ['إجابات فورية مبنية على المرجع التشغيلي المعتمد.', 'تدريب مصغّر عند الطلب أثناء العمل.', 'تغطية أكثر من 500 استفسار يومياً.'],
      en: ['Instant answers grounded in the approved operational reference.', 'On-demand micro-training during shift.', 'Coverage of 500+ daily queries.'],
    },
    tools: ['AI Assistant'],
    impact: [
      { value: '500', prefix: '+', label: { ar: 'استفسار يومياً', en: 'Queries per day' } },
      { value: '94', suffix: '%', label: { ar: 'دقة الإجابة', en: 'Answer accuracy' } },
    ],
    insight: {
      ar: 'المعرفة التي لا تصل في اللحظة الصحيحة تُعامَل كأنها غير موجودة.',
      en: 'Knowledge that does not arrive at the right moment is treated as if it does not exist.',
    },
  },
  {
    id: 'analyst-bot',
    index: '04',
    scale: 'half',
    visual: 'analyst',
    title: { ar: 'بوت محلل البيانات الذكي', en: 'Smart Data Analyst' },
    kind: { ar: 'ذكاء اصطناعي · أتمتة التقارير', en: 'AI · Report Automation' },
    period: { ar: 'مشروع داخلي', en: 'Internal build' },
    summary: {
      ar: 'يحوّل البيانات إلى رؤى استراتيجية فورية لجميع مستويات المنظمة، ويولّد تقارير تلقائية توفّر 20 ساعة عمل أسبوعياً بدقة تحليل 98%.',
      en: 'Turns data into instant strategic insight for every level of the organization, generating automated reports that save 20 working hours a week at 98% analytical accuracy.',
    },
    problem: {
      ar: 'إعداد التقارير كان يستهلك وقت المحللين في التجميع بدل التفسير، وكل مستوى إداري ينتظر دوره في الطابور.',
      en: 'Report preparation consumed analyst time in assembly rather than interpretation, and every management level waited its turn in the queue.',
    },
    approach: {
      ar: 'أتمتة طبقة التجميع بالكامل، وترك التفسير للإنسان — مع صياغة المخرجات بلغة كل مستوى إداري.',
      en: 'Fully automating the assembly layer and leaving interpretation to the human — with output phrased for each management level.',
    },
    role: { ar: 'الفكرة والتصميم والبناء.', en: 'Concept, design and build.' },
    solution: {
      ar: ['توليد تقارير تلقائية دورية.', 'رؤى فورية مصاغة لكل مستوى تنظيمي.', 'إتاحة التحليل دون وسيط تقني.'],
      en: ['Automated periodic report generation.', 'Instant insight phrased for each organizational level.', 'Analysis available without a technical intermediary.'],
    },
    tools: ['AI', 'Power BI'],
    impact: [
      { value: '20', label: { ar: 'ساعة عمل تُوفَّر أسبوعياً', en: 'Working hours saved weekly' } },
      { value: '98', suffix: '%', label: { ar: 'دقة التحليل', en: 'Analytical accuracy' } },
    ],
    insight: {
      ar: 'أتمتة التجميع تُعيد للمحلل وظيفته الحقيقية: التفسير.',
      en: 'Automating assembly gives the analyst their real job back: interpretation.',
    },
  },
  {
    id: 'writing-guide-bot',
    index: '05',
    scale: 'half',
    visual: 'documents',
    title: { ar: 'بوت دليل الكتابة الإدارية', en: 'Administrative Writing Guide' },
    kind: { ar: 'ذكاء اصطناعي · امتثال إجرائي', en: 'AI · Procedural Compliance' },
    period: { ar: 'مشروع داخلي', en: 'Internal build' },
    summary: {
      ar: 'نظام يعتمد على دليل الكتابة الإدارية الرسمي المعتمد، يدعم مراجعة وتحسين أكثر من 200 نوع من المستندات الإدارية.',
      en: 'A system built on the official approved administrative writing guide, supporting review and improvement across 200+ document types.',
    },
    problem: {
      ar: 'دليل الكتابة الإدارية موجود ومعتمد، لكن الالتزام به يعتمد على ذاكرة الموظف ومراجعة يدوية بطيئة.',
      en: 'The administrative writing guide existed and was approved, but compliance depended on staff memory and slow manual review.',
    },
    approach: {
      ar: 'تحويل الدليل من وثيقة تُقرأ إلى طبقة تحقق تعمل داخل مسار الكتابة نفسه.',
      en: 'Turning the guide from a document to be read into a verification layer running inside the writing flow itself.',
    },
    role: { ar: 'الفكرة والتصميم والبناء.', en: 'Concept, design and build.' },
    solution: {
      ar: ['مراجعة آلية مقابل المعيار الرسمي المعتمد.', 'تغطية أكثر من 200 نوع من المستندات الإدارية.', 'اقتراحات تحسين مرتبطة ببند الدليل.'],
      en: ['Automated review against the official approved standard.', 'Coverage of 200+ administrative document types.', 'Improvement suggestions linked to the relevant clause.'],
    },
    tools: ['AI'],
    impact: [
      { value: '200', prefix: '+', label: { ar: 'نوع مستند مدعوم', en: 'Document types supported' } },
    ],
    insight: {
      ar: 'أفضل طريقة لفرض معيار ليست تدريب الناس عليه، بل وضعه في المسار الذي يمرّون به أصلاً.',
      en: 'The best way to enforce a standard is not training people on it — it is placing it in the path they already walk.',
    },
  },
  {
    id: 'internal-comms-system',
    index: '06',
    scale: 'wide',
    visual: 'campaign',
    title: { ar: 'منظومة التواصل الداخلي والحملات', en: 'Internal Communications System' },
    kind: { ar: 'اتصال مؤسسي · تغيير سلوكي', en: 'Institutional Communication · Behavioural Change' },
    period: { ar: 'هيئة الهلال الأحمر السعودي · 2020—2022', en: 'Saudi Red Crescent Authority · 2020—2022' },
    summary: {
      ar: 'استراتيجية تواصل داخلي رفعت مشاركة الموظفين من 35% إلى 68%، وأكثر من 22 حملة اتصالية من الفكرة حتى التنفيذ.',
      en: 'An internal communications strategy that lifted employee engagement from 35% to 68%, plus 22+ campaigns taken from idea to execution.',
    },
    problem: {
      ar: 'أكثر من 500 موظف يتلقون رسائل مجزأة من ست إدارات، بلا معيار موحّد ولا قياس للتفاعل.',
      en: '500+ employees receiving fragmented messages from six departments, with no unified standard and no measurement of engagement.',
    },
    approach: {
      ar: 'توحيد المعيار أولاً، ثم بناء دورة محتوى ثابتة، ثم قياس التفاعل ومعالجته كمؤشر لا كانطباع.',
      en: 'Unify the standard first, then build a steady content cycle, then treat engagement as a metric rather than an impression.',
    },
    role: { ar: 'أخصائي تواصل داخلي — الاستراتيجية والتنسيق والتنفيذ.', en: 'Internal Communications Specialist — strategy, coordination and delivery.' },
    solution: {
      ar: [
        'استراتيجية تواصل داخلي موحّدة عبر 6 إدارات.',
        'أكثر من 40 تعميماً وإعلاناً داخلياً وفق معايير الاتصال المؤسسية.',
        'حملات توعوية داخلية من بينها «حق وواجب» حول أنظمة وسياسات العمل بالتعاون مع الموارد البشرية، و«صم بصحة» خلال رمضان، وسلسلة ترشيد الطاقة بالتعاون مع المركز السعودي لكفاءة الطاقة.',
        'مشاركة في مواد الاتصال لمؤتمرات ومعارض وطنية من بينها المؤتمر السعودي للخدمات الإسعافية ومعرض الصحة و LEAP.',
      ],
      en: [
        'A unified internal communications strategy across 6 departments.',
        '40+ internal circulars and announcements meeting institutional standards.',
        'Internal awareness campaigns including "Haq wa Wajib" on workplace policy with HR, "Sum bi Sihha" during Ramadan, and an energy-efficiency series with the Saudi Energy Efficiency Center.',
        'Communication materials for national conferences and exhibitions including the Saudi Conference for Emergency Services, the Health exhibition, and LEAP.',
      ],
    },
    tools: ['Strategic Communication', 'Content Systems'],
    impact: [
      { value: '68', suffix: '%', label: { ar: 'مشاركة الموظفين — من 35%', en: 'Engagement — from 35%' } },
      { value: '55', suffix: '%', label: { ar: 'ارتفاع تفاعل 500+ موظف', en: 'Interaction lift across 500+ staff' } },
      { value: '22', prefix: '+', label: { ar: 'حملة اتصالية', en: 'Campaigns delivered' } },
    ],
    insight: {
      ar: 'التواصل المؤسسي الفعّال ليس مسألة كمّ. الرسالة التي لا تخصّ الموظف تُقرأ وتُنسى، مهما تكررت.',
      en: 'Effective institutional communication is not a question of volume. A message that does not concern the employee is read and forgotten, however often it repeats.',
    },
  },
]

/* ---------------- Capability map ---------------- */

export const capabilityNodes: CapabilityNode[] = [
  { id: 'gov', layer: 'core', x: 13, y: 15, label: { ar: 'الحوكمة', en: 'Governance' }, detail: { ar: 'أطر الحوكمة وإدارة السياسات — GRCP، IPMP', en: 'Governance frameworks and policy management — GRCP, IPMP' } },
  { id: 'risk', layer: 'core', x: 8, y: 50, label: { ar: 'المخاطر', en: 'Risk' }, detail: { ar: 'إدارة المخاطر المتكاملة — IRMP', en: 'Integrated risk management — IRMP' } },
  { id: 'comp', layer: 'core', x: 13, y: 85, label: { ar: 'الامتثال', en: 'Compliance' }, detail: { ar: 'الامتثال والأخلاقيات والتدقيق — ICEP، GRCA، IAAP', en: 'Compliance, ethics and audit — ICEP, GRCA, IAAP' } },
  { id: 'ops', layer: 'core', x: 45, y: 8, label: { ar: 'العمليات', en: 'Operations' }, detail: { ar: 'رقابة العمليات وتحسينها وفق ISO 9001', en: 'Operations control and improvement under ISO 9001' } },
  { id: 'data', layer: 'core', x: 45, y: 92, label: { ar: 'البيانات', en: 'Data' }, detail: { ar: 'هندسة البيانات وتصميم المؤشرات — Power BI، SQL', en: 'Data architecture and KPI design — Power BI, SQL' } },
  { id: 'ai', layer: 'enable', x: 47, y: 50, label: { ar: 'الذكاء الاصطناعي والأتمتة', en: 'AI & Automation' }, detail: { ar: 'طبقة تمكين تربط الأطراف: مساعدون أذكياء وتقارير آلية وتحقق مؤتمت', en: 'The enabling layer that binds the rest: assistants, automated reporting, automated validation' } },
  { id: 'oi', layer: 'outcome', x: 87, y: 50, label: { ar: 'الذكاء التشغيلي', en: 'Operational Intelligence' }, detail: { ar: 'الناتج: قرار أسرع، بيانات موثوقة، وحوكمة قابلة للقياس', en: 'The outcome: faster decisions, trustworthy data, measurable governance' } },
]

export const capabilityEdges: [string, string][] = [
  ['gov', 'ai'], ['risk', 'ai'], ['comp', 'ai'], ['ops', 'ai'], ['data', 'ai'],
  ['ai', 'oi'],
  ['gov', 'ops'], ['data', 'comp'], ['risk', 'ops'], ['data', 'ops'],
]

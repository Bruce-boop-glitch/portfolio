// 个人简历信息（来源：个人简历.pdf 已完整解码）
window.PROFILE = {
  name: "廖小龙",
  nameEn: "BRUCE LIAO",
  title: "室内设计师 · 主案设计师",
  titleEn: "INTERIOR DESIGNER · DESIGN LEAD",
  city: "深圳 · 罗湖",
  years: 10,
  yearsInterior: 8,
  avatar: "assets/avatar.jpg",

  // 公开联系方式（用户确认：邮箱+微信）
  email: "462977152@qq.com",
  wechat: "Bruce-Design",   // 微信号（确认时如需修改在此改）
  phone: "+86 135 2752 1231", // 不公开展示，但保留以便日后调整

  // 简介
  bio: "八年内装设计经验，专注于高端住宅、样板间与商业空间，擅长将极简美学与功能主义相融合，为客户打造有温度的生活空间。",

  // 教育
  education: {
    school: "重庆工商职业学院",
    major: "艺术设计",        // 简历未列出专业，按室内设计师背景填入，用户可改
    period: "2013–2016",
  },

  // 工作经历
  experience: [
    {
      company: "深圳市环亚联合设计装饰有限公司",
      role: "主案设计师 · DESIGN LEAD",
      period: "2018.06 – 至今",
      current: true,
      desc: "负责高端住宅与样板间项目的整体方案设计，主导从概念构思到落地实施的全流程。带领 3-5 人设计小组完成项目交付，与客户、施工方、材料商高效协同。",
      stats: [
        { label: "完成项目", value: "300+" },
        { label: "客户满意度", value: "98%" },
        { label: "项目总金额", value: "¥2000W+" },
      ],
    },
    {
      company: "东易日盛家居装饰集团股份有限公司",
      role: "助理设计师 · JUNIOR DESIGNER",
      period: "2016.06 – 2018.06",
      current: false,
      desc: "协助主案设计师完成项目前期调研、方案草图、效果图渲染与项目跟进，深入理解设计全流程。熟练运用 AutoCAD、SketchUp、Photoshop 等软件独立完成方案设计、效果图制作与施工图绘制。",
      stats: [],
    },
  ],

  // 专业技能
  skills: {
    software: [
      { name: "AutoCAD", level: 95 },
      { name: "SketchUp", level: 90 },
      { name: "Adobe Photoshop", level: 90 },
      { name: "Enscape", level: 88 },
      { name: "AI 工作流", level: 80 },
    ],
    abilities: [
      "空间规划与平面布局",
      "效果图表现与渲染",
      "施工图深化与节点",
      "材料与软装搭配",
      "项目全流程管理",
      "客户沟通与提案",
    ],
    certificates: [
      "广东省职称证书（助理级）",
      "安全员 C 证",
    ],
  },

  // 自我评价
  evaluation: {
    keywords: ["空间感强", "审美独特", "细节控", "责任心强", "沟通力佳", "持续学习"],
    philosophy: "坚持「少即是多」的设计哲学，注重材质本身的表达与光影的运用。追求空间情绪与居者性格的契合，让设计回归生活本质。",
    style: "具备良好的项目统筹与团队协作能力，从前期概念到现场落地全流程把控。善于倾听客户需求，提供专业且具有建设性的设计方案。",
  },

  // 爱好（简历未列出，按室内设计师画像默认填充，用户可改）
  hobbies: [
    { icon: "📷", name: "建筑摄影", desc: "用镜头捕捉空间光影与材质肌理" },
    { icon: "✏️", name: "手绘草图", desc: "笔尖快速勾勒方案雏形" },
    { icon: "🪴", name: "绿植造景", desc: "为空间注入生命与自然气息" },
    { icon: "📚", name: "设计阅读", desc: "持续汲取国内外优秀案例" },
  ],
};
module.exports = {
  title: "noOne", // 显示在左上角的网页名称以及首页在浏览器标签显示的title名称
  description: "github: RenXusheng233, 欢迎交流.", // meta 中的描述文字，用于SEO
  // 注入到当前页面的 HTML <head> 中的标签
  head: [
    [
      "link",
      { rel: "icon", href: "/cat.png" },
      //浏览器的标签栏的网页图标，第一个'/'会遍历public文件夹的文件
    ],
  ],

  //下面涉及到的md文件和其他文件的路径下一步再详细解释
  themeConfig: {
    logo: "/cat.png", //网页顶端导航栏左上角的图标

    //顶部导航栏
    nav: [
      //格式一：直接跳转，'/'为不添加路由，跳转至首页
      { text: "首页", link: "/" },

      //格式二：添加下拉菜单，link指向的文件路径
      {
        text: "分类", //默认显示
        ariaLabel: "分类", //用于识别的label
        items: [
          { text: "前端总结", link: "/pages/studyNotes/html.md" },
          {
            text: "算法初探",
            link: "/pages/algorithmNotes/dataStructure.md",
          },
          { text: "碎碎念", link: "/pages/lifePerception/fragment-1.md" },
        ],
      },
      //格式三：跳转至外部网页，需http/https前缀
      { text: "个人简历", link: "https://github.com/RenXusheng233/resume" },
      { text: "Github", link: "https://github.com/RenXusheng233" },
    ],

    //侧边导航栏：会根据当前的文件路径是否匹配侧边栏数据，自动显示/隐藏
    sidebar: {
      "/pages/studyNotes/": [
        {
          title: "前端总结", // 一级菜单名称
          collapsable: true, // false为默认展开菜单, 默认值true是折叠,
          sidebarDepth: 1, //  设置侧边导航自动提取markdown文件标题的层级，默认1为h2层级
          children: [
            ["html.md", "🌟HTML"],
            ["css.md", "🌟CSS"],
            ["javascript.md", "🌟JAVASCRIPT"],
            ["browser.md", "🌟BROWSER"],
            ["http.md", "🌟HTTP"],
            ["vue.md", "🌟VUE"],
            ["react.md", "🌟REACT"],
            ["nodejs.md", "🌟NODEJS"],
            ["webpack.md", "🌟WEBPACK"],
            ["designPatterns.md", "🌟设计模式"],
          ],
        },
      ],
      "/pages/algorithmNotes/": [
        {
          title: "算法初探",
          collapsable: true,
          sidebarDepth: 1,
          children: [["dataStructure.md", "🌟数据结构"]],
        },
      ],
      "/pages/lifePerception/": [
        {
          title: "碎碎念",
          collapsable: true,
          sidebarDepth: 1,
          children: [
            ["fragment-1.md", "🌟fragment-1"],
            ["fragment-2.md", "🌟fragment-2"],
          ],
        },
      ],
      //...可添加多个不同的侧边栏，不同页面会根据路径显示不同的侧边栏
    },
  },
};

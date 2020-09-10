module.exports = {
  base: '/vue-create-dm/',
  title: 'VueCreateDM',
  themeConfig: {
    nav: [
      {
        text: '在线地址',
        link: 'https://hzyhbk.github.io/vue-create-dm/example/#/antd',
      },
      {
        text: 'Github',
        link: 'https://github.com/hzyhbk/vue-create-dm',
      },
      {
        text: 'ReactCreateDM',
        link: 'https://hzyhbk.github.io/react-create-dm',
      },
    ],
    sidebar: {
      '/guide/': [
        {
          title: '指南',
          collapsable: false,
          children: ['', 'install', 'use', 'api'],
        },
        {
          title: '进阶',
          collapsable: false,
          children: ['micro'],
        },
      ],
    },
  },
};

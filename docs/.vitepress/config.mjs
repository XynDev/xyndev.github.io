import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "LearnJS",
  description: "Learn Javascript (node.js)",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Examples', link: '/markdown-examples' }
    ],

    sidebar: [
      {
        text: 'Beginner',
        items: [
          { text: 'Philosophy', link: '/beginner/philosophy' },
          { text: 'Introduction', link: '/beginner/fundamentals' },
          {
            text: "Fundamentals",
            items: [
              { text: 'Variables', link: '/beginner/variables' },
              { text: 'Arrays', link: '/beginner/arrays' },
              { text: 'Functions', link: '/beginner/functions'}
            ]
          },
        ]
      },
      {
        text: "Beginner Node.JS",
        items: [
          { text: 'Node JS', link: '/beginner/node/basics', items: [
            { text: 'Express', link: '/beginner/node/express'}
          ] },
        ]
      }
      
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ]
  }
})

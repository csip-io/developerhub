/** @type {import('@docusaurus/types').DocusaurusConfig} */
module.exports = {
  title: 'Csip.io Developer Hub',
  tagline: "Welcome to the Csip.io API developer hub. You'll find comprehensive guides and documentation to help you start working with Csip.io API as quickly as possible, as well as support if you get stuck. Let's jump right in!",
  url: 'https://developer.csip.io',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',
  organizationName: 'csipio', 
  projectName: 'developerhub',
  themeConfig: {
    navbar: {
      title: 'Csip.io Developer Hub',
      logo: {
        alt: 'Csip.io Logo',
        src: 'img/csip-logo.png',
      },
      items: [
        {
          to: 'docs/welcome-to-csipio',
          label: 'Docs',
          position: 'left',
        },

        {to: 'docs/admin-overview', label: 'API', position: 'left'},
        {
          href: 'https://github.com/csip-io',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Csip.io`,
    },
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          path: 'docs',
          sidebarPath: require.resolve('./sidebars.js'),
        },
        api: {
          path: 'docs/api',
          sidebarPath: require.resolve('./sidebars.js'),
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],
};

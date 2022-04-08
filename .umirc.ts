import { defineConfig } from 'dumi';

const repo = 'ant-design-kit';

export default defineConfig({
  title: repo,
  mode: 'doc',
  locales: [['zh-CN', '中文']],
  favicon: `/ant-design-kit/cool.png`,
  logo: `/ant-design-kit/cool.png`,
  outputPath: 'docs-dist',
  hash: true,
  // Because of using GitHub Pages
  base: `/${repo}/`,
  publicPath: `/${repo}/`,
  // more config: https://d.umijs.org/config
  extraBabelPlugins: [
    [
      'import',
      {
        libraryName: 'antd',
        libraryDirectory: 'es',
        style: true,
      },
      'antd',
    ],
    [
      'import',
      {
        libraryName: 'ant-design-kit',
        camel2DashComponentName: false,
        customStyleName: name => {
          return `./style/index.less`; // 注意：这里 ./ 不可省略
        },
      },
      'ant-design-kit',
    ],
  ],
});

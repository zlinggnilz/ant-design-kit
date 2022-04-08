export default {
  target: 'browser',
  cjs: { type: 'babel', lazy: true },
  esm: { type: 'babel', importLibToEs: true },
  // lessInBabelMode: true,
  entry: ['src/index.tsx'],
  extractCSS: true,
  extraBabelPlugins: [
    [
      'babel-plugin-import',
      { libraryName: 'antd', libraryDirectory: 'es', style: true },
      'antd',
    ],
  ],
  pkgs: [
    'hooks',
    'ConfirmBtn',
    'PromiseBtn',
    'ConfirmSwitch',
    'TablePage',
    'CreateField',
    'Form',
    'ContentTable',
    'ModalForm',
  ],
};

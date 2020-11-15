const { uglify } = require('rollup-plugin-uglify');
const babel = require('rollup-plugin-babel');

module.exports = {
  input: 'src/index.js',
  output: {
    file: 'dist/vue-create-dm.umd.min.js',
    name: 'vueCreateDM',
    format: 'umd',
    exports: 'named',
  },
  external: ['vue'],
  plugins: [
    babel({ runtimeHelpers: true, exclude: 'node_modules/**' }),
    uglify(),
  ],
};

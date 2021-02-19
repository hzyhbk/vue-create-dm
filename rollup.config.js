import commonjs from 'rollup-plugin-commonjs';
import typescript from 'rollup-plugin-typescript2';
import resolve from '@rollup/plugin-node-resolve';
import { terser } from 'rollup-plugin-terser';

const external = ['vue'];

const plugins = [terser(), commonjs(), resolve(), typescript()];

const input = './src/index.ts';

export default [
  {
    input,
    output: {
      format: 'esm',
      dir: 'dist/esm'
    },
    plugins,
    external
  },
  {
    input,
    output: {
      format: 'cjs',
      dir: 'dist/cjs'
    },
    plugins,
    external
  }
];

import babel from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import typescript from 'rollup-plugin-typescript2';
import resolve from '@rollup/plugin-node-resolve';
import { terser } from 'rollup-plugin-terser';

import autoprefixer from 'autoprefixer';
import postcssFlexboxfixer from 'postcss-flexboxfixer';
import postcss from 'rollup-plugin-postcss';

import pkg from './package.json';

let externals = [];
if (pkg.dependencies) {
  externals = Object.keys(pkg.dependencies);
}

export default {
  input: './src/index.ts',
  output: [
    {
      format: 'cjs',
      file: 'dist/index.js',
    },
    {
      format: 'es',
      file: 'dist/index.esm.js',
    },
    {
      format: 'cjs',
      file: 'dist/index.min.js',
      plugins: [terser()],
    },
    {
      format: 'es',
      file: 'dist/index.esm.min.js',
      plugins: [terser()],
    },
  ],
  external: [...externals],
  plugins: [
    resolve({
      mainFields: ['module', 'main'],
      extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
    }),
    commonjs({
      include: /node_modules/,
    }),
    typescript({
      tsconfig: 'tsconfig.json',
    }),
    babel({
      babelHelpers: 'bundled',
      extensions: ['ts', 'tsx', 'js', 'jsx', 'svg'],
      exclude: /node_modules/,
    }),
    /**
     * @see https://github.com/postcss/postcss/blob/master/docs/plugins.md
     */
    postcss({
      extract: true,
      plugins: [autoprefixer, postcssFlexboxfixer],
      modules: true,
    }),
  ],
};

// rollup.config.js
import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import nodeResolve from 'rollup-plugin-node-resolve';
//import uglify from 'rollup-plugin-uglify';


export default {
  input: 'src/js/noted.js',
  output: {
    file: 'dist/noted.js',
    format: 'iife',
    sourcemap: true
  },

  plugins: [
    nodeResolve({
      jsnext: true,
      main: true
    }),
    commonjs({
      namedExports: {
        'node_modules/rdom/dist/rdom.js': ['button', 'div', 'p']
      }
    }),
    babel({
      exclude: 'node_modules/**'
    })
  ]
};

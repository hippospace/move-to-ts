// rollup.config.js
import typescript from '@rollup/plugin-typescript';

var rollup_config = [
  {
    input: 'src/index.ts',
    output: [
      {
        file: "./dist/index.js",
        format: 'cjs',
        sourcemap: true
      },
      {
        file: "./dist/index.mjs",
        format: 'es',
        sourcemap: true
      }
    ],
    plugins: [typescript()]
  }

];
export {rollup_config as default};

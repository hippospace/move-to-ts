// rollup.config.js
import typescript from '@rollup/plugin-typescript';

var rollup_config = [
  {
    input: 'src/tests/index.ts',
    output: [
      {
        file: "./tests/test.js",
        format: 'cjs',
        sourcemap: true
      },
      {
        file: "./tests/test.mjs",
        format: 'es',
        sourcemap: true
      }
    ],
    plugins: [typescript()]
  }

];
export {rollup_config as default};

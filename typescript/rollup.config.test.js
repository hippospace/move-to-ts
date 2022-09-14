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
    external:["aptos","json-stable-stringify","big-integer","sha.js","sha3","elliptic"],
    plugins: [typescript()]
  }

];
export {rollup_config as default};

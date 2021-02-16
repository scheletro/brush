import resolve from 'rollup-plugin-node-resolve';
import { terser } from "rollup-plugin-terser";
import typescript from '@rollup/plugin-typescript';

const library = 'brush';
const input = 'bin/index.js';

export default [
    {
        input,
        output: {
            file: `bundled/${library}.js`,
            format: 'iife',
            name: library
        },
        plugins: [resolve(), terser()]
    },
    {
        input,
        output: {
            file: `bundled/${library}.esm.js`,
            format: 'esm'
        },
        plugins: [resolve(), terser()]
    },
    {
        input,
        output: {
            file: `bundled/${library}.cjs.js`,
            format: 'cjs'
        },
        plugins: [resolve(), typescript({ target: "es5" }), terser()]
    }
];
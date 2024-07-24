import { terser } from "rollup-plugin-terser";
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from 'rollup-plugin-typescript2';
import json from "@rollup/plugin-json"
import postcss from "rollup-plugin-postcss"

export default [
    {
        input: "src/index.ts",
        output: {
            file: "dist/index.js",
            format: "es",
            sourcemap: true
        },
        plugins: [
            resolve({
                mainFields: ['browser', 'module', 'main']
            }),
            commonjs(),
            typescript({
                tsconfig: './tsconfig.json',
                useTsconfigDeclarationDir: true
            }),
            terser({
                ecma: 2020,
                mangle: { toplevel: true },
                compress: {
                    module: true,
                    toplevel: true
                },
                output: { quote_style: 1 }
            }),
            postcss(),
            json()
        ]
    }
]

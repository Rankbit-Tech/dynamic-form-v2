import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from 'rollup-plugin-typescript2';


export default {
    input: 'src/index.ts',
    output: [
        {
            file: 'dist/index.js',
            format: 'es',
            sourcemap: true,
        },

    ],
    plugins: [
        peerDepsExternal(),
        resolve({ extensions: ['.js', '.ts', '.tsx'] }),
        commonjs(),
        typescript({ useTsconfigDeclarationDir: true }),
        {
            // Custom plugin to ignore CSS files
            name: 'ignore-css',
            load(id) {
                if (id.endsWith('.css')) {
                    return `export default '';`; // Return empty CSS for `.css` files
                }
                return null;
            }
        }
    ],
};

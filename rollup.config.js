'use strict';

import typescript from 'rollup-plugin-typescript';
import nodeResolve from 'rollup-plugin-node-resolve';

export default {
    entry: 'src/main.ts',
    format: 'iife',
    dest: 'bundle.js',
    plugins: [
        typescript(),
        nodeResolve({
            // use "jsnext:main" if possible
            // see https://github.com/rollup/rollup/wiki/jsnext:main
            // jsnext: true
        })
    ]
};

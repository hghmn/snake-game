'use strict';

import typescript from 'rollup-plugin-typescript';

export default {
    entry: 'src/main.ts',
    format: 'iife',
    dest: 'bundle.js',
    plugins: [
        typescript()
    ]
};

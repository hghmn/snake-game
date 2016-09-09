import { IVec2, IVec3 } from './interfaces';

enum Dimensions {
    x = 1,
    y,
    z
}

export function makeVector<T>(...args: number[]) {
    let vec = {};

    for (let i = 0; i < args.length; i++) {
        vec[ i ] = args[i];
        vec[Dimensions[i + 1]] = args[i];
    }

    return vec as any as T;
}

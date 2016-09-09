import { IVec2, IVec3 } from './interfaces';

export function makeVector<T>(...args: number[]) {
    return args as any as T;
}

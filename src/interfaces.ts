// Game Elements
export interface IEntities {
    [key: string]: IVec2;
}

// Vectors
export interface IVec { [index: number]: number; }
export type IVec2 = [ number, number ];
export type IVec3 = [ number, number, number ];

import { IVec } from './interfaces';
import { makeVector } from './vector';

export class Entity {
    public vec: IVec;
    constructor(vector, options) {
        this.vec = makeVector.apply(this, vector);
    }

    update() {
        // update the entities here
    }

    render() {
        // TODO: handle rendering this entity here
    }
}

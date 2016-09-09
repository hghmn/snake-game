// define a world entity - something that exists, and can be drawn
import { Vec2, Vector, UnitVector } from './vector';

export abstract class Entity {
    public location = Vector(0, 0);
    public direction = UnitVector(0, 1).rotate(90);

    /**
     * An entity should be able to describe itself with a vector array
     */
    abstract render(): Vec2[];
}

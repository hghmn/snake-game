import { IEntities, IVec2 } from './interfaces';
import { Stage } from './stage';
import { makeVector } from './vector';

// Define and Setup the stage
const stage = new Stage({
    mount: 'svg#stage',
    width: 800,
    height: 600,
});

// Define game entities
const entities: IEntities = {
    snake: makeVector<IVec2>( 100, 100 ),
    foo: makeVector<IVec2>( 50, 400 ),
    bar: makeVector<IVec2>( 700, 200 ),
};

// run the game loop
function loop() {
    // update all entities

    // render the entities to the stage
    stage.render(entities);

    // continue the loop here
    // window.requestAnimationFrame(loop);
}

// run the first time
loop();

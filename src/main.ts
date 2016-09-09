import { IEntities, IVec2 } from './interfaces';
import { Stage } from './stage';
import { InteractionManager } from './input';
import { slowCopy } from './utils';
import { Entity } from './entity';

// load up globals
const config = window['__globals__'] || {};

interface IGameState {
    snake: IVec2;
}

// Define game entities
const entities = {
    snake: new Entity([ 100, 100 ], { fill: '#00F' }),
    // foo: makeVector<IVec2>( 60, 400 ),
    // bar: makeVector<IVec2>( 700, 200 ),
};

// Define and Setup the stage
const stageSettings = {
    mount: 'svg#stage',
    width: 800,
    height: 600,
};
const stage = new Stage(stageSettings);

// Define interactions
const inputs = new InteractionManager<IGameState>({
    // DOM Events
    'load': () => {
        console.info('snake game demo');
        console.info(`build: ${ config.build }`);
    },
    'resize': () => console.warn('window resize'),
    // Keyboard Events
    'K37': (e, s) => s.snake.vec.x -= 20, // console.log('left key'),
    'K38': (e, s) => s.snake.vec.y -= 20, // console.log('up key')
    'K39': (e, s) => s.snake.vec.x += 20, // console.log('right key')
    'K40': (e, s) => s.snake.vec.y += 20, // console.log('down key'),
    // 'K32': (e, s) => console.log('spacebar'),
},  slowCopy(entities));

// run the game loop
function loop() {
    // update all entities
    inputs.update(entities);
    // entities.update();

    // render the entities to the stage
    stage.render(entities);

    // continue the loop here
    // window.requestAnimationFrame(loop);
    setTimeout(loop, 300);
}

// run the first time
loop();

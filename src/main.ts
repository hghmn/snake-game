import { IEntities, IGameState, IVec2 } from './interfaces';
import { Stage } from './stage';
import { InteractionManager } from './input';
import { Entity } from './entity';
import * as Peer from './peer';
import { slowCopy, guid } from './lib/utils';

// load up globals
const config = window['__globals__'] || {};

// when you new up the page, you get an identity
const iam = guid();

// try to connect to other peers
const peerList = Peer.connect(iam, { count: 3 });

// TODO: make these extend the base Entity class
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
        console.info(`---- ${ config.title } ----`);
        console.info(`build : ${ config.build }`);
        console.info(`iam   : ${iam}`);
        console.info(`peers : ${peerList.map(p => p.channelName).join('\n        ')}`);
    },
    'resize': () => console.warn('window resize'),
    // Keyboard Events
    'K37': (e, s) => s.snake.vec.x -= 20, // console.log('left key'),
    'K38': (e, s) => s.snake.vec.y -= 20, // console.log('up key')
    'K39': (e, s) => s.snake.vec.x += 20, // console.log('right key')
    'K40': (e, s) => s.snake.vec.y += 20, // console.log('down key'),
    // 'K32': (e, s) => console.log('spacebar'),
},  slowCopy(entities)); // TODO: when state is immutable, pass it in here

// run the game loop
function loop() {
    // update all entities
    inputs.update(entities); // TODO: when state is immutable, let state change happen outside of loop

    // time/interval based updates
    // entities.update();

    // render the entities to the stage
    stage.render(entities);

    // continue the loop here
    // window.requestAnimationFrame(loop);
    setTimeout(loop, 300);
}

// run the first time
loop();

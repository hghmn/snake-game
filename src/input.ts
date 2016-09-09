// Keyboard interactions
import { IEntities } from './interfaces';

// wrap event handlers with extra parameters
function eventExtras(handler, ...extras) {
    return evt => handler(evt, ...extras);
}

export class InteractionManager<T> {
    private domHandlers = {};
    private keyboardHandlers = {};
    private mouseHandlers = {}; // not yet used

    constructor(handlers, private state: T) {
        let hasKeyboardHandlers = 0;

        // loop over handlers passed in, and grab the keyboard events out
        Object.keys(handlers).forEach(key => {
            if (/^k/i.test(key)) {
                this.keyboardHandlers[key.substr(1)] = handlers[key];
                hasKeyboardHandlers++;
            } else if (`on${key}` in window) {
                // TODO: make sure this works across browsers
                this.domHandlers[key] = handlers[key];
                window[`on${key}`] = eventExtras(handlers[key], this.state);
            }
        });

        if (hasKeyboardHandlers) {
            // setup keyboard event listeners
            document.onkeydown = evt => {
                if (this.keyboardHandlers[evt.which]) {
                    this.keyboardHandlers[evt.which](evt, this.state);
                }
            };
        }
    }

    update(entities: IEntities) {
        console.log('update entity state');

        // BAD: currently just pushing our state to the main state
        Object.keys(entities).forEach(key => {
            if (this.state[key]) {
                entities[key] = this.state[key];
            }
        });
    }
}

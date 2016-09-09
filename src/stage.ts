import { IEntities } from './interfaces';

interface IStageOpts {
    mount: string; // the selector for mounting the stage
    width: number;
    height: number;
}

export class Stage {
    private svg: HTMLElement;
    constructor(private options: IStageOpts) {
        // setup for the stage here
        this.svg = document.querySelector(options.mount) as HTMLElement;
        this.svg.setAttributeNS(null, 'width', options.width.toString());
        this.svg.setAttributeNS(null, 'height',  options.height.toString());
        this.svg.style.border = '1px solid black';
    }

    update(entities: IEntities) {
        // update any entities
    }

    // Render entities into the svg provided
    // TODO: make entities disposable
    render(entities: IEntities) {
        // array of 2d vectors
        let keys = Object.keys(entities);
        let prefix = 'entity-';
        let existing = this.svg.querySelectorAll(`g[id^="${ prefix }"`);
        let toDelete;
        const ns = 'http://www.w3.org/2000/svg';

        // loop over existing elements, remove and update
        for (let i = 0; i < existing.length; i++) {
            let g = existing[i];
            let id = g.id.substr(prefix.length);

            // If there is a svg element that we don't know, get rid of it
            if (!entities[id]) {
                this.svg.removeChild(g);
            } else {
                // we found an existing entity, let's update it for good measure
                // g.firstElementChild.setAttributeNS(null, 'transform', `translate(${entities[id][0]}, ${entities[id][1]})`);
                g.firstElementChild.setAttributeNS(null, 'x', `${ entities[id].vec.x }`);
                g.firstElementChild.setAttributeNS(null, 'y', `${ entities[id].vec.y }`);

                // remove this from the keys to iterate over later
                keys.splice(keys.indexOf(id), 1);
            }
        }

        // add elements for any missing keys
        for (let j = 0; j < keys.length; j++) {
            let id = keys[j];
            let g = document.createElementNS(ns, 'g');
            g.id = prefix + id;
            // let c = document.createElementNS(ns, 'circle');
            // c.setAttributeNS(null, 'r', '10');
            // c.setAttributeNS(null, 'transform', `translate(${entities[id].vec.x }, ${entities[id].vec.y })`);
            let rect = document.createElementNS(ns, 'rect');
            rect.setAttributeNS(null, 'x', `${ entities[id].vec.x }`);
            rect.setAttributeNS(null, 'y', `${ entities[id].vec.y }`);
            rect.setAttributeNS(null, 'width', '20');
            rect.setAttributeNS(null, 'height', '20');

            // add it
            g.appendChild(rect);
            this.svg.appendChild(g);
        }
    }
}

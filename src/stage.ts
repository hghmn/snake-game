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
        this.svg.setAttributeNS(null, 'width', options.width);
        this.svg.setAttributeNS(null, 'height',  options.height);
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
        let prefix = "entity-";
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
                g.firstElementChild.setAttributeNS(null, 'transform', `translate(${entities[id][0]}, ${entities[id][1]})`);

                // remove this from the keys to iterate over later
                keys.splice(keys.indexOf(id), 1);
            }
        }

        // add elements for any missing keys
        for (let j = 0; j < keys.length; j++) {
            let g = document.createElementNS(ns, 'g');
            let c = document.createElementNS(ns, 'circle');
            let id = keys[j];
            g.id = prefix + id;
            c.setAttributeNS(null, 'r', '10');
            c.setAttributeNS(null, 'transform', `translate(${entities[id][0]}, ${entities[id][1]})`);

            // add it
            g.appendChild(c);
            this.svg.appendChild(g);
        }
    }
}

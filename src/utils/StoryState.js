import { EventEmitter } from 'events';

export default class StoryState extends EventEmitter {
    constructor(initalState = {}) {
        super();
        this.state = Object.assign({}, initalState);
    }

    set(id, value) {
        console.log(id + ' = ' + value);
        this.state[id] = value;
        this.emit(id, value);
    }

    get(id) {
        return this.state[id];
    }
}

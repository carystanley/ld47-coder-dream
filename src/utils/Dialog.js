import { EventEmitter } from 'events';

export default class Dialog extends EventEmitter {
    constructor(scene) {
        super();
        this.scene = scene;
        this.data = [];
        this.nextData =[]
        this.index = 0;
    }

    start(convo) {
        this.data = convo;

        if (this.index === 0) {
            this.emit('start');
        }

        this.index = 0;
        this.nextData = this.data;
        this.next();
    }

    onEnd(value) {
        this.index = 0;
        this.emit('end', value);
    }

    selectResponse(selectionIndex) {
        let response = this.responses[selectionIndex];
        let responseText = Object.keys(response)[0];
        let responseNextData = response[responseText];

        if (responseNextData) {
            this.index = 0;
            this.nextData = responseNextData;
            this.next();
        }
    }

    next() {
        if (this.index >= this.nextData.length) {
            this.onEnd();
            return;
        }

        const bit = this.nextData[this.index];
        const text = bit.text;
        const key = bit.key;
        console.log(`- ${text}`);
        const responses = bit.responses;

        const end = bit.end;
        if (typeof end !== 'undefined') {
            this.onEnd(end);
            return;
        } else if (typeof responses !== 'undefined') {
            this.responses = responses;
            let responseTextArray = [];
            for (let r in responses) {
                let choice = Object.keys(responses[r])[0];
                console.log(`-- (${r}) ${choice}`);
                responseTextArray.push(choice);
            }
            this.emit('text', text, key, responseTextArray);
        } else {
            this.index++;

            if (typeof key === 'undefined' && typeof text === 'undefined' && this.index >= this.nextData.length) {
                this.onEnd(end);
            } else {
                this.emit('text', text, key);
            }
        }
    }
}

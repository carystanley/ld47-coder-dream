import Player from '../entities/Player';
import HUD from '../components/HUD';
import SpeechBubble from '../components/SpeechBubble';
import Dialog from '../utils/Dialog';
import storyInteractions from '../story/interactions';
import storyScenes from '../story/scenes';


const TOP_DEPTH = 700;

const actionToCursor = {
    Talk: { cursor: 'talk', text: ''},
    ExitLeft: { cursor: 'left', text: ''},
    ExitRight: { cursor: 'right', text: ''},
    Get: { cursor: 'grab', text: ''},
    Default: { cursor: 'crosshair', text: ''},

    While: { cursor: 'crosshair', text: 'while'},
    True: { cursor: 'crosshair', text: 'true'},
    RightBracket: { cursor: 'crosshair', text: '}'},
    ConsoleLog: { cursor: 'crosshair', text: 'console.log'},
    LeftBracket: { cursor: 'crosshair', text: '{'}
};

class Play extends Phaser.Scene {
    constructor (config) {
        super({ key: 'play' });
    }

    create (config) {
        this.player = new Player(this);
        // this.physics.world.setBounds(0, 0, map.widthInPixels, map.heightInPixels);

        this.cursor = this.add.sprite(0, 0, 'spritesheet', 'cursor-crosshair');
        this.cursor.scale = 3;
        this.cursor.depth = TOP_DEPTH;
        this.cursorText = this.add.bitmapText(0, 0, 'nokia-font', '');
        this.cursorText.tint = 0x000000;
        this.cursorText.scale = 0.5;
        this.cursorText.depth = TOP_DEPTH;

        this.input.on('pointermove', (pointer) => {
            this.cursor.x = pointer.x;
            this.cursor.y = pointer.y;
            this.cursorText.x = pointer.x + 3;
            this.cursorText.y = pointer.y + 3;
        });
        this.input.on('pointerup', async (pointer) => {
            if (this.mode === 'dialog' && this.canProgress) {
                this.dialog.next();
            } else {
                if (this.currentAction) {
                    this.resetAction();
                } else {
                    try {
                        await this.movePlayerTo(pointer.x, pointer.y);
                    } catch (e) { }
                }
            }
        });

        this.mode = 'explore';
        this.currentAction = null;
        this.hud = new HUD(this);
        this.sceneId = config.scene || this.getStoryState('startScene');;
        storyScenes[this.sceneId](this, config);
    }

    getStoryState(id) {
        return this.game.storyState.get(id);
    }

    setStoryState(id, value) {
        this.game.storyState.set(id, value);
    }

    async movePlayerTo(x, y) {
        await this.player.moveTo(x, y);
    }

    playerFaceRight() {
        this.player.faceRight();
    }

    playerFaceLeft() {
        this.player.faceLeft();
    }

    playerShrug() {
        this.startConversation(this.player, {
            dialog: [
                { text: '???' }
            ]
        });
    }

    playerXY(x, y) {
        this.player.x = x;
        this.player.y = y;
    }

    fadeIn() {
        return new Promise((resolve, reject) => {
            this.cameras.main.once('camerafadeincomplete', resolve);
            this.cameras.main.fadeIn(2000);
        });
    }

    fadeOut() {
        return new Promise((resolve, reject) => {
            this.cameras.main.once('camerafadeoutcomplete', resolve);
            this.cameras.main.fadeOut(2000, 0, 0, 0);
        });
    }

    setDialogMode() {
        this.mode = 'dialog';
    }

    setExploreMode() {
        this.mode = 'explore';
    }

    update (time, delta) {
        if (this.mode === 'dialog') {

        } else {
            this.player.update(time, delta);
        }
    }

    setAction(action) {
        this.currentAction = action;
        this.setCursor(this.currentAction);
    }

    resetAction() {
        this.currentAction = null;
        this.resetCursor();
    }

    setCursor(action) {
        const cursor = actionToCursor[action];
        if (cursor) {
            this.cursor.setFrame('cursor-' + cursor.cursor);
            this.cursorText.setText(cursor.text || '');
        }
    }

    resetCursor() {
        this.setCursor('Default')
    }

    onOverInteractable(entity) {
        if (entity.defaultAction && !this.currentAction) {
            this.setCursor(entity.defaultAction);
        }
    }

    onOutInteractable(entity) {
        this.resetCursor();
    }

    async onClickInteractable(entity) {
        try {
            const action = this.currentAction || entity.defaultAction;
            const id = entity.entityId;
            const event = 'on' + action + id
            if (this.currentAction) {
                this.resetAction();
            }
            console.log('Event: ' +  event);
            if (storyInteractions[event]) {
                await storyInteractions[event](this, {}, this.player, entity);
            } else {
                await storyInteractions['default'](this, {}, this.player, entity);
            }
        } catch (e) {
            console.error(e);
        }
    }

    async startConversation(who, config) {
        this.setDialogMode();
        config.actions = config.actions || {};
        const speechBubble = new SpeechBubble(this, who.x, who.y - (who.height * who.scale));
        // speechBubble.getGameObject().depth = TOP_DEPTH;

        const result = await new Promise((resolve) => {
            const dialog = new Dialog(this);
            this.dialog = dialog;

            dialog.on('start', () => {
                // this.cameras.main.zoomTo(1.05, 2000,'Expo.easeOut',true);
                // console.log('starting conversation');
            });
            dialog.on('text', async (text, key, responses) => {
                this.canProgress = false;
                if (typeof config.actions[key] === 'function') {
                    await config.actions[key](dialog);
                }
                if (typeof text !== 'undefined') {
                    speechBubble.cancelled = true;
                    await speechBubble.show(who.x, who.y - (who.height * who.scale), text, responses).finally( () => {
                        speechBubble.isReady = true;
                    });
                    this.canProgress = true;
                }
            });
            dialog.on('end', async (value) => {
                await speechBubble.hide();
                this.setExploreMode();
                return resolve(value);
            });
            dialog.start(config.dialog);
            speechBubble.on('selected', (index) => {
                this.setDialogMode();
                dialog.selectResponse(index);
            });
        });

        // this.cameras.main.zoomEffect.reset();
        // this.cameras.main.zoomTo(1, 2000,'Expo.easeOut', true);

        speechBubble.destroy();
        return result;
    }
}

export default Play;

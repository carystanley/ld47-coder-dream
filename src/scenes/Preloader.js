import StoryState from '../utils/StoryState';
import initialState from '../story/initialState';

class Preloader extends Phaser.Scene {
    constructor () {
        super({ key: 'preloader' });
    }

    preload () {
        this.game.storyState = new StoryState(initialState);

        this.load.setPath('assets');

        this.load.atlas('spritesheet', 'spritesheet.png', 'spritesheet.json');

        this.load.bitmapFont('nokia-font', 'fonts/nokia.png', 'fonts/nokia.xml');

        let progress = this.add.graphics();

        this.load.on('progress', function (value) {
            progress.clear();
            progress.fillStyle(0xdff9fb, 1);
            progress.fillRect(0, (220 / 2) - 30, 256 * value, 60);
        });

        this.load.on('complete', function () {
            progress.destroy();
        });
    }

    create () {
        const frameRate = 8;
        this.setupSheetAnimations([
            { key: 'nerd-idle', prefix: 'nerd', start: 9, end: 9, frameRate },
            { key: 'nerd-walking', prefix: 'nerd', start: 1, end: 8, frameRate, repeat: -1 },
            { key: 'computer', prefix: 'computer', start: 1, end: 1, frameRate }
        ]);

        this.scene.start('play');
    }

    setupSheetAnimations(animations) {
        animations.forEach(({ key, prefix, start, end, frameRate, repeat }) => {
            this.anims.create({
                key,
                frames: this.anims.generateFrameNames('spritesheet', { prefix, start, end }),
                frameRate,
                repeat
            });
        })
    }
}

export default Preloader;

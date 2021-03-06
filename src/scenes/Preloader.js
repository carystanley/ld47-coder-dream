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

        const backgroundRect = this.add.graphics();
        backgroundRect.fillStyle(0x000000);
        backgroundRect.fillRect(0, 0, 800, 600);

        let progress = this.add.graphics();
        this.load.on('progress', function (value) {
            progress.clear();
            progress.fillStyle(0xffffff);
            progress.fillRect(0, (600 / 2) - 30, 800 * value, 60);
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
            { key: 'wizard', prefix: 'wizard', start: 1, end: 1, frameRate },
            { key: 'computer', prefix: 'computer', start: 1, end: 1, frameRate },
            { key: 'exit-left', prefix: 'exit-left', start: 1, end: 1, frameRate },
            { key: 'exit-right', prefix: 'exit-right', start: 1, end: 1, frameRate },
            { key: 'expression-one', prefix: 'expression-one', start: 1, end: 1, frameRate },
            { key: 'expression-two', prefix: 'expression-two', start: 1, end: 1, frameRate },
            { key: 'expression-three', prefix: 'expression-three', start: 1, end: 1, frameRate },
            { key: 'expression-four', prefix: 'expression-four', start: 1, end: 1, frameRate },
            { key: 'bracket-left', prefix: 'bracket-left', start: 1, end: 1, frameRate },
            { key: 'bracket-right', prefix: 'bracket-right', start: 1, end: 1, frameRate },
            { key: 'missingno', prefix: 'missingno', start: 1, end: 1, frameRate },
            { key: 'error-fix', prefix: 'error-fix', start: 1, end: 1, frameRate },
            { key: 'stuck-stuck', prefix: 'stuck-stuck', start: 1, end: 1, frameRate },
            { key: 'stuck-run', prefix: 'stuck-run', start: 1, end: 6, frameRate, repeat: -1 }
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

export default class GameOver extends Phaser.Scene {
    constructor () {
        super({ key: 'gameover' });
    }

    create () {
        const backgroundRect = this.add.graphics();
        backgroundRect.fillStyle(0x000000);
        backgroundRect.fillRect(0, 0, 800, 600);

        let endText = '';
        for (var x = 0; x < 20; x++) {
            endText += 'the end\n';
        }

        this.add.bitmapText(80, 10, 'nokia-font', endText);
    }
}

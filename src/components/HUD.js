export default class HUD {
    constructor(scene) {
        this.scene = scene;

        const container = this.scene.add.container(0, 500);
        this.container = container;
        container.depth = 600;
        container.setScrollFactor(0);

        const backgroundRect = this.scene.add.graphics();
        backgroundRect.fillStyle(0xffffff);
        backgroundRect.fillRect(0, 0, 800, 100);
        container.add(backgroundRect);

        const text = this.scene.add.bitmapText(80, 30, 'nokia-font', '> while true { console.log(\'the end\') }');
        text.tint = 0x000000;
        container.add(text);
    }
}

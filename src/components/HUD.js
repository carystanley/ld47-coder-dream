const TEXT_Y = 30;

export default class HUD {
    constructor(scene) {
        this.scene = scene;
        this.actionTexts = [];

        const container = this.scene.add.container(0, 500);
        this.container = container;
        container.depth = 600;
        container.setScrollFactor(0);

        const backgroundRect = this.scene.add.graphics();
        backgroundRect.fillStyle(0xffffff);
        backgroundRect.fillRect(0, 0, 800, 100);
        container.add(backgroundRect);

        const text = this.scene.add.bitmapText(80, TEXT_Y, 'nokia-font', '>');
        text.tint = 0x000000;
        container.add(text);

        this.addActionText('while', 106, 'While', 'hasWhile');
        this.addActionText('true', 200, 'True', 'hasTrue');
        this.addActionText('{', 276, 'LeftBracket', 'hasLeftBracket');
        this.addActionText('console.log', 300, 'ConsoleLog', 'hasConsoleLog');
        this.addActionText('(\'the end\')', 476, 'TheEnd', 'hasTheEnd');
        this.addActionText('}', 642, 'RightBracket', 'hasRightBracket');
    }

    addActionText(text, startX, action, stateFlag) {
        var actionText = this.scene.add.bitmapText(startX, TEXT_Y, 'nokia-font', text);
        actionText.tint = 0x000000;
        this.container.add(actionText);

        actionText.setInteractive();
        actionText.on('pointerup', (pointer, localX, localY, event) => {
            if (this.scene.mode !== 'dialog') {
                event.stopPropagation();
                this.scene.setAction(action);
            }
        });

        this.scene.game.storyState.on(stateFlag, (value) => {
            if (value === true) {
                actionText.setVisible(true);
            }
        })

        if (!this.scene.getStoryState(stateFlag)) {
            actionText.setVisible(false);
        }
    }
}

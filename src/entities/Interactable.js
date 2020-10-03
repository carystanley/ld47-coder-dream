export default class Interactable extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, animationId, entityId, defaultAction, x, y) {
        super(scene, x, y, 'spritesheet');
        scene.add.existing(this);
        this.scale = 4;
        this.originY = 1;
        this.depth = this.y;
        this.anims.play(animationId);
        this.entityId = entityId;
        this.defaultAction = defaultAction;

        this.setInteractive();
        this.on('pointerover', (pointer, localX, localY, event) => {
            event.stopPropagation();
            scene.onOverInteractable(this);
        });
        this.on('pointerout', (pointer, localX, localY, event) => {
            scene.onOutInteractable(this);
        });
        this.on('pointerup', (pointer, localX, localY, event) => {
            if (scene.mode !== 'dialog') {
                event.stopPropagation();
                scene.onClickInteractable(this);
            }
        });
    }
}

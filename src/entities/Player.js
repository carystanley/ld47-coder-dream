import { tweenPromise } from '../utils/async';

import { WALK_VELOCITY, Y_MAX, Y_MIN } from '../globals';

export default class Player extends Phaser.Physics.Arcade.Sprite {
    constructor(scene) {
        super(scene, 80, 80, 'spritesheet');
        scene.add.existing(this);
        this.originY = 1;
        this.scale = 6;
        this.anims.play('nerd-idle');
    }

    update () {
        this.depth = this.y;
    }

    cancelTweens() {
        try {
            const tweens = this.scene.tweens.getTweensOf(this);
            tweens.forEach((t) => {
                t.stop();
                t.complete();
            });
        } catch (e) {}
    }

    faceRight() {
        this.setFlipX(false);
    }

    faceLeft() {
        this.setFlipX(true);
    }

    async moveTo (targetX, targetY) {
        const y = Math.max(Y_MIN, Math.min(Y_MAX, targetY));
        const x = targetX;
        const dx = x - this.x;
        const dy = y - this.y;

        this.cancelTweens();
        const distance = Math.sqrt((dx * dx) + (dy * dy));
        const time = distance / WALK_VELOCITY * 1000;
        if (dx > 0) {
            this.faceRight();
        } else {
            this.faceLeft();
        }
        this.anims.play('nerd-walking');
        await tweenPromise(this.scene, this, { x, y }, time);
        this.anims.play('nerd-idle');
    }
}

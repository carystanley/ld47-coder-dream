import * as Phaser from 'phaser';

import Boot from './scenes/Boot.js';
import Preloader from './scenes/Preloader.js';
import Play from './scenes/Play.js';
import GameOver from './scenes/GameOver.js';

var config = {
    parent : 'game',
    type: Phaser.AUTO,
    backgroundColor: '#e4e4e4',
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            // debug: true
        }
    },
    scene: [
        Boot,
        Preloader,
        Play,
        GameOver
    ],
    antialias: false,
    pixelArt: true,
    fps: {
        min: 10,
        target: 60
    }
};

var game = new Phaser.Game(config);

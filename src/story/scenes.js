import Interactable from '../entities/Interactable';

function setup(scene, config) {
    scene.exitLeft = new Interactable(scene, 'exit-left', 'Exit', 'ExitLeft', 25, 600, 3);
    scene.exitRight = new Interactable(scene, 'exit-right', 'Exit', 'ExitRight', 775, 600, 3);

    if (config.enter === 'left') {
        scene.playerXY(100, 350);
        scene.playerFaceRight();
    } else if (config.enter === 'right') {
        scene.playerXY(700, 350);
        scene.playerFaceLeft();
    }
}

export default {
    Start: (scene, config) => {
        setup(scene, config);
        scene.computer = new Interactable(scene, 'computer', 'Computer', 'Talk', 500, 400, 4);
        if (!config.enter) {
            scene.player.x = 200;
            scene.player.y = 350;
            scene.startConversation(scene.player, {
                dialog: [
                    { text: 'Oh No!!' },
                    { text: 'No Pants!?!' }
                ]
            });
        }
    },

    StuckGuy: (scene, config) => {
        setup(scene, config);
        scene.stuckGuy = new Interactable(scene, 'stuck-guy', 'StuckGuy', 'Talk', 500, 400, 4);
    },

    Wizard: (scene, config) => {
        setup(scene, config);
        scene.wizard = new Interactable(scene, 'wizard', 'Wizard', 'Talk', 500, 400, 4);
    },

    Forest: (scene, config) => { // https://github.com/denysdovhan/wtfjs
        setup(scene, config);
        scene.expression1 = new Interactable(scene, 'expression-one', 'Expression1', '???', 200, 300, 1); // typeof NaN --> number
        scene.expression2 = new Interactable(scene, 'expression-two', 'Expression2', '???', 200, 500, 1); // Number(true) -> 1
        scene.expression3 = new Interactable(scene, 'expression-three', 'Expression3', '???', 600, 300, 1); // 3 > 2 > 1 -> false
        scene.expression4 = new Interactable(scene, 'expression-four', 'Expression4', '???', 600, 500, 1); // [] == ![] -> true
        scene.leftBracket = new Interactable(scene, 'bracket-left', 'LeftBracket', 'Get', 200, 400, 1); // {
        scene.rightBracket = new Interactable(scene, 'bracket-right', 'RightBracket', 'Get', 600, 400, 1); // }
    }
}
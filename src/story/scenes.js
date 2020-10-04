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
        scene.stuckGuy = new Interactable(scene, 'stuck-stuck', 'StuckGuy', 'Talk', 550, 430, 6);
        scene.errorGuy = new Interactable(scene, 'missingno', 'ErrorGuy', 'Talk', 200, 300, 6);
    },

    Wizard: (scene, config) => {
        setup(scene, config);
        scene.wizard = new Interactable(scene, 'wizard', 'Wizard', 'Talk', 400, 350, 6);
    },

    Forest: (scene, config) => { // https://github.com/denysdovhan/wtfjs
        setup(scene, config);
        scene.expression1 = new Interactable(scene, 'expression-one', 'Expression1', '???', 230, 275, 1); // typeof NaN --> number
        scene.expression2 = new Interactable(scene, 'expression-two', 'Expression2', '???', 200, 400, 1); // Number(true) -> 1
        scene.expression3 = new Interactable(scene, 'expression-three', 'Expression3', '???', 573, 310, 1); // 3 > 2 > 1 -> false
        scene.expression4 = new Interactable(scene, 'expression-four', 'Expression4', '???', 550, 450, 1); // [] == ![] -> true
        scene.leftBracket = new Interactable(scene, 'bracket-left', 'LeftBracket', 'Get', 340, 350, 1); // {
        scene.rightBracket = new Interactable(scene, 'bracket-right', 'RightBracket', 'Get', 500, 400, 1); // }
    }
}

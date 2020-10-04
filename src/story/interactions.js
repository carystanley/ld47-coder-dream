import sceneNavigation from './sceneNavigation';

export default {
    onTalkComputer: async (scene, state, player, entity) => {
        /*
        const count = scene.getStoryState('computerTalkCount');
        scene.setStoryState('computerTalkCount', count + 1);
        const computerText = [
            '1',
            '2',
            '3'
        ][count];
        */


        await scene.movePlayerTo(entity.x - 80, entity.y + 20);
        scene.playerFaceRight();

        var computerText = 'FILE NOT FOUND'

        // FILE NOT FOUND
        // console.log - ''
        // { console.log - SyntaxError: Unexpected end of input
        // console.log } - SyntaxError: Unexpected token }
        // { console.log } - ''
        // while { console.log } - SyntaxError: Unexpected token {

        scene.startConversation(scene.computer, {
            dialog: [
                { text: computerText }
            ]
        });

        // TODO errors till has all the items
    },

    onTalkWizard: async (scene, state, player, entity) => {
        // TODO loop till "both"
        scene.startConversation(scene.computer, {
            dialog: [
                { text: 'Dude, Seriously?' },
                { text: 'Come on...', key: 'score' },
                {
                    text: 'Will you help me?',
                    responses: [
                        {
                            'not yet': [
                                { text: 'bummer' }
                            ]
                        },
                        {
                            'sure': [
                                { text: 'Awesome' }
                            ]
                        }
                    ]
                }
            ],
            actions: {
                score: () => {

                }
            }
        });
    },

    onTalkError: async (scene, state, player, entity) => {
        // TODO
    },

    onConsoleLogError: async (scene, state, player, entity) => {
        // TODO Show Error message
    },

    onRightBracketError: async (scene, state, player, entity) => {
        // TODO Fix error
    },

    onGetRightBracket: async (scene, state, player, entity) => {
        // TODO hasRightBracket true
        await scene.movePlayerTo(entity.x, entity.y);
        scene.setStoryState('hasRightBracket', true);
        entity.hide();
    },

    onGetLeftBracket: async (scene, state, player, entity) => {
        // TODO hasLeftBracket
        await scene.movePlayerTo(entity.x, entity.y);
        scene.setStoryState('hasLeftBracket', true);
        entity.hide();
    },

    onTalkStuckGuy: async (scene, state, player, entity) => {
        // TODO (stuck, loop, stuck-again)
    },

    onWhileStuckGuy: async (scene, state, player, entity) => {
        // TODO startLoop
    },

    onTrueStuckGuy: async (scene, state, player, entity) => {
        // TODO stopLoop
    },

    onConsoleLogExpression1: async (scene, state, player, entity) => {
        // TODO
    },

    onConsoleLogExpression2: async (scene, state, player, entity) => {
        // TODO
    },

    onConsoleLogExpression3: async (scene, state, player, entity) => {
        // TODO
    },

    onConsoleLogExpression4: async (scene, state, player, entity) => {
        // TODO
    },

    onExitLeftExit: async (scene, state, player, entity) => {
        await scene.movePlayerTo(entity.x, player.y);
        scene.scene.restart({ scene: sceneNavigation(scene, scene.sceneId, 1), enter: 'right' });
    },

    onExitRightExit: async (scene, state, player, entity) => {
        await scene.movePlayerTo(entity.x, player.y);
        scene.scene.restart({ scene: sceneNavigation(scene, scene.sceneId, -1), enter: 'left' });
    },

    default: async (scene, state, player, entity) => {
        scene.playerShrug();
    }
}

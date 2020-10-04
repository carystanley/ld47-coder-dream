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
        await scene.movePlayerTo(entity.x - 80, entity.y + 20);
        scene.playerFaceRight();

        const countTabs = scene.getStoryState('countTabs');
        const countSpaces = scene.getStoryState('countSpaces');
        const hasConsoleLog = scene.getStoryState('hasConsoleLog');

        if (hasConsoleLog) {
            const wizardTalkCount = scene.getStoryState('wizardTalkCount');
            scene.setStoryState('wizardTalkCount', wizardTalkCount+ 1);
            const wizardText = [
                'BE GONE!!',
                'Wretched Creature!',
                'Away With You!!'
            ][wizardTalkCount % 3];

            scene.startConversation(scene.wizard, {
                dialog: [
                    { text: wizardText }
                ]
            });
            return;
        }

        const wizardChoices = [
            {
                'tabs': [
                    { text: 'But spaces have consistency!' },
                    { text: 'They look the same' },
                    { text: 'in every editor', key: 'tabs' }
                ]
            },
            {
                'spaces': [
                    { text: 'But tabs save file size!' },
                    { text: 'and developers can adjust' },
                    { text: 'identation in their editor', key: 'spaces' }
                ]
            }
        ];

        if ((countTabs > 0) && (countSpaces > 0)) {
            wizardChoices.push({
                'both': [
                    { text: 'Get away from me' },
                    { text: 'you VILE creature!' },
                    { text: 'and take this console.log with you', key: 'go' }
                ]
            });
        }

        scene.startConversation(scene.wizard, {
            dialog: [
                { text: 'YOU SHALL NOT PASS!' },
                { text: 'You must answer my question' },
                { text: 'That I may know if thee is' },
                { text: 'FOE or FRIEND' },
                {
                    text: 'Tabs or Spaces?',
                    responses: wizardChoices
                }
            ],
            actions: {
                tabs: () => {
                    scene.setStoryState('countTabs', countTabs + 1);
                },
                spaces: () => {
                    scene.setStoryState('countSpaces', countSpaces + 1);
                },
                go: () => {
                    scene.setStoryState('hasConsoleLog', true);
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

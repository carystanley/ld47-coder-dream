import sceneNavigation from './sceneNavigation';

export default {
    onTalkComputer: async (scene, state, player, entity) => {
        await scene.movePlayerTo(entity.x - 80, entity.y + 20);
        scene.playerFaceRight();

        const hasConsoleLog = scene.getStoryState('hasConsoleLog');
        const hasRightBracket = scene.getStoryState('hasRightBracket');
        const hasLeftBracket = scene.getStoryState('hasLeftBracket');
        const hasTrue = scene.getStoryState('hasTrue');
        const hasWhile = scene.getStoryState('hasWhile');
        var computerText = '';

        if ( hasConsoleLog && hasRightBracket && hasLeftBracket && hasTrue && hasWhile ) {
            scene.startConversation(player, {
                dialog: [
                    { text: '(\'the' },
                    { text: ' end\')' },
                    { text: 'It\'s Finally Finished!!', key: 'done' },
                    { text: 'Now I can wakeup from' },
                    { text: 'this Endless Dream' },
                    { text: 'Thanks for Playing!' },
                    { key: 'theend'}
                ],
                actions: {
                    done: () => {
                        scene.setStoryState('hasTheEnd', true);
                    },
                    theend: async () => {
                        await scene.fadeOut();
                    }
                }
            });
            return;
        }

        if (!hasConsoleLog && !hasRightBracket && !hasLeftBracket && !hasTrue && !hasWhile) {
            computerText = 'FILE NOT FOUND';
        } else if (hasConsoleLog && !hasRightBracket && !hasLeftBracket && !hasTrue && !hasWhile) {
            computerText = '.....';
        } else if (hasRightBracket && !hasLeftBracket) {
            computerText = 'SyntaxError: Unexpected token }';
        } else if (!hasRightBracket && hasLeftBracket) {
            computerText = 'SyntaxError: Unexpected end of input';
        } else if (hasRightBracket && hasLeftBracket && (hasWhile || hasTrue)) {
            computerText = 'SyntaxError: Unexpected token {';
        } else {
            computerText = '....';
        }

        scene.startConversation(scene.computer, {
            dialog: [
                { text: computerText }
            ]
        });
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
                    { text: 'indentation in their editor', key: 'spaces' }
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
                    scene.setStoryState('sceneStuckGuy', true);
                }
            }
        });
    },

    onTalkErrorGuy: async (scene, state, player, entity) => {
        await scene.movePlayerTo(entity.x + 80, entity.y + 20);
        scene.playerFaceLeft();

        const hasFixedBracket = scene.getStoryState('hasFixedBracket');

        scene.startConversation(entity, {
            dialog: [
                { text: hasFixedBracket ?
                    'Thank You!' :
                    '0xE84FC80A580'
                }
            ]
        });
    },

    onConsoleLogErrorGuy: async (scene, state, player, entity) => {
        await scene.movePlayerTo(entity.x + 80, entity.y + 20);
        scene.playerFaceLeft();

        const hasFixedBracket = scene.getStoryState('hasFixedBracket');

        scene.startConversation(entity, {
            dialog: [
                { text: hasFixedBracket ?
                    'That tickles' :
                    'SyntaxError: Unexpected end of input'
                }
            ]
        });
    },

    onRightBracketErrorGuy: async (scene, state, player, entity) => {
        await scene.movePlayerTo(entity.x + 80, entity.y + 20);
        scene.playerFaceLeft();

        const hasFixedBracket = scene.getStoryState('hasFixedBracket');

        if (hasFixedBracket) {
            scene.startConversation(entity, {
                dialog: [
                    { text: 'Hey! cut it out!' }
                ]
            });
        } else {
            scene.startConversation(entity, {
                dialog: [
                    { text: 'You\'ve Fixed me!', key: 'fixed' },
                    { text: 'Thank you!!' },
                    { text: 'It\'s Dangerous to Go Alone' },
                    { text: 'Take this \'while\'', key: 'give' }
                ],
                actions: {
                    fixed: () => {
                        entity.play('error-fix');
                        scene.setStoryState('hasFixedBracket', true);
                    },
                    give: () => {
                        scene.setStoryState('hasWhile', true);
                    }
                }
            });
        }
    },

    onTalkStuckGuy: async (scene, state, player, entity) => {
        await scene.movePlayerTo(entity.x - 80, entity.y + 20);
        scene.playerFaceRight();

        const hasTrued = scene.getStoryState('hasTrued');
        const hasWhiled = scene.getStoryState('hasWhiled');

        if (hasTrued) {
            scene.startConversation(entity, {
                dialog: [
                    { text: 'Just don\'t' }
                ]
            });
        } else if (hasWhiled) {
            scene.startConversation(entity, {
                dialog: [
                    { text: 'Did you find something' },
                    { text: 'to trigger the end condition' }
                ]
            });
        } else {
            scene.startConversation(entity, {
                dialog: [
                    { text: 'Sup?' },
                    { text: 'You noticed my arms?' },
                    { text: 'Yup, I\'m stuck like this' },
                    { text: 'I need an Animation loop' },
                    { text: 'so I can move', key: 'unlockForest' }
                ],
                actions: {
                    unlockForest: () => {
                        scene.setStoryState('sceneForest', true);
                    }
                }
            });
        }
    },

    onWhileStuckGuy: async (scene, state, player, entity) => {
        await scene.movePlayerTo(entity.x - 80, entity.y + 20);
        scene.playerFaceRight();

        const hasWhiled = scene.getStoryState('hasWhiled');
        if (hasWhiled) {
            scene.startConversation(entity, {
                dialog: [
                    { text: 'Stop it!' }
                ]
            });
        } else {
            scene.startConversation(entity, {
                dialog: [
                    { text: 'You\'ve Fixed me!', key: 'fixed' },
                    { text: 'NOT!!' },
                    { text: 'This is much worse' },
                    { text: 'I need something' },
                    { text: 'to trigger a condition' },
                    { text: 'to get out of this loop' }
                ],
                actions: {
                    fixed: () => {
                        entity.play('stuck-run');
                        scene.setStoryState('hasWhiled', true);
                    }
                }
            });
        }
    },

    onTrueStuckGuy: async (scene, state, player, entity) => {
        await scene.movePlayerTo(entity.x - 80, entity.y + 20);
        scene.playerFaceRight();

        const hasTrued = scene.getStoryState('hasTrued');
        const hasWhiled = scene.getStoryState('hasWhiled');

        if (hasTrued || !hasWhiled ) {
            scene.startConversation(entity, {
                dialog: [
                    { text: 'Quit it!' }
                ]
            });
        } else {
            scene.startConversation(entity, {
                dialog: [
                    { text: 'What!?!', key: 'fixed' },
                    { text: 'Seriously?' },
                    { text: 'You had to stop it' },
                    { text: 'HERE' }
                ],
                actions: {
                    fixed: () => {
                        entity.play('stuck-stuck');
                        scene.setStoryState('hasTrued', true);
                    }
                }
            });
        }
    },

    onConsoleLogExpression1: async (scene, state, player, entity) => {
        // typeof NaN --> number
        await scene.movePlayerTo(entity.x + 80, entity.y + 20);
        scene.playerFaceLeft();
        scene.startConversation(player, {
            dialog: [
                { text: 'number' },
                { text: 'Seriously?' },
                { text: 'Well, that\'s JavaScript' }
            ]
        });
    },

    onConsoleLogExpression2: async (scene, state, player, entity) => {
        // Number(true) -> 1
        await scene.movePlayerTo(entity.x + 120, entity.y + 40);
        scene.playerFaceLeft();
        scene.startConversation(player, {
            dialog: [
                { text: ' 1 ' },
                { text: 'huh?' },
                { text: 'Well, that\'s JavaScript' }
            ]
        });
    },

    onConsoleLogExpression3: async (scene, state, player, entity) => {
        // 3 > 2 > 1 -> false
        await scene.movePlayerTo(entity.x - 80, entity.y + 20);
        scene.playerFaceRight();
        scene.startConversation(player, {
            dialog: [
                { text: 'false' },
                { text: 'Come on?' },
                { text: 'Well, that\'s JavaScript' }
            ]
        });
    },

    onConsoleLogExpression4: async (scene, state, player, entity) => {
        // [] == ![] -> true
        await scene.movePlayerTo(entity.x - 80, entity.y + 20);
        scene.playerFaceRight();
        scene.startConversation(player, {
            dialog: [
                { text: 'true', key: 'gotit' },
                { text: 'whatever!' },
                { text: 'Well, that\'s JavaScript' }
            ],
            actions: {
                gotit: () => {
                    scene.setStoryState('hasTrue', true);
                }
            }
        });
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

    onExitLeftExit: async (scene, state, player, entity) => {
        await scene.movePlayerTo(entity.x, player.y);
        scene.scene.restart({ scene: sceneNavigation(scene, scene.sceneId, -1), enter: 'right' });
    },

    onExitRightExit: async (scene, state, player, entity) => {
        await scene.movePlayerTo(entity.x, player.y);
        scene.scene.restart({ scene: sceneNavigation(scene, scene.sceneId, 1), enter: 'left' });

        if (!scene.getStoryState('sceneWizard')) {
            scene.setStoryState('sceneWizard', true);
        }
    },

    default: async (scene, state, player, entity) => {
        scene.playerShrug();
    }
}

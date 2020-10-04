
const scenesOrder = [
    'Start',
    'Wizard',
    'Forest',
    'StuckGuy'
];

function mod(x, n) {
    return ((x % n) + n) % n;
};

export default function sceneNavigation(scene, sceneId, direction) {
    const totalScenes = scenesOrder.length;
    const sceneIndex = scenesOrder.indexOf(sceneId);
    let cursor = sceneIndex;
    let count = 0;

    do {
        cursor = mod(cursor + direction, totalScenes);
        count++;
    } while (!scene.getStoryState('scene' + scenesOrder[cursor]) && (count < totalScenes));
    return scenesOrder[cursor];
}

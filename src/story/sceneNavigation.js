
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
    cursor = mod(cursor + direction, totalScenes);
    return scenesOrder[cursor];
}

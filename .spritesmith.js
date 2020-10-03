module.exports = [
    {
        src: './rawAssets/sprites/*.{png,gif,jpg}',
        destImage: './assets/spritesheet.png',
        destCSS: './assets/spritesheet.json',
        cssTemplate: require('spritesmith-texturepacker'),
        padding: 2
    }
];

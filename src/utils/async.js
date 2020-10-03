export const sleep = async (time) => {
    await new Promise((resolve, reject) => {
        setTimeout(() => { return resolve(); }, time);
    });
};

export const tweenPromise = async (scene, obj, props, duration, easingType = 'Linear', delay = 0) => {
    await new Promise( (resolve, reject) => {
        scene.tweens.add(Object.assign({
            delay,
            targets: obj,
            ease: easingType,
            duration: duration,
            yoyo: false,
            repeat: 0,
            onStart: function () {},
            onComplete: function (a) {
                if (a.progress < 1) {
                    return reject();
                }
                return resolve();
            }
        }, props));
    });
};

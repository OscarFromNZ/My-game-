class Bunny {
    constructor(app, x, y) {
        this.velocity = 5; // for testing
        this.bunny = undefined;
        this.app = app;

        this.initX = x;
        this.initY = y;
    }

    // need this to be a fn cuz doing async stuff
    async setup() {
        const texture = await PIXI.Assets.load('https://i.imgur.com/3EqkexE.png');
        this.bunny = new PIXI.Sprite(texture);

        this.bunny.anchor.set(0.5);
        this.bunny.scale.set(0.05);
        this.bunny.pivot.set(0.5);

        this.bunny.x = this.initX
        this.bunny.y = this.initY;
    }
}
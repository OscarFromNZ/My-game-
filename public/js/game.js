class Game {
    constructor() {
        console.log("Hi there from Game!");
        this.socket = io();
        this.firstLoop = true;
        this.maxAngularVelocity = 0.15;
        this.bunny = undefined;
        this.otherBunnies = [];
        this.mouseX = undefined;
        this.mouseY = undefined;
    }

    async start() {
        await this.initApp();
        await this.initWorld();
        await this.initBunnies();
        this.setupEventListeners();
        this.listenSockets();
        this.socket.emit('chat message', 'Hello, world!');
    }

    async initApp() {
        this.app = new PIXI.Application();
        await this.app.init({ background: '#1099bb', resizeTo: window });
        document.body.appendChild(this.app.canvas);
    }

    async initWorld() {
        this.world = new World();
        this.app.stage.addChild(await this.world.world);
    }

    async initBunnies() {
        this.bunny = await this.createBunny(this.app.screen.width / 2, this.app.screen.height / 2);
        for (let i = 0; i < 1; i++) {
            let otherBunny = await this.createBunny(500, 300);
            this.otherBunnies.push(otherBunny);
        }
    }

    async createBunny(x, y) {
        let bunny = new Bunny(this.app, x, y);
        await bunny.setup();
        this.app.stage.addChild(bunny.bunny);
        await this.world.world.addChild(bunny.bunny);
        return bunny;
    }

    setupEventListeners() {
        this.app.stage.interactive = true;
        this.app.stage.hitArea = this.app.screen;
        this.app.stage.on('pointermove', this.onPointerMove.bind(this));
        document.addEventListener('keydown', this.onKeyDown.bind(this));
        this.app.ticker.add(this.gameLoop.bind(this));
    }

    onPointerMove(e) {
        this.mouseX = e.data.global.x;
        this.mouseY = roundNumber(e.data.global.y);
    }

    onKeyDown = (e) => {
        console.log('Key pressed:', e.key);
    }


    listenSockets() {
        this.socket.on('chat message', (msg) => {
            console.log('Received message:', msg);
        });
    }

    gameLoop = (time) => {
        if (!this.bunny || !this.mouseX || !this.mouseY || !this.bunny.bunny.x || !this.bunny.bunny.y) {
            console.log(this.bunny.bunny.x)
            return console.error('Missing bunny or mouse coordinates.');
        }
    
        let angleToCursorRad = Math.atan2(this.mouseY - this.bunny.bunny.y, this.mouseX - this.bunny.bunny.x);
        //console.log(angleToCursorRad * 180 / Math.PI, "angle to cursor");
    
        let currentAngle = this.bunny.bunny.rotation;
        //console.log(currentAngle * 180 / Math.PI, "current angle");
    
        if (this.firstLoop) {
            console.log('bunny rotation setup');
            this.bunny.bunny.rotation = angleToCursorRad;
            this.firstLoop = false;
            return;
        }
    
        let angleDifferenceRad = angularDisplacement(angleToCursorRad, currentAngle);
        //console.log(angleDifferenceRad * 180 / Math.PI, 'angle difference');
    
        let direction = Math.sign(angleDifferenceRad); // neg counter pos clockwise
        let maxChangeInAngle = this.maxAngularVelocity * time.deltaTime;
        let changeInAngle = Math.min(Math.abs(angleDifferenceRad), maxChangeInAngle) * direction;
    
        if (Math.abs(changeInAngle) > 0.1) console.log('--------------');
        this.bunny.bunny.rotation += roundNumber(changeInAngle);

        const distance = this.bunny.velocity * time.deltaTime;
        this.bunny.bunny.x += Math.cos(this.bunny.bunny.rotation) * distance;
        this.bunny.bunny.y += Math.sin(this.bunny.bunny.rotation) * distance;
       
        console.log(this.bunny.bunny.x, ' bunny x');

        this.updateCamera();
    }
    
    // this is all buggy
    updateCamera() {
        // Center the camera on the bunny
        this.app.stage.position.x = this.app.screen.width / 2 - this.bunny.bunny.x;
        this.app.stage.position.y = this.app.screen.height / 2 - this.bunny.bunny.y;
    }    

}

function angularDisplacement(angle1, angle2) {
    let diff = angle1 - angle2;

    if (diff > Math.PI) {
        diff -= 2 * Math.PI;
    } else if (diff < -Math.PI) {
        diff += 2 * Math.PI;
    }

    return diff;
}

function roundNumber(number) {
    return Number(Math.round((number) + 'e2') + 'e-2');
}
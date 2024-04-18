class Game {
    constructor() {
        console.log("Hi there from Game!");
        this.socket = io();

        this.velocity = 2; // for testing
        this.rotationSpeed = 0.02;
        this.rotationAcceleration = 0.001;
        this.maxRotationSpeed = 0.3;
        
        this.firstLoop = true; 
        //this.angularVelocity = 0;
        this.maxAngularVelocity = 0.1;
        
        this.mouseX = undefined;
        this.mouseY = undefined;
    }

    async start() {
        this.app = new PIXI.Application();

        await this.app.init({ background: '#1099bb', resizeTo: window });

        document.body.appendChild(this.app.canvas);

        this.setupBunny();

        this.app.stage.interactive = true;
        this.app.stage.hitArea = this.app.screen;

        this.app.stage.on('pointermove', this.onPointerMove);
        this.app.stage.on('keydown', this.onKeyDown);

        this.app.ticker.add(this.gameLoop);

        this.listenSockets();

        this.socket.emit('chat message', 'Hello, world!');
    }

    async setupBunny() {
        const texture = await PIXI.Assets.load('https://pixijs.com/assets/bunny.png');

        this.bunny = new PIXI.Sprite(texture);

        this.bunny.anchor.set(0.5);
        this.bunny.x = this.app.screen.width / 2;
        this.bunny.y = this.app.screen.height / 2;

        this.app.stage.addChild(this.bunny);
    }

    onPointerMove = (e) => {
        this.mouseX = e.data.global.x;
        this.mouseY = e.data.global.y;
    }

    onKeyDown = (e) => {
        console.log('valid function ig');
    }


    listenSockets() {
        this.socket.on('chat message', (msg) => {
            console.log('Received message:', msg);
        });
    }

    /*
    gameLoop = (time) => {
        if (!this.bunny || this.bunny.angleToCursor === undefined) return;

        const distance = this.velocity * time.deltaTime;

        let targetAngle = this.bunny.angleToCursor + Math.PI / 2;
        let currentAngle = this.bunny.rotation;

        // Normalize angles to the range -PI to PI
        let deltaAngle = targetAngle - currentAngle;
        if (deltaAngle > Math.PI) deltaAngle -= 2 * Math.PI;
        if (deltaAngle < -Math.PI) deltaAngle += 2 * Math.PI;

        // Increase rotation speed with a limit
        this.rotationSpeed = Math.min(this.rotationSpeed + this.rotationAcceleration, this.maxRotationSpeed);

        // Apply the rotation with the current speed
        currentAngle += deltaAngle * this.rotationSpeed;

        this.bunny.rotation = currentAngle;
        this.bunny.x += Math.cos(currentAngle - Math.PI / 2) * distance;
        this.bunny.y += Math.sin(currentAngle - Math.PI / 2) * distance;
    }
    */

    gameLoop = (time) => {
        if (!this.bunny || !this.mouseX || !this.mouseY || !this.bunny.x || !this.bunny.y) {
            return console.error('Missing bunny or mouse coordinates.');
        }
    
        // angle it wants to be at
        let angleToCursorRad = Math.atan2(this.mouseY - this.bunny.y, this.mouseX - this.bunny.x);
    
        if (this.firstLoop) {
            console.log('bunny rotation setup');
            this.bunny.rotation = angleToCursorRad + 1/2 * Math.PI;
            this.firstLoop = false;
            return;
        }
    
        // shortest angle difference between em
        let angleDifferenceRad = (angleToCursorRad - this.bunny.rotation) % (2 * Math.PI) + 1/2 * Math.PI;

        // because of fun velocity restrictions
        let maxChangeInAngle = this.maxAngularVelocity * time.deltaTime; 

        // using the fun velocity restriction
        let changeInAngle = angleDifferenceRad;
        
        if (Math.abs(angleDifferenceRad) > maxChangeInAngle) {
            changeInAngle = Math.sign(angleDifferenceRad) * maxChangeInAngle;
        }
    
        this.bunny.rotation += changeInAngle;
    
        const distance = this.velocity * time.deltaTime;
        this.bunny.x += Math.cos(this.bunny.rotation - Math.PI / 2) * distance;
        this.bunny.y += Math.sin(this.bunny.rotation - Math.PI / 2) * distance;
    }    
}
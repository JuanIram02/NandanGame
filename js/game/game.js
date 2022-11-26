import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.117.1/build/three.module.js';
import {MTLLoader} from 'https://cdn.jsdelivr.net/npm/three@0.117.1/examples/jsm/loaders/MTLLoader.js';
import {OBJLoader} from 'https://cdn.jsdelivr.net/npm/three@0.117.1/examples/jsm/loaders/OBJLoader.js';
import {FBXLoader} from 'https://cdn.jsdelivr.net/npm/three@0.117.1/examples/jsm/loaders/FBXLoader.js';

var Game = Game || {};
Game.player = { 
    collision: false,
    isFalling: false,
    canJump: false,
    cy: 0,
    vy: 0,
    moveSpeed: 1
};
Game.materials = {
    solid: new THREE.MeshNormalMaterial({})
};
Game.MESH_VISIBILTY = false;
Game.USE_WIREFRAME = false;
Game.GAME_LOADED = false;
Game.GAME_STARTED = false;
Game.RED_PIECE = 10;
Game.GREEN_PIECE = 11;

Game.gameOver = false;

var deltaTime;
let mixer;
var keys = {};

Game.addLoader = function() {

    var progress = document.createElement('div');
    progress.setAttribute("id", "loader");
    var progressBar = document.createElement('div');
    progressBar.setAttribute("id", "bar");
    progress.appendChild(progressBar);
    document.body.appendChild(progress);

    this.loadingManager = new THREE.LoadingManager();
    this.loadingManager.onProgress = function(item, loaded, total) {
        progressBar.style.width = (loaded / total * 100) + '%';
        console.log(item, loaded, total);
    };
    this.loadingManager.onLoad = function() {
        console.log("loaded all resources");
        !Game.GAME_LOADED && document.body.removeChild(progress);
        Game.GAME_LOADED = true;
        Game.GAME_STARTED = true;
        Game.onResourcesLoaded();
    };
}

Game.onResourcesLoaded = function() {

    this.muñeco.scale.set(2, 2, 2);
    this.muñeco.rotation.y = Math.PI;
    this.muñeco.position.set(0, 0, 20);
    this.Background.add(this.muñeco);
   
    this.sphere = new THREE.Mesh(
        new THREE.SphereGeometry(0.19, 20, 20), this.materials.solid);
    this.sphere.position.set(this.player.object.position.x, this.player.object.position.y, this.player.object.position.z);
    this.sphere.geometry.computeBoundingSphere();
    this.scene.add(this.sphere);
    this.sphere.visible = this.MESH_VISIBILTY;

    this.player.object.position.set(0, 12, 4);
    this.player.object.scale.set(0.05, 0.05, 0.05);
    this.player.object.rotation.y = Math.PI / 2;
    this.scene.add(this.player.object);

    this.addPlatform();

    this.player.cy = this.player.object.position.y;
}

Game.init = function() {

    this.resetGravity();

    this.scene = new THREE.Scene();

    var visibleSize = { width: window.innerWidth, height: window.innerHeight};
    this.camera = new THREE.PerspectiveCamera(75, visibleSize.width / visibleSize.height, 0.1, 100);
	this.camera.position.z = 80;
	this.camera.position.y = 40;

    this.clock = new THREE.Clock();	

    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setPixelRatio(visibleSize.width / visibleSize.height);
    this.renderer.setSize(visibleSize.width, visibleSize.height);
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.BasicShadowMap;

    document.body.appendChild(this.renderer.domElement);

    document.addEventListener('keydown', onKeyDown);
	document.addEventListener('keyup', onKeyUp);		

    this.addLights();
    this.addLoader();
    this.loadResources();
    update();
}

Game.addLights = function() {
    var ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    this.scene.add(ambientLight);

    this.light = new THREE.DirectionalLight(0xffffff, .6);
    this.light.position.set(0, 50, 0);
    this.light.target.position.set(-5, 0, 0);
    this.light.castShadow = true;
    this.scene.add(this.light);
}

Game.loadResources = function() {

    this.Background = new THREE.Group();
    this.scene.add(this.Background);

    let texture_ft = new THREE.TextureLoader().load('assets/bk.jpg');           
    var bgMesh = new THREE.Mesh(
        new THREE.PlaneGeometry(260, 150, 4, 5),
        new THREE.MeshBasicMaterial({
            map: texture_ft,
            wireframe: false,
            side: THREE.DoubleSide
        })
    );
    bgMesh.receiveShadow = true;
    bgMesh.position.set(0, 30, -4)
    this.Background.add(bgMesh);

    var platform = {
        path: "assets/Nieve/",
        obj: "plataforma_2.obj",
        mtl: "plataforma_2.mtl",
        mesh: null
    }

    var muñeco = {
        path: "assets/Nieve/mono de nieve/",
        obj: "snowman.obj",
        mtl: "snowman.mtl",
        mesh: null
    }

    var Player = {
        path: "assets/Personajes/",
        obj: "Jugador.fbx",
        animationRun: "Animations/Fast Run.fbx",
    }

    loadFBX(Player.path, Player.obj, Player.animationRun, (object) => {
        mixer = new THREE.AnimationMixer( object[0] );
        object[0].animations = object[1].animations;

		const action = mixer.clipAction( object[0].animations[ 0 ] );
		action.play();

        Game.player.object = object[0];
    });

    loadOBJWithMTL(platform.path, platform.obj, platform.mtl, (object) => {
        object.scale.set(1, 1, 1);
        object.scale.set(10, 30, 7)
        object.rotation.y = Math.PI
        object.traverse(function(node) {
            if (node instanceof THREE.Mesh) {
                node.castShadow = true;
                node.receiveShadow = true;
                node.material.color.setHex;
            }
        });
        Game.platformGround = object;
    });

    loadOBJWithMTL(platform.path, platform.obj, platform.mtl, (object) => {
        object.scale.set(10, 10, 7)
        object.rotation.y = Math.PI
        object.traverse(function(node) {
            if (node instanceof THREE.Mesh) {
                node.castShadow = true;
                node.receiveShadow = true;
                node.material.color.setHex;
            }
        });
        Game.platformFlying = object;
    });

    loadOBJWithMTL(muñeco.path, muñeco.obj, muñeco.mtl, (object) => {
        object.scale.set(0.2, 0.2, 0.2);
        object.traverse(function(node) {
            if (node instanceof THREE.Mesh) {
                node.castShadow = true;
                node.receiveShadow = true;
            }
        });
        Game.muñeco = object;
    });

    this.platformGroup = new THREE.Group();
    this.scene.add(this.platformGroup);   

}

Game.addPlatform = function() {

    this.colliderArr = [];
    this.platformArr = [];

    var platformPieceType = [
        { type: this.GREEN_PIECE },
        { type: this.RED_PIECE }
    ];

    var yDiff = 20;
    var separationValue = 19;
    var plIndex = -1;

    var levelCount = 3; var collider = [];
    var platGroupArr = [];
    var colliderGroupArr = [];
    var platformPiece;

    var randomPlatform = [
        {
            count: 6,
            separation: [0, 1, 2, 3, 4, 5],
            type: [1, 1, 1, 1, 1, 1]
        },
        {
            count: 4,
            separation: [-2, -1, 2, 3],
            type: [0, 0, 0, 0]
        },
        {
            count: 5,
            separation: [6, 7, 8, 11, 12],
            type: [0, 0, 0, 0, 0]
        },
    ];
    
    for (var a = 0; a < levelCount; a++) {

        ++plIndex;
        if (plIndex >= randomPlatform.length) {
            plIndex = 0;
        }

        platGroupArr = [];
        colliderGroupArr = [];

        var type = randomPlatform[plIndex].type;

        for (var i = 0; i < randomPlatform[plIndex].count; i++) {

            //diferentes tipos de plataforma, ahorita solo hay box
            if (platformPieceType[type[i]].type === this.RED_PIECE) {//this.RED_PIECE es lo que hay que modificar para que poner mas tipos
                platformPiece = this.platformGround.clone();
                platformPiece.position.set(0, 2, 5);
            }
                
            else {
                platformPiece = this.platformFlying.clone();
                platformPiece.position.set(0, 7.5, 5);
            }
                


            collider = [];

            collider.push(new THREE.Mesh(new THREE.BoxGeometry(19, 10, 1),
             this.materials.solid));
            collider[0].position.set(0, 10, 5);
            collider[0].rotation.x += Math.PI / 2;
            collider[0].receiveShadow = true;
            collider[0].visible = this.MESH_VISIBILTY;
            collider[0].platformType = platformPieceType[type[i]].type; //aqui le ponemos collider diferentes dependiendo de el tipo de pieza


            var platGroup = new THREE.Group();
            platGroup.add(platformPiece);
            platGroup.add(collider[0]);
            platGroup.position.x += randomPlatform[plIndex].separation[i] * separationValue;
            platGroup.position.y += (a * yDiff);
            this.platformGroup.add(platGroup);

            platGroupArr.push(platGroup);

            colliderGroupArr.push(collider[0]);

        }

        this.platformArr[(a * 20) + 10] = platGroupArr;
        this.colliderArr[(a * 20) + 10] = colliderGroupArr;
    }
}

function loadOBJWithMTL(path, objFile, mtlFile, onLoadCallback) {
    var mtlLoader = new MTLLoader(Game.loadingManager);
    mtlLoader.setPath(path);
    mtlLoader.load(mtlFile, (materials) => {
        
        var objLoader = new OBJLoader(Game.loadingManager);
        objLoader.setMaterials(materials);
        objLoader.setPath(path);
        objLoader.load(objFile, (object) => {
            onLoadCallback(object);
        });

    });
}

function loadFBX(path, obj, animacion, onLoadCallback) {

    var player = [];
    const loader = new FBXLoader(Game.loadingManager);
    loader.setPath(path);
    loader.load(obj, function ( object ) {				
        object.traverse( function ( child ) {
            if ( child.isMesh ) {
                child.castShadow = true;
                child.receiveShadow = true;
            }
        });
        player.push(object);
    } );

    loader.load( animacion, function ( object ) {	
        player.push(object);
        onLoadCallback(player);
    });       

    

}

function onKeyDown(event) {
    keys[String.fromCharCode(event.keyCode)] = true;
}
function onKeyUp(event) {
    keys[String.fromCharCode(event.keyCode)] = false;
}

Game.updateKeyboard = function() {
    if (!this.gameOver) {
        if (keys["%"]) { // left arrow key
            this.player.object.position.x -= this.player.moveSpeed;
            this.camera.translateX(-this.player.moveSpeed);
            this.Background.translateX(-this.player.moveSpeed);
        }

        if (keys["'"]) { // right arrow key
            this.player.object.position.x += this.player.moveSpeed;
            this.camera.translateX(this.player.moveSpeed);
            this.Background.translateX(this.player.moveSpeed);
        }

        var yaw = 0;
		var forward = 0;
		if (keys["A"]) {
			yaw = 5;
		} else if (keys["D"]) {
			yaw = -5;
		}
		if (keys["W"]) {
			forward = -20;
		} else if (keys["S"]) {
			forward = 20;
		}
		if (keys[""]){
			Game.camera.position.y -= 10 * deltaTime;
		}
        if (keys[" "]){
			if(Game.player.canJump){
                
                Game.player.vy = 10;
                Game.player.canJump = false; 
                Game.player.collision = false;  
                Game.player.isFalling = true;   

            }
		}
        if (!keys[" "]){		
            Game.player.isJumping = false;
		}
		
		Game.camera.rotation.y += yaw * deltaTime;
		Game.camera.translateZ(forward * deltaTime);
    }
}

Game.findCollision = function() {

    var ind = Math.abs(Math.round(this.player.cy));

    if (this.colliderArr[ind]) {
        for (var i = 0; i < this.colliderArr[ind].length; i++) {

                this.player.object.children[0].children[0].geometry.computeBoundingBox(); 
                this.colliderArr[ind][i].geometry.computeBoundingBox();
                this.player.object.updateMatrixWorld();
                this.colliderArr[ind][i].updateMatrixWorld();
    
                var box1 = this.player.object.children[0].children[0].geometry.boundingBox.clone();
                box1.applyMatrix4(this.player.object.matrixWorld);
    
                var box2 = this.colliderArr[ind][i].geometry.boundingBox.clone();
                box2.applyMatrix4(this.colliderArr[ind][i].matrixWorld);
                if (box1.intersectsBox(box2)) {
                    return true;
                }
        }
    }

    return false;
}

Game.resetGravity = function  () {
    this.dt = 0.1; //delta time to make smooth movement
    this.mvy = 10;  //max velocity
    this.gravity = 0.2;
}

function update() {
    requestAnimationFrame(update);

    deltaTime = Game.clock.getDelta();
    if ( mixer ) mixer.update( deltaTime );

    Game.updateKeyboard();
    Game.renderer.render(Game.scene, Game.camera);

    if (Game.GAME_STARTED) {
        if (!Game.gameOver) {                                              

            if (Game.player.collision) { // ball is on surface
                Game.player.vy = 0;
                Game.player.canJump = true;
                Game.player.isFalling = false;
            }        
            else{
                Game.player.isFalling = true;
            }    

            if(Game.player.isFalling) {       
              
                Game.player.canJump = false;
                if(Game.player.vy <= Game.mvy && Game.player.vy >= -Game.mvy)
                    Game.player.vy -= Game.gravity;      
                               
                Game.player.cy += Game.player.vy * Game.dt;
                Game.player.object.position.y = Game.player.cy; 
            }                                                                                                                     

            Game.sphere.position.set(Game.player.object.position.x, 
            Game.player.object.position.y, Game.player.object.position.z);
            Game.player.collision = Game.findCollision();
        }
    }
}

window.onload = function() {
    Game.init();
};
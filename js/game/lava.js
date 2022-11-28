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
    moveSpeed: 1,
    monedas: 0,
    invensible: false,
    fin: 0
};
Game.materials = {
    solid: new THREE.MeshNormalMaterial({})
};

//VARIABLES
Game.MESH_VISIBILTY = false;
Game.USE_WIREFRAME = false;
Game.GAME_LOADED = false;
Game.GAME_STARTED = false;
Game.RED_PIECE = 10;
Game.GREEN_PIECE = 11;
Game.PICOS = 12;
Game.ROCA = 13;
Game.TORRE = 14;
Game.MONEDA = 15;
Game.PILDORA = 16;

Game.gameOver = false;


var deltaTime = 0;
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
    
//EDICION DE MODELOS
Game.onResourcesLoaded = function() {

    this.mountain.scale.set(52, 150, 115);
    this.mountain.position.set(0, 5, -10);
    this.mountain.rotation.y = 30; 
    this.Background.add(this.mountain);

    this.plano.scale.set(7, 7, 7);
    this.plano.position.set(0, -51.5, 0);
    this.Background.add(this.plano);  

    this.sphere = new THREE.Mesh(
        new THREE.SphereGeometry(0.19, 20, 20), this.materials.solid);
        this.sphere.position.set(this.player.object.position.x, this.player.object.position.y, this.player.object.position.z);
        this.sphere.geometry.computeBoundingSphere();
        this.scene.add(this.sphere);
        this.sphere.visible = this.MESH_VISIBILTY;
    
        this.player.object.position.set(-15, 12, 20);
        this.player.object.scale.set(0.05, 0.05, 0.05);
        this.player.object.rotation.y = Math.PI / 2;
        this.scene.add(this.player.object);
    
        this.addPlatform();
    
        this.player.cy = this.player.object.position.y;
}

Game.init = function() {

    this.resetGravity();

    this.timer = document.getElementById("timer");
    this.again = document.getElementById("again");
    this.monedas = document.getElementById("monedas");
    this.contadorInvensibilidad = document.getElementById("invensible");

    this.scene = new THREE.Scene();

    var visibleSize = { width: window.innerWidth, height: window.innerHeight};
    this.camera = new THREE.PerspectiveCamera(75, visibleSize.width / visibleSize.height, 0.1, 200);
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

    //FONDO  
    let texture_ft = new THREE.TextureLoader().load('assets/volcan.jpg');        
    var bgMesh = new THREE.Mesh(
        new THREE.PlaneGeometry(800, 500, 4, 0),
        new THREE.MeshBasicMaterial({
            map: texture_ft,
            wireframe: false,
            side: THREE.DoubleSide
        })
    );

    bgMesh.receiveShadow = true;
    bgMesh.position.set(0, 30, -118)
    this.Background.add(bgMesh);

    //CARGA DE MODELOS 

    var moneda = {
        path: "assets/Items/Moneda/",
        obj: "moneda.obj",
        mtl: "moneda.mtl",
        mesh: null
    }

    var pildora = {
        path: "assets/Items/Pildora/",
        obj: "pildora.obj",
        mtl: "pildora.mtl",
        mesh: null
    }

    var platform = {
        path: "assets/Lava/",
        obj: "plataforma_2.obj",
        mtl: "plataforma_2.mtl",
        mesh: null
    }
  
    var mountain = {
        path: "assets/Lava/",
        obj: "montana.obj",
        mtl: "montana.mtl",
        mesh: null
    }

    var pico = {
        path: "assets/Lava/",
        obj: "picos.obj",
        mtl: "picos.mtl",
        mesh: null
    }

    var roca = {
        path: "assets/Nieve/roca/",
        obj: "roca.obj",
        mtl: "roca.mtl",
        mesh: null
    }

    var torre = {
        path: "assets/Nieve/",
        obj: "Torre.obj",
        mtl: "Torre.mtl",
        mesh: null
    }

    var plano = {
        path: "assets/Lava/",
        obj: "Plano.obj",
        mtl: "Plano.mtl",
        mesh: null
    }
    var Player = {
        path: "assets/Personajes/",
        obj: "Jugador.fbx",
        animationRun: "Animations/Fast Run.fbx",
    }
    //Carga de Modelos
    loadFBX(Player.path, Player.obj, Player.animationRun, (object) => {
        mixer = new THREE.AnimationMixer( object[0] );
        object[0].animations = object[1].animations;

		const action = mixer.clipAction( object[0].animations[ 0 ] );
		action.play();

        Game.player.object = object[0];
    });

    loadOBJWithMTL(platform.path, platform.obj, platform.mtl, (object) => {
        object.scale.set(1, 1, 1);
        object.scale.set(10, 10, 16);
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
        object.scale.set(10, 4, 16)
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

    loadOBJWithMTL(mountain.path, mountain.obj, mountain.mtl, (object) => {
        object.scale.set(1, 1, 1);
        object.traverse(function(node) {
            if (node instanceof THREE.Mesh) {
                node.castShadow = true;
                node.receiveShadow = true;
            }
        });
        Game.mountain = object;
    });

    loadOBJWithMTL(pico.path, pico.obj, pico.mtl, (object) => {
        object.scale.set(1, 1, 1);
        object.scale.set(7, 8, 7);
        object.traverse(function(node) {
            if (node instanceof THREE.Mesh) {
                node.castShadow = true;
                node.receiveShadow = true;
            }
        });
        Game.pico = object;
    });

    loadOBJWithMTL(moneda.path, moneda.obj, moneda.mtl, (object) => {
        object.scale.set(3, 3, 3);
        object.traverse(function(node) {
            if (node instanceof THREE.Mesh) {
                node.castShadow = true;
                node.receiveShadow = true;
            }
        });
        Game.moneda = object;
    });

    loadOBJWithMTL(pildora.path, pildora.obj, pildora.mtl, (object) => {
        object.scale.set(3, 3, 3);
        object.traverse(function(node) {
            if (node instanceof THREE.Mesh) {
                node.castShadow = true;
                node.receiveShadow = true;
            }
        });
        Game.pildora = object;
    });


    loadOBJWithMTL(roca.path, roca.obj, roca.mtl, (object) => {
        object.scale.set(1, 1, 1);
        object.scale.set(6, 6, 6);
        object.traverse(function(node) {
            if (node instanceof THREE.Mesh) {
                node.castShadow = true;
                node.receiveShadow = true;
            }
        });
        Game.roca = object;
    });

    loadOBJWithMTL(torre.path, torre.obj, torre.mtl, (object) => {
        object.scale.set(1, 1, 1);
        object.scale.set(7, 7, 3.5);
        object.traverse(function(node) {
            if (node instanceof THREE.Mesh) {
                node.castShadow = true;
                node.receiveShadow = true;
            }
        });
        Game.torre = object;
    });

    loadOBJWithMTL(plano.path, plano.obj, plano.mtl, (object) => {
        object.scale.set(1, 1, 1);
        object.traverse(function(node) {
            if (node instanceof THREE.Mesh) {
                node.castShadow = true;
                node.receiveShadow = true;
            }
        });
        Game.plano = object;
    });

    this.platformGroup = new THREE.Group();
    this.scene.add(this.platformGroup);
    

}    

Game.addPlatform = function() {

    this.colliderArr = [];
    this.platformArr = [];

    var platformPieceType = [
        { type: this.GREEN_PIECE },
        { type: this.RED_PIECE },
        { type: this.PICOS },
        { type: this.ROCAS },
        { type: this.TORRE },
        { type: this.MONEDA },
        { type: this.PILDORA }

    ];

    var yDiff = 20;
    var separationValue = 19;
    var plIndex = -1;

    var levelCount = 4; var collider = [];
    var platGroupArr = [];
    var colliderGroupArr = [];
    var platformPiece;

    var randomPlatform = [
        {
            count: 72,
            separation: [-4, -3, -2, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18,
                         19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39,
                          40, 41, 42, 43, 44, 45, 46, 47, 48, 49,  50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62,
                          63, 64, 65, 66, 67],
            type: [1, 2, 1, 1, 2, 2, 1, 1, 2, 2, 1, 1, 1, 2, 2, 1, 1, 2, 2, 1, 2, 2, 2, 1, 2, 2, 1, 1, 2, 2, 1, 2, 2, 1, 
                    1, 1, 2, 2, 1, 2, 2, 2, 2, 2, 1, 2, 2, 1, 1, 2, 1, 2, 2, 2, 2, 1, 1, 2, 2, 1, 2, 2, 1, 1, 2, 2, 1, 1, 1, 1, 1, 4]
        },
        {
            count: 20,
            separation: [-2, -1, 2, 3, 7, 15, 17, 19, 22, 23, 26, 29, 34, 39, 46, 47, 53, 54, 55, 56],
            type: [0, 0, 0, 0, 5, 3, 5, 3, 0, 0, 5, 3, 0, 0, 0, 0, 0, 0, 5, 3]
        },
        {
            count: 17,
            separation: [0, 6, 7, 8, 11, 12, 17, 26, 32, 36, 37, 41, 44, 49, 50, 51, 58],
            type: [5, 0, 0, 0, 0, 0, 3, 0, 5, 0, 0, 3, 3, 5, 3, 3, 0]
        },
        {
            count: 4,
            separation: [12, 37, 43, 65],
            type: [5, 6, 5, 5]
        },
        //pildora 37;
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
                platformPiece.position.set(0, .5, 20);
            }
                
            if (platformPieceType[type[i]].type === this.GREEN_PIECE){
                platformPiece = this.platformFlying.clone();
                platformPiece.position.set(0, 6, 20);
            }

            if (platformPieceType[type[i]].type === this.PICOS){
                platformPiece = this.pico.clone();
                platformPiece.position.set(0, -4, 20);
            }

            if (platformPieceType[type[i]].type === this.ROCAS){
                platformPiece = this.roca.clone();
                platformPiece.position.set(0, 4, 20);
            }

            if (platformPieceType[type[i]].type === this.TORRE){
                platformPiece = this.torre.clone();
                platformPiece.position.set(0, 7.5, 13);
            }

            if (platformPieceType[type[i]].type === this.MONEDA){
                platformPiece = this.moneda.clone();
                platformPiece.position.set(0, 12, 20);
            }

            if (platformPieceType[type[i]].type === this.PILDORA){
                platformPiece = this.pildora.clone();
                platformPiece.position.set(0, 12, 20);
            }


            collider = [];

            if (platformPieceType[type[i]].type === this.ROCAS){
                collider.push(new THREE.Mesh(new THREE.BoxGeometry(12, 10, 1),
             this.materials.solid));
            collider[0].active = true;
            collider[0].position.set(0, 10, 20);
            collider[0].rotation.x += Math.PI / 2;
            collider[0].receiveShadow = true;
            collider[0].visible = this.MESH_VISIBILTY;
            collider[0].platformType = platformPieceType[type[i]].type;
            }
            if (platformPieceType[type[i]].type === this.MONEDA){
                collider.push(new THREE.Mesh(new THREE.BoxGeometry(9, 10, 5),
             this.materials.solid));
            collider[0].active = true;
            collider[0].position.set(0, 10, 20);
            collider[0].rotation.x += Math.PI / 2;
            collider[0].receiveShadow = true;
            collider[0].visible = this.MESH_VISIBILTY;
            collider[0].platformType = platformPieceType[type[i]].type;
            }
            if (platformPieceType[type[i]].type === this.PILDORA){
                collider.push(new THREE.Mesh(new THREE.BoxGeometry(9, 10, 5),
             this.materials.solid));
            collider[0].active = true;
            collider[0].position.set(0, 10, 20);
            collider[0].rotation.x += Math.PI / 2;
            collider[0].receiveShadow = true;
            collider[0].visible = this.MESH_VISIBILTY;
            collider[0].platformType = platformPieceType[type[i]].type;
            }
            else{
                collider.push(new THREE.Mesh(new THREE.BoxGeometry(19, 10, 1),
             this.materials.solid));
            collider[0].active = true;
            collider[0].position.set(0, 10, 20);
            collider[0].rotation.x += Math.PI / 2;
            collider[0].receiveShadow = true;
            collider[0].visible = this.MESH_VISIBILTY;
            collider[0].platformType = platformPieceType[type[i]].type; //aqui le ponemos collider diferentes dependiendo de el tipo de pieza
            }          

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
    else{
        if (keys[" "]){		
            Game.restart();
		}
    }
}

Game.restart = function () {
  
    this.player.object.position.set(-15, 12, 20);
    this.player.monedas = 0;
    this.camera.position.x = 0;
    this.Background.position.x = 0;

    this.clock = new THREE.Clock();	
    this.again.style.display = "none";

    for(var y = 0; y < this.colliderArr.length; y++){
         if (this.colliderArr[y]) {
            for (var i = 0; i < this.colliderArr[y].length; i++) {
                if (this.colliderArr[y][i].platformType === this.MONEDA){
                        
                    this.colliderArr[y][i].active = true;
                    this.platformArr[y][i].visible = true;

                }
                if (this.colliderArr[y][i].platformType === this.PILDORA){
                    
                    this.colliderArr[y][i].active = true;
                    this.platformArr[y][i].visible = true;

                }
            }
        }
    }
   

    this.gameOver = false;

}

Game.findCollision = function() {

    var ind = Math.abs(Math.round(this.player.cy));

    if (this.colliderArr[ind]) {
        for (var i = 0; i < this.colliderArr[ind].length; i++) {
            if(this.colliderArr[ind][i].active == true){
                this.player.object.children[0].children[0].geometry.computeBoundingBox(); 
                this.colliderArr[ind][i].geometry.computeBoundingBox();
                this.player.object.updateMatrixWorld();
                this.colliderArr[ind][i].updateMatrixWorld();
    
                var box1 = this.player.object.children[0].children[0].geometry.boundingBox.clone();
                box1.applyMatrix4(this.player.object.matrixWorld);
    
                var box2 = this.colliderArr[ind][i].geometry.boundingBox.clone();
                box2.applyMatrix4(this.colliderArr[ind][i].matrixWorld);
                if (box1.intersectsBox(box2)) {
                    if (this.colliderArr[ind][i].platformType === this.PICOS){
                        if(!this.player.invensible){
                            this.gameOver = true;
                        this.clock.stop();
                        Game.timer.innerHTML = "GAME OVER";
                        Game.again.style.display = "block"
                        }                        
                    }
                    if (this.colliderArr[ind][i].platformType === this.MONEDA){
                        
                        this.colliderArr[ind][i].active = false;
                        this.platformArr[ind][i].visible = false;
                        this.player.monedas++;
                        return false;

                    }
                    if (this.colliderArr[ind][i].platformType === this.PILDORA){
                        
                        this.colliderArr[ind][i].active = false;
                        this.platformArr[ind][i].visible = false;
                        this.player.invensible = true;
                        this.contadorInvensibilidad.style.display = "block"
                        this.player.fin = Game.clock.getElapsedTime() + 5;
                        return false;

                    }
                    return true;
                }
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

function timer() {

    var num = Game.clock.getElapsedTime();
    var minutos = Math.floor(num / 60);  
    var segundos = Math.round(num % 60);

    if(minutos < 10){
        if(segundos < 10){
            Game.timer.innerHTML = "Time: 0" + minutos + ":0" + segundos;
        }
        else{
            Game.timer.innerHTML = "Time: 0" + minutos + ":" + segundos;
        }
    }
    else{
        if(segundos < 10){
            Game.timer.innerHTML = "Time: " + minutos + ":0" + segundos;
        }
        else{
            Game.timer.innerHTML = "Time: " + minutos + ":" + segundos;
        }
    }      

}

function update() {
    requestAnimationFrame(update);

    Game.updateKeyboard();
    Game.renderer.render(Game.scene, Game.camera);

    if (Game.GAME_STARTED) {
     
        deltaTime = Game.clock.getDelta();
        if ( mixer ) mixer.update( deltaTime );      

        if (!Game.gameOver) {   

            timer();

            Game.monedas.innerHTML = "Monedas " + Game.player.monedas + " / 10";

            if(Game.player.invensible){               
                var segundos = Math.round(Game.player.fin - Game.clock.getElapsedTime());
                Game.contadorInvensibilidad.innerHTML = "Invulnerabilidad " + segundos + " segundos";
                if(segundos <= 0){
                    Game.player.invensible = false;
                    Game.contadorInvensibilidad.style.display = "none";
                }
            }

            Game.moneda.rotation.y += 2 * deltaTime;

            if (Game.player.collision) { 
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
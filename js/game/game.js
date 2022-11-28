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

    this.muñeco.scale.set(5.5, 5.5, 5.5);
    this.muñeco.rotation.y = Math.PI;
    this.muñeco.position.set(10, 9, -2);
    this.Background.add(this.muñeco);

    this.arbol1.scale.set(8, 10, 8);
    this.arbol1.position.set(-50, 14, -4);
    this.Background.add(this.arbol1);

    this.arbol2.scale.set(7, 9, 7);
    this.arbol2.position.set(50, 11, -6);
    this.Background.add(this.arbol2);

    this.arbol3.scale.set(5, 7, 7);
    this.arbol3.position.set(-75, 12, -4);
    this.Background.add(this.arbol3);

    this.mountain.scale.set(7, 10, 7);
    this.mountain.position.set(0, 7, -67);
    this.Background.add(this.mountain);

    this.arbol4.scale.set(6, 8, 6);
    this.arbol4.position.set(25, 22, -3);
    this.Background.add(this.arbol4);

    this.arbol5.scale.set(3, 5, 3);
    this.arbol5.position.set(-5, 20, -3);
    this.Background.add(this.arbol5);

    this.cartel.scale.set(8, 8, 8);
    this.cartel.position.set(-18, 20, -3);
    this.Background.add(this.cartel);

    this.rama.scale.set(5, 5, 5);
    this.rama.position.set(-18.5, 21.6, -3);
    this.Background.add(this.rama);

    this.nieve.scale.set(5, 5, 5);
    this.nieve.position.set(-18, 20, -5);
    this.Background.add(this.nieve);

    this.rama1.scale.set(3, 3, 3);
    this.rama1.position.set(-15, 21.6, -3);
    this.Background.add(this.rama1);

    this.muñeco1.scale.set(3.5, 3.5, 3.5);
    this.muñeco1.rotation.y = Math.PI;
    this.muñeco1.position.set(-30, 21, -3);
    this.Background.add(this.muñeco1);

    this.muñeco2.scale.set(3, 3.5, 3);
    this.muñeco2.rotation.y = Math.PI;
    this.muñeco2.position.set(80, 18, -3);
    this.Background.add(this.muñeco2);

    this.nieve1.scale.set(5, 5, 5);
    this.nieve1.position.set(79, 18, -3);
    this.Background.add(this.nieve1);

    this.rama2.scale.set(4, 3, 4);
    this.rama2.position.set(84, 19, -2);
    this.Background.add(this.rama2);

    this.rama3.scale.set(4, 4, 4);
    this.rama3.position.set(76, 20, -1);
    this.Background.add(this.rama3);

    this.arbol6.scale.set(3, 5, 3);
    this.arbol6.position.set(86, 15, 3);
    this.Background.add(this.arbol6);

    this.arbol7.scale.set(2, 3, 2);
    this.arbol7.position.set(-20, 18, 2);
    this.Background.add(this.arbol7);

    this.copo.scale.set(5, 5, 5);
    this.copo.position.set(-58, 25, 3);
    this.Background.add(this.copo);

    this.copo1.scale.set(5, 5, 5);
    this.copo1.position.set(68, 30, 2);
    this.Background.add(this.copo1);

    this.copo2.scale.set(5, 5, 5);
    this.copo2.position.set(-10, 25, 2);
    this.Background.add(this.copo2);

    this.copo3.scale.set(5, 5, 5);
    this.copo3.position.set(-25, 30, 2);
    this.Background.add(this.copo3);

    this.copo4.scale.set(5, 5, 5);
    this.copo4.position.set(35, 25, 2);
    this.Background.add(this.copo4);

    this.señal.scale.set(2, 2, 2);
    this.señal.position.set(-6, 11, 4);
    this.Background.add(this.señal);

    this.pino.scale.set(6, 6, 6);
    this.pino.position.set(-62, 78, -82);
    this.Background.add(this.pino);

    this.oso.scale.set(2, 2, 2);
    this.oso.position.set(-90, 55, -40);
    this.Background.add(this.oso);

    this.casa.scale.set(2, 2, 2);
    this.casa.position.set(7, 47, -54);
    this.Background.add(this.casa);

    this.arbol8.scale.set(4, 6, 4);
    this.arbol8.position.set(-105, 55, -40);
    this.Background.add(this.arbol8);

    this.muñeco3.scale.set(3, 3.5, 3);
    this.muñeco3.rotation.y = Math.PI;
    this.muñeco3.position.set(-14, 48, -37);
    this.Background.add(this.muñeco3);

    this.pino1.scale.set(6, 6, 6);
    this.pino1.position.set(68, 24, -25);
    this.Background.add(this.pino1);     
    
    this.plano.scale.set(7, 7, 7);
    this.plano.position.set(0, -50.2, 0);
    this.Background.add(this.plano);  

    this.pinoVerde.scale.set(2, 2, 2);
    this.pinoVerde.position.set(-72, 22, -20);
    this.Background.add(this.pinoVerde);  

    this.pinoVerde1.scale.set(3, 4, 3);
    this.pinoVerde1.position.set(-16, 48, -48);
    this.Background.add(this.pinoVerde1);  

    this.pinoVerde2.scale.set(2, 2, 2);
    this.pinoVerde2.position.set(7, 27, -10);
    this.Background.add(this.pinoVerde2); 
    
    this.pinoVerde3.scale.set(3, 2, 3);
    this.pinoVerde3.position.set(110, 15, -20);
    this.Background.add(this.pinoVerde3);  

    this.pinoVerde4.scale.set(2, 2, 2);
    this.pinoVerde4.position.set(-23, 33, -16);
    this.Background.add(this.pinoVerde4);  

    this.cartel2.scale.set(9, 8, 9  );
    this.cartel2.position.set(-90, 30, -4);
    this.Background.add(this.cartel2);

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

    let texture_ft = new THREE.TextureLoader().load('assets/Nieve.png');        
    var bgMesh = new THREE.Mesh(
        new THREE.PlaneGeometry(600, 400, 4, 0),
        new THREE.MeshBasicMaterial({
            map: texture_ft,
            wireframe: false,
            side: THREE.DoubleSide
        })
    );

    bgMesh.receiveShadow = true;
    bgMesh.position.set(0, 30, -100)
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

    var arbol1 = {
        path: "assets/Nieve/arbol/",
        obj: "arbol_1.obj",
        mtl: "arbol_1.mtl",
        mesh: null
    }

    var arbol2 = {
        path: "assets/Nieve/",
        obj: "arbol_2.obj",
        mtl: "arbol_2.mtl",
        mesh: null
    }

    var arbol3 = {
        path: "assets/Nieve/",
        obj: "arbol_2.obj",
        mtl: "arbol_2.mtl",
        mesh: null
    }

    var mountain = {
        path: "assets/Nieve/",
        obj: "mountain.obj",
        mtl: "mountain.mtl",
        mesh: null
    }

    var arbol4 = {
        path: "assets/Nieve/",
        obj: "arbol_1.obj",
        mtl: "arbol_1.mtl",
        mesh: null
    }

    var arbol5 = {
        path: "assets/Nieve/",
        obj: "arbol_2.obj",
        mtl: "arbol_2.mtl",
        mesh: null
    }

    var cartel = {
        path: "assets/Nieve/",
        obj: "cartel.obj",
        mtl: "cartel.mtl",
        mesh: null
    }

    var rama = {
        path: "assets/Nieve/",
        obj: "rama.obj",
        mtl: "rama.mtl",
        mesh: null
    }

    var nieve = {
        path: "assets/Nieve/",
        obj: "nieve.obj",
        mtl: "nieve.mtl",
        mesh: null
    }

    var rama1 = {
        path: "assets/Nieve/",
        obj: "rama.obj",
        mtl: "rama.mtl",
        mesh: null
    }

    var muñeco1 = {
        path: "assets/Nieve/mono de nieve/",
        obj: "snowman.obj",
        mtl: "snowman.mtl",
        mesh: null
    }

    var muñeco2 = {
        path: "assets/Nieve/mono de nieve/",
        obj: "snowman.obj",
        mtl: "snowman.mtl",
        mesh: null
    }

    var nieve1 = {
        path: "assets/Nieve/",
        obj: "nieve.obj",
        mtl: "nieve.mtl",
        mesh: null
    }

    var rama2 = {
        path: "assets/Nieve/",
        obj: "rama.obj",
        mtl: "rama.mtl",
        mesh: null
    }

    var rama3 = {
        path: "assets/Nieve/",
        obj: "rama.obj",
        mtl: "rama.mtl",
        mesh: null
    }

    var arbol6 = {
        path: "assets/Nieve/",
        obj: "arbol_1.obj",
        mtl: "arbol_1.mtl",
        mesh: null
    }

    var arbol7 = {
        path: "assets/Nieve/",
        obj: "arbol_2.obj",
        mtl: "arbol_2.mtl",
        mesh: null
    }

    var copo = {
        path: "assets/Nieve/",
        obj: "copo.obj",
        mtl: "copo.mtl",
        mesh: null
    }

    var copo1 = {
        path: "assets/Nieve/",
        obj: "copo.obj",
        mtl: "copo.mtl",
        mesh: null
    }

    var copo2 = {
        path: "assets/Nieve/",
        obj: "copo.obj",
        mtl: "copo.mtl",
        mesh: null
    }

    var copo3 = {
        path: "assets/Nieve/",
        obj: "copo.obj",
        mtl: "copo.mtl",
        mesh: null
    }

    var copo4 = {
        path: "assets/Nieve/",
        obj: "copo.obj",
        mtl: "copo.mtl",
        mesh: null
    }

    var pico = {
        path: "assets/Nieve/picos/",
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

    var señal = {
        path: "assets/Nieve/",
        obj: "senal.obj",
        mtl: "senal.mtl",
        mesh: null
    }

    var torre = {
        path: "assets/Nieve/",
        obj: "Torre.obj",
        mtl: "Torre.mtl",
        mesh: null
    }

    var pino = {
        path: "assets/Nieve/",
        obj: "pino_2.obj",
        mtl: "pino_2.mtl",
        mesh: null
    }

    var oso = {
        path: "assets/Nieve/",
        obj: "oso.obj",
        mtl: "oso.mtl",
        mesh: null
    }

    var casa = {
        path: "assets/Nieve/",
        obj: "casa.obj",
        mtl: "casa.mtl",
        mesh: null
    }

    var arbol8 = {
        path: "assets/Nieve/",
        obj: "arbol_2.obj",
        mtl: "arbol_2.mtl",
        mesh: null
    }

    var muñeco3 = {
        path: "assets/Nieve/mono de nieve/",
        obj: "snowman.obj",
        mtl: "snowman.mtl",
        mesh: null
    }

    var pino1 = {
        path: "assets/Nieve/",
        obj: "pino_2.obj",
        mtl: "pino_2.mtl",
        mesh: null
    }

    var plano = {
        path: "assets/Nieve/",
        obj: "Plano.obj",
        mtl: "Plano.mtl",
        mesh: null
    }

    var pinoVerde = {
        path: "assets/Nieve/",
        obj: "pino_3.obj",
        mtl: "pino_3.mtl",
        mesh: null
    }

    var pinoVerde1 = {
        path: "assets/Nieve/",
        obj: "pino_3.obj",
        mtl: "pino_3.mtl",
        mesh: null
    }

    var pinoVerde2 = {
        path: "assets/Nieve/",
        obj: "pino_3.obj",
        mtl: "pino_3.mtl",
        mesh: null
    }

    var pinoVerde3 = {
        path: "assets/Nieve/",
        obj: "pino_3.obj",
        mtl: "pino_3.mtl",
        mesh: null
    }

    var pinoVerde4 = {
        path: "assets/Nieve/",
        obj: "pino_3.obj",
        mtl: "pino_3.mtl",
        mesh: null
    }

    var cartel2 = {
        path: "assets/Nieve/",
        obj: "cartel.obj",
        mtl: "cartel.mtl",
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
        object.scale.set(10, 8, 15);
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
        object.scale.set(10, 3, 15)
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

    loadOBJWithMTL(arbol1.path, arbol1.obj, arbol1.mtl, (object) => {
        object.scale.set(5, 5, 5);
        object.traverse(function(node) {
            if (node instanceof THREE.Mesh) {
                node.castShadow = true;
                node.receiveShadow = true;
            }
        });
        Game.arbol1 = object;
    });

    loadOBJWithMTL(arbol2.path, arbol2.obj, arbol2.mtl, (object) => {
        object.scale.set(1, 1, 1);
        object.traverse(function(node) {
            if (node instanceof THREE.Mesh) {
                node.castShadow = true;
                node.receiveShadow = true;
            }
        });
        Game.arbol2 = object;
    });

    loadOBJWithMTL(arbol3.path, arbol3.obj, arbol3.mtl, (object) => {
        object.scale.set(1, 1, 1);
        object.traverse(function(node) {
            if (node instanceof THREE.Mesh) {
                node.castShadow = true;
                node.receiveShadow = true;
            }
        });
        Game.arbol3 = object;
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

    loadOBJWithMTL(arbol4.path, arbol4.obj, arbol4.mtl, (object) => {
        object.scale.set(1, 1, 1);
        object.traverse(function(node) {
            if (node instanceof THREE.Mesh) {
                node.castShadow = true;
                node.receiveShadow = true;
            }
        });
        Game.arbol4 = object;
    });

    loadOBJWithMTL(arbol5.path, arbol5.obj, arbol5.mtl, (object) => {
        object.scale.set(1, 1, 1);
        object.traverse(function(node) {
            if (node instanceof THREE.Mesh) {
                node.castShadow = true;
                node.receiveShadow = true;
            }
        });
        Game.arbol5 = object;
    });
    
    loadOBJWithMTL(cartel.path, cartel.obj, cartel.mtl, (object) => {
        object.scale.set(1, 1, 1);
        object.traverse(function(node) {
            if (node instanceof THREE.Mesh) {
                node.castShadow = true;
                node.receiveShadow = true;
            }
        });
        Game.cartel = object;
    });
    
    loadOBJWithMTL(rama.path, rama.obj, rama.mtl, (object) => {
        object.scale.set(1, 1, 1);
        object.traverse(function(node) {
            if (node instanceof THREE.Mesh) {
                node.castShadow = true;
                node.receiveShadow = true;
            }
        });
        Game.rama = object;
    });
    
    loadOBJWithMTL(nieve.path, nieve.obj, nieve.mtl, (object) => {
        object.scale.set(1, 1, 1);
        object.traverse(function(node) {
            if (node instanceof THREE.Mesh) {
                node.castShadow = true;
                node.receiveShadow = true;
            }
        });
        Game.nieve = object;
    });

    loadOBJWithMTL(rama1.path, rama1.obj, rama1.mtl, (object) => {
        object.scale.set(1, 1, 1);
        object.traverse(function(node) {
            if (node instanceof THREE.Mesh) {
                node.castShadow = true;
                node.receiveShadow = true;
            }
        });
        Game.rama1 = object;
    });

    loadOBJWithMTL(muñeco1.path, muñeco1.obj, muñeco1.mtl, (object) => {
        object.scale.set(0.2, 0.2, 0.2);
        object.traverse(function(node) {
            if (node instanceof THREE.Mesh) {
                node.castShadow = true;
                node.receiveShadow = true;
            }
        });
        Game.muñeco1 = object;
    });

    loadOBJWithMTL(muñeco2.path, muñeco2.obj, muñeco2.mtl, (object) => {
        object.scale.set(0.2, 0.2, 0.2);
        object.traverse(function(node) {
            if (node instanceof THREE.Mesh) {
                node.castShadow = true;
                node.receiveShadow = true;
            }
        });
        Game.muñeco2 = object;
    });

    loadOBJWithMTL(nieve1.path, nieve1.obj, nieve1.mtl, (object) => {
        object.scale.set(1, 1, 1);
        object.traverse(function(node) {
            if (node instanceof THREE.Mesh) {
                node.castShadow = true;
                node.receiveShadow = true;
            }
        });
        Game.nieve1 = object;
    });

    loadOBJWithMTL(rama2.path, rama2.obj, rama2.mtl, (object) => {
        object.scale.set(1, 1, 1);
        object.traverse(function(node) {
            if (node instanceof THREE.Mesh) {
                node.castShadow = true;
                node.receiveShadow = true;
            }
        });
        Game.rama2 = object;
    });

    loadOBJWithMTL(rama3.path, rama3.obj, rama3.mtl, (object) => {
        object.scale.set(1, 1, 1);
        object.traverse(function(node) {
            if (node instanceof THREE.Mesh) {
                node.castShadow = true;
                node.receiveShadow = true;
            }
        });
        Game.rama3 = object;
    });

    loadOBJWithMTL(arbol6.path, arbol6.obj, arbol6.mtl, (object) => {
        object.scale.set(1, 1, 1);
        object.traverse(function(node) {
            if (node instanceof THREE.Mesh) {
                node.castShadow = true;
                node.receiveShadow = true;
            }
        });
        Game.arbol6 = object;
    });

    loadOBJWithMTL(arbol7.path, arbol7.obj, arbol7.mtl, (object) => {
        object.scale.set(1, 1, 1);
        object.traverse(function(node) {
            if (node instanceof THREE.Mesh) {
                node.castShadow = true;
                node.receiveShadow = true;
            }
        });
        Game.arbol7 = object;
    });

    loadOBJWithMTL(copo.path, copo.obj, copo.mtl, (object) => {
        object.scale.set(1, 1, 1);
        object.traverse(function(node) {
            if (node instanceof THREE.Mesh) {
                node.castShadow = true;
                node.receiveShadow = true;
            }
        });
        Game.copo = object;
    });

    loadOBJWithMTL(copo1.path, copo1.obj, copo1.mtl, (object) => {
        object.scale.set(1, 1, 1);
        object.traverse(function(node) {
            if (node instanceof THREE.Mesh) {
                node.castShadow = true;
                node.receiveShadow = true;
            }
        });
        Game.copo1 = object;
    });

    loadOBJWithMTL(copo2.path, copo2.obj, copo2.mtl, (object) => {
        object.scale.set(1, 1, 1);
        object.traverse(function(node) {
            if (node instanceof THREE.Mesh) {
                node.castShadow = true;
                node.receiveShadow = true;
            }
        });
        Game.copo2 = object;
    });

    loadOBJWithMTL(copo3.path, copo3.obj, copo3.mtl, (object) => {
        object.scale.set(1, 1, 1);
        object.traverse(function(node) {
            if (node instanceof THREE.Mesh) {
                node.castShadow = true;
                node.receiveShadow = true;
            }
        });
        Game.copo3 = object;
    });

    loadOBJWithMTL(copo4.path, copo4.obj, copo4.mtl, (object) => {
        object.scale.set(1, 1, 1);
        object.traverse(function(node) {
            if (node instanceof THREE.Mesh) {
                node.castShadow = true;
                node.receiveShadow = true;
            }
        });
        Game.copo4 = object;
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

    loadOBJWithMTL(señal.path, señal.obj, señal.mtl, (object) => {
        object.scale.set(1, 1, 1);
        object.traverse(function(node) {
            if (node instanceof THREE.Mesh) {
                node.castShadow = true;
                node.receiveShadow = true;
            }
        });
        Game.señal = object;
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

    loadOBJWithMTL(pino.path, pino.obj, pino.mtl, (object) => {
        object.scale.set(1, 1, 1);
        object.traverse(function(node) {
            if (node instanceof THREE.Mesh) {
                node.castShadow = true;
                node.receiveShadow = true;
            }
        });
        Game.pino = object;
    });

    loadOBJWithMTL(oso.path, oso.obj, oso.mtl, (object) => {
        object.scale.set(1, 1, 1);
        object.traverse(function(node) {
            if (node instanceof THREE.Mesh) {
                node.castShadow = true;
                node.receiveShadow = true;
            }
        });
        Game.oso = object;
    });

    loadOBJWithMTL(arbol8.path, arbol8.obj, arbol8.mtl, (object) => {
        object.scale.set(1, 1, 1);
        object.traverse(function(node) {
            if (node instanceof THREE.Mesh) {
                node.castShadow = true;
                node.receiveShadow = true;
            }
        });
        Game.arbol8 = object;
    });

    loadOBJWithMTL(casa.path, casa.obj, casa.mtl, (object) => {
        object.scale.set(1, 1, 1);
        object.traverse(function(node) {
            if (node instanceof THREE.Mesh) {
                node.castShadow = true;
                node.receiveShadow = true;
            }
        });
        Game.casa = object;
    });

    loadOBJWithMTL(muñeco3.path, muñeco3.obj, muñeco3.mtl, (object) => {
        object.scale.set(0.2, 0.2, 0.2);
        object.traverse(function(node) {
            if (node instanceof THREE.Mesh) {
                node.castShadow = true;
                node.receiveShadow = true;
            }
        });
        Game.muñeco3 = object;
    });

    loadOBJWithMTL(pino1.path, pino1.obj, pino1.mtl, (object) => {
        object.scale.set(1, 1, 1);
        object.traverse(function(node) {
            if (node instanceof THREE.Mesh) {
                node.castShadow = true;
                node.receiveShadow = true;
            }
        });
        Game.pino1 = object;
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

    loadOBJWithMTL(pinoVerde.path, pinoVerde.obj, pinoVerde.mtl, (object) => {
        object.scale.set(1, 1, 1);
        object.traverse(function(node) {
            if (node instanceof THREE.Mesh) {
                node.castShadow = true;
                node.receiveShadow = true;
            }
        });
        Game.pinoVerde = object;
    });

    loadOBJWithMTL(pinoVerde1.path, pinoVerde1.obj, pinoVerde1.mtl, (object) => {
        object.scale.set(1, 1, 1);
        object.traverse(function(node) {
            if (node instanceof THREE.Mesh) {
                node.castShadow = true;
                node.receiveShadow = true;
            }
        });
        Game.pinoVerde1 = object;
    });

    loadOBJWithMTL(pinoVerde2.path, pinoVerde2.obj, pinoVerde2.mtl, (object) => {
        object.scale.set(1, 1, 1);
        object.traverse(function(node) {
            if (node instanceof THREE.Mesh) {
                node.castShadow = true;
                node.receiveShadow = true;
            }
        });
        Game.pinoVerde2 = object;
    });

    loadOBJWithMTL(pinoVerde3.path, pinoVerde3.obj, pinoVerde3.mtl, (object) => {
        object.scale.set(1, 1, 1);
        object.traverse(function(node) {
            if (node instanceof THREE.Mesh) {
                node.castShadow = true;
                node.receiveShadow = true;
            }
        });
        Game.pinoVerde3 = object;
    });

    loadOBJWithMTL(pinoVerde4.path, pinoVerde4.obj, pinoVerde4.mtl, (object) => {
        object.scale.set(1, 1, 1);
        object.traverse(function(node) {
            if (node instanceof THREE.Mesh) {
                node.castShadow = true;
                node.receiveShadow = true;
            }
        });
        Game.pinoVerde4 = object;
    });

    loadOBJWithMTL(cartel2.path, cartel2.obj, cartel2.mtl, (object) => {
        object.scale.set(1, 1, 1);
        object.traverse(function(node) {
            if (node instanceof THREE.Mesh) {
                node.castShadow = true;
                node.receiveShadow = true;
            }
        });
        Game.cartel2 = object;
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
                platformPiece.position.set(0, 2, 20);
            }
                
            if (platformPieceType[type[i]].type === this.GREEN_PIECE){
                platformPiece = this.platformFlying.clone();
                platformPiece.position.set(0, 7.5, 20);
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
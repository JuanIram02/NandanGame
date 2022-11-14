import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.117.1/build/three.module.js';
import {MTLLoader} from 'https://cdn.jsdelivr.net/npm/three@0.117.1/examples/jsm/loaders/MTLLoader.js';
import {OBJLoader} from 'https://cdn.jsdelivr.net/npm/three@0.117.1/examples/jsm/loaders/OBJLoader.js';
//import {FBXLoader} from 'https://cdn.jsdelivr.net/npm/three@0.117.1/examples/jsm/loaders/FBXLoader.js';

var Game = Game || {};
Game.player = { 
    height: 2, 
    speed: 0.1, 
    turnSpeed: Math.PI * 0.02, 
    moveSpeed: 1
};
Game.materials = {
    solid: new THREE.MeshNormalMaterial({})
};
Game.MESH_VISIBILTY = true;
Game.USE_WIREFRAME = false;
Game.GAME_LOADED = false;
Game.GAME_STARTED = false;
Game.RED_PIECE = 10;
Game.GREEN_PIECE = 11;
Game.PICOS = 12;
Game.ROCA = 13;

Game.cameraY = -0.5;
Game.gameOver = false;
Game.score = 0;

var deltaTime;
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
    this.jet.scale.set(1, 1, 1);
    this.jet.position.set(0, 9.8, 20);
    this.scene.add(this.jet);

    this.muñeco.scale.set(6.5, 6.5, 6.5);
    this.muñeco.rotation.y = Math.PI;
    this.muñeco.position.set(10, 9, -2);
    this.scene.add(this.muñeco);
   
    this.arbol1.scale.set(8, 10, 8);
    this.arbol1.position.set(-50, 14, -4);
    this.scene.add(this.arbol1);

    this.arbol2.scale.set(7, 9, 7);
    this.arbol2.position.set(50, 11, -6);
    this.scene.add(this.arbol2);

    this.arbol3.scale.set(5, 7, 7);
    this.arbol3.position.set(-75, 12, -4);
    this.scene.add(this.arbol3);

    this.mountain.scale.set(7, 10, 7);
    this.mountain.position.set(0, 7, -67);
    this.scene.add(this.mountain);

    this.arbol4.scale.set(6, 8, 6);
    this.arbol4.position.set(25, 22, -3);
    this.scene.add(this.arbol4);

    this.arbol5.scale.set(3, 5, 3);
    this.arbol5.position.set(-5, 20, -3);
    this.scene.add(this.arbol5);

    this.cartel.scale.set(8, 8, 8);
    this.cartel.position.set(-18, 20, -3);
    this.scene.add(this.cartel);

    this.rama.scale.set(5, 5, 5);
    this.rama.position.set(-18.5, 21.6, -3);
    this.scene.add(this.rama);

    this.nieve.scale.set(5, 5, 5);
    this.nieve.position.set(-18, 20, -5);
    this.scene.add(this.nieve);

    this.rama1.scale.set(3, 3, 3);
    this.rama1.position.set(-15, 21.6, -3);
    this.scene.add(this.rama1);

    this.muñeco1.scale.set(3.5, 3.5, 3.5);
    this.muñeco1.rotation.y = Math.PI;
    this.muñeco1.position.set(-30, 21, -3);
    this.scene.add(this.muñeco1);

    this.muñeco2.scale.set(3, 3.5, 3);
    this.muñeco2.rotation.y = Math.PI;
    this.muñeco2.position.set(80, 18, -3);
    this.scene.add(this.muñeco2);

    this.nieve1.scale.set(5, 5, 5);
    this.nieve1.position.set(79, 18, -3);
    this.scene.add(this.nieve1);

    this.rama2.scale.set(4, 3, 4);
    this.rama2.position.set(84, 19, -2);
    this.scene.add(this.rama2);

    this.rama3.scale.set(4, 4, 4);
    this.rama3.position.set(76, 20, -1);
    this.scene.add(this.rama3);

    this.arbol6.scale.set(3, 5, 3);
    this.arbol6.position.set(86, 15, 3);
    this.scene.add(this.arbol6);

    this.arbol7.scale.set(2, 3, 2);
    this.arbol7.position.set(-20, 18, 2);
    this.scene.add(this.arbol7);

    this.copo.scale.set(5, 5, 5);
    this.copo.position.set(-58, 25, 3);
    this.scene.add(this.copo);

    this.copo1.scale.set(5, 5, 5);
    this.copo1.position.set(68, 30, 2);
    this.scene.add(this.copo1);

    this.copo2.scale.set(5, 5, 5);
    this.copo2.position.set(-10, 25, 2);
    this.scene.add(this.copo2);

    this.copo3.scale.set(5, 5, 5);
    this.copo3.position.set(-25, 30, 2);
    this.scene.add(this.copo3);

    this.copo4.scale.set(5, 5, 5);
    this.copo4.position.set(35, 25, 2);
    this.scene.add(this.copo4);

    this.roca.scale.set(5, 5, 5);
    this.roca.position.set(65, 35, 2);
    this.scene.add(this.roca);

    this.sphere = new THREE.Mesh(
    new THREE.SphereGeometry(0.19, 20, 20), this.materials.solid);
    this.sphere.position.set(this.jet.position.x, this.jet.position.y, this.jet.position.z);
    this.sphere.geometry.computeBoundingSphere();
    this.scene.add(this.sphere);
    this.sphere.visible = this.MESH_VISIBILTY;

    this.addPlatform();

    this.cy = this.jet.position.y;
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
    //FONDO  
    let texture_ft = new THREE.TextureLoader().load('assets/Nieve.png');        
    var bgMesh = new THREE.Mesh(
        new THREE.PlaneGeometry(290, 200, 4, 0),
        new THREE.MeshBasicMaterial({
            map: texture_ft,
            wireframe: false,
            side: THREE.DoubleSide
        })
    );

    bgMesh.receiveShadow = true;
    bgMesh.position.set(0, 30, -10)
    this.scene.add(bgMesh);

    //CARGA DE MODELOS 
    var jet = {
        path: "assets/jet/",
        obj: "jetski2.obj",
        mtl: "jetski2.mtl",
        mesh: null
    };

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

    //Carga de Modelos

    loadOBJWithMTL(jet.path, jet.obj, jet.mtl, (object) => {
        object.scale.set(0.2, 0.2, 0.2);
        object.rotation.x = THREE.Math.degToRad(-90);
        object.rotation.z = THREE.Math.degToRad(-90);
        object.traverse(function(node) {
            if (node instanceof THREE.Mesh) {
                node.castShadow = true;
                node.receiveShadow = true;
            }
        });
        Game.jet = object;
    });

    loadOBJWithMTL(platform.path, platform.obj, platform.mtl, (object) => {
        object.scale.set(1, 1, 1);
        object.scale.set(10, 10, 7);
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
        object.scale.set(10, 4, 7)
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
        object.traverse(function(node) {
            if (node instanceof THREE.Mesh) {
                node.castShadow = true;
                node.receiveShadow = true;
            }
        });
        Game.roca = object;
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
        { type: this.PICOS }
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
            count: 8,
            separation: [-2, -1, 0, 1, 2, 3, 4, 5],
            type: [1, 2, 1, 1, 1, 1, 1, 1]
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
                platformPiece.position.set(0, 0, 20);
            }
                
            if (platformPieceType[type[i]].type === this.GREEN_PIECE){
                platformPiece = this.platformFlying.clone();
                platformPiece.position.set(0, 7.5, 20);
            }

            if (platformPieceType[type[i]].type === this.PICOS){
                platformPiece = this.pico.clone();
                platformPiece.position.set(0, -1, 20);
            }


            collider = [];

            collider.push(new THREE.Mesh(new THREE.BoxGeometry(19, 10, 1),
             this.materials.solid));
            collider[0].position.set(0, 10, 20);
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

function onKeyDown(event) {
    keys[String.fromCharCode(event.keyCode)] = true;
}
function onKeyUp(event) {
    keys[String.fromCharCode(event.keyCode)] = false;
}

Game.updateKeyboard = function() {
    if (!this.gameOver) {
        if (keys["%"]) { // left arrow key
            this.platformGroup.position.x += this.player.moveSpeed;
        }

        if (keys["'"]) { // right arrow key
            this.platformGroup.position.x -= this.player.moveSpeed;
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
			if(Game.canJump){
                
                Game.vy = 10;
                Game.canJump = false; 
                Game.collision = false;  
                Game.isFalling = true;   

            }
		}
        if (!keys[" "]){		
            Game.isJumping = false;
		}
		
		Game.camera.rotation.y += yaw * deltaTime;
		Game.camera.translateZ(forward * deltaTime);
    }
}

Game.findCollision = function() {

    var ind = Math.abs(Math.round(this.cy));

    if (this.colliderArr[ind]) {
        for (var i = 0; i < this.colliderArr[ind].length; i++) {

                this.jet.children[0].geometry.computeBoundingBox(); 
                this.colliderArr[ind][i].geometry.computeBoundingBox();
                this.jet.updateMatrixWorld();
                this.colliderArr[ind][i].updateMatrixWorld();
    
                var box1 = this.jet.children[0].geometry.boundingBox.clone();
                box1.applyMatrix4(this.jet.matrixWorld);
    
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
    this.cy = 0;   //currrent y position
    this.dt = 0.1; //delta time to make smooth movement
    this.vy = 0;   //velocity
    this.mvy = 10;  //max velocity
    this.gravity = 0.2;
    this.collision = false;
}

function update() {
    requestAnimationFrame(update);

    deltaTime = Game.clock.getDelta();

    Game.updateKeyboard();
    Game.renderer.render(Game.scene, Game.camera);

    if (Game.GAME_STARTED) {
        if (!Game.gameOver) {                                              

            if (Game.collision) { // ball is on surface
                Game.vy = 0;
                Game.canJump = true;
                Game.isFalling = false;
            }        
            else{
                Game.isFalling = true;
            }    

            if(Game.isFalling) {       
              
                Game.canJump = false;
                if(Game.vy <= Game.mvy && Game.vy >= -Game.mvy)
                    Game.vy -= Game.gravity;      
                               
                Game.cy += Game.vy * Game.dt;
                Game.jet.position.y = Game.cy; 
            }                                                                                                                     

            Game.sphere.position.set(Game.jet.position.x, 
            Game.jet.position.y, Game.jet.position.z);
            Game.collision = Game.findCollision();
        }
    }
}

window.onload = function() {
    Game.init();
};
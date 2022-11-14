import {FBXLoader} from 'https://cdn.jsdelivr.net/npm/three@0.117.1/examples/jsm/loaders/FBXLoader.js';

const model = new Promise((res, rej) => {
    const loader = new FBXLoader();
    loader.load( 'assets/Personajes/Jugador.fbx', function ( object ) {				
		object.traverse( function ( child ) {
			if ( child.isMesh ) {
				child.castShadow = true;
				child.receiveShadow = true;
			}
		} );
        res(object);
	} );
})

const animation = new Promise((res, rej) => {
    const loader = new FBXLoader();
    loader.load( 'assets/Personajes/Animations/walking.fbx', function ( object ) {				
        res(object);
	} );
})

const combo = Promise.all([model, animation]);

export default combo;

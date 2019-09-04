var container = document.createElement( 'div' );
document.body.appendChild( container );
var camera = new THREE.PerspectiveCamera( 50, window.innerWidth / window.innerHeight, 1, 5000 );
camera.position.z = 2000;
var scene = new THREE.Scene();
scene.background = new THREE.Color( 0xffffff );;
	//lights
    var ambient = new THREE.AmbientLight( 0xffffff );
    scene.add( ambient );

    pointLight = new THREE.PointLight( 0xffffff, 2 );
    scene.add( pointLight );
//renderer
var renderer = new THREE.WebGLRenderer();
renderer.setPixelRatio( window.devicePixelRatio );
renderer.setSize( window.innerWidth, window.innerHeight );
container.appendChild( renderer.domElement );

//controls
var controls = new THREE.OrbitControls( camera, renderer.domElement );
controls.enableZoom = false;
controls.enablePan = false;
controls.minPolarAngle = Math.PI / 4;
controls.maxPolarAngle = Math.PI / 1.5;

function loadModel() {

    object.traverse( function ( child ) {

        // if ( child.isMesh ) child.material.map = texture;

    } );

    object.position.y = - 200;
    scene.add( object );

}

var manager = new THREE.LoadingManager( loadModel );

manager.onProgress = function ( item, loaded, total ) {

    console.log( item, loaded, total );

};

function onProgress( xhr ) {

    if ( xhr.lengthComputable ) {

        var percentComplete = xhr.loaded / xhr.total * 100;
        console.log( 'model ' + Math.round( percentComplete, 2 ) + '% downloaded' );

    }

}
function onError() {}
var loader = new THREE.OBJLoader( manager );

				loader.load( '../WaltHead.obj', function ( obj ) {

                    object = obj.children[0];
                    console.log(object);
                    object.material = new THREE.MeshLambertMaterial( { color:0x001166 } );
					object.position.set( 0, 25, 50 );
					object.scale.multiplyScalar( 12 );

				}, onProgress, onError );

function animate() {

    requestAnimationFrame( animate );
    render();
}
function render() {

    renderer.render( scene, camera );
}
animate();
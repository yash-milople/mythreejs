import React, { Component } from "react";
import ReactDOM from "react-dom";
import * as THREE from 'three';
import { MTLLoader } from './loaders/MTLLoader.js';
import { OBJLoader } from './loaders/OBJLoader.js';
import Head from "../APezzi1.obj";
import Head1 from "../APezzi1.mtl";
// OBJLoader(THREE);
// const MTLLoader = require('three-mtl-loader');
const OrbitControls = require('three-orbitcontrols');

let mouseX = 0, mouseY = 0;
let windowHalfX = window.innerWidth / 2;
let windowHalfY = window.innerHeight / 2;

class modelfile2 extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.animate = this.animate.bind(this);
    this.onWindowResize = this.onWindowResize.bind(this);
    this.onDocumentMouseMove = this.onDocumentMouseMove.bind(this);
    this.onError = this.onError.bind(this);
    this.onProgress = this.onProgress.bind(this);
  }
  componentDidMount() {
    this.init(this.root);
    this.animate();
  }
  init(parent) {
    const onProgress = this.onProgress;
    const onError = this.onError;
    var scene = new THREE.Scene();
    scene.background = new THREE.Color( 0xffffff );   
    //lights
    var ambient = new THREE.AmbientLight( 0xffffff );
    scene.add( ambient );
    var pointLight = new THREE.PointLight( 0xffffff, 2 );
    scene.add( pointLight );
    var camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 10000 );
    camera.position.z = 250;
    //  camera.position.set( -150, 100, 150 );

    const renderer = new THREE.WebGLRenderer({canvas: this.canvas});
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( window.innerWidth, window.innerHeight );
    this.setState({camera, scene, renderer});
    //controls
    var controls = new OrbitControls( camera, renderer.domElement );
    controls.enableZoom = true;
    controls.enablePan = true;
    controls.minPolarAngle = Math.PI / 4;
    controls.maxPolarAngle = Math.PI / 1.5;
    // manager
    var object;
    var manager = new THREE.LoadingManager( loadModel );
    manager.onProgress = function ( item, loaded, total ) {
      console.log( item, loaded, total );
    };
    // loading of model
    function loadModel() {
      object.traverse( function ( child ) {  
          // if ( child.isMesh ) child.material.map = texture;
      } );
      object.position.y = 0;
      scene.add( object );
      }
      this.THREE = THREE;
      const mtlLoader = new MTLLoader();
      
      const loader = new this.THREE.OBJLoader(manager);
      mtlLoader.load(Head1, function( materials ) {
        materials.preload();
        console.log(materials)
        loader.setMaterials( materials );
      loader.load( Head, function ( obj ) {
        object = obj;
        console.log(object.children);
      }, onProgress, onError );
    });

    }
  animate() {
    requestAnimationFrame( this.animate );
    this.renderObj();
  }
  renderObj() {
    const {camera, scene, renderer} = this.state;
    if (camera && scene && renderer) {
      // camera.position.x += ( mouseX - camera.position.x ) * .05;
      // camera.position.y += ( - mouseY - camera.position.y ) * .05;
      camera.lookAt( scene.position );
      renderer.render( scene, camera );
    }
  }  
  onWindowResize() {
    const {camera, renderer} = this.state;
    if (camera && renderer) {
      windowHalfX = window.innerWidth / 2;
      windowHalfY = window.innerHeight / 2;
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize( window.innerWidth, window.innerHeight );
    }
  }
  onDocumentMouseMove( event ) {
    mouseX = ( event.clientX - windowHalfX ) / 2;
    mouseY = ( event.clientY - windowHalfY ) / 2;
  }  
  onError(xhr) {

  }
  onProgress(xhr) {
    if ( xhr.lengthComputable ) {
      var percentComplete = xhr.loaded / xhr.total * 100;
      console.log( 'model ' + Math.round( percentComplete, 2 ) + '% downloaded' );
    }
  }
render() {
  return(
    <div className="jumbotron" ref={(el) => this.root = el} id="container">
        <canvas style={{padding: '12px'}} ref={(el) => this.canvas = el}></canvas>
      </div>
   );
  }
}
export default modelfile2
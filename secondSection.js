import './style.css'

import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );// 0.1 is the near value and 1000 is the far value of the frustum. Objects further away from the camera than the value of far or closer than near won't be rendered. 50 is the field of view, 50 is the aspect ratio

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

//align the renderer to the left
renderer.domElement.style.position = 'absolute';
renderer.domElement.style.right = `${window.innerWidth/3.5}px`;
renderer.domElement.style.top = `${window.innerHeight/1.2}px`;

//make the renderer go lower on the page
renderer.domElement.style.marginTop = `${window.innerHeight/2}px`;

// renderer go to the back of the page
// renderer.domElement.style.zIndex = '1';
renderer.setClearColor( 0x000000, 0 );

//make the height of the renderer the same as the height of the text
renderer.domElement.style.height = `${window.innerHeight}px`;
renderer.domElement.style.width = `${window.innerWidth}px`

// controls
const controls = new OrbitControls( camera, renderer.domElement );

// light
const light = new THREE.PointLight( 0xff0000, 1, 100 );
light.position.set( 50, 50, 50 );
scene.add( light );



let book; 
const loader = new GLTFLoader();
//load a glb resource

loader.load(

  // resource URL
  'models/Book2.glb',
  // called when the resource is loaded

  function ( gltf ) {

    //add texture to the model
    const textureLoader = new THREE.TextureLoader();
    const texture = textureLoader.load('models/textures/base_color.jpg');
    const material = new THREE.MeshBasicMaterial({ map: texture });

    // //add the texture to the model
    gltf.scene.traverse((o) => {
      if (o.isMesh) o.material = material;
    });


    scene.add( gltf.scene );
    book = gltf.scene;
  }
);


camera.position.z = 30;

function animate() {
	requestAnimationFrame( animate );
	renderer.render( scene, camera );

  //rotate the book
  book.rotation.y += 0.01;
  
  // stop the zooming in and out on scroll
  controls.enableZoom = false;
  // controls.enablePan = false;
  // controls.enableDamping = true;
  // controls.dampingFactor = 0.05;
  // controls.rotateSpeed = 0.05;
  controls.update();

}
animate();
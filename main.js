import './style.css'

import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
//import texture
import { TextureLoader } from 'three/src/loaders/TextureLoader.js';

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );// 0.1 is the near value and 1000 is the far value of the frustum. Objects further away from the camera than the value of far or closer than near won't be rendered. 50 is the field of view, 50 is the aspect ratio

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth/2, window.innerHeight/2 );
document.body.appendChild( renderer.domElement );

//renderer aligned to the right
renderer.domElement.style.position = 'absolute';
renderer.domElement.style.left = `${window.innerWidth/3.5}px`;
renderer.domElement.style.top = `${window.innerHeight/1.3}px`;
// renderer.domElement.style.zIndex = '-1';
renderer.setClearColor( 0x000000, 0 );

//the height of the renderer the same as the height of the text
renderer.domElement.style.height = `${window.innerHeight}px`;
renderer.domElement.style.width = `${window.innerWidth}px`

// controls
const controls = new OrbitControls( camera, renderer.domElement );

// light
const light = new THREE.PointLight( 0xff0000, 1, 100 );
light.position.set( 50, 50, 50 );
scene.add( light );



let c_mine; 
const loader = new GLTFLoader();
//load a glb resource

loader.load(

  // resource URL
  'models/fixed.glb',
  // called when the resource is loaded

  function ( gltf ) {
    scene.add( gltf.scene );
    c_mine = gltf.scene;

    // add the original texture to the model
    const textureLoader = new TextureLoader();
    const texture = textureLoader.load('models/textures/fliped.bmp');
    const material = new THREE.MeshBasicMaterial({ map: texture });

    // //add the texture to the model
    gltf.scene.traverse((o) => {
      if (o.isMesh) o.material = material;
    });
    scene.add( gltf.scene );
    c_mine = gltf.scene;



   


  }
);

camera.position.z = 7;

function animate() {

	requestAnimationFrame( animate );
  // render the scene
	renderer.render( scene, camera );
  
  //book rotation
  c_mine.rotation.y += 0.01;

}
animate();


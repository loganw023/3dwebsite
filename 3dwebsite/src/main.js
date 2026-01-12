import './style.css'

import * as THREE from 'three';

import {OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const scene = new THREE.Scene;

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);

renderer.render(scene, camera);

const geometry = new THREE.TorusGeometry(12, 2, 10, 50);
const material = new THREE.MeshStandardMaterial({ color: 0xffffff});
const torus = new THREE.Mesh(geometry, material);

scene.add(torus)

const pointLight = new THREE.PointLight(0xffffff)
const ambientLight = new THREE.AmbientLight(0xffffff);
pointLight.position.set(5, 5, 5)
scene.add(pointLight, ambientLight)

const controls = new OrbitControls(camera, renderer.domElement);

function addStar() {
  const geometry = new THREE.SphereGeometry(0.25, 24, 24);
  const material = new THREE.MeshStandardMaterial({color: 0xff0000})
  const star = new THREE.Mesh(geometry, material);

  const [x,y,z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100));

  star.position.set(x,y,z);
  scene.add(star)
}

const earthTexture = new THREE.TextureLoader().load('public/earth2.jpg');

const earth = new THREE.Mesh(
  new THREE.SphereGeometry(6, 64, 64), 
  new THREE.MeshStandardMaterial({
    map: earthTexture
  })
);

earth.position.z = 0;
earth.position.setX(0);

scene.add(earth)

Array(200).fill().forEach(addStar)

const spaceTexture = new THREE.TextureLoader().load('public/space.jpg');
scene.background = spaceTexture;

function moveCamera() {
  const t = document.body.getBoundingClientRect().top;
  earth.rotation.x += 0.025;
  earth.rotation.y += 0.03;
  earth.rotation.z += 0.025;

  camera.rotation.x += -0.05 * t;
  camera.rotation.y += -0.1 * t;
  camera.rotation.z += -0.05 * t;
}
document.body.onscroll = moveCamera

function animate() {
  requestAnimationFrame(animate);

  torus.rotation.x += 0.01;
  torus.rotation.y += 0.005;
  torus.rotation.z += 0.01;

  controls.update();

  renderer.render(scene, camera);
}

animate()

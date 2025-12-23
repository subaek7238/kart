import * as THREE from "https://unpkg.com/three@0.160.0/build/three.module.js";

/* 기본 */
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x222222);

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

/* 조명 */
scene.add(new THREE.AmbientLight(0xffffff, 0.8));
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(5, 10, 5);
scene.add(light);

/* 큐브 (테스트용) */
const cube = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.MeshStandardMaterial({ color: 0xff0000 })
);
scene.add(cube);

camera.position.z = 5;


/* 카메라 */
camera.position.z = 5;

/* 루프 */
function animate() {
  requestAnimationFrame(animate);
  cube.rotation.y += 0.01;
  cube.rotation.x += 0.01;
  renderer.render(scene, camera);
}
animate();

/* 리사이즈 */
window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});





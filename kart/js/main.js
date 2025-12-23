import * as THREE from "https://unpkg.com/three@0.160.0/build/three.module.js";

/* ===== 기본 ===== */
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x111111);

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

/* ===== 조명 ===== */
scene.add(new THREE.AmbientLight(0xffffff, 0.6));

const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(5, 10, 5);
scene.add(light);

/* ===== 바닥 ===== */
const floor = new THREE.Mesh(
  new THREE.PlaneGeometry(200, 200),
  new THREE.MeshStandardMaterial({ color: 0x444444 })
);
floor.rotation.x = -Math.PI / 2;
scene.add(floor);

/* ===== 카트 ===== */
const kart = new THREE.Mesh(
  new THREE.BoxGeometry(2, 1, 3),
  new THREE.MeshStandardMaterial({ color: 0xff3333 })
);
kart.position.y = 0.5;
scene.add(kart);

/* ===== 카메라 ===== */
camera.position.set(0, 6, 10);
camera.lookAt(kart.position);

/* ===== 입력 ===== */
const input = { forward: false, left: false, right: false };

window.addEventListener("keydown", e => {
  if (e.key === "w") input.forward = true;
  if (e.key === "a") input.left = true;
  if (e.key === "d") input.right = true;
});
window.addEventListener("keyup", e => {
  if (e.key === "w") input.forward = false;
  if (e.key === "a") input.left = false;
  if (e.key === "d") input.right = false;
});

/* ===== 루프 ===== */
function animate() {
  requestAnimationFrame(animate);

  if (input.forward) kart.translateZ(-0.2);
  if (input.left) kart.rotation.y += 0.04;
  if (input.right) kart.rotation.y -= 0.04;

  camera.position.lerp(
    kart.position.clone().add(new THREE.Vector3(0, 6, 10)),
    0.1
  );
  camera.lookAt(kart.position);

  renderer.render(scene, camera);
}

animate();

console.log("게임 실행됨");
loop();



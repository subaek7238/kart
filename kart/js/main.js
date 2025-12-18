import * as THREE from "https://unpkg.com/three@0.160.0/build/three.module.js";

/* ===============================
   기본 세팅
================================ */
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x87ceeb); // 하늘색

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

/* ===============================
   조명
================================ */
scene.add(new THREE.AmbientLight(0xffffff, 0.6));

const dirLight = new THREE.DirectionalLight(0xffffff, 1);
dirLight.position.set(10, 20, 10);
scene.add(dirLight);

/* ===============================
   바닥
================================ */
const ground = new THREE.Mesh(
  new THREE.PlaneGeometry(500, 500),
  new THREE.MeshStandardMaterial({ color: 0x555555 })
);
ground.rotation.x = -Math.PI / 2;
scene.add(ground);

/* ===============================
   카트
================================ */
const kart = new THREE.Group();

const body = new THREE.Mesh(
  new THREE.BoxGeometry(2, 1, 3),
  new THREE.MeshStandardMaterial({ color: 0xff3333 })
);
body.position.y = 0.5;
kart.add(body);

scene.add(kart);
kart.position.set(0, 0, 0);

/* ===============================
   입력
================================ */
const input = {
  forward: false,
  left: false,
  right: false,
  drift: false
};

window.addEventListener("keydown", e => {
  if (e.key === "w") input.forward = true;
  if (e.key === "a") input.left = true;
  if (e.key === "d") input.right = true;
  if (e.key === "Shift") input.drift = true;
});

window.addEventListener("keyup", e => {
  if (e.key === "w") input.forward = false;
  if (e.key === "a") input.left = false;
  if (e.key === "d") input.right = false;
  if (e.key === "Shift") input.drift = false;
});

/* ===============================
   이동 / 드리프트
================================ */
let speed = 0;
let rotationSpeed = 0;

/* ===============================
   카메라
================================ */
camera.position.set(0, 6, 10);
camera.lookAt(kart.position);

/* ===============================
   루프
================================ */
function animate() {
  requestAnimationFrame(animate);

  // 가속
  if (input.forward) speed = Math.min(speed + 0.02, 0.6);
  else speed *= 0.96;

  // 회전
  if (input.left) rotationSpeed += input.drift ? 0.004 : 0.002;
  if (input.right) rotationSpeed -= input.drift ? 0.004 : 0.002;
  rotationSpeed *= 0.9;

  kart.rotation.y += rotationSpeed;
  kart.translateZ(-speed);

  // 카메라 추적
  const camTarget = kart.position.clone().add(
    new THREE.Vector3(0, 6, 10).applyAxisAngle(
      new THREE.Vector3(0, 1, 0),
      kart.rotation.y
    )
  );
  camera.position.lerp(camTarget, 0.1);
  camera.lookAt(kart.position);

  renderer.render(scene, camera);
}

animate();

/* ===============================
   리사이즈
================================ */
window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

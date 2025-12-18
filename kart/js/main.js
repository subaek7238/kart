import * as THREE from "https://unpkg.com/three@0.160.0/build/three.module.js";

/* =====================
   기본 씬 세팅
===================== */
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x87ceeb);

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

/* =====================
   조명 (이거 중요)
===================== */
const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
scene.add(ambientLight);

const dirLight = new THREE.DirectionalLight(0xffffff, 1);
dirLight.position.set(5, 10, 5);
scene.add(dirLight);

/* =====================
   카트
===================== */
const kart = new THREE.Mesh(
  new THREE.BoxGeometry(1, 0.5, 2),
  new THREE.MeshStandardMaterial({ color: 0xff0000 })
);
kart.position.y = 0.25;
scene.add(kart);

/* =====================
   트랙 (무한 생성)
===================== */
const trackPieces = [];
const TRACK_LENGTH = 20;

function createTrack(z) {
  const track = new THREE.Mesh(
    new THREE.BoxGeometry(6, 0.1, TRACK_LENGTH),
    new THREE.MeshStandardMaterial({ color: 0x333333 })
  );
  track.position.z = z;
  scene.add(track);
  trackPieces.push(track);
}

// 초기 트랙
for (let i = 0; i < 10; i++) {
  createTrack(-i * TRACK_LENGTH);
}

/* =====================
   이동 변수
===================== */
let speed = 0.15;
camera.position.set(0, 5, 8);
camera.lookAt(kart.position);

/* =====================
   애니메이션 루프
===================== */
function animate() {
  requestAnimationFrame(animate);

  // 앞으로 이동
  kart.position.z -= speed;

  // 카메라 따라오기
  camera.position.z = kart.position.z + 8;
  camera.lookAt(kart.position);

  // 트랙 무한 생성
  const lastTrack = trackPieces[trackPieces.length - 1];
  if (kart.position.z < lastTrack.position.z + TRACK_LENGTH) {
    createTrack(lastTrack.position.z - TRACK_LENGTH);
  }

  renderer.render(scene, camera);
}

animate();

/* =====================
   리사이즈 대응
===================== */
window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

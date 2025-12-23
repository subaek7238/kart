// ===== 캔버스 세팅 =====
const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resize();
window.addEventListener("resize", resize);

// ===== 카트 상태 =====
const kart = {
  x: canvas.width / 2,
  y: canvas.height / 2,
  angle: 0,
  speed: 0,
};

let left = false;
let right = false;

// ===== 입력 =====
window.addEventListener("keydown", e => {
  if (e.key === "ArrowLeft") left = true;
  if (e.key === "ArrowRight") right = true;
});
window.addEventListener("keyup", e => {
  if (e.key === "ArrowLeft") left = false;
  if (e.key === "ArrowRight") right = false;
});

// 모바일
document.getElementById("left").ontouchstart = () => left = true;
document.getElementById("left").ontouchend = () => left = false;
document.getElementById("right").ontouchstart = () => right = true;
document.getElementById("right").ontouchend = () => right = false;

// ===== 게임 루프 =====
function update() {
  // 조향
  if (left) kart.angle -= 0.05;
  if (right) kart.angle += 0.05;

  // 자동 전진
  kart.speed = 4;

  kart.x += Math.cos(kart.angle) * kart.speed;
  kart.y += Math.sin(kart.angle) * kart.speed;

  // 화면 끝 처리
  if (kart.x < 0) kart.x = canvas.width;
  if (kart.x > canvas.width) kart.x = 0;
  if (kart.y < 0) kart.y = canvas.height;
  if (kart.y > canvas.height) kart.y = 0;
}

// ===== 그리기 =====
function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.save();
  ctx.translate(kart.x, kart.y);
  ctx.rotate(kart.angle);

  // 카트 몸체
  ctx.fillStyle = "orange";
  ctx.fillRect(-20, -10, 40, 20);

  // 앞 표시
  ctx.fillStyle = "red";
  ctx.fillRect(10, -5, 10, 10);

  ctx.restore();
}

// ===== 루프 =====
function loop() {
  update();
  draw();
  requestAnimationFrame(loop);
}

console.log("게임 실행됨");
loop();

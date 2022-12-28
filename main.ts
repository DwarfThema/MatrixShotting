//--canvas setting
let canvas: HTMLCanvasElement = document.createElement("canvas");
var ctx: CanvasRenderingContext2D | null = canvas.getContext("2d");

canvas.width = 400;
canvas.height = 700;
// 각각 픽셀로 적용됨

document.body.appendChild(canvas);

const bg: HTMLImageElement = new Image();
const hacker: HTMLImageElement = new Image();
const bullet: HTMLImageElement = new Image();
const bug: HTMLImageElement = new Image();
const gameOver: HTMLImageElement = new Image();

const loadImage = (): void => {
  bg.src = "resources/bg.webp";
  hacker.src = "resources/hacker.png";
  bullet.src = "resources/bullet.png";
  bug.src = "resources/bug.png";
  gameOver.src = "resources/gameOver.png";
};

//해커 좌표
let hackerX: number = canvas.width / 2 - 50; //중앙값
let hackerY: number = canvas.height - 100; // 아래값

const render = (): void => {
  ctx?.drawImage(bg, 0, 0, canvas.width, canvas.height);
  ctx?.drawImage(hacker, hackerX, hackerY);
};

const runtimeUpdate = (): void => {
  render();
  requestAnimationFrame(runtimeUpdate);
  // requestAnimationFrame 의 재귀를 통해 update life cycle 을 만들 수 있다.
};

loadImage();
runtimeUpdate();

//--canvas setting
let canvas: HTMLCanvasElement = document.createElement("canvas");
var ctx: CanvasRenderingContext2D | null = canvas.getContext("2d");

canvas.width = 400;
canvas.height = 700;
// 각각 픽셀로 적용됨

document.body.appendChild(canvas);

const bg: HTMLImageElement = new Image();
const hacker: HTMLImageElement = new Image();
const bulletImg: HTMLImageElement = new Image();
const bug: HTMLImageElement = new Image();
const gameOver: HTMLImageElement = new Image();

const loadImage = (): void => {
  bg.src = "resources/bg.webp";
  hacker.src = "resources/hacker.png";
  bulletImg.src = "resources/bullet.png";
  bug.src = "resources/bug.png";
  gameOver.src = "resources/gameOver.png";
};

let inputManager: any = {};

const inputKeyboardLinstener = (): void => {
  document.addEventListener("keydown", (e: KeyboardEvent) => {
    inputManager[e.key] = true;
  });
  document.addEventListener("keyup", (e: KeyboardEvent) => {
    delete inputManager[e.key];

    // spaceBar와 반응해서 총알 생성
    if (e.key === " ") {
      createBullet();
    }
  });
};

//bulletArr 안에 Bullet Obj를 넣을 계획
const bulletArr: any = [];

class Bullet {
  x: number;
  y: number;
  constructor(x: number, y: number) {
    this.x = x + 25;
    this.y = y - 15;
  }
  update() {
    this.y -= 3;
  }
}

//총알 생성 함수
const createBullet = () => {
  let newBullet = new Bullet(hackerX, hackerY);
  bulletArr.push(newBullet);
};

let speed: number = 2;
const inputUpdate = (): void => {
  if ("ArrowRight" in inputManager) {
    hackerX += speed;
  } else if ("ArrowLeft" in inputManager) {
    hackerX -= speed;
  }

  if (hackerX <= -25) {
    hackerX = -25;
  } else if (hackerX >= canvas.width - 75) {
    hackerX = canvas.width - 75;
  }
};

//해커 좌표
let hackerX: number = canvas.width / 2 - 50; //중앙값
let hackerY: number = canvas.height - 100; // 아래값

const render = (): void => {
  ctx?.drawImage(bg, 0, 0, canvas.width, canvas.height);
  ctx?.drawImage(hacker, hackerX, hackerY);

  //BulletImg 를 로드
  for (let i = 0; i < bulletArr.length; i++) {
    ctx?.drawImage(bulletImg, bulletArr[i].x, bulletArr[i].y, 40, 40);
  }
};

const runtimeUpdate = (): void => {
  render();
  inputUpdate();

  //총알 위로 발사시키는 함수 Update 실행
  for (let i = 0; i < bulletArr.length; i++) {
    bulletArr[i].update();
  }

  requestAnimationFrame(runtimeUpdate);
  // requestAnimationFrame 의 재귀를 통해 update life cycle 을 만들 수 있다.
};

loadImage();
inputKeyboardLinstener();
runtimeUpdate();

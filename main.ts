//--canvas setting
let canvas = document.createElement("canvas") as HTMLCanvasElement;
let ctx = canvas.getContext("2d") as CanvasRenderingContext2D;

canvas.width = 400;
canvas.height = 700;
// 각각 픽셀로 적용됨

document.body.appendChild(canvas);

let gameOverBool = false;
let score = 0;

const bg: HTMLImageElement = new Image();
const hacker: HTMLImageElement = new Image();
const bulletImg: HTMLImageElement = new Image();
const bug: HTMLImageElement = new Image();
const gameOver: HTMLImageElement = new Image();
const boomImg = new Image() as HTMLImageElement;

const loadImage = (): void => {
  bg.src = "resources/bg.webp";
  hacker.src = "resources/hacker.png";
  bulletImg.src = "resources/bullet.png";
  bug.src = "resources/bug.png";
  gameOver.src = "resources/gameOver.png";
  boomImg.src = "resources/boom.png";
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
  alive: boolean;
  constructor(x: number, y: number) {
    this.x = x + 25;
    this.y = y - 15;
    this.alive = true;
  }
  update() {
    this.y -= 3;
  }

  // 맞았는지 체크하는 함수. this.alive 로 확인 가능하다.
  checkHit() {
    for (let i = 0; i < enemyArr.length; i++) {
      if (
        this.y <= enemyArr[i].y &&
        this.x >= enemyArr[i].x &&
        this.x <= enemyArr[i].x + 40
      ) {
        score++;
        this.alive = false;
        ctx.drawImage(boomImg, this.x - 10, this.y - 10, 60, 60);
        enemyArr.splice(i, 1);
      }
    }
  }
}

//총알 생성 함수
const createBullet = (): void => {
  let newBullet = new Bullet(hackerX, hackerY);
  bulletArr.push(newBullet);
};

function randomFn(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

const enemyArr: any = [];

class Enemy {
  x: number;
  y: number;
  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }
  update() {
    this.y += 2;

    if (this.y >= canvas.height - 40) {
      gameOverBool = true;
    }
  }
}

//적군 생성 함수
const createEnemy = (): void => {
  setInterval(function () {
    let newEnemy = new Enemy(randomFn(0, canvas.width - 40), 0);
    enemyArr.push(newEnemy);
  }, 1000);
  // setInterval 은 특정 시간마다 호출하고싶은 함수를 정할 수 있음
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

  ctx?.fillText(`Score : ${score}`, 20, 20);
  ctx.fillStyle = "white";
  ctx.font = "20px arial";

  //BulletImg 를 로드
  for (let i = 0; i < bulletArr.length; i++) {
    if (bulletArr[i].alive) {
      ctx?.drawImage(bulletImg, bulletArr[i].x, bulletArr[i].y, 40, 40);
    }
  }
  //EnemyImg 를 로드
  for (let i = 0; i < enemyArr.length; i++) {
    ctx?.drawImage(bug, enemyArr[i].x, enemyArr[i].y, 40, 40);
  }
};

const runtimeUpdate = (): void => {
  if (!gameOverBool) {
    render();
    inputUpdate();

    //총알 위로 발사시키는 함수 Update 실행
    for (let i = 0; i < bulletArr.length; i++) {
      if (bulletArr[i].alive) {
        //bullet 이 살아있다면!
        bulletArr[i].update();
        bulletArr[i].checkHit();
      }
    }

    for (let i = 0; i < enemyArr.length; i++) {
      enemyArr[i].update();
    }

    requestAnimationFrame(runtimeUpdate);
    // requestAnimationFrame 의 재귀를 통해 update life cycle 을 만들 수 있다.
  } else {
    ctx?.drawImage(gameOver, canvas.width / 2 - 140, 150, 300, 150);
  }
};

loadImage();
inputKeyboardLinstener();
createEnemy();
runtimeUpdate();

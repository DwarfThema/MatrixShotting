"use strict";
//--canvas setting
let canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
canvas.width = 400;
canvas.height = 700;
// 각각 픽셀로 적용됨
document.body.appendChild(canvas);
const bg = new Image();
const hacker = new Image();
const bullet = new Image();
const bug = new Image();
const gameOver = new Image();
const loadImage = () => {
    bg.src = "resources/bg.webp";
    hacker.src = "resources/hacker.png";
    bullet.src = "resources/bullet.png";
    bug.src = "resources/bug.png";
    gameOver.src = "resources/gameOver.png";
};
let inputManager = {};
const inputKeyboardLinstener = () => {
    document.addEventListener("keydown", (e) => {
        inputManager[e.key] = true;
        console.log("keydown : ", inputManager);
    });
    document.addEventListener("keyup", (e) => {
        delete inputManager[e.key];
        console.log("keyup : ", inputManager);
    });
};
let speed = 2;
const inputUpdate = () => {
    if ("ArrowRight" in inputManager) {
        hackerX += speed;
    }
    else if ("ArrowLeft" in inputManager) {
        hackerX -= speed;
    }
    if (hackerX <= -25) {
        hackerX = -25;
    }
    else if (hackerX >= canvas.width - 75) {
        hackerX = canvas.width - 75;
    }
};
//해커 좌표
let hackerX = canvas.width / 2 - 50; //중앙값
let hackerY = canvas.height - 100; // 아래값
const render = () => {
    ctx === null || ctx === void 0 ? void 0 : ctx.drawImage(bg, 0, 0, canvas.width, canvas.height);
    ctx === null || ctx === void 0 ? void 0 : ctx.drawImage(hacker, hackerX, hackerY);
};
const runtimeUpdate = () => {
    render();
    inputUpdate();
    requestAnimationFrame(runtimeUpdate);
    // requestAnimationFrame 의 재귀를 통해 update life cycle 을 만들 수 있다.
};
loadImage();
inputKeyboardLinstener();
runtimeUpdate();

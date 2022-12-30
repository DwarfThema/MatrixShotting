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
//해커 좌표
let hackerX = canvas.width / 2 - 50; //중앙값
let hackerY = canvas.height - 100; // 아래값
const render = () => {
    ctx === null || ctx === void 0 ? void 0 : ctx.drawImage(bg, 0, 0, canvas.width, canvas.height);
    ctx === null || ctx === void 0 ? void 0 : ctx.drawImage(hacker, hackerX, hackerY);
};
const runtimeUpdate = () => {
    render();
    requestAnimationFrame(runtimeUpdate);
    // requestAnimationFrame 의 재귀를 통해 update life cycle 을 만들 수 있다.
};
loadImage();
runtimeUpdate();

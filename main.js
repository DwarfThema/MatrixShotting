//--canvas setting
var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
canvas.width = 400;
canvas.height = 700;
// 각각 픽셀로 적용됨
document.body.appendChild(canvas);
var bg = new Image();
var hacker = new Image();
var bullet = new Image();
var bug = new Image();
var gameOver = new Image();
var loadImage = function () {
    bg.src = "resources/bg.webp";
    hacker.src = "resources/hacker.png";
    bullet.src = "resources/bullet.png";
    bug.src = "resources/bug.png";
    gameOver.src = "resources/gameOver.png";
};
//해커 좌표
var hackerX = canvas.width / 2 - 50; //중앙값
var hackerY = canvas.height - 100; // 아래값
var render = function () {
    ctx === null || ctx === void 0 ? void 0 : ctx.drawImage(bg, 0, 0, canvas.width, canvas.height);
    ctx === null || ctx === void 0 ? void 0 : ctx.drawImage(hacker, hackerX, hackerY);
};
var runtimeUpdate = function () {
    render();
    requestAnimationFrame(runtimeUpdate);
    // requestAnimationFrame 의 재귀를 통해 update life cycle 을 만들 수 있다.
};
loadImage();
runtimeUpdate();

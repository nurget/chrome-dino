var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

canvas.width = window.innerWidth - 100;
canvas.height = window.innerHeight - 100;

var img2 = new Image();
img2.src = '/DinoConnection.gif';

var dino = {
  x: 10,
  y: 200,
  width: 70,
  height: 70,
  draw() {
    ctx.fillStyle = 'green';
    // ctx.fillRect(this.x, this.y, this.width, this.height);
    ctx.drawImage(img2, this.x, this.y, this.width, this.height);
  },
};

var img1 = new Image();
img1.src = '/cactus.png';

dino.draw();

class Cactus {
  constructor() {
    this.x = 500;
    this.y = 200;
    this.width = 70;
    this.height = 70;
  }
  draw() {
    ctx.fillStyle = 'red';
    // ctx.fillRect(this.x, this.y, this.width, this.height);
    ctx.drawImage(img1, this.x, this.y, this.width, this.height);
  }
}

var cactus = new Cactus();
cactus.draw();

var timer = 0;
var cactusMany = [];
var jumpTimer = 0;
var animation = [];

function frameExecute() {
  animation = requestAnimationFrame(frameExecute);
  timer++;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  if (timer % 200 === 0) {
    var cactus = new Cactus();
    cactusMany.push(cactus);
  }

  cactusMany.forEach((a, i, o) => {
    // x좌표가 0 미만이면 제거
    if (a.x < 0) {
      o.splice(i, 1);
    }
    a.x--;

    isCrash(dino, a);

    a.draw();
  });

  if (jump == true) {
    dino.y -= 2;
    jumpTimer++;
  }

  if (jump == false) {
    if (dino.y < 200) {
      dino.y += 3;
    }
  }

  if (jumpTimer > 100) {
    jump = false;
    jumpTimer = 0;
  }

  dino.draw();
}

// 충돌 확인
function isCrash(dino, cactus) {
  var crashX = cactus.x - (dino.x + dino.width);
  var crashY = cactus.y - (dino.y + dino.height);
  // 충돌 했을 떄
  if (crashX < 0 && crashY < 0) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    cancelAnimationFrame(animation);
  }
}

frameExecute();

var jump = false;
document.addEventListener('keydown', function (e) {
  if (e.code === 'Space') {
    jump = true;
  }
});

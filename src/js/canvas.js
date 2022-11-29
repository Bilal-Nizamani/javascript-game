// If you are a upwork client who came to see my work I would like to let you know
//this is a rush work with no commments and in one file if you gave me work I will never do
//it like this
import { randomColor, randomIntFromRange } from "./utils";
import { gsap } from "gsap";
const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");
const scoreElem = document.getElementById("score");
const startButton = document.getElementById("startButton");
const model = document.getElementById("model");
const lastScore = document.getElementById("lastScore");

canvas.width = innerWidth - 10;
canvas.height = innerHeight - 10;

const mouse = {
  x: innerWidth / 2,
  y: innerHeight / 2,
};

const colors = [
  "Blue",
  "Green",
  "Red",
  "Yellow",
  "White",
  "Gray",
  "Orange",
  "Cyan",
  "Purple",
  "Pink",
  "Lime",
  "Magenta",
  "Aquamarine",
  "Maroon",
  "Azure",
  "Aqua",
  "Fuchsia",
  "Violet",
  "Powder blue",
];

// Event Listeners
addEventListener("mousemove", (event) => {
  gsap.to(mouse, { duration: 0.4, x: event.clientX, y: event.clientY });
});

addEventListener("resize", () => {
  canvas.width = innerWidth;
  canvas.height = innerHeight;
});

// Objects
class Player {
  constructor(x, y, radius, color, keysPressData) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.keysPressData = keysPressData;
  }
  draw() {
    c.save();
    c.translate(this.x, this.y);
    let mouseDgree = Math.atan2(mouse.y - this.y, mouse.x - this.x);
    c.rotate(mouseDgree);
    c.beginPath();
    c.moveTo(
      -(this.radius - this.radius / 3),
      -(this.radius - this.radius / 3)
    );
    c.lineTo(-(this.radius - this.radius / 3), this.radius - this.radius / 3);
    c.lineTo(this.radius, 0);
    c.fillStyle = this.color;
    c.fill();
    c.closePath();
    c.restore();
  }
  update() {
    if (this.y - this.radius > 0) {
      if (keysPressData.wPress) this.y -= 4;
    }
    if (this.y + this.radius < canvas.height) {
      if (keysPressData.sPress) this.y += 4;
    }
    if (this.x + this.radius < canvas.width) {
      if (keysPressData.dPress) this.x += 4;
    }
    if (this.x - this.radius > 0) {
      if (keysPressData.aPress) this.x -= 4;
    }

    this.draw();
  }
}
class Proectile {
  constructor(x, y, radius, color, velocity) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.velocity = velocity;
  }
  draw() {
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    c.fillStyle = this.color;
    c.fill();
    c.closePath();
  }
  update() {
    this.x += this.velocity.x;
    this.y += this.velocity.y;
    this.draw();
  }
}
class Enemy {
  constructor(x, y, radius, color, circleOrRect) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.velocity = randomIntFromRange(3, 5);
    this.randomEnemy = randomIntFromRange(1, 10);
    this.circleOrRect = circleOrRect;
  }
  draw() {
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);

    c.fillStyle = this.color;
    c.fill();
    c.closePath();
  }
  update(player) {
    let playerAngle = Math.atan2(player.y - this.y, player.x - this.x);

    if (this.randomEnemy < 3) {
      let randomVelocity = randomIntFromRange(5, 10);
      this.x += Math.cos(playerAngle + Math.random() * 2) * randomVelocity;
      this.y += Math.sin(playerAngle + Math.random() * 2) * randomVelocity;
    } else {
      this.x += Math.cos(playerAngle) * this.velocity;
      this.y += Math.sin(playerAngle) * this.velocity;
    }

    this.draw();
  }
}
// class Enemy2 {
//   constructor(x, y, radius, color, circleOrRect) {
//     this.x = x;
//     this.y = y;
//     this.radius = radius;
//     this.color = color;
//     this.velocity = randomIntFromRange(120, canvas.height);
//     this.randomEnemy = randomIntFromRange(1, 10);
//     this.circleOrRect = circleOrRect;
//     this.angle = 1;
//   }
//   draw() {
//     c.beginPath();
//     c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);

//     c.fillStyle = this.color;
//     c.fill();

//     c.closePath();
//   }
//   update() {
//     if (this.randomEnemy < 3) {
//       this.x = canvas.width / 2 + (Math.cos(this.angle) * this.velocity) / 2;
//       this.y = canvas.height / 2 + (Math.cos(this.angle) * this.velocity) / 2;
//     } else {
//       this.x = canvas.width / 2 + (Math.cos(this.angle) * canvas.height) / 2;
//       this.y = canvas.height / 2 + (Math.cos(this.angle) * canvas.height) / 2;
//     }

//     this.draw();
//     this.angle += 0.01;
//   }
// }
class Enemy3 {
  constructor(x, y, radius, color, circleOrRect) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.velocity = {
      x: randomIntFromRange(1, 7),
      y: randomIntFromRange(1, 7),
    };
  }
  draw() {
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    c.fillStyle = this.color;
    c.fill();

    c.closePath();
  }
  update() {
    if (this.x > canvas.width - this.radius + 3 || this.x < this.radius) {
      this.velocity.x = -this.velocity.x;
    }
    if (this.y > canvas.height - this.radius + 3 || this.y < this.radius) {
      this.velocity.y = -this.velocity.y;
    }
    this.x += this.velocity.x;
    this.y += this.velocity.y;
    this.draw();
  }
}
class BurstParticles {
  constructor(x, y, radius, color, velocity) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.velocity = velocity;
    this.alpha = 1;
  }
  draw() {
    c.save();
    c.beginPath();
    c.globalAlpha = this.alpha;

    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    c.fillStyle = this.color;
    c.fill();
    c.closePath();
    c.restore();
  }
  update() {
    this.alpha -= 0.01;
    this.x += this.velocity.x;
    this.y += this.velocity.y;

    this.draw();
  }
}
//
let projectiles = [];
let player;
let enemies = [];
let particles = [];
let score = 0;
let clickCounter = 0;

// creating player

let keysPressData = {
  wPress: false,
  aPress: false,
  sPress: false,
  dPress: false,
};
addEventListener("keydown", (e) => {
  if (e.key === "w") keysPressData.wPress = true;
  if (e.key === "a") keysPressData.aPress = true;
  if (e.key === "s") keysPressData.sPress = true;
  if (e.key === "d") keysPressData.dPress = true;
});
addEventListener("keyup", (e) => {
  if (e.key === "w") keysPressData.wPress = false;
  if (e.key === "a") keysPressData.aPress = false;
  if (e.key === "s") keysPressData.sPress = false;
  if (e.key === "d") keysPressData.dPress = false;
});

player = new Player(200, canvas.height / 2, 15, "white", keysPressData);
// particles spread effect after after enemy is attacked
const createParticles = (injuredEnemy, particlesLength) => {
  for (let i = 0; i < particlesLength * 2; i++) {
    let radius = Math.random() * 2;
    let randomSpeedPlus = randomIntFromRange(1, 3);
    let speedX = Math.cos(i) * randomSpeedPlus;
    let speedY = Math.sin(i) * randomSpeedPlus;
    particles.push(
      new BurstParticles(
        injuredEnemy.x + randomIntFromRange(-injuredEnemy.radius, 0),
        injuredEnemy.y + randomIntFromRange(-injuredEnemy.radius, 0),
        radius,
        injuredEnemy.color,
        { x: speedX, y: speedY }
      )
    );
  }
};
// creating new enemy after ever second
let intervelTime;
const createEnemy = function () {
  let spawnPosX = Math.random();
  let spawnPosY = Math.random();
  let rdmNum = randomIntFromRange(1, 10);
  let enmey1Or2 = Math.floor(randomIntFromRange(0, 3));
  const radius = randomIntFromRange(8, 50);
  let circleOrRect = rdmNum > 5 ? "circle" : "rectangle";
  const color = randomColor(colors);

  if (spawnPosX < 0.5) {
    if (spawnPosY > 0.5) {
      spawnPosX = canvas.width;
      spawnPosY *= canvas.height;
    } else {
      spawnPosX = 0;
      spawnPosY *= canvas.height;
    }
  } else {
    if (spawnPosY < 0.5) {
      spawnPosX *= canvas.width;
      spawnPosY = canvas.height;
    } else {
      spawnPosX *= canvas.width;
      spawnPosY = 0;
    }
  }
  if (!enmey1Or2) {
    enemies.push(
      new Enemy3(
        canvas.width / 2,
        canvas.height / 2,
        radius,
        randomColor(colors),
        circleOrRect
      )
    );
  }
  // if (!enmey1Or2) {
  // eney that goes diagnol and keep repeating
  // enemies.push(new Enemy2(spawnPosX, spawnPosY, radius, color, circleOrRect));
  // } else {
  enemies.push(new Enemy(spawnPosX, spawnPosY, radius, color, circleOrRect));
  // }
};
intervelTime = setInterval(createEnemy, 1500);

// here creating projectiles on click
const creatProjecTile = () => {
  clickCounter++;
  if (clickCounter > 1) {
    let mouseDgree = Math.atan2(mouse.y - player.y, mouse.x - player.x);
    projectiles.push(
      new Proectile(player.x, player.y, 3, "white", {
        x: Math.cos(mouseDgree) * 7,
        y: Math.sin(mouseDgree) * 7,
      })
    );
  }
};
addEventListener("click", (e) => {
  creatProjecTile();
});
addEventListener("keydown", (e) => {
  if (e.code === "Space") {
    creatProjecTile();
  }
});

startButton.addEventListener("click", (e) => {
  init();
  scoreElem.innerHTML = 0;
  model.style.display = "none";
});
// Animation Loop
let id;
const init = () => {
  projectiles = [];
  player;
  enemies = [];
  particles = [];
  score = 0;
  clickCounter = 0;
  player = new Player(200, canvas.height / 2, 15, "white", keysPressData);

  animate();
};

function animate() {
  id = requestAnimationFrame(animate);
  c.fillStyle = `rgba(0, 0, 0, 1)`;
  c.fillRect(0, 0, canvas.width, canvas.height);
  player.update();
  enemies.forEach((enemy) => {
    const dist = Math.hypot(enemy.x - player.x, enemy.y - player.y);
    if (dist - enemy.radius - player.radius < 1) {
      model.style.display = "flex";
      lastScore.innerHTML = score;
      cancelAnimationFrame(id);
    }
    enemy.update(player);
  });
  projectiles.forEach((projectile, index) => {
    if (
      projectile.x > canvas.width ||
      projectile.x < 0 ||
      projectile.y > canvas.height ||
      projectile.y > canvas.height
    ) {
      projectiles.splice(index, 1);
    }
    enemies.forEach((enemy, enemyIndex) => {
      const dist = Math.hypot(enemy.x - projectile.x, enemy.y - projectile.y);

      if (dist - projectile.radius - enemy.radius < 1) {
        if (enemy.radius - 10 > 10) {
          gsap.to(enemy, {
            duration: 0.2,
            radius: enemy.radius - 10,
          });
          score += 10;
          projectiles.splice(index, 1);
          createParticles(enemy, enemy.radius / 3);
        } else {
          score += 25;
          enemies.splice(enemyIndex, 1);
          projectiles.splice(index, 1);
          createParticles(enemy, enemy.radius);
        }
        scoreElem.innerHTML = score;
      }
    });
    projectile.update();
  });
  particles.forEach((particle, index) => {
    if (particle.alpha < 0.05) {
      particles.splice(index, 1);
    }
    particle.update();
  });
}

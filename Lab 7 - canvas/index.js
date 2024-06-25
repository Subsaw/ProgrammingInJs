document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");
  const startBtn = document.getElementById("startBtn");
  const resetBtn = document.getElementById("resetBtn");
  const numBallsSlider = document.getElementById("numBalls");
  const distanceThresholdSlider = document.getElementById("distanceThreshold");
  const numBallsValue = document.getElementById("numBallsValue");
  const distanceThresholdValue = document.getElementById(
    "distanceThresholdValue"
  );

  let balls = [];
  let animationFrameId;
  let numBalls = parseInt(numBallsSlider.value);
  let distanceThreshold = parseInt(distanceThresholdSlider.value);

  numBallsSlider.addEventListener("input", () => {
    numBallsValue.textContent = numBallsSlider.value;
    numBalls = parseInt(numBallsSlider.value);
  });

  distanceThresholdSlider.addEventListener("input", () => {
    distanceThresholdValue.textContent = distanceThresholdSlider.value;
    distanceThreshold = parseInt(distanceThresholdSlider.value);
  });

  class Ball {
    constructor(x, y, vx, vy, radius = 5) {
      this.x = x;
      this.y = y;
      this.vx = vx;
      this.vy = vy;
      this.radius = radius;
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = "blue";
      ctx.fill();
      ctx.closePath();
    }

    move() {
      this.x += this.vx;
      this.y += this.vy;

      if (this.x + this.radius > canvas.width || this.x - this.radius < 0) {
        this.vx *= -1;
      }
      if (this.y + this.radius > canvas.height || this.y - this.radius < 0) {
        this.vy *= -1;
      }
    }
  }

  function createBalls() {
    balls = [];
    for (let i = 0; i < numBalls; i++) {
      const x = Math.random() * canvas.width;
      const y = Math.random() * canvas.height;
      const vx = (Math.random() - 0.5) * 4;
      const vy = (Math.random() - 0.5) * 4;
      balls.push(new Ball(x, y, vx, vy));
    }
  }

  function drawLines() {
    for (let i = 0; i < balls.length; i++) {
      for (let j = i + 1; j < balls.length; j++) {
        const dist = Math.hypot(
          balls[i].x - balls[j].x,
          balls[i].y - balls[j].y
        );
        if (dist < distanceThreshold) {
          ctx.beginPath();
          ctx.moveTo(balls[i].x, balls[i].y);
          ctx.lineTo(balls[j].x, balls[j].y);
          ctx.strokeStyle = `rgba(0,0,255,${1 - dist / distanceThreshold})`;
          ctx.stroke();
          ctx.closePath();
        }
      }
    }
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    balls.forEach((ball) => {
      ball.move();
      ball.draw();
    });
    drawLines();
    animationFrameId = requestAnimationFrame(animate);
  }

  startBtn.addEventListener("click", () => {
    createBalls();
    if (animationFrameId) {
      cancelAnimationFrame(animationFrameId);
    }
    animate();
  });

  resetBtn.addEventListener("click", () => {
    if (animationFrameId) {
      cancelAnimationFrame(animationFrameId);
    }
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    balls = [];
  });
});

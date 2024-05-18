// let counter = 0
// let lastTime = Date.now()
// window.addEventListener('deviceorientation', onDeviceMove)

// function onDeviceMove(event) {
//     console.log(event)
// }

// function animate() {
//     counter++
//     if (counter % 100 === 0) {
//         const time = Date.now()
//         const interval = time - lastTime
//         console.log(`Render 100 klatek trwał: ${interval} [${1000 / (interval / 100)}fps]`)
//         lastTime = time
//     }
//     requestAnimationFrame(animate)
// }

// requestAnimationFrame(animate)

window.addEventListener("DOMContentLoaded", () => {
  const gameArea = document.getElementById("gameArea");
  const ball = document.getElementById("ball");
  const hole = document.getElementById("hole");

  const randomPosition = (element) => {
    const x = Math.random() * (gameArea.clientWidth - element.offsetWidth);
    const y = Math.random() * (gameArea.clientHeight - element.offsetHeight);
    element.style.left = `${x}px`;
    element.style.top = `${y}px`;
  };

  randomPosition(ball);
  randomPosition(hole);

  let ballPos = {
    x: parseFloat(ball.style.left),
    y: parseFloat(ball.style.top),
  };
  let velocity = { x: 0, y: 0 };

  const updateBallPosition = (event) => {
    if (event.alpha >= 0 && event.alpha <= 180) {
      velocity.x = event.alpha / 50;
    } else {
      velocity.x = -(360 - event.alpha) / 50;
    }
    velocity.y = (event.beta - 90) / 50;
  };

  const animate = () => {
    const maxX = gameArea.clientWidth - ball.clientWidth;
    const maxY = gameArea.clientHeight - ball.clientHeight;

    ballPos.x += velocity.x;
    ballPos.y += velocity.y;

    ballPos.x = Math.max(0, Math.min(maxX, ballPos.x));
    ballPos.y = Math.max(0, Math.min(maxY, ballPos.y));

    ball.style.left = `${ballPos.x}px`;
    ball.style.top = `${ballPos.y}px`;

    const ballRect = ball.getBoundingClientRect();
    const holeRect = hole.getBoundingClientRect();

    if (
      ballRect.left < holeRect.right &&
      ballRect.right > holeRect.left &&
      ballRect.top < holeRect.bottom &&
      ballRect.bottom > holeRect.top
    ) {
      alert("Kulka w dziurze!");
      randomPosition(ball);
      randomPosition(hole);
      ballPos = {
        x: parseFloat(ball.style.left),
        y: parseFloat(ball.style.top),
      };
      velocity = { x: 0, y: 0 };
    }

    requestAnimationFrame(animate);
  };

  window.addEventListener("deviceorientation", updateBallPosition);
  requestAnimationFrame(animate);
});

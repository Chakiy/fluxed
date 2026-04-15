export function initBalls(canvas) {
  if (!canvas) return;

  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  const texturePaths = [
    "/images/balls/u-beige.png",
    "/images/balls/i-green.png",
    "/images/balls/f-pink.png",
    "/images/balls/x-pink.png",
    "/images/balls/e-green.png",
    "/images/balls/d-beige.png",
  ];

  const BALL_SIZES = [50, 70, 95];
  const mouse = {
    x: null,
    y: null,
    radius: 220,
  };

  let animationFrameId = null;
  let balls = [];
  let textures = [];
  let isDestroyed = false;
  let time = 0;

  let viewportWidth = window.innerWidth;
  let viewportHeight = window.innerHeight;

  function resizeCanvas() {
    const dpr = window.devicePixelRatio || 1;

    viewportWidth = window.innerWidth;
    viewportHeight = window.innerHeight;

    canvas.width = Math.floor(viewportWidth * dpr);
    canvas.height = Math.floor(viewportHeight * dpr);

    canvas.style.width = `${viewportWidth}px`;
    canvas.style.height = `${viewportHeight}px`;

    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.scale(dpr, dpr);

    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = "high";
  }

  function random(min, max) {
    return Math.random() * (max - min) + min;
  }

  function randomFromArray(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  }

  function distance(x1, y1, x2, y2) {
    const dx = x2 - x1;
    const dy = y2 - y1;
    return Math.sqrt(dx * dx + dy * dy);
  }

  function clamp(value, min, max) {
    return Math.max(min, Math.min(max, value));
  }

  function loadImages(paths) {
    return Promise.all(
      paths.map(
        (path) =>
          new Promise((resolve, reject) => {
            const img = new Image();
            img.src = path;
            img.onload = () => resolve(img);
            img.onerror = () =>
              reject(new Error(`Не удалось загрузить изображение: ${path}`));
          }),
      ),
    );
  }

  class Ball {
    constructor({
      x,
      y,
      radius,
      image,
      vx,
      vy,
      rotation,
      rotationSpeed,
      driftSeed,
      driftStrength,
    }) {
      this.x = x;
      this.y = y;
      this.radius = radius;
      this.image = image;
      this.vx = vx;
      this.vy = vy;
      this.rotation = rotation;
      this.rotationSpeed = rotationSpeed;
      this.mass = radius;

      this.baseRotationSpeed = rotationSpeed;
      this.driftSeed = driftSeed;
      this.driftStrength = driftStrength;
      this.maxSpeed = 2.4;
    }

    draw() {
      ctx.save();
      ctx.translate(this.x, this.y);
      ctx.rotate(this.rotation);

      if (this.image) {
        ctx.drawImage(
          this.image,
          -this.radius,
          -this.radius,
          this.radius * 2,
          this.radius * 2,
        );
      } else {
        ctx.beginPath();
        ctx.arc(0, 0, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(255,255,255,0.15)";
        ctx.fill();
      }

      ctx.restore();
    }

    applyAmbientMotion(globalTime) {
      const driftX =
        Math.sin(globalTime * 0.0012 + this.driftSeed) * this.driftStrength;
      const driftY =
        Math.cos(globalTime * 0.001 + this.driftSeed * 1.37) *
        this.driftStrength;

      this.vx += driftX * 0.015;
      this.vy += driftY * 0.015;

      const rotationWave =
        Math.sin(globalTime * 0.001 + this.driftSeed) * 0.0008;
      this.rotationSpeed += rotationWave;

      this.rotationSpeed = clamp(
        this.rotationSpeed,
        this.baseRotationSpeed - 0.01,
        this.baseRotationSpeed + 0.01,
      );
    }

    pushFromMouse() {
      if (mouse.x === null || mouse.y === null) return;

      const dx = this.x - mouse.x;
      const dy = this.y - mouse.y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < mouse.radius && dist > 0) {
        const force = (mouse.radius - dist) / mouse.radius;
        const angle = Math.atan2(dy, dx);

        this.vx += Math.cos(angle) * force * 0.45;
        this.vy += Math.sin(angle) * force * 0.45;
      }
    }

    limitSpeed() {
      const speed = Math.sqrt(this.vx * this.vx + this.vy * this.vy);

      if (speed > this.maxSpeed) {
        const scale = this.maxSpeed / speed;
        this.vx *= scale;
        this.vy *= scale;
      }
    }

    move() {
      this.limitSpeed();

      this.x += this.vx;
      this.y += this.vy;
      this.rotation += this.rotationSpeed;

      this.vx *= 0.997;
      this.vy *= 0.997;
      this.rotationSpeed *= 0.999;
    }

    bounceFromWalls() {
      if (this.x - this.radius < 0) {
        this.x = this.radius;
        this.vx = Math.abs(this.vx);
      } else if (this.x + this.radius > viewportWidth) {
        this.x = viewportWidth - this.radius;
        this.vx = -Math.abs(this.vx);
      }

      if (this.y - this.radius < 0) {
        this.y = this.radius;
        this.vy = Math.abs(this.vy);
      } else if (this.y + this.radius > viewportHeight) {
        this.y = viewportHeight - this.radius;
        this.vy = -Math.abs(this.vy);
      }
    }
  }

  function resolveBallCollision(ballA, ballB) {
    const dx = ballB.x - ballA.x;
    const dy = ballB.y - ballA.y;
    const dist = Math.sqrt(dx * dx + dy * dy);
    const minDist = ballA.radius + ballB.radius;

    if (dist === 0 || dist >= minDist) return;

    const nx = dx / dist;
    const ny = dy / dist;

    const overlap = minDist - dist;
    const separation = overlap / 2;

    ballA.x -= nx * separation;
    ballA.y -= ny * separation;
    ballB.x += nx * separation;
    ballB.y += ny * separation;

    const dvx = ballB.vx - ballA.vx;
    const dvy = ballB.vy - ballA.vy;
    const speedAlongNormal = dvx * nx + dvy * ny;

    if (speedAlongNormal > 0) return;

    const restitution = 0.94;
    const impulse =
      (-(1 + restitution) * speedAlongNormal) /
      (1 / ballA.mass + 1 / ballB.mass);

    const impulseX = impulse * nx;
    const impulseY = impulse * ny;

    ballA.vx -= impulseX / ballA.mass;
    ballA.vy -= impulseY / ballA.mass;
    ballB.vx += impulseX / ballB.mass;
    ballB.vy += impulseY / ballB.mass;

    ballA.rotationSpeed += random(-0.002, 0.002);
    ballB.rotationSpeed += random(-0.002, 0.002);
  }

  function createBalls() {
    const amount = Math.max(33, Math.floor(window.innerWidth / 110));
    balls = [];

    for (let i = 0; i < amount; i++) {
      const radius = randomFromArray(BALL_SIZES) / 2;
      const image = textures[i % textures.length];

      let x;
      let y;
      let attempts = 0;
      let validPosition = false;

      while (!validPosition && attempts < 200) {
        x = random(radius, viewportWidth - radius);
        y = random(radius, viewportHeight - radius);
        validPosition = true;

        for (let j = 0; j < balls.length; j++) {
          const other = balls[j];
          const dist = distance(x, y, other.x, other.y);

          if (dist < radius + other.radius + 12) {
            validPosition = false;
            break;
          }
        }

        attempts++;
      }

      balls.push(
        new Ball({
          x,
          y,
          radius,
          image,
          vx: random(-0.8, 0.8),
          vy: random(-0.8, 0.8),
          rotation: random(0, Math.PI * 2),
          rotationSpeed: random(-0.006, 0.006),
          driftSeed: random(0, Math.PI * 2),
          driftStrength: random(0.6, 1.4),
        }),
      );
    }
  }

  function handleMouseMove(e) {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  }

  function handleMouseLeave() {
    mouse.x = null;
    mouse.y = null;
  }

  function handleResize() {
    resizeCanvas();
    createBalls();
  }

  function animate() {
    if (isDestroyed) return;

    time += 16;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < balls.length; i++) {
      balls[i].applyAmbientMotion(time);
      balls[i].pushFromMouse();
    }

    for (let i = 0; i < balls.length; i++) {
      balls[i].move();
      balls[i].bounceFromWalls();
    }

    for (let i = 0; i < balls.length; i++) {
      for (let j = i + 1; j < balls.length; j++) {
        resolveBallCollision(balls[i], balls[j]);
      }
    }

    for (let i = 0; i < balls.length; i++) {
      balls[i].bounceFromWalls();
      balls[i].draw();
    }

    animationFrameId = window.requestAnimationFrame(animate);
  }

  resizeCanvas();

  loadImages(texturePaths)
    .then((loadedImages) => {
      if (isDestroyed) return;

      textures = loadedImages;
      createBalls();
      animate();
    })
    .catch((error) => {
      console.error(error);
    });

  window.addEventListener("resize", handleResize);
  window.addEventListener("mousemove", handleMouseMove);
  window.addEventListener("mouseleave", handleMouseLeave);

  return () => {
    isDestroyed = true;

    window.removeEventListener("resize", handleResize);
    window.removeEventListener("mousemove", handleMouseMove);
    window.removeEventListener("mouseleave", handleMouseLeave);

    if (animationFrameId) {
      window.cancelAnimationFrame(animationFrameId);
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };
}

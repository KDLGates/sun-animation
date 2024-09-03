/// <reference lib="dom" />
/// <reference lib="dom.iterable" />

document.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById('sunriseCanvas') as HTMLCanvasElement;
  const ctx = canvas.getContext('2d')!;
  let animationFrameId: number;

  interface Star {
    x: number;
    y: number;
    radius: number;
  }

  const stars: Star[] = Array(50).fill(null).map(() => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height / 2,
    radius: Math.random() * 2 + 1
  }));

  function drawScene(progress: number): void {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Sky color transition
    const skyColor = getSkyColor(progress);
    ctx.fillStyle = skyColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Stars
    if (progress < 0.2 || progress > 0.8) {
      const starOpacity = progress < 0.2 ? 1 - progress / 0.2 : (progress - 0.8) / 0.2;
      ctx.fillStyle = `rgba(255, 255, 255, ${starOpacity})`;
      stars.forEach(star => {
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, 2 * Math.PI);
        ctx.fill();
      });
    }

    // Moon
    if (progress < 0.1 || progress > 0.9) {
      const moonOpacity = progress < 0.1 ? 1 - progress / 0.1 : (progress - 0.9) / 0.1;
      ctx.fillStyle = `rgba(220, 220, 220, ${moonOpacity})`;
      ctx.beginPath();
      ctx.arc(canvas.width * 0.8, canvas.height * 0.2, 30, 0, 2 * Math.PI);
      ctx.fill();
    }

    // Sun
    ctx.fillStyle = 'yellow';
    const sunRadius = 40;
    const sunPeakY = canvas.height / 4;  // Adjusted to make the sun rise higher
    const sunY = canvas.height + sunRadius - Math.sin(progress * Math.PI) * (canvas.height - sunPeakY + sunRadius);
    ctx.beginPath();
    ctx.arc(canvas.width / 2, sunY, sunRadius, 0, 2 * Math.PI);
    ctx.fill();

    // Ground
    const groundGradient = ctx.createLinearGradient(0, canvas.height - 50, 0, canvas.height);
    groundGradient.addColorStop(0, '#228B22');  // Forest Green
    groundGradient.addColorStop(1, '#006400');  // Dark Green
    ctx.fillStyle = groundGradient;
    ctx.fillRect(0, canvas.height - 50, canvas.width, 50);

    // Trees
    drawTree(ctx, 50, canvas.height - 50, 30);
    drawTree(ctx, canvas.width - 50, canvas.height - 50, 40);
  }

  function drawTree(ctx: CanvasRenderingContext2D, x: number, y: number, size: number): void {
    ctx.fillStyle = '#4B3621';  // Brown for trunk
    ctx.fillRect(x - size/10, y - size, size/5, size);
    
    ctx.fillStyle = '#228B22';  // Green for leaves
    ctx.beginPath();
    ctx.moveTo(x, y - size);
    ctx.lineTo(x - size / 2, y);
    ctx.lineTo(x + size / 2, y);
    ctx.closePath();
    ctx.fill();
  }

  function getSkyColor(progress: number): string {
    const nightColor: [number, number, number] = [25, 25, 112];  // Midnight Blue
    const dayColor: [number, number, number] = [135, 206, 235];  // Sky Blue
    const sunsetColor: [number, number, number] = [255, 165, 0];  // Orange

    let r: number, g: number, b: number;

    if (progress < 0.2) {  // Night to sunrise
      const t = progress / 0.2;
      r = nightColor[0] + (sunsetColor[0] - nightColor[0]) * t;
      g = nightColor[1] + (sunsetColor[1] - nightColor[1]) * t;
      b = nightColor[2] + (sunsetColor[2] - nightColor[2]) * t;
    } else if (progress < 0.3) {  // Sunrise to day
      const t = (progress - 0.2) / 0.1;
      r = sunsetColor[0] + (dayColor[0] - sunsetColor[0]) * t;
      g = sunsetColor[1] + (dayColor[1] - sunsetColor[1]) * t;
      b = sunsetColor[2] + (dayColor[2] - sunsetColor[2]) * t;
    } else if (progress < 0.7) {  // Day
      r = dayColor[0];
      g = dayColor[1];
      b = dayColor[2];
    } else if (progress < 0.8) {  // Day to sunset
      const t = (progress - 0.7) / 0.1;
      r = dayColor[0] + (sunsetColor[0] - dayColor[0]) * t;
      g = dayColor[1] + (sunsetColor[1] - dayColor[1]) * t;
      b = dayColor[2] + (sunsetColor[2] - dayColor[2]) * t;
    } else {  // Sunset to night
      const t = (progress - 0.8) / 0.2;
      r = sunsetColor[0] + (nightColor[0] - sunsetColor[0]) * t;
      g = sunsetColor[1] + (nightColor[1] - sunsetColor[1]) * t;
      b = sunsetColor[2] + (nightColor[2] - sunsetColor[2]) * t;
    }

    return `rgb(${Math.round(r)}, ${Math.round(g)}, ${Math.round(b)})`;
  }

  function animate(): void {
    const startTime = performance.now();

    function renderFrame(time: number): void {
      const progress = (time - startTime) / 10000 % 1;  // 10 seconds for a full cycle
      drawScene(progress);
      animationFrameId = requestAnimationFrame(renderFrame);
    }

    animationFrameId = requestAnimationFrame(renderFrame);
  }

  animate();
});
/// <reference lib="dom" />
/// <reference lib="dom.iterable" />
document.addEventListener('DOMContentLoaded', function () {
    var canvas = document.getElementById('sunriseCanvas');
    var ctx = canvas.getContext('2d');
    var animationFrameId;
    var stars = Array(50).fill(null).map(function () { return ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height / 2,
        radius: Math.random() * 2 + 1
    }); });
    function drawScene(progress) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        // Sky color transition
        var skyColor = getSkyColor(progress);
        ctx.fillStyle = skyColor;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        // Stars
        if (progress < 0.2 || progress > 0.8) {
            var starOpacity = progress < 0.2 ? 1 - progress / 0.2 : (progress - 0.8) / 0.2;
            ctx.fillStyle = "rgba(255, 255, 255, ".concat(starOpacity, ")");
            stars.forEach(function (star) {
                ctx.beginPath();
                ctx.arc(star.x, star.y, star.radius, 0, 2 * Math.PI);
                ctx.fill();
            });
        }
        // Moon
        if (progress < 0.1 || progress > 0.9) {
            var moonOpacity = progress < 0.1 ? 1 - progress / 0.1 : (progress - 0.9) / 0.1;
            ctx.fillStyle = "rgba(220, 220, 220, ".concat(moonOpacity, ")");
            ctx.beginPath();
            ctx.arc(canvas.width * 0.8, canvas.height * 0.2, 30, 0, 2 * Math.PI);
            ctx.fill();
        }
        // Sun
        ctx.fillStyle = 'yellow';
        var sunRadius = 40;
        var sunPeakY = canvas.height / 4; // Adjusted to make the sun rise higher
        var sunY = canvas.height + sunRadius - Math.sin(progress * Math.PI) * (canvas.height - sunPeakY + sunRadius);
        ctx.beginPath();
        ctx.arc(canvas.width / 2, sunY, sunRadius, 0, 2 * Math.PI);
        ctx.fill();
        // Ground
        var groundGradient = ctx.createLinearGradient(0, canvas.height - 50, 0, canvas.height);
        groundGradient.addColorStop(0, '#228B22'); // Forest Green
        groundGradient.addColorStop(1, '#006400'); // Dark Green
        ctx.fillStyle = groundGradient;
        ctx.fillRect(0, canvas.height - 50, canvas.width, 50);
        // Trees
        drawTree(ctx, 50, canvas.height - 50, 30);
        drawTree(ctx, canvas.width - 50, canvas.height - 50, 40);
    }
    function drawTree(ctx, x, y, size) {
        ctx.fillStyle = '#4B3621'; // Brown for trunk
        ctx.fillRect(x - size / 10, y - size, size / 5, size);
        ctx.fillStyle = '#228B22'; // Green for leaves
        ctx.beginPath();
        ctx.moveTo(x, y - size);
        ctx.lineTo(x - size / 2, y);
        ctx.lineTo(x + size / 2, y);
        ctx.closePath();
        ctx.fill();
    }
    function getSkyColor(progress) {
        var nightColor = [25, 25, 112]; // Midnight Blue
        var dayColor = [135, 206, 235]; // Sky Blue
        var sunsetColor = [255, 165, 0]; // Orange
        var r, g, b;
        if (progress < 0.2) { // Night to sunrise
            var t = progress / 0.2;
            r = nightColor[0] + (sunsetColor[0] - nightColor[0]) * t;
            g = nightColor[1] + (sunsetColor[1] - nightColor[1]) * t;
            b = nightColor[2] + (sunsetColor[2] - nightColor[2]) * t;
        }
        else if (progress < 0.3) { // Sunrise to day
            var t = (progress - 0.2) / 0.1;
            r = sunsetColor[0] + (dayColor[0] - sunsetColor[0]) * t;
            g = sunsetColor[1] + (dayColor[1] - sunsetColor[1]) * t;
            b = sunsetColor[2] + (dayColor[2] - sunsetColor[2]) * t;
        }
        else if (progress < 0.7) { // Day
            r = dayColor[0];
            g = dayColor[1];
            b = dayColor[2];
        }
        else if (progress < 0.8) { // Day to sunset
            var t = (progress - 0.7) / 0.1;
            r = dayColor[0] + (sunsetColor[0] - dayColor[0]) * t;
            g = dayColor[1] + (sunsetColor[1] - dayColor[1]) * t;
            b = dayColor[2] + (sunsetColor[2] - dayColor[2]) * t;
        }
        else { // Sunset to night
            var t = (progress - 0.8) / 0.2;
            r = sunsetColor[0] + (nightColor[0] - sunsetColor[0]) * t;
            g = sunsetColor[1] + (nightColor[1] - sunsetColor[1]) * t;
            b = sunsetColor[2] + (nightColor[2] - sunsetColor[2]) * t;
        }
        return "rgb(".concat(Math.round(r), ", ").concat(Math.round(g), ", ").concat(Math.round(b), ")");
    }
    function animate() {
        var startTime = performance.now();
        function renderFrame(time) {
            var progress = (time - startTime) / 10000 % 1; // 10 seconds for a full cycle
            drawScene(progress);
            animationFrameId = requestAnimationFrame(renderFrame);
        }
        animationFrameId = requestAnimationFrame(renderFrame);
    }
    animate();
});

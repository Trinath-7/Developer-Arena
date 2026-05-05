import React, { useEffect, useRef } from 'react';

const SnowEffect = ({ active }) => {
    const canvasRef = useRef(null);

    useEffect(() => {
        if (!active) return;
        
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        let animationFrameId;

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const flakes = [];
        for (let i = 0; i < 200; i++) {
            flakes.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                radius: Math.random() * 3 + 1,
                speed: Math.random() * 2 + 0.5,
                sway: Math.random() * 0.05,
                angle: Math.random() * Math.PI * 2
            });
        }

        const draw = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = 'white';

            for (let i = 0; i < flakes.length; i++) {
                const flake = flakes[i];
                ctx.beginPath();
                ctx.arc(flake.x, flake.y, flake.radius, 0, Math.PI * 2);
                ctx.globalAlpha = 0.8;
                ctx.fill();

                flake.y += flake.speed;
                flake.angle += flake.sway;
                flake.x += Math.sin(flake.angle) * 1;

                if (flake.y > canvas.height) {
                    flake.y = -flake.radius;
                    flake.x = Math.random() * canvas.width;
                }
            }
            animationFrameId = requestAnimationFrame(draw);
        };

        draw();

        const handleResize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        window.addEventListener('resize', handleResize);

        return () => {
            cancelAnimationFrame(animationFrameId);
            window.removeEventListener('resize', handleResize);
        };
    }, [active]);

    if (!active) return null;
    return <canvas ref={canvasRef} className="weather-canvas" />;
};

export default SnowEffect;

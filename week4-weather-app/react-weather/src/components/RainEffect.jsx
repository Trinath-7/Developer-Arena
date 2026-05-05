import React, { useEffect, useRef } from 'react';

const RainEffect = ({ active }) => {
    const canvasRef = useRef(null);

    useEffect(() => {
        if (!active) return;
        
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        let animationFrameId;

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const raindrops = [];
        for (let i = 0; i < 150; i++) {
            raindrops.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                length: Math.random() * 20 + 10,
                speed: Math.random() * 10 + 10,
                opacity: Math.random() * 0.5 + 0.1
            });
        }

        const draw = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            ctx.lineWidth = 1;
            ctx.lineCap = 'round';
            
            for (let i = 0; i < raindrops.length; i++) {
                const drop = raindrops[i];
                ctx.beginPath();
                ctx.moveTo(drop.x, drop.y);
                ctx.lineTo(drop.x, drop.y + drop.length);
                ctx.strokeStyle = `rgba(255, 255, 255, ${drop.opacity})`;
                ctx.stroke();

                drop.y += drop.speed;

                // Reset if it goes off screen
                if (drop.y > canvas.height) {
                    drop.y = -drop.length;
                    drop.x = Math.random() * canvas.width;
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

export default RainEffect;

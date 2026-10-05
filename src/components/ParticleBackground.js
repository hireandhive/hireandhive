"use client";

import { useEffect, useRef } from "react";

export default function ParticleBackground() {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");

        let particles = [];
        let animationFrame;
        let highlightTimer;
        let highlightedDots = new Set();

        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        const createParticles = () => {
            particles = [];

            const gap = 45;

            const columns = Math.ceil(canvas.width / gap);
            const rows = Math.ceil(canvas.height / gap);

            // Select only 3 dots to be highlighted
            highlightedDots = new Set();

            while (highlightedDots.size < 3) {
                highlightedDots.add(
                    Math.floor(Math.random() * columns * rows)
                );
            }

            let index = 0;

            for (let row = 0; row < rows; row++) {
                for (let column = 0; column < columns; column++) {
                    const isHighlighted = highlightedDots.has(index);

                    particles.push({
                        x: column * gap + gap / 2,
                        y: row * gap + gap / 2,

                        size: 1.5,
                        opacity: 0.35,

                        speed: Math.random() * 0.001 + 0.003,
                        direction: 1,

                        isHighlighted,
                    });

                    index++;
                }
            }
        };

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            particles.forEach((particle) => {
                if (particle.isHighlighted) {
                    particle.opacity += particle.speed * particle.direction;

                    if (particle.opacity >= 1) {
                        particle.opacity = 1;
                        particle.direction = -1;
                    }

                    if (particle.opacity <= 0.35) {
                        particle.opacity = 0.35;
                        particle.direction = 1;
                    }
                }

                ctx.beginPath();

                ctx.arc(
                    particle.x,
                    particle.y,
                    particle.isHighlighted ? 3 : 1.5,
                    0,
                    Math.PI * 2
                );

                ctx.fillStyle = `rgba(30, 41, 59, ${particle.opacity})`;
                ctx.fill();
            });

            animationFrame = requestAnimationFrame(animate);
        };

        resizeCanvas();
        createParticles();
        animate();

        highlightTimer = setInterval(() => {
            createParticles();
        }, 3000);

        window.addEventListener("resize", () => {
            resizeCanvas();
            createParticles();
        });

        return () => {
            cancelAnimationFrame(animationFrame);
            window.removeEventListener("resize", resizeCanvas);
        };
    }, []);

    return <canvas ref={canvasRef} className="particle-background" />;
}
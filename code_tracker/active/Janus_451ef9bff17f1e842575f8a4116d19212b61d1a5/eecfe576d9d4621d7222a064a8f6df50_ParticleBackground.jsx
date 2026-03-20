äimport { useRef, useEffect } from 'react';

const ParticleBackground = () => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        let animationFrameId;
        let particles = [];

        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        window.addEventListener('resize', resizeCanvas);
        resizeCanvas();

        // Particle Config
        const particleCount = 50;
        const colors = ['rgba(0, 240, 255, 0.5)', 'rgba(189, 0, 255, 0.5)', 'rgba(0, 255, 163, 0.3)'];

        class Particle {
            constructor() {
                this.reset();
                this.y = Math.random() * canvas.height; // Start randomly
            }

            reset() {
                this.x = Math.random() * canvas.width;
                this.y = canvas.height + Math.random() * 100; // Start below
                this.size = Math.random() * 2 + 0.5;
                this.speedY = Math.random() * 0.5 + 0.2; // Move UP
                this.speedX = (Math.random() - 0.5) * 0.2; // Slight drift
                this.color = colors[Math.floor(Math.random() * colors.length)];
                this.opacity = Math.random() * 0.5 + 0.1;
            }

            update() {
                this.y -= this.speedY; // Move UP (Antigravity)
                this.x += this.speedX;

                if (this.y < -10) {
                    this.reset();
                }
            }

            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fillStyle = this.color;

                // Add glow
                ctx.shadowBlur = 10;
                ctx.shadowColor = this.color;

                ctx.fill();
                ctx.shadowBlur = 0;
            }
        }

        // Init particles
        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle());
        }

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Draw gradient background
            // ctx.fillStyle = '#030305';
            // ctx.fillRect(0, 0, canvas.width, canvas.height);

            particles.forEach(p => {
                p.update();
                p.draw();
            });

            animationFrameId = requestAnimationFrame(animate);
        };

        animate();

        return () => {
            window.removeEventListener('resize', resizeCanvas);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                zIndex: 'var(--z-background)',
                pointerEvents: 'none',
                background: 'radial-gradient(circle at 50% 50%, #0a0a12 0%, #030305 100%)'
            }}
        />
    );
};

export default ParticleBackground;
ä*cascade08"(451ef9bff17f1e842575f8a4116d19212b61d1a52Wfile:///c:/Users/Janus/DYNAMIC/dynamic-landing/src/components/ui/ParticleBackground.jsx:file:///c:/Users/Janus
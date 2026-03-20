ëRimport { ArrowRight, Github, Linkedin } from 'lucide-react';
import { motion } from 'framer-motion';
import profileImage from '@/assets/profile.png';
import { useEffect, useRef, useState } from 'react';

const TOTAL_FRAMES = 140;
const FRAME_PATH = (index: number) =>
  `/hero-frames/ezgif-frame-${index.toString().padStart(3, '0')}.png`;

// Extracted Animation Component
const FrameAnimation = ({ className }: { className?: string }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [imagesLoaded, setImagesLoaded] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Resize observer to handle container size changes
    const resizeObserver = new ResizeObserver(() => {
      if (canvas.parentElement) {
        canvas.width = canvas.parentElement.clientWidth;
        canvas.height = canvas.parentElement.clientHeight;
        // Force re-render immediately after resize?
      }
    });
    if (canvas.parentElement) {
      resizeObserver.observe(canvas.parentElement);
      // Initial size
      canvas.width = canvas.parentElement.clientWidth;
      canvas.height = canvas.parentElement.clientHeight;
    }

    // Image cache
    const images: HTMLImageElement[] = [];
    let loadedCount = 0;

    // Load images
    for (let i = 1; i <= TOTAL_FRAMES; i++) {
      const img = new Image();
      img.src = FRAME_PATH(i);
      img.onload = () => {
        loadedCount++;
        if (loadedCount === 1) startAnimation();
        if (loadedCount === TOTAL_FRAMES) setImagesLoaded(true);
      };
      images.push(img);
    }

    let animationFrameId: number;
    let currentFrame = 0;
    let lastTime = 0;
    const fps = 24;
    const interval = 1000 / fps;

    const startAnimation = () => {
      // Prevent multiple loops
      if (animationFrameId) cancelAnimationFrame(animationFrameId);

      const loop = (currentTime: number) => {
        animationFrameId = requestAnimationFrame(loop);
        const delta = currentTime - lastTime;
        if (delta < interval) return;
        lastTime = currentTime - (delta % interval);

        const img = images[currentFrame];
        // Ensure context and canvas dimensions exist
        if (img && img.complete && img.naturalHeight !== 0 && ctx && canvas.width > 0 && canvas.height > 0) {
          // Object cover logic
          const hRatio = canvas.width / img.width;
          const vRatio = canvas.height / img.height;
          const ratio = Math.max(hRatio, vRatio);
          const centerShift_x = (canvas.width - img.width * ratio) / 2;
          const centerShift_y = (canvas.height - img.height * ratio) / 2;

          ctx.clearRect(0, 0, canvas.width, canvas.height);
          ctx.drawImage(
            img,
            0, 0, img.width, img.height,
            centerShift_x, centerShift_y, img.width * ratio, img.height * ratio
          );
          currentFrame = (currentFrame + 1) % TOTAL_FRAMES;
        }
      };
      loop(performance.now());
    };

    return () => {
      resizeObserver.disconnect();
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className={className} />;
};

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background">

      {/* Background Frame Animation */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <FrameAnimation className="w-full h-full opacity-40 brightness-50" />
        <div className="absolute inset-0 bg-background/60 backdrop-blur-[2px]" />
        <div className="absolute inset-0 bg-primary/10 mix-blend-overlay" />
      </div>

      {/* Full Screen Background Frame Animation */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <FrameAnimation className="w-full h-full opacity-40 brightness-75 scale-105" />
        <div className="absolute inset-0 bg-background/60 backdrop-blur-[1px]" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/20 to-background" />
      </div>

      {/* Reduced Motion / Fallback Background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gray-900 via-[#0a0a0a] to-black -z-50" />

      {/* Content */}
      <div className="relative z-10 section-container text-center">
        <div className="max-w-4xl mx-auto">
          {/* Profile Image */}
          <motion.div
            className="mb-8 flex justify-center"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7 }}
          >
            <motion.div
              className="relative"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <div className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-2 border-primary/50 ring-4 ring-primary/20 bg-background">
                <img
                  src={profileImage}
                  alt="Extropian Janus - Web3 Founding CTO"
                  className="w-full h-full object-cover object-top"
                />
              </div>
              <motion.div
                className="absolute inset-0 rounded-full bg-primary/20 blur-xl -z-10"
                animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              />
            </motion.div>
          </motion.div>

          {/* Status badge */}
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border bg-card/50 backdrop-blur-sm mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            whileHover={{ scale: 1.05 }}
          >
            <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
            <span className="text-sm font-mono text-muted-foreground">Available for Founding CTO roles</span>
          </motion.div>

          {/* Main title with Animated Background */}
          <div className="relative mb-6">
            <motion.h1
              className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight relative z-10"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <span className="block text-white drop-shadow-sm select-none pointer-events-none px-4 py-2">
                Web3 Founding CTO
              </span>

              <span className="block text-gradient-primary mt-2 drop-shadow-lg">AI-Accelerated Blockchain Builder</span>
              <span className="block text-muted-foreground text-2xl md:text-3xl lg:text-4xl mt-4 font-medium drop-shadow-md">Community-Driven Execution</span>
            </motion.h1>
          </div>

          {/* Subtext */}
          <motion.p
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed font-semibold drop-shadow-md"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            I build production-grade blockchain systems using AI-accelerated workflowsâ€”turning complex ideas into secure, governed, and usable Web3 infrastructure.
          </motion.p>

          {/* CTAs */}
          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <motion.a
              href="#systems"
              className="group inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground font-medium rounded-lg transition-all glow-primary"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              View Systems
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </motion.a>
            <motion.a
              href="#contact"
              className="inline-flex items-center gap-2 px-8 py-4 border border-border text-foreground font-medium rounded-lg hover:bg-card hover:border-primary/50 transition-all bg-background/50 backdrop-blur-sm"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              Build With Me
            </motion.a>
          </motion.div>

          {/* Social links */}
          <motion.div
            className="flex items-center justify-center gap-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <motion.a href="https://github.com/314-hash" target="_blank" rel="noopener noreferrer" className="text-muted-foreground" whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.9 }}>
              <Github className="w-5 h-5" />
            </motion.a>
            <motion.a href="https://www.linkedin.com/in/blockchaindeveloper2025/" target="_blank" rel="noopener noreferrer" className="text-muted-foreground" whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.9 }}>
              <Linkedin className="w-5 h-5" />
            </motion.a>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 8, 0] }}
        transition={{ opacity: { delay: 1.5 }, y: { duration: 2, repeat: Infinity } }}
      >
        <div className="flex flex-col items-center gap-2 text-muted-foreground">
          <span className="text-xs font-mono uppercase tracking-widest font-bold drop-shadow-md">Scroll</span>
          <div className="w-px h-12 bg-gradient-to-b from-muted-foreground/50 to-transparent" />
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
ëR"(336dd8c9c6321ce46befe4bfb5d679e528a8da612Ifile:///c:/Users/Janus/extro/janus-systems/src/components/HeroSection.tsx:*file:///c:/Users/Janus/extro/janus-systems
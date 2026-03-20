‰import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

const FloatingTagline = () => {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    const x = useTransform(scrollYProgress, [0, 1], ["0%", "-50%"]);
    const rotate = useTransform(scrollYProgress, [0, 1], [0, 5]);

    return (
        <section ref={containerRef} style={{ padding: '8rem 0', overflow: 'hidden', position: 'relative' }}>
            <motion.div style={{ x, rotate }}>
                <h2 style={{
                    fontSize: 'clamp(4rem, 10vw, 12rem)',
                    whiteSpace: 'nowrap',
                    color: 'transparent',
                    WebkitTextStroke: '2px rgba(255,255,255,0.1)',
                    fontFamily: 'var(--font-heading)',
                    textTransform: 'uppercase',
                    lineHeight: 1
                }}>
                    Decentralization â€¢ Ownership â€¢ <span style={{ color: 'var(--color-accent-teal)', WebkitTextStroke: '0' }}>Limitless</span> â€¢
                </h2>
            </motion.div>

            <div style={{
                position: 'absolute',
                bottom: '4rem',
                left: '50%',
                transform: 'translateX(-50%)',
                width: '200px',
                height: '2px',
                background: 'var(--color-accent-teal)',
                boxShadow: '0 0 20px var(--color-accent-teal)'
            }} />
        </section>
    );
};

export default FloatingTagline;
‰*cascade08"(451ef9bff17f1e842575f8a4116d19212b61d1a52Zfile:///c:/Users/Janus/DYNAMIC/dynamic-landing/src/components/sections/FloatingTagline.jsx:file:///c:/Users/Janus
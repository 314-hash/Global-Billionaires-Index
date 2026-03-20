çimport { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { Shield, Lock, FileCheck } from 'lucide-react';

const Security = () => {
    // We'll simulate a pinned effect using sticky positioning for simplicity and robustness
    return (
        <section id="security" style={{ position: 'relative', height: '150vh' }}>
            <div style={{
                position: 'sticky',
                top: 0,
                height: '100vh',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                background: 'var(--color-bg-primary)',
                overflow: 'hidden'
            }}>
                {/* Background glow */}
                <div style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: '60vw',
                    height: '60vw',
                    background: 'radial-gradient(circle, rgba(0, 240, 255, 0.1) 0%, rgba(0,0,0,0) 70%)',
                    pointerEvents: 'none'
                }} />

                <div style={{ textAlign: 'center', zIndex: 1, padding: '0 2rem' }}>
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        whileInView={{ scale: 1, opacity: 1 }}
                        viewport={{ margin: "-20%" }}
                        transition={{ duration: 0.8 }}
                    >
                        <Shield size={80} color="var(--color-accent-teal)" style={{ marginBottom: '2rem' }} />
                        <h2 style={{ fontSize: '3.5rem', marginBottom: '1.5rem' }}>Security First</h2>
                        <p style={{ maxWidth: '600px', margin: '0 auto 3rem', color: 'var(--color-text-secondary)', fontSize: '1.2rem' }}>
                            Institutional-grade security. Audited contracts. Immutable infrastructure.
                        </p>

                        <div style={{ display: 'flex', justifyContent: 'center', gap: '3rem', flexWrap: 'wrap' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                <FileCheck color="var(--color-accent-cyan)" />
                                <span>Triple Audited</span>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                <Lock color="var(--color-accent-cyan)" />
                                <span>Time-lock Controls</span>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Security;
ç*cascade08"(451ef9bff17f1e842575f8a4116d19212b61d1a52Sfile:///c:/Users/Janus/DYNAMIC/dynamic-landing/src/components/sections/Security.jsx:file:///c:/Users/Janus
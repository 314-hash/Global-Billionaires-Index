éimport { motion } from 'framer-motion';

const FinalCTA = () => {
    return (
        <section style={{ padding: '8rem 2rem', textAlign: 'center', background: 'linear-gradient(to top, var(--color-bg-secondary), transparent)' }}>
            <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', marginBottom: '2rem', fontFamily: 'var(--font-heading)' }}>
                Build. Play. Govern. Own.
            </h2>

            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                style={{
                    padding: '1.2rem 3rem',
                    fontSize: '1.2rem',
                    fontWeight: 600,
                    background: '#fff',
                    color: '#000',
                    borderRadius: '50px',
                    cursor: 'pointer'
                }}
            >
                Launch App
            </motion.button>
        </section>
    );
};

export default FinalCTA;
é*cascade08"(451ef9bff17f1e842575f8a4116d19212b61d1a52Sfile:///c:/Users/Janus/DYNAMIC/dynamic-landing/src/components/sections/FinalCTA.jsx:file:///c:/Users/Janus
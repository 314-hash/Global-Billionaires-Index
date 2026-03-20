¤import { motion } from 'framer-motion';

const About = () => {
    return (
        <section id="about" style={{ padding: '10rem 2rem', maxWidth: 'var(--container-width)', margin: '0 auto', display: 'flex', gap: '4rem', alignItems: 'center', flexWrap: 'wrap-reverse' }}>

            {/* Graphic */}
            <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8 }}
                style={{ flex: 1, minWidth: '300px', height: '400px', background: 'rgba(255,255,255,0.03)', borderRadius: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}
            >
                <div style={{
                    width: '60%',
                    height: '60%',
                    background: 'conic-gradient(from 180deg at 50% 50%, #00F0FF 0deg, #BD00FF 180deg, #00F0FF 360deg)',
                    filter: 'blur(60px)',
                    borderRadius: '50%'
                }} />
                <div style={{
                    position: 'absolute',
                    inset: 0,
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '20px'
                }} />
            </motion.div>

            {/* Text */}
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, delay: 0.2 }}
                style={{ flex: 1, minWidth: '300px' }}
            >
                <h2 style={{ fontSize: '3rem', marginBottom: '2rem' }}>Recalibrating the <br /><span style={{ color: 'var(--color-accent-purple)' }}>Digital Gravity</span></h2>
                <p style={{ fontSize: '1.2rem', color: 'var(--color-text-secondary)', marginBottom: '1.5rem' }}>
                    Dynamic isn't just a platform; it's a fundamental shift in how value moves through the digital ether. We build the rails for player-owned economies and trustless financial systems.
                </p>
                <p style={{ fontSize: '1.2rem', color: 'var(--color-text-secondary)' }}>
                    By merging advanced DeFi primitives with high-fidelity gaming experiences, we create ecosystems where users don't just participateâ€”they govern.
                </p>
            </motion.div>

        </section>
    );
};

export default About;
¤*cascade08"(451ef9bff17f1e842575f8a4116d19212b61d1a52Pfile:///c:/Users/Janus/DYNAMIC/dynamic-landing/src/components/sections/About.jsx:file:///c:/Users/Janus
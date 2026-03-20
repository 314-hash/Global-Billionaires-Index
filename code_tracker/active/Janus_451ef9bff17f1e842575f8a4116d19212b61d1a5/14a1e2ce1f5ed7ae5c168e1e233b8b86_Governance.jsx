Þimport { motion } from 'framer-motion';

const Governance = () => {
    return (
        <section id="governance" style={{ padding: '10rem 2rem', position: 'relative', overflow: 'hidden' }}>
            {/* Rotating background pattern */}
            <motion.div
                style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    width: '1000px',
                    height: '1000px',
                    border: '1px dashed rgba(255,255,255,0.05)',
                    borderRadius: '50%',
                    x: '-50%',
                    y: '-50%',
                    zIndex: -1
                }}
                animate={{ rotate: 360 }}
                transition={{ duration: 100, repeat: Infinity, ease: "linear" }}
            />

            <div style={{ maxWidth: 'var(--container-width)', margin: '0 auto', textAlign: 'center' }}>
                <motion.h2
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    style={{ fontSize: '3rem', marginBottom: '2rem' }}
                >
                    Governance by Design
                </motion.h2>
                <p style={{ maxWidth: '700px', margin: '0 auto 4rem', fontSize: '1.2rem', color: 'var(--color-text-secondary)' }}>
                    A protocol owned by its users. Propose changes, vote on upgrades, and steer the future of the Dynamic ecosystem through our DAO infrastructure.
                </p>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>
                    {['treasury', 'protocol', 'grants'].map((item, i) => (
                        <motion.div
                            key={item}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            style={{
                                padding: '2rem',
                                border: '1px solid rgba(255,255,255,0.1)',
                                borderRadius: '16px',
                                textAlign: 'left'
                            }}
                        >
                            <h4 style={{ textTransform: 'capitalize', fontSize: '1.2rem', marginBottom: '0.5rem' }}>{item}</h4>
                            <p style={{ fontSize: '0.9rem', color: 'var(--color-text-tertiary)' }}>Managed securely on-chain.</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Governance;
Þ*cascade08"(451ef9bff17f1e842575f8a4116d19212b61d1a52Ufile:///c:/Users/Janus/DYNAMIC/dynamic-landing/src/components/sections/Governance.jsx:file:///c:/Users/Janus
óimport { motion } from 'framer-motion';

const Ownership = () => {
    return (
        <section id="economy" style={{ padding: '8rem 2rem', overflowX: 'hidden' }}>
            <div style={{ maxWidth: 'var(--container-width)', margin: '0 auto' }}>
                <div style={{ marginBottom: '4rem' }}>
                    <h2 style={{ fontSize: '3rem', maxWidth: '600px' }}>
                        True Ownership.<br />
                        <span style={{ color: 'var(--color-accent-teal)' }}>Sustainable Economics.</span>
                    </h2>
                </div>

                <div style={{ display: 'flex', gap: '2rem', overflowX: 'auto', paddingBottom: '2rem', scrollSnapType: 'x mandatory' }}>
                    {[
                        { title: "NFT Assets", desc: "Every item, skin, and achievement is a verifiable asset on-chain." },
                        { title: "Tokenomics", desc: "Deflationary mechanisms designed for long-term value accrual." },
                        { title: "Player Markets", desc: "Permissionless trading with instant settlement and low fees." },
                        { title: "Creator Royalty", desc: "Automated payouts for diverse UGC contributions." }
                    ].map((card, i) => (
                        <motion.div
                            key={i}
                            whileHover={{ scale: 1.02 }}
                            style={{
                                minWidth: '300px',
                                background: 'linear-gradient(145deg, #14141f, #0a0a12)',
                                padding: '2.5rem',
                                borderRadius: '20px',
                                scrollSnapAlign: 'start',
                                border: '1px solid rgba(255,255,255,0.05)'
                            }}
                        >
                            <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: '#fff' }}>{card.title}</h3>
                            <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.6 }}>{card.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Ownership;
ó*cascade08"(451ef9bff17f1e842575f8a4116d19212b61d1a52Tfile:///c:/Users/Janus/DYNAMIC/dynamic-landing/src/components/sections/Ownership.jsx:file:///c:/Users/Janus
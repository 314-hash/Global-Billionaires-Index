ñimport { motion } from 'framer-motion';

const techItems = [
    { label: 'Solidity', detail: 'EVM Compatible (Ethereum & BNB)' },
    { label: 'Rust', detail: 'High Performance (Solana Integration)' },
    { label: 'Account Abstraction', detail: 'ERC-4337 Smart Accounts' },
    { label: 'Oracles', detail: 'Real-time Price Feeds & Data' },
    { label: 'Cross-Chain', detail: 'LayerZero Messaging Protocol' },
];

const TechStack = () => {
    return (
        <section id="tech" style={{ padding: '8rem 2rem', background: 'var(--color-bg-secondary)' }}>
            <div style={{ maxWidth: '800px', margin: '0 auto' }}>
                <h2 style={{ fontSize: '2.5rem', marginBottom: '4rem', textAlign: 'center' }}>Technology Stack</h2>

                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    {techItems.map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                padding: '1.5rem 0',
                                borderBottom: '1px solid rgba(255,255,255,0.1)',
                                alignItems: 'center',
                                position: 'relative'
                            }}
                        >
                            <span style={{ fontSize: '1.2rem', fontWeight: 600 }}>{item.label}</span>
                            <span style={{ color: 'var(--color-text-secondary)' }}>{item.detail}</span>

                            <motion.div
                                initial={{ width: 0 }}
                                whileInView={{ width: '100%' }}
                                viewport={{ once: true }}
                                transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
                                style={{
                                    position: 'absolute',
                                    bottom: -1,
                                    left: 0,
                                    height: '1px',
                                    background: 'linear-gradient(90deg, var(--color-accent-cyan), var(--color-accent-purple))'
                                }}
                            />
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default TechStack;
ñ*cascade08"(451ef9bff17f1e842575f8a4116d19212b61d1a52Tfile:///c:/Users/Janus/DYNAMIC/dynamic-landing/src/components/sections/TechStack.jsx:file:///c:/Users/Janus
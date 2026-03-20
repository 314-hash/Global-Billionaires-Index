§
const Footer = () => {
    return (
        <footer style={{
            padding: '4rem 2rem',
            background: 'var(--color-bg-secondary)',
            borderTop: '1px solid rgba(255, 255, 255, 0.05)',
            textAlign: 'center',
            position: 'relative',
            zIndex: 'var(--z-content)'
        }}>
            <div style={{ marginBottom: '2rem' }}>
                <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>DYNAMIC</h3>
                <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.9rem' }}>
                    Where Games, DeFi, and Blockchain Move Without Limits.
                </p>
            </div>

            <div style={{ display: 'flex', justifyContent: 'center', gap: '1.5rem', marginBottom: '2rem' }}>
                {['Twitter', 'Discord', 'GitHub', 'Medium'].map(social => (
                    <a key={social} href="#" style={{ color: 'var(--color-text-secondary)', fontSize: '0.9rem' }}>
                        {social}
                    </a>
                ))}
            </div>

            <p style={{ color: 'var(--color-text-tertiary)', fontSize: '0.8rem' }}>
                Â© 2026 Dynamic Protocol. All rights reserved.
            </p>
        </footer>
    );
};

export default Footer;
§
*cascade08"(451ef9bff17f1e842575f8a4116d19212b61d1a52Ofile:///c:/Users/Janus/DYNAMIC/dynamic-landing/src/components/layout/Footer.jsx:file:///c:/Users/Janus
…import { motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';

const Header = () => {
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <motion.header
            className="header"
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                height: 'var(--header-height)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '0 2rem',
                zIndex: 'var(--z-header)',
                backdropFilter: scrolled ? 'blur(10px)' : 'none',
                background: scrolled ? 'rgba(3, 3, 5, 0.8)' : 'transparent',
                borderBottom: scrolled ? '1px solid rgba(255, 255, 255, 0.05)' : 'none',
                transition: 'background 0.3s, backdrop-filter 0.3s'
            }}
        >
            <div className="logo" style={{ fontWeight: 700, fontSize: '1.5rem', letterSpacing: '-0.02em' }}>
                DYNAMIC
            </div>

            <nav className="desktop-nav" style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
                {['About', 'Platform', 'Tech', 'Economy', 'Governance'].map((item) => (
                    <a
                        key={item}
                        href={`#${item.toLowerCase()}`}
                        style={{
                            fontSize: '0.9rem',
                            color: 'var(--color-text-secondary)',
                            transition: 'color 0.2s'
                        }}
                        onMouseOver={(e) => e.target.style.color = 'var(--color-text-primary)'}
                        onMouseOut={(e) => e.target.style.color = 'var(--color-text-secondary)'}
                    >
                        {item}
                    </a>
                ))}
                <button
                    style={{
                        padding: '0.6rem 1.2rem',
                        background: 'rgba(255, 255, 255, 0.1)',
                        border: '1px solid rgba(255, 255, 255, 0.2)',
                        borderRadius: '4px',
                        color: 'white',
                        fontSize: '0.9rem',
                        cursor: 'pointer'
                    }}
                >
                    Launch App
                </button>
            </nav>
        </motion.header>
    );
};

export default Header;
…*cascade08"(451ef9bff17f1e842575f8a4116d19212b61d1a52Ofile:///c:/Users/Janus/DYNAMIC/dynamic-landing/src/components/layout/Header.jsx:file:///c:/Users/Janus
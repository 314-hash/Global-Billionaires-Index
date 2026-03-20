Ûimport React, { useContext, useEffect, useState } from 'react';
import AppContext from '../context/AppContext';

const WalletStatus = () => {
    const { walletAddress, isWalletConnected, connectWallet, disconnectWallet } = useContext(AppContext);
    const [truncatedAddress, setTruncatedAddress] = useState('');

    useEffect(() => {
        if (walletAddress) {
            setTruncatedAddress(`${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}`);
        } else {
            setTruncatedAddress('');
        }
    }, [walletAddress]);

    return (
        <div className="wallet-status-container" style={{ padding: '20px', border: '1px solid #ccc', borderRadius: '8px', maxWidth: '300px', margin: '20px auto', textAlign: 'center' }}>
            <h3 style={{ marginBottom: '15px' }}>Wallet Status</h3>
            {isWalletConnected ? (
                <div className="status-connected">
                    <div style={{ marginBottom: '10px' }}>
                        <span style={{ padding: '5px 10px', backgroundColor: '#e6ffea', color: '#00af1e', borderRadius: '4px', fontWeight: 'bold' }}>Connected</span>
                    </div>
                    <p style={{ fontFamily: 'monospace', marginBottom: '15px' }}>{truncatedAddress}</p>
                    <button
                        onClick={disconnectWallet}
                        style={{ padding: '8px 16px', backgroundColor: '#ff4d4f', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                    >
                        Disconnect
                    </button>
                </div>
            ) : (
                <div className="status-disconnected">
                    <div style={{ marginBottom: '10px' }}>
                        <span style={{ padding: '5px 10px', backgroundColor: '#ffe6e6', color: '#d9363e', borderRadius: '4px', fontWeight: 'bold' }}>Not Connected</span>
                    </div>
                    <button
                        onClick={connectWallet}
                        style={{ padding: '8px 16px', backgroundColor: '#1890ff', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                    >
                        Connect Wallet
                    </button>
                </div>
            )}
        </div>
    );
};

export default WalletStatus;
Û"(23c7a809d91fd72d4cff6eb8ac72e67dea273ce62Tfile:///c:/Users/Janus/tech-active-workplace-frontend/src/components/WalletStatus.js:5file:///c:/Users/Janus/tech-active-workplace-frontend
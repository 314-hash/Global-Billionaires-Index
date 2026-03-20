# Implement WalletStatus Component and Wallet Context

## Goal Description
Implement a `WalletStatus` component that checks and displays the current MetaMask wallet connection status, allowing the user to connect or disconnect their wallet. Integrating this into `AppContext` for global wallet state management, and adding a new route for the component.

## Proposed Changes

### Context
#### [MODIFY] AppContext.js(file:///c:/Users/Janus/tech-active-workplace-frontend/src/context/AppContext.js)
- Export `AppContext` so other components can consume it.
- Add `walletAddress` and `isWalletConnected` state variables.
- Add `connectWallet` and `disconnectWallet` functions to interact with `window.ethereum`.
- Add `useEffect` to listen for accounts changing and update the state automatically.
- Provide these state variables and functions in the `AppContext.Provider`.

### Component
#### [NEW] WalletStatus.js(file:///c:/Users/Janus/tech-active-workplace-frontend/src/components/WalletStatus.js)
- Create the component.
- Consume `walletAddress`, `isWalletConnected`, `connectWallet`, and `disconnectWallet` from `AppContext`.
- Render a status badge: "Connected" or "Not Connected".
- If connected, show the truncated wallet address (e.g., `0x1234...5678`).
- Render a button to connect (if disconnected) or disconnect (if connected).
- Use local state (`useState`, `useEffect` as requested, though `AppContext` will handle the core logic, we might use local effects if needed for UI behavior, or just rely on context).

### Routes
#### [MODIFY] routes.js(file:///c:/Users/Janus/tech-active-workplace-frontend/src/routes/routes.js)
- Import `WalletStatus`.
- Add `<Route path="/dashboard/wallet-status" element={<WalletStatus />} />` inside the dashboard route group.

## Verification Plan

### Automated Tests
- None exist for this specific component. I will manually test using the browser tool.

### Manual Verification
1. I will run `npm run start-front`.
2. I will use the browser tool to navigate to `http://localhost:3624/dashboard/wallet-status` (and login if necessary).
3. I will test the connect button, verify the status changes, and test the disconnect button.

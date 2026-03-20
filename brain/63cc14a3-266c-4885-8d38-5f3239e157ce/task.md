# Security Incident Response

- [x] **Identify Scope of Breach** <!-- id: 0 -->
    - [x] Determine which account was compromised (Wallet: `0x0294...75d6`)
    - [x] Assess if local machine access was gained (Unlikely, source was git)
- [x] **Immediate Containment** <!-- id: 1 -->
    - [x] Rotate secrets found in `.env` (Private Keys, API Keys)
    - [x] Ensure `.env` is in `.gitignore`
- [x] **Codebase Security Audit** <!-- id: 2 -->
    - [x] Scan for hardcoded secrets in source files (FOUND: `hardhat.config.ts`)
    - [x] Review recent file modifications for suspicious code/backdoors
- [x] **Damage Assessment & Recovery** <!-- id: 3 -->
    - [x] Check if compromised wallet owns the contracts (YES - Critical)
    - [x] Determine if redeployment is necessary (YES - Total Loss)
- [ ] **Redeployment & Recovery** <!-- id: 4 -->
    - [ ] **Clean Slate**: Delete `artifacts/`, `cache/`, `deployments/`
    - [ ] **Secure Setup**: Generate new Private Key -> `.env`
    - [ ] **Redeploy**: Run `deploy_all_bsc.ts` with new wallet
    - [ ] **Verify**: Check BscScan for new contract owners

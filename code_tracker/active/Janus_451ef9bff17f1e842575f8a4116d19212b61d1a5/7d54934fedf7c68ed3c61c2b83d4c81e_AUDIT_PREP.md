�# Smart Contract Audit Preparation Checklist
## CannaToken Ecosystem - Pre-Audit Documentation

**Prepared for**: CertiK / Quantstamp / Trail of Bits  
**Audit Date**: Q2 2025  
**Version**: 1.0  
**Last Updated**: December 2025

---

## 1. CONTRACT INVENTORY

### 1.1 Contracts to be Audited

| Priority | Contract Name | File Path | Lines of Code | Complexity |
|----------|--------------|-----------|---------------|------------|
| **P0 - Critical** | CannaTokenV2 | `contracts/CannaTokenV2.sol` | ~150 | High |
| **P0 - Critical** | WrappedCannaV2 | `contracts/WrappedCannaV2.sol` | ~100 | Medium |
| **P1 - High** | CannaGovToken | `contracts/CannaGovToken.sol` | ~120 | Medium |
| **P1 - High** | CannaStaking | `contracts/CannaStaking.sol` | ~180 | High |
| **P2 - Medium** | BadgeSBTFacet | `contracts/BadgeSBT.sol` | ~80 | Low |
| **P2 - Medium** | ConsensusAdapter | `contracts/consensus/ConsensusAdapter.sol` | ~100 | Medium |
| **P3 - Low** | ConsensusCoordinatorFacet | `contracts/consensus/ConsensusCoordinatorFacet.sol` | ~80 | Low |

**Supporting Libraries:**
- `LibBadgeSBT.sol` - Diamond storage for BadgeSBT
- `NamespacedStorage.sol` - Storage helper
- Storage contracts in `consensus/storage/*` (review but not primary audit focus)

**Total LOC**: ~810 lines of Solidity code

---

## 2. PRE-AUDIT CHECKLIST

### 2.1 Code Freeze & Documentation

- [ ] **Code Freeze Date**: Set to 2 weeks before audit start
- [ ] **Git Branch**: Create `audit-v1.0` branch
- [ ] **Commit Hash**: Record final commit hash for auditors
- [ ] **NatSpec Comments**: All public functions documented
- [ ] **Inline Comments**: Complex logic explained
- [ ] **README per contract**: Technical documentation complete
- [ ] **Architecture Diagram**: Updated and accurate
- [ ] **Deployment Addresses**: Testnet addresses provided

### 2.2 Testing & Coverage

- [ ] **Unit Tests**: 95%+ coverage target
  - [ ] CannaTokenV2: Token minting, burning, operator management
  - [ ] WrappedCannaV2: Wrap/unwrap flows, edge cases
  - [ ] CannaGovToken: Voting, proposals, token operations
  - [ ] CannaStaking: Stake, unstake, rewards, delegation
  - [ ] BadgeSBTFacet: Minting, revoking, metadata
  
- [ ] **Integration Tests**: Critical workflows end-to-end
  - [ ] Full wrap → trade → unwrap cycle
  - [ ] Staking → governance → reward claiming
  - [ ] Multi-operator scenarios
  - [ ] Emergency pause/unpause
  
- [ ] **Fuzzing**: Run Echidna/Foundry fuzz tests
  - [ ] Invariant: wCANNA supply = CannaTokenV2 burned
  - [ ] Invariant: Staking rewards don't exceed cap
  - [ ] Invariant: Operator permissions enforced
  
- [ ] **Static Analysis**: Clean reports
  - [ ] Slither: No high/critical issues
  - [ ] Mythril: No high/critical issues
  - [ ] Solhint: Code style compliance
  
- [ ] **Gas Optimization**: Profiling complete
  - [ ] Report gas costs for common operations
  - [ ] Identify and optimize hot paths

### 2.3 Security Best Practices

- [ ] **Access Control**: All critical functions protected
  - [ ] `onlyOwner` modifiers reviewed
  - [ ] `onlyOperatorOrOwner` logic verified
  - [ ] Multi-sig addresses hardcoded where needed
  
- [ ] **Reentrancy**: Guards in place
  - [ ] OpenZeppelin ReentrancyGuard used
  - [ ] Checks-Effects-Interactions pattern followed
  - [ ] No external calls before state updates
  
- [ ] **Integer Arithmetic**: Safe math verified
  - [ ] Solidity 0.8+ overflow protection confirmed
  - [ ] Division by zero checks where needed
  - [ ] Precision loss documented
  
- [ ] **Input Validation**: All user inputs sanitized
  - [ ] Zero address checks (`require(addr != address(0))`)
  - [ ] Amount > 0 checks where applicable
  - [ ] Array length limits
  
- [ ] **Event Logging**: Comprehensive events
  - [ ] All state changes emit events
  - [ ] Events indexed appropriately
  - [ ] Event parameters include before/after values
  
- [ ] **Emergency Controls**: Pause mechanisms tested
  - [ ] Circuit breakers functional
  - [ ] Recovery procedures documented
  - [ ] Timelock enforced on critical changes

### 2.4 Known Issues & Assumptions

**Document all known limitations:**

- [ ] **CannaTokenV2 ERC-6909 Compatibility**:
  - Issue: No standard approval mechanism for operators
  - Mitigation: Owner-controlled operator authorization
  - Risk: Low (design choice, not vulnerability)
  
- [ ] **WrappedCannaV2 Operator Dependency**:
  - Issue: Requires CannaTokenV2 operator status
  - Mitigation: Automated checks in wrapper functions
  - Risk: Medium (could fail if operator revoked)
  
- [ ] **BadgeSBT Non-Transferability**:
  - Assumption: Transfer functions intentionally disabled
  - Mitigation: Documented design decision
  - Risk: Low (feature, not bug)
  
- [ ] **Governance Centralization (Early Stage)**:
  - Issue: Team controls majority of governance tokens initially
  - Mitigation: Vesting schedule, gradual distribution
  - Risk: Medium (acceptable for bootstrapping phase)

### 2.5 Deployment & Infrastructure

- [ ] **Deployment Scripts**: Automated and tested
  - [ ] All constructor parameters documented
  - [ ] Deployment order specified (dependencies)
  - [ ] Post-deployment verification steps
  - [ ] Operator assignments automated
  
- [ ] **Network Configuration**:
  - [ ] BSC Mainnet RPC endpoints
  - [ ] Gas price strategy
  - [ ] Transaction retry logic
  - [ ] Event monitoring setup
  
- [ ] **Contract Verification**:
  - [ ] All contracts verified on BscScan
  - [ ] Source code matches deployed bytecode
  - [ ] Constructor arguments documented

### 2.6 Economic Model Review

- [ ] **Token Distribution**: Verified on-chain
  - [ ] Initial mints match whitepaper
  - [ ] Vesting contracts deployed (if applicable)
  - [ ] Treasury multi-sig configured
  
- [ ] **Fee Structure**: Implemented correctly
  - [ ] 0.3% transaction fee applied
  - [ ] 40% burn mechanism functional
  - [ ] 30% staker distribution working
  - [ ] 30% treasury allocation correct
  
- [ ] **Staking Economics**: Calculations verified
  - [ ] APY formula correct
  - [ ] Reward pool sustainability modeled
  - [ ] Early unstake penalty enforced
  
- [ ] **Oracle Price Feeds** (if applicable):
  - [ ] Multiple oracle sources
  - [ ] Staleness checks
  - [ ] Outlier detection

---

## 3. AUDIT SCOPE DEFINITION

### 3.1 In-Scope

**Primary Focus:**
1. CannaTokenV2 operator authorization system
2. WrappedCannaV2 wrap/unwrap logic & invariants
3. CannaGovToken governance mechanisms
4. CannaStaking reward calculations & delegation
5. Access control across all contracts
6. Economic attack vectors (flash loans, price manipulation, etc.)

**Secondary Focus:**
7. BadgeSBTFacet and LibBadgeSBT integration
8. ConsensusAdapter cross-chain logic
9. Gas optimizations
10. Code quality & best practices

### 3.2 Out-of-Scope

- Frontend code (wrapper.html, etc.)
- Deployment scripts (unless security-critical)
- Test files
- Documentation (reviewed separately)
- Third-party libraries (OpenZeppelin - already audited)

### 3.3 Specific Concerns for Auditors

**Request auditors to pay special attention to:**

1. **Operator Authorization Logic**:
   ```solidity
   modifier onlyOperatorOrOwner() {
       require(
           msg.sender == owner() || operators[msg.sender],
           "Not authorized"
       );
       _;
   }
   ```
   - Can operators escalate privileges?
   - Can owner be locked out?
   - Race conditions in operator changes?

2. **Wrap/Unwrap Invariant**:
   ```
   totalSupply(wCANNA) == totalBurned(CannaTokenV2, tokenId=1)
   ```
   - Can this invariant be broken?
   - What if operator status is revoked mid-transaction?
   - Flash loan attack vectors?

3. **Staking Reward Distribution**:
   - Can rewards be drained prematurely?
   - Rounding errors accumulating?
   - Griefing attacks on reward pool?

4. **Governance Attack Vectors**:
   - Flash loan governance attacks?
   - Proposal spam/DoS?
   - Timelock bypass?

5. **BadgeSBT Transfer Prevention**:
   - Can non-transferability be circumvented?
   - Proxy contract workarounds?

---

## 4. THREAT MODEL

### 4.1 Attacker Profiles

**Attacker Type 1: Malicious User**
- **Goal**: Steal funds or tokens
- **Capabilities**: Normal user access, can call public functions
- **Attack Vectors**:
  - Reentrancy attacks
  - Integer overflow/underflow
  - Approval exploits
  - Front-running transactions

**Attacker Type 2: Malicious Operator**
- **Goal**: Abuse operator privileges
- **Capabilities**: Operator status on CannaTokenV2
- **Attack Vectors**:
  - Unauthorized minting
  - Denial of service
  - Privilege escalation

**Attacker Type 3: Governance Attacker**
- **Goal**: Manipulate governance decisions
- **Capabilities**: Large CANNA-GOV holdings (possibly flash loan)
- **Attack Vectors**:
  - Flash loan governance attacks
  - Proposal manipulation
  - Timelock bypass

**Attacker Type 4: Economic Attacker**
- **Goal**: Profit from price manipulation
- **Capabilities**: Large capital, access to DeFi protocols
- **Attack Vectors**:
  - Flash loan arbitrage
  - Oracle manipulation
  - Liquidity attacks

### 4.2 Critical Assets

1. **User Funds**: CannaTokenV2 and wCANNA balances
2. **Staking Rewards**: Reward pool tokens
3. **Treasury**: DAO-controlled funds
4. **Governance Control**: Protocol parameter control
5. **Credential Integrity**: BadgeSBT authenticity

### 4.3 Attack Scenarios to Test

- [ ] **Scenario 1**: Attacker tries to break wrap/unwrap invariant
- [ ] **Scenario 2**: Operator attempts unauthorized minting
- [ ] **Scenario 3**: Flash loan used to manipulate governance vote
- [ ] **Scenario 4**: Staking reward pool drained via exploit
- [ ] **Scenario 5**: BadgeSBT transferred despite non-transferability
- [ ] **Scenario 6**: Reentrancy attack on wrap/unwrap functions
- [ ] **Scenario 7**: Integer overflow in reward calculations
- [ ] **Scenario 8**: Griefing attack to DoS staking contract
- [ ] **Scenario 9**: Price oracle manipulation (if used)
- [ ] **Scenario 10**: Emergency pause bypass

---

## 5. DOCUMENTATION PACKAGE FOR AUDITORS

### 5.1 Technical Documentation

**Provide to Auditors:**
- [ ] **Architecture Diagram** (PDF/PNG)
- [ ] **Contract Interaction Flowcharts**
- [ ] **State Machine Diagrams** (for staking, governance)
- [ ] **Token Flow Diagrams**
- [ ] **Access Control Matrix** (who can call what)

### 5.2 Code Documentation

- [ ] **GitHub Repository Access** (private repo link)
- [ ] **Commit Hash** for audit (frozen code)
- [ ] **Dependencies List** (package.json, foundry.toml)
- [ ] **Compilation Instructions** (Hardhat commands)
- [ ] **Test Execution Guide** (how to run tests)
- [ ] **Coverage Report** (HTML export)

### 5.3 Economic & Governance Documentation

- [ ] **Whitepaper** (WHITEPAPER.md)
- [ ] **Tokenomics Spreadsheet** (TOKENOMICS.csv)
- [ ] **Governance Parameters** (all modifiable values documented)
- [ ] **Fee Structure** (breakdown and distribution)
- [ ] **Vesting Schedules** (team, advisors, ecosystem)

### 5.4 Deployment Information

- [ ] **Testnet Deployment Addresses** (BSC Testnet)
- [ ] **Mainnet Deployment Addresses** (BSC Mainnet)
- [ ] **Deployment Transaction Hashes**
- [ ] **Deployment Scripts** (with parameters)
- [ ] **Post-Deployment Configuration** (operator assignments, etc.)

---

## 6. TIMELINE & LOGISTICS

### 6.1 Pre-Audit Phase (Week -2 to Week 0)

**Week -2**:
- [ ] Finalize all code changes
- [ ] Create `audit-v1.0` branch
- [ ] Complete all pre-audit checklist items
- [ ] Run final test suite
- [ ] Generate coverage reports

**Week -1**:
- [ ] Package all documentation
- [ ] Send to auditors
- [ ] Schedule kickoff call
- [ ] Provide repository access
- [ ] Answer preliminary questions

**Week 0 (Audit Starts)**:
- [ ] Kickoff call with auditors
- [ ] Confirm scope and timeline
- [ ] Establish communication channel (Slack/Telegram)

### 6.2 During Audit (Week 1-4)

- [ ] **Week 1**: Auditors review code, ask clarifying questions
- [ ] **Week 2**: Preliminary findings shared (if applicable)
- [ ] **Week 3**: Deep dive on complex areas, testing exploits
- [ ] **Week 4**: Draft report delivered

### 6.3 Post-Audit Phase (Week 5-6)

**Week 5**:
- [ ] Review audit report
- [ ] Triage findings (Critical/High/Medium/Low)
- [ ] Create remediation plan
- [ ] Begin fixing issues

**Week 6**:
- [ ] Complete all critical/high fixes
- [ ] Re-test affected areas
- [ ] Request re-audit of fixed code
- [ ] Finalize report

### 6.4 Publication (Week 7)

- [ ] Publish final audit report
- [ ] Update documentation with audit results
- [ ] Communicate to community
- [ ] Update website/socials

---

## 7. COMMUNICATION PLAN

### 7.1 Internal Team

**During Audit:**
- Daily standups to discuss auditor questions
- Shared doc for tracking questions/answers
- Code freeze enforcement (no merges to audit branch)

**Post-Audit:**
- Triage meeting within 24h of report
- Daily check-ins during remediation
- Final review before re-audit

### 7.2 With Auditors

**Communication Channels:**
- **Primary**: Slack channel (or auditor-preferred platform)
- **Email**: For formal communications
- **Video Calls**: Weekly sync (or as needed)

**Response SLA:**
- Critical questions: 2-4 hours
- Normal questions: 24 hours
- Documentation requests: 48 hours

### 7.3 With Community

**Pre-Audit:**
- Announce audit kickoff
- Share auditor name (build credibility)
- Set expectations for timeline

**During Audit:**
- Weekly updates on progress
- No premature disclosure of findings

**Post-Audit:**
- Publish full report (even if issues found)
- Transparency on all findings
- Status updates on remediation

---

## 8. BUDGET & COSTS

### 8.1 Expected Costs

| Item | Estimated Cost | Notes |
|------|----------------|-------|
| **Primary Audit (CertiK/Quantstamp)** | $50,000 - $80,000 | 4-6 weeks, comprehensive |
| **Secondary Audit (Trail of Bits)** | $40,000 - $60,000 | 2-3 weeks, second opinion |
| **Bug Bounty Program** | $100,000 | Reserve fund, claimed over time |
| **Formal Verification** (Optional) | $30,000 - $50,000 | Critical functions only |
| **Gas Optimization Review** | $10,000 - $15,000 | Separate specialist |
| **Total** | **$230,000 - $305,000** | Over 6-12 months |

### 8.2 ROI Justification

- **Risk Mitigation**: Prevents potential $1M+ losses from exploits
- **User Trust**: Audited projects have 5-10x higher adoption
- **Investor Confidence**: Required for institutional partners
- **Insurance**: Enables DeFi insurance coverage (Nexus Mutual)

---

## 9. APPENDIX

### 9.1 Contract Addresses (For Reference)

**BSC Mainnet:**
- CannaTokenV2: `0x9D673Cc32522854aFc2BB241b0070416762D6a91`
- WrappedCannaV2: `0x761437966C93D649423B0800eB68529155E5537f`
- CannaGovToken: `0x1498e9d67922EDe8914C9A34138d261011AbFfe7`
- CannaStaking: `0xc408B96255Ba832F02bE316a915D52a4D2FBce58`
- BadgeSBTFacet: `0x63530a85870eD383F91f07e0692AF71a983EF688`
- ConsensusAdapter: `0x130e64a77F9e006651dd68F9B2Dad9E4b7EbfB6F`
- ConsensusCoordinatorFacet: `0x491313848371c116dc68BdF9695E17a484bCEC98`

**BSC Testnet:** (Deploy for audit testing)
- [To be filled upon testnet deployment for audit]

### 9.2 Key Personnel

**Audit Point Person**: CTO (primary technical contact)  
**Backup Contact**: Lead Smart Contract Developer  
**Business Contact**: CEO (for non-technical queries)  
**Security Contact**: security@cannatoken.io

### 9.3 Emergency Contacts

**If Critical Issue Found During Audit:**
1. Immediately pause affected contracts (if possible)
2. Notify all team members via Signal group
3. Assess impact and user funds at risk
4. Prepare public disclosure (if necessary)
5. Coordinate with auditors on remediation

---

## 10. POST-AUDIT CHECKLIST

- [ ] **Receive Final Report**: Confirm all findings documented
- [ ] **Triage Findings**: Categorize by severity
- [ ] **Fix Critical Issues**: Within 48 hours
- [ ] **Fix High Issues**: Within 1 week
- [ ] **Fix Medium Issues**: Within 2 weeks
- [ ] **Document Low Issues**: Add to backlog (fix in next version)
- [ ] **Re-Audit**: Submit fixes for verification
- [ ] **Update Documentation**: Reflect any changes
- [ ] **Publish Report**: Full transparency
- [ ] **Implement Bug Bounty**: Launch on Immunefi
- [ ] **Monitor Contracts**: 24/7 monitoring post-audit
- [ ] **Insurance**: Apply for DeFi coverage

---

**Document Version**: 1.0  
**Prepared By**: CannaToken Security Team  
**Last Updated**: December 2025  
**Next Review**: Post-Audit

**Contact**: security@cannatoken.io  
**Emergency**: [Signal/Telegram Group]
�*cascade08"(451ef9bff17f1e842575f8a4116d19212b61d1a52:file:///c:/Users/Janus/cannatoken/cannatoken/AUDIT_PREP.md:file:///c:/Users/Janus
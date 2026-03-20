# HPDA Alert Bot - Heropanda/SOL Volume Monitor

🚨 **Real-time Telegram alerts for large trades on the Heropanda/SOL pair**

This bot monitors the DexScreener API for the Heropanda (HPDA) / SOL trading pair and sends Telegram alerts when swaps exceed your configured USD threshold.

## 🎯 Features

- ✅ Monitors **4ynu2tkv3oqmwtz5wmmxtmkpeajatxexjp83ncfkmfbk** pair on DexScreener
- ✅ Tracks **5bx4tYasp3nRe51vytPgkdsTNveby2zTWTsd89epump** (HPDA token)
- ✅ Real-time Telegram notifications formatted like MajorVolumeBot
- ✅ Configurable USD threshold (default: $5,000)
- ✅ Trade deduplication to avoid spam
- ✅ Includes: timestamp, pair name, USD value, trade direction, liquidity, tx link

## 🚀 Quick Start

### 1. Install Dependencies

```bash
npm install
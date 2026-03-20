// Volume-based Alert Bot for Heropanda/SOL
// This monitors volume spikes instead of individual trades

import axios from "axios";
import TelegramBot from "node-telegram-bot-api";
import { config } from "dotenv";

config();

const PAIR_ID = process.env.DEX_PAIR_ID || "4ynu2tkv3oqmwtz5wmmxtmkpeajatxexjp83ncfkmfbk";
const DEX_API_BASE = process.env.DEXSCREENER_API || "https://api.dexscreener.com/latest/dex/pairs/solana";
const POLL_INTERVAL_MS = Number(process.env.POLL_INTERVAL_MS || 30000); // 30 seconds
const VOLUME_THRESHOLD_USD = Number(process.env.ALERT_THRESHOLD_USD || 5000);
const TG_TOKEN = process.env.TG_BOT_TOKEN;
const TG_CHAT = process.env.TG_CHAT_ID;

if (!TG_TOKEN || !TG_CHAT) {
    console.error("Missing Telegram config. Set TG_BOT_TOKEN and TG_CHAT_ID.");
    process.exit(1);
}

const bot = new TelegramBot(TG_TOKEN, { polling: false });

let lastVolume5m = null;
let alertCooldown = false;

async function fetchPair() {
    try {
        const url = `${DEX_API_BASE}/${PAIR_ID}`;
        const r = await axios.get(url, { timeout: 8000 });
        return r.data?.pair || r.data?.pairs?.[0];
    } catch (err) {
        console.error("❌ DexScreener fetch error:", err?.response?.status || err.message);
        return null;
    }
}

function formatUsd(n) {
    if (n === null || n === undefined) return "N/A";
    return `$${Number(n).toLocaleString(undefined, { maximumFractionDigits: 2 })}`;
}

async function pollLoop() {
    console.log("🚀 Starting Volume Alert Bot");
    console.log(`📊 Pair: ${PAIR_ID}`);
    console.log(`💰 Volume threshold: ${formatUsd(VOLUME_THRESHOLD_USD)} per 5 minutes`);
    console.log(`⏱️  Polling interval: ${POLL_INTERVAL_MS / 1000}s\n`);

    while (true) {
        try {
            const pair = await fetchPair();

            if (pair) {
                const volume5m = pair.volume?.m5 || 0;
                const price = pair.priceUsd || 0;
                const liquidity = pair.liquidity?.usd || 0;
                const priceChange5m = pair.priceChange?.m5 || 0;

                console.log(`[${new Date().toLocaleTimeString()}] Vol(5m): ${formatUsd(volume5m)} | Price: $${price} | Change: ${priceChange5m}%`);

                // Alert if 5-minute volume exceeds threshold
                if (!alertCooldown && volume5m >= VOLUME_THRESHOLD_USD) {
                    const msg = [
                        "🚨 HIGH VOLUME DETECTED!",
                        ``,
                        `Pair: ${pair.baseToken?.symbol}/${pair.quoteToken?.symbol}`,
                        `💰 5min Volume: ${formatUsd(volume5m)}`,
                        `📈 Price: $${price}`,
                        `📊 5min Change: ${priceChange5m >= 0 ? '+' : ''}${priceChange5m.toFixed(2)}%`,
                        `💧 Liquidity: ${formatUsd(liquidity)}`,
                        ``,
                        `🔗 DexScreener: ${pair.url || 'N/A'}`,
                        `⏰ ${new Date().toLocaleString()}`
                    ].join("\n");

                    await bot.sendMessage(TG_CHAT, msg);
                    console.log("✅ Alert sent!");

                    // Cooldown to prevent spam (5 minutes)
                    alertCooldown = true;
                    setTimeout(() => { alertCooldown = false; }, 5 * 60 * 1000);
                }

                lastVolume5m = volume5m;
            }
        } catch (err) {
            console.error("❌ Poll error:", err?.message ?? err);
        }

        await new Promise(r => setTimeout(r, POLL_INTERVAL_MS));
    }
}

pollLoop().catch(err => {
    console.error("💥 Fatal error:", err);
    process.exit(1);
});

// Node 18+
// npm i axios node-telegram-bot-api

import axios from "axios";
import TelegramBot from "node-telegram-bot-api";
import { config } from "dotenv";

// Load environment variables
config();

const PAIR_ID = process.env.DEX_PAIR_ID || "4ynu2tkv3oqmwtz5wmmxtmkpeajatxexjp83ncfkmfbk";
const TOKEN_MINT = process.env.TOKEN_MINT || "5bx4tYasp3nRe51vytPgkdsTNveby2zTWTsd89epump";
const DEX_API_BASE = process.env.DEXSCREENER_API || "https://api.dexscreener.com/latest/dex/pairs/solana";
const POLL_INTERVAL_MS = Number(process.env.POLL_INTERVAL_MS || 5000);
const ALERT_THRESHOLD_USD = Number(process.env.ALERT_THRESHOLD_USD || 5000);
const TG_TOKEN = process.env.TG_BOT_TOKEN;
const TG_CHAT = process.env.TG_CHAT_ID;

if (!TG_TOKEN || !TG_CHAT) {
  console.error("Missing Telegram config. Set TG_BOT_TOKEN and TG_CHAT_ID.");
  process.exit(1);
}

const bot = new TelegramBot(TG_TOKEN, { polling: false });

// Keep simple in-memory dedupe of seen trade ids (prevents duplicate alerts)
const seenTradeIds = new Set();
const SEEN_TTL = 1000 * 60 * 5; // 5 minutes retention
function markSeen(id) {
  seenTradeIds.add(id);
  setTimeout(() => seenTradeIds.delete(id), SEEN_TTL);
}

async function fetchPair() {
  try {
    const url = `${DEX_API_BASE}/${PAIR_ID}`;
    const r = await axios.get(url, { timeout: 8000 });
    return r.data;
  } catch (err) {
    console.error("DexScreener fetch error:", err?.response?.status || err.message);
    return null;
  }
}

// Normalize and extract trades from dex response
function extractTradesFromDexResponse(data) {
  // DexScreener pair response structure varies but often includes `pair.txns` or `pair.trades` or `pair.historicalTrades`.
  // We'll try common fields and defensive fallbacks.
  const pair = data?.pairs?.[0] ?? data?.pair ?? data;
  if (!pair) return [];
  // Common container names used by DexScreener: 'txns', 'transactions', 'trades', 'recentTrades'
  const candidates = pair.txns ?? pair.transactions ?? pair.trades ?? pair.recentTrades ?? pair.txs ?? [];
  // Each trade object should include at least: id/txHash, baseTokenAmount/quoteTokenAmount, priceUsd or amountUsd
  return Array.isArray(candidates) ? candidates : [];
}

function formatUsd(n) {
  if (n === null || n === undefined) return "N/A";
  return `$${Number(n).toLocaleString(undefined, { maximumFractionDigits: 2 })}`;
}

          // Some fields you might find in DexScreener trade objects:
          // - baseTokenAmount / baseAmount
          // - quoteTokenAmount / quoteAmount
          // - amountUsd / quoteUsd / priceUsd
          // - tokenAddress / baseTokenAddress or token0/token1
          // We'll be defensive:
          const amountUsd = t.amountUsd ?? t.quoteUsd ?? t.quoteAmountUsd ?? t.amount_usd ?? t.valueUsd ?? null;
          // if not present, try compute from priceUsd * base amount
          const priceUsd = t.priceUsd ?? t.price_usd ?? t.price ?? null;
          const baseAmount = t.baseAmount ?? t.baseTokenAmount ?? t.amount ?? t.tokenAmount ?? null;

          // sometimes token info available:
          const tokenAddress = t.tokenAddress ?? t.baseTokenAddress ?? t.baseToken?.address ?? t.token?.address ?? null;
          const direction = t.side ?? (t.baseIsToken ? "SELL" : "BUY") ?? null;

          // we only alert for trades involving the token mint (HPDA) if tokenAddress exists
          const involvesToken = !tokenAddress || (tokenAddress && tokenAddress.toLowerCase().includes(TOKEN_MINT.toLowerCase().slice(0, 8)));

          // compute a conservative USD estimate if amountUsd is missing:
          let estimatedUsd = null;
          if (amountUsd) estimatedUsd = Number(amountUsd);
          else if (priceUsd && baseAmount) estimatedUsd = Number(priceUsd) * Number(baseAmount);

          // Alert condition: USD >= threshold AND involves token
          if (involvesToken && estimatedUsd !== null && estimatedUsd >= ALERT_THRESHOLD_USD) {
            const pairName = data?.pairs?.[0]?.pairAddress ?? data?.pair?.pairAddress ?? `${data?.pairs?.[0]?.baseToken?.symbol ?? 'HPDA'}/${data?.pairs?.[0]?.quoteToken?.symbol ?? 'SOL'}`;
            const explorerTx = t.txHash ? `https://explorer.solana.com/tx/${t.txHash}` : (t.tx ? `https://explorer.solana.com/tx/${t.tx}` : "N/A");
            const liquidity = data?.pairs?.[0]?.liquidity?.usd ?? data?.pairs?.[0]?.liquidity ?? "N/A";
            
            const msg = [
              "🚨 LARGE SWAP DETECTED",
              `Pair: ${pairName}`,
              `Amount: ${baseAmount ?? (t.amount ?? "N/A")} ${data?.pairs?.[0]?.baseToken?.symbol ?? "HPDA"}`,
              `💰 USD value: ${formatUsd(estimatedUsd)}`,
              `📊 Side: ${direction ?? "N/A"}`,
              `💧 Liquidity: ${typeof liquidity === 'number' ? formatUsd(liquidity) : liquidity}`,
              `🔗 Tx: ${explorerTx}`,
              `📡 Source: DexScreener`
            ].join("\n");

            await bot.sendMessage(TG_CHAT, msg);
            markSeen(id);
            console.log("✅ Alert sent for trade id:", id, "USD:", estimatedUsd);
          } else {
            // store seen id to avoid reprocessing noise even if below threshold
            markSeen(id);
          }
        }
      }
    } catch (err) {
      console.error("❌ Poll loop error:", err?.message ?? err);
    }

    // wait
    await new Promise(r => setTimeout(r, POLL_INTERVAL_MS));
  }
}

pollLoop().catch(err => {
  console.error("💥 Fatal error:", err);
  process.exit(1);
});
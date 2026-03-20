import TelegramBot from "node-telegram-bot-api";
import { config } from "dotenv";

config();

const TG_TOKEN = process.env.TG_BOT_TOKEN;
const TG_CHAT = process.env.TG_CHAT_ID;

const bot = new TelegramBot(TG_TOKEN, { polling: false });

async function testSend() {
    try {
        const msg = `🧪 TEST MESSAGE\n\nThis is a test from your HPDA alert bot.\nTime: ${new Date().toLocaleString()}\n\n✅ If you see this, Telegram connection is working!`;
        await bot.sendMessage(TG_CHAT, msg);
        console.log("✅ Test message sent successfully!");
    } catch (error) {
        console.error("❌ Error sending message:", error.message);
    }
}

testSend();

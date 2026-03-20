import TelegramBot from "node-telegram-bot-api";
import { config } from "dotenv";

config();

const TG_TOKEN = process.env.TG_BOT_TOKEN;
const TG_CHAT = process.env.TG_CHAT_ID;

const bot = new TelegramBot(TG_TOKEN, { polling: false });

async function testChannel() {
    try {
        console.log(`Testing message to: ${TG_CHAT}\n`);

        const msg = `🧪 Channel Connection Test\n\nTimestamp: ${new Date().toLocaleString()}\n\n✅ Bot successfully connected to @journeyto6digits!`;

        await bot.sendMessage(TG_CHAT, msg);
        console.log("✅ SUCCESS! Message sent to channel!");
        console.log("Check your channel: https://web.telegram.org/k/#@journeyto6digits");
    } catch (error) {
        console.error("❌ ERROR:", error.message);
        console.error("\n📝 Common errors:");
        console.error("- 'chat not found' or 'bot is not a member' = Bot needs to be added as admin first");
        console.error("- 'bot was blocked' = Need to unblock the bot");
        console.error("\n💡 Solution: Add @volumev2bot as administrator to @journeyto6digits");
    }
}

testChannel();

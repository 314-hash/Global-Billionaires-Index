import TelegramBot from "node-telegram-bot-api";
import { config } from "dotenv";

config();

const TG_TOKEN = process.env.TG_BOT_TOKEN;
const bot = new TelegramBot(TG_TOKEN, { polling: false });

async function getBotInfo() {
    try {
        const me = await bot.getMe();
        console.log("\n🤖 BOT INFORMATION:");
        console.log("=".repeat(60));
        console.log(`📛 Name: ${me.first_name}`);
        console.log(`🆔 Username: @${me.username}`);
        console.log(`🔢 Bot ID: ${me.id}`);
        console.log("=".repeat(60));
        console.log("\n📝 NEXT STEPS:");
        console.log("1. Go to your channel: @journeyto6digits");
        console.log("2. Click channel name → Administrators → Add Administrator");
        console.log(`3. Search for: @${me.username}`);
        console.log("4. Add the bot and give it 'Post Messages' permission");
        console.log("5. Post a test message in the channel");
        console.log("6. Run: node get-chat-id.js");
        console.log("\n");
    } catch (error) {
        console.error("❌ Error:", error.message);
    }
}

getBotInfo();

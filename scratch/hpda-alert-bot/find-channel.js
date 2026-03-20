import TelegramBot from "node-telegram-bot-api";
import { config } from "dotenv";

config();

const TG_TOKEN = process.env.TG_BOT_TOKEN;
const bot = new TelegramBot(TG_TOKEN, { polling: false });

async function findChannel() {
    try {
        console.log("Searching for channel information...\n");

        // Try to get chat info using username
        try {
            const chat = await bot.getChat("@journeyto6digits");
            console.log("✅ CHANNEL FOUND!");
            console.log("=".repeat(60));
            console.log(`📢 Title: ${chat.title}`);
            console.log(`🆔 Chat ID: ${chat.id}`);
            console.log(`👥 Type: ${chat.type}`);
            console.log(`📝 Username: @${chat.username}`);
            console.log("=".repeat(60));
            console.log(`\n👉 Update .env with: TG_CHAT_ID=${chat.id}`);
            console.log("\n✅ Bot has access to this channel!");
            return;
        } catch (err) {
            console.log("❌ Cannot access @journeyto6digits directly");
            console.log(`Error: ${err.message}\n`);
        }

        // Alternative: Check recent updates
        console.log("Checking recent bot updates...\n");
        const updates = await bot.getUpdates({ limit: 100, offset: -1 });

        if (updates.length === 0) {
            console.log("📝 No recent activity. Please:");
            console.log("1. Make sure bot is admin in @journeyto6digits");
            console.log("2. Post a message in the channel");
            console.log("3. Run this script again");
            return;
        }

        console.log(`Found ${updates.length} recent updates\n`);

        for (const update of updates.slice(-10)) {
            const chat = update.channel_post?.chat || update.message?.chat;
            if (chat) {
                console.log(`Chat: ${chat.title || chat.username || chat.id} (ID: ${chat.id})`);
            }
        }

    } catch (error) {
        console.error("❌ Error:", error.message);
    }
}

findChannel();

import TelegramBot from "node-telegram-bot-api";
import { config } from "dotenv";

config();

const TG_TOKEN = process.env.TG_BOT_TOKEN;
const bot = new TelegramBot(TG_TOKEN, { polling: false });

async function getChatId() {
    try {
        console.log("Fetching recent updates...\n");
        const updates = await bot.getUpdates({ limit: 100 });

        if (updates.length === 0) {
            console.log("❌ No updates found!");
            console.log("\n📝 TO GET YOUR CHAT ID:");
            console.log("1. Go to your channel");
            console.log("2. Post ANY message in the channel");
            console.log("3. Run this script again\n");
            return;
        }

        console.log(`✅ Found ${updates.length} updates\n`);
        console.log("=".repeat(60));

        const seenChats = new Set();

        for (const update of updates) {
            const chat = update.message?.chat || update.channel_post?.chat;
            if (chat && !seenChats.has(chat.id)) {
                seenChats.add(chat.id);
                console.log(`\n📢 Chat Found:`);
                console.log(`   Type: ${chat.type}`);
                console.log(`   Title: ${chat.title || 'N/A'}`);
                console.log(`   Username: ${chat.username ? '@' + chat.username : 'N/A'}`);
                console.log(`   ✅ Chat ID: ${chat.id}`);
                console.log(`\n   👉 Use this in .env: TG_CHAT_ID=${chat.id}`);
                console.log("=".repeat(60));
            }
        }

    } catch (error) {
        console.error("❌ Error:", error.message);
    }
}

getChatId();

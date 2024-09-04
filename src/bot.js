const { Telegraf } = require('telegraf');
const { BOT_TOKEN } = require('./config/env');

const bot = new Telegraf(BOT_TOKEN);

bot.start((ctx) => ctx.reply('Hello User!'));
bot.command('admin', (ctx) => {
    if (ctx.from.id.toString() === process.env.ADMIN_CHAT_ID) {
        ctx.reply('Welcome, Admin!');
    } else {
        ctx.reply('You are not authorized to use this command.');
    }
});

bot.launch()
    .then(() => console.log('Bot is up and running...'))
    .catch(err => console.error('Failed to launch the bot', err));

process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));

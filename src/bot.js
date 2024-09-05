const { Telegraf } = require('telegraf');
const { BOT_TOKEN, ADMIN_CHAT_ID } = require('./config/env');

const bot = new Telegraf(BOT_TOKEN);

// Respond to the /start command
bot.start((ctx) => {
    ctx.reply('Hello User! Here are the commands you can use:\n/start - Start the bot\n/help - Get help\n\nClick the button below to launch the game:', {
        reply_markup: {
            inline_keyboard: [
                [{
                    text: 'Launch Game',
                    web_app: { url: 'https://example.com/game' } // Replace with your web app URL
                }]
            ]
        }
    });
});

// Respond to the /help command
bot.command('help', (ctx) => {
    ctx.reply('Here are the commands you can use:\n/start - Start the bot\n/help - Get help\n\nClick the button below to launch the game:', {
        reply_markup: {
            inline_keyboard: [
                [{
                    text: 'Launch Game',
                    web_app: { url: 'https://example.com/game' } // Replace with your web app URL
                }]
            ]
        }
    });
});

// Handle text messages
bot.on('text', (ctx) => {
    const text = ctx.message.text.toLowerCase();

    if (text.includes('launch game')) {
        ctx.reply('Click the button below to start the game:', {
            reply_markup: {
                inline_keyboard: [
                    [{
                        text: 'Launch Game',
                        web_app: { url: 'https://example.com/game' } // Replace with your web app URL
                    }]
                ]
            }
        });
    } else if (text === '/start') {
        bot.start(ctx);
    } else if (text === '/help') {
        bot.command('help', ctx);
    } else {
        ctx.reply('I’m not sure how to respond to that. Try using /start or /help to get started.');
    }
});

// Handle callback queries
bot.on('callback_query', (ctx) => {
    // No callback queries are handled now
    ctx.answerCbQuery(); // Acknowledge callback queries to avoid errors
});

// Admin command
bot.command('admin', (ctx) => {
    if (ctx.from.id.toString() === ADMIN_CHAT_ID) {
        ctx.reply('Welcome, Admin!');
    } else {
        ctx.reply('You are not authorized to use this command.');
    }
});

// Launch the bot
bot.launch()
    .then(() => console.log('Bot is up and running...'))
    .catch(err => console.error('Failed to launch the bot', err));
// Graceful shutdown
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));

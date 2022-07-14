const { Telegraf, session } = require('telegraf');
require('dotenv').config();

const token = process.env.BOT_TOKEN;
const bot = new Telegraf(token);

let lang = {
	uz: false,
	ru: false,
	en: false
};

bot.use(session());

bot.context.lang = lang;

bot.use(require('./Composer/start'));
bot.use(require('./Composer/admin'));
bot.use(require('./Composer/contact'));
bot.use(require('./Composer/editLang'));
bot.use(require('./Composer/question'));
bot.use(require('./Composer/category'));
bot.use(require('./Composer/back'));
bot.use(require('./Composer/subCategory'));
bot.use(require('./Composer/general'));




bot.launch().then(() => {
	console.log(`bot started on @${bot.options.username}`);
});

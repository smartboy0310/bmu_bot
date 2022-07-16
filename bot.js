const { Telegraf, session } = require('telegraf');
require('dotenv').config();

const token = process.env.BOT_TOKEN;
const bot = new Telegraf(token);

const Stage = require('telegraf/stage');

const {
	contactSceneUz,
	contactSceneEn,
	contactSceneRu,
	questionSceneUz,
	questionSceneEn,
	questionSceneRu,
	searchQuestionScene,
	searchUserScene
} = require('./Scene');

const stage = new Stage([
	contactSceneUz,
	contactSceneEn,
	contactSceneRu,
	questionSceneUz,
	questionSceneEn,
	questionSceneRu,
	searchQuestionScene,
	searchUserScene
]);

bot.use(session());
bot.use(stage.middleware());

bot.use(require('./Composer/start'));
bot.use(require('./Composer/admin'));
bot.use(require('./Composer/lang'));
bot.use(require('./Composer/contact'));
bot.use(require('./Composer/editLang'));
bot.use(require('./Composer/question'));
bot.use(require('./Composer/category'));
bot.use(require('./Composer/back'));
bot.use(require('./Composer/subCategory'));


bot.launch().then(() => {
	console.log(`bot started on @${bot.options.username}`);
});

const { Composer } = require('telegraf');
const Markup = require('telegraf/markup');

require('dotenv').config();
const adminId = process.env.ADMIN_ID;

const composer = new Composer();

composer.command('start', async (ctx) => {
	try {
		if (ctx.update.message.from.id == adminId) {
			await ctx.replyWithHTML(
				`
			 <b> Foydalanuvchilar haqida ma'lumot </b> 
		 `,
				Markup.keyboard([
					[
						{
							text: "👥 Foydalanuvchilar ro'yxati",
						},
						{
							text: '✉️ Maxsus savollar',
						},
					],
				])
					.oneTime()
					.resize()
					.extra(),
			);
		} else {
			await ctx.replyWithHTML(
				`
			 <b> Tilni tanlang 🇺🇿 </b>  <b> Choose language 🇬🇧 </b>  <b> Выберите язык 🇷🇺 </b>
		 `,
				Markup.inlineKeyboard([
					Markup.callbackButton("🇺🇿 O'zbekcha", 'uz'),
					Markup.callbackButton('🇬🇧 English', 'en'),
					Markup.callbackButton('🇷🇺 Русский', 'ru'),
				]).extra(),
			);
		}
	} catch (e) {
		console.error('cant handle start command', e);
	}
});

module.exports = composer;

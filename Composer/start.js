const {Composer} = require('telegraf')

require('dotenv').config();
const adminId = process.env.ADMIN_ID

const composer = new Composer()

composer.command('start', async (ctx) => {
	try {
		if(ctx.update.message.from.id == adminId) {
			await ctx.replyWithHTML(
				`
			 <b> Foydalanuvchilar haqida ma'lumot </b> 
		 `,
				{
					reply_markup: JSON.stringify(
						{
							keyboard: [
								[
									{
										text: "👥 Foydalanuvchilar ro'yxati",
									},
									{
										text: "✉️ Maxsus savollar"
									}
								],
							],
							resize_keyboard: true,
						},
					)
				},
			);
		}
		else {
			await ctx.replyWithHTML(
				`
			 <b> Tilni tanlang 🇺🇿 </b>  <b> Choose language 🇬🇧 </b>  <b> Выберите язык 🇷🇺 </b>
		 `,
				{
					reply_markup: {
						inline_keyboard: [
							[
								{
									text: "🇺🇿 O'zbekcha",
									callback_data: 'uz',
								},
								{
									text: '🇬🇧 English',
									callback_data: 'en',
								},
								{
									text: '🇷🇺 Русский',
									callback_data: 'ru',
								},
							],
						],
						resize_keyboard: true,
					},
				},
			);
		}
	} catch (e) {
		console.error('cant handle start command', e);
	}
});

module.exports = composer
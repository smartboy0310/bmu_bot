const {Composer} = require('telegraf')

const composer = new Composer()

composer.command('start', async (ctx) => {
	try {
		await ctx.replyWithHTML(
			`
		 <b> Tilni tanlang 🇺🇿 </b>  <b> Chouse language 🇬🇧 </b>  <b> Выберите язык 🇷🇺 </b>
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
	} catch (e) {
		console.error('cant handle start command', e);
	}
});

module.exports = composer
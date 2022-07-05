const {Composer} = require('telegraf')

const composer = new Composer()

composer.on('callback_query', async (ctx) => {
	try {
		ctx.lang = ctx.update.callback_query.data;
		if (ctx.lang == 'uz') {
			await ctx.replyWithHTML(
				`
			<b>Salom ${ctx.from.first_name}, Xush kelibsiz</b>\n<b>Qayta a'loqa uchun Kontaktingiz jo'natishga rozimiz?</b>
		`,
				{
					reply_markup: JSON.stringify({
						force_reply: true,
						keyboard: [
							[
								{
									text: 'Ha ✅',
									callback_data: 'yes',
								},
								{
									text: "Yo'q ❌",
									callback_data: 'no',
								},
							],
						],
						resize_keyboard: true,
					}),
				},
			);
		}

		if (ctx.lang == 'en') {
			await ctx.replyWithHTML(
				`
				<b>Hello ${ctx.from.first_name}, Welcome</b>\n<b>Do you agree to send your contact information for further communication?</b>
			`,
				{
					reply_markup: JSON.stringify({
						force_reply: true,
						keyboard: [
							[
								{
									text: 'Yes ✅',
									callback_data: 'yes',
								},
								{
									text: 'No ❌',
									callback_data: 'no',
								},
							],
						],
						resize_keyboard: true,
					}),
				},
			);
		}

		if (ctx.lang == 'ru') {
			await ctx.replyWithHTML(
				`
					<b>Привет ${ctx.from.first_name}, Добро пожаловать</b>\n<b>Вы согласны отправить свою контактную информацию для дальнейшего общения?</b>
				`,
				{
					reply_markup: JSON.stringify({
						force_reply: true,
						keyboard: [
							[
								{
									text: 'Да ✅',
									callback_data: 'yes',
								},
								{
									text: 'Нет ❌',
									callback_data: 'no',
								},
							],
						],
						resize_keyboard: true,
					}),
				},
			);
		}
	} catch (e) {
		console.error('cant handle start command', e);
	}
});

module.exports = composer


const { Composer } = require('telegraf');
const Markup = require('telegraf/markup');




const composer = new Composer();

composer.on('callback_query', async (ctx) => {
	try {
		lang = ctx.update.callback_query.data;
		if (lang == 'uz') {
			await ctx.replyWithHTML(
				`
			<b>Salom ${ctx.from.first_name}, Xush kelibsiz</b>\n<b>Qayta a'loqa uchun Kontaktingiz jo'natishga rozimiz?</b>
		`,
				Markup.keyboard([
					[
						{
							text: 'Ha ✅',
						},
						{
							text: "Yo'q ❌",
						},
					],
				])
					.oneTime()
					.resize()
					.extra(),
			);
		}

		if (lang == 'en') {
			await ctx.replyWithHTML(
				`
				<b>Hello ${ctx.from.first_name}, Welcome</b>\n<b>Do you agree to send your contact information for further communication?</b>
			`,
				Markup.keyboard([
					[
						{
							text: 'Yes ✅',
						},
						{
							text: 'No ❌',
						},
					],
				])
					.oneTime()
					.resize()
					.extra(),
			);
		}

		if (lang == 'ru') {
			await ctx.replyWithHTML(
				`
					<b>Привет ${ctx.from.first_name}, Добро пожаловать</b>\n<b>Вы согласны отправить свою контактную информацию для дальнейшего общения?</b>
				`,
				Markup.keyboard([
					[
						{
							text: 'Да ✅',
						},
						{
							text: 'Нет ❌',
						},
					],
				])
					.oneTime()
					.resize()
					.extra(),
			);
		}
	} catch (e) {
		console.error('cant handle start command', e);
	}
});


module.exports = composer;

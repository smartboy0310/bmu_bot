const {Composer} = require('telegraf')

const composer = new Composer()

composer.hears('🔄 Tilni o’zgartirish', async (ctx) => {
	await ctx.replyWithHTML(
		`
			<b><b> Tilni tanlang 🇺🇿 </b>  <b> Choose language 🇬🇧 </b>  <b> Выберите язык 🇷🇺 </b></b>
		`,
		{
			reply_markup: JSON.stringify({
				keyboard: [
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
			}),
		},
	);
});

composer.hears('🔄 Change the language', async (ctx) => {
	await ctx.replyWithHTML(
		`
			<b><b> Tilni tanlang 🇺🇿 </b>  <b> Choose language 🇬🇧 </b>  <b> Выберите язык 🇷🇺 </b></b>
		`,
		{
			reply_markup: JSON.stringify({
				keyboard: [
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
			}),
		},
	);
});

composer.hears('🔄 Изменить язык', async (ctx) => {
	await ctx.replyWithHTML(
		`
			<b><b> Tilni tanlang 🇺🇿 </b>  <b> Choose language 🇬🇧 </b>  <b> Выберите язык 🇷🇺 </b></b>
		`,
		{
			reply_markup: JSON.stringify({
				keyboard: [
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
			}),
		},
	);
});

composer.hears("🇺🇿 O'zbekcha", async (ctx) => {
	lang = 'uz';
	await ctx.replyWithHTML(
		`
		<b>Til o'zgartirildi</b>
		`,
		{
			reply_markup: JSON.stringify({
				keyboard: category.uz_keyboard,
			}),
		},
	);
});

composer.hears('🇬🇧 English', async (ctx) => {
	lang = 'en';
	await ctx.replyWithHTML(
		`
		<b>The language has been changed</b>
		`,
		{
			reply_markup: JSON.stringify({
				keyboard: category.en_keyboard,
			}),
		},
	);
});

composer.hears('🇷🇺 Русский', async (ctx) => {
	lang = 'ru';
	await ctx.replyWithHTML(
		`
		<b>Язык был изменен</b>
		`,
		{
			reply_markup: JSON.stringify({
				keyboard: category.ru_keyboard,
			}),
		},
	);
});

module.exports = composer




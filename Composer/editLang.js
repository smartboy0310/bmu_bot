const {Composer} = require('telegraf');
const Markup = require('telegraf/markup');
const category = require('../data/category');
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
	ctx.lang = 'uz';
	await ctx.replyWithHTML(
		`
		<b>Til o'zgartirildi</b>
		`,
		Markup.keyboard(category.uz_keyboard).oneTime().resize().extra(),
	);
});

composer.hears('🇬🇧 English', async (ctx) => {
	ctx.lang = 'en';
	await ctx.replyWithHTML(
		`
		<b>The language has been changed</b>
		`,
		Markup.keyboard(category.en_keyboard).oneTime().resize().extra(),
	);
});

composer.hears('🇷🇺 Русский', async (ctx) => {
	ctx.lang = 'ru';
	await ctx.replyWithHTML(
		`
		<b>Язык был изменен</b>
		`,
		Markup.keyboard(category.ru_keyboard).oneTime().resize().extra(),
	);
});

module.exports = composer




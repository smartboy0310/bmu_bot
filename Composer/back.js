const {Composer} = require('telegraf')

const composer = new Composer()
const category = require('../data/category');

composer.hears('⬅️ Qaytish', async (ctx) => {
	await ctx.replyWithHTML(
		`
			<b>Asosiy menu</b>
		`,
		{
			reply_markup: JSON.stringify({
            keyboard: category.uz_keyboard,
         }),
		},
	);
});

composer.hears('⬅️ Back', async (ctx) => {
	await ctx.replyWithHTML(
		`
			<b>Main menu</b>
		`,
		{
			reply_markup: JSON.stringify({
            keyboard: category.en_keyboard,
         }),
		},
	);
});

composer.hears('⬅️ Назад', async (ctx) => {
	await ctx.replyWithHTML(
		`
			<b>Главное меню</b>
		`,
		{
			reply_markup: JSON.stringify({
            keyboard: category.ru_keyboard,
         }),
		},
	);
});


module.exports = composer




const {Composer} = require('telegraf')

const composer = new Composer()

const category = require('../data/category');
const data = require('../data/data');
const subCategory = require('../data/subcategory');

for (let i = 0; i < category.uz_category.length; i++) {
	composer.hears(`${category.uz_category[i].text}`, async (ctx) => {
		const findData = subCategory.uz_submenu.find(
			(e) => e.id == category.uz_category[i].id,
		);

		if (findData) {
			await ctx.replyWithHTML(`${category.uz_category[i].text}`, {
				reply_markup: JSON.stringify({
					keyboard: findData?.keyBoard,
					resize_keyboard: true,
				}),
			});
		} else {
			const findInfo = data.category_data.uz_data.find(
				(e) => e.id == category.uz_category[i].id,
			);
			await ctx.replyWithHTML(
				`<b>${findInfo?.title}</b>\n${findInfo?.data}`,
			);
		}
	});
}

for (let i = 0; i < category.en_category.length; i++) {
	composer.hears(`${category.en_category[i].text}`, async (ctx) => {
		const findData = subCategory.en_submenu.find(
			(e) => e.id == category.en_category[i].id,
		);

		if (findData) {
			await ctx.replyWithHTML(`${category.en_category[i].text}`, {
				reply_markup: JSON.stringify({
					keyboard: findData?.keyBoard,
					resize_keyboard: true,
				}),
			});
		} else {
			const findInfo = data.category_data.en_data.find(
				(e) => e.id == category.en_category[i].id,
			);
			await ctx.replyWithHTML(
				`<b>${findInfo?.title}</b>\n${findInfo?.data}`,
			);
		}
	});
}

for (let i = 0; i < category.ru_category.length; i++) {
	composer.hears(`${category.ru_category[i].text}`, async (ctx) => {
		const findData = subCategory.ru_submenu.find(
			(e) => e.id == category.ru_category[i].id,
		);

		if (findData) {
			await ctx.replyWithHTML(`${category.ru_category[i].text}`, {
				reply_markup: JSON.stringify({
					keyboard: findData?.keyBoard,
					resize_keyboard: true,
				}),
			});
		} else {
			const findInfo = data.category_data.ru_data.find(
				(e) => e.id == category.ru_category[i].id,
			);
			await ctx.replyWithHTML(
				`<b>${findInfo?.title}</b>\n${findInfo?.data}`,
			);
		}
	});
}
module.exports = composer



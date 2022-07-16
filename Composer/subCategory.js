const {Composer} = require('telegraf')

const composer = new Composer()

const category = require('../data/category');
const data = require('../data/data');
const subCategory = require('../data/subcategory');

for (let i = 0; i < subCategory.uz_subcategory.length; i++) {
	composer.hears(`${subCategory.uz_subcategory[i].text}`, async (ctx) => {

		const findInfo = data.subCate_data.uz_data.find(
			(e) => e.id == subCategory.uz_subcategory[i].id,
		);
			if(subCategory.uz_subcategory[i].text == '❇️ Manzil') {
				await ctx.replyWithHTML(
					`<b>${findInfo?.title}</b>\n${findInfo?.data}`,
				);
				await ctx.telegram.sendLocation(ctx.chat.id, findInfo?.x, findInfo.y)
			}
			else {
				await ctx.replyWithHTML(
					`<b>${findInfo?.title}</b>\n${findInfo?.data}`,
				);
			}
		
	});
}
for (let i = 0; i < subCategory.en_subcategory.length; i++) {
	composer.hears(`${subCategory.en_subcategory[i].text}`, async (ctx) => {

		const findInfo = data.subCate_data.en_data.find(
			(e) => e.id == subCategory.en_subcategory[i].id,
		);

			if(subCategory.en_subcategory[i].text == '❇️ Location') {
				await ctx.replyWithHTML(
					`<b>${findInfo?.title}</b>\n${findInfo?.data}`,
				);
				await ctx.telegram.sendLocation(ctx.chat.id, findInfo?.x, findInfo.y)
			}
			else {
				await ctx.replyWithHTML(
					`<b>${findInfo?.title}</b>\n${findInfo?.data}`,
				);
			}
		
	});


}

for (let i = 0; i < subCategory.ru_subcategory.length; i++) {
	composer.hears(`${subCategory.ru_subcategory[i].text}`, async (ctx) => {

		const findInfo = data.subCate_data.ru_data.find((e) => e.id == subCategory.ru_subcategory[i].id);
		if(subCategory.ru_subcategory[i].text == '❇️ Локация') {
			await ctx.replyWithHTML(
				`<b>${findInfo?.title}</b>\n${findInfo?.data}`,
			);
			await ctx.telegram.sendLocation(ctx.chat.id, findInfo?.x, findInfo.y)
		}
		else {
			await ctx.replyWithHTML(
				`<b>${findInfo?.title}</b>\n${findInfo?.data}`,
			);
		}
		
	});


}

module.exports = composer



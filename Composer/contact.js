const { Composer } = require('telegraf');
const { markup } = require('telegraf/extra');
const Extra = require('telegraf/extra');
const Markup = require('telegraf/markup');

const composer = new Composer();

const category = require('../data/category');
// const data = require('../data/data');
// const subCategory = require('../data/subcategory');

composer.hears('Ha ✅', async (ctx) => {
	await ctx.replyWithHTML(
		`
				<b>Iltimos bog’lanish uchun kontakt qoldiring</b>
			`,
			Extra.markup(
				Markup.resize().keyboard([Markup.contactRequestButton('Kontakt jo’natish')]),
			),
	);
});

composer.hears("Yo'q ❌", async (ctx) => {
	await ctx.replyWithHTML(
		`
			<b>Agar kontakt qoldirmasangiz qayta a'loqa yo'lga quya olmaymiz!</b>
		`,
		Extra.markup(
			Markup.resize().keyboard([Markup.contactRequestButton('Kontakt jo’natish')]),
		),
	);
});

composer.hears('Yes ✅', async (ctx) => {
	await ctx.replyWithHTML(		`
			<b>Please leave a contact to get in touch</b>
		`,
		Extra.markup(
			Markup.resize().keyboard([Markup.contactRequestButton('Send contact')]),
		),
	);
});

composer.hears('No ❌', async (ctx) => {
	await ctx.replyWithHTML(
		`
			<b>If you do not leave a contact, we will not be able to contact you again!</b>
		`,
		Extra.markup(
			Markup.resize().keyboard([Markup.contactRequestButton('Send contact')]),
		),
	);
});

composer.hears('Да ✅', async (ctx) => {
	await ctx.replyWithHTML(
		`
			<b>Пожалуйста, оставьте контакт для связи</b>
		`,
		Extra.markup(
			Markup.resize().keyboard([Markup.contactRequestButton('Отправить контакт')]),
		),
	);
});

composer.hears('Нет ❌', async (ctx) => {
	await ctx.replyWithHTML(
		`
			<b>Если вы не оставите контакт, мы больше не сможем с вами связаться!</b>
		`,
		Extra.markup(
			Markup.resize().keyboard([Markup.contactRequestButton('Отправить контакт')]),
		),
	);
});


module.exports = composer;

const {Composer} = require('telegraf')

const composer = new Composer()

const category = require('../data/category');
// const data = require('../data/data');
// const subCategory = require('../data/subcategory');

composer.hears('Ha ✅', async (ctx) => {
	await ctx.replyWithHTML(
		`
				<b>Iltimos bog’lanish uchun kontakt qoldiring</b>
			`,
		{
			reply_markup: JSON.stringify({
				force_reply: true,
				keyboard: [
					[
						{
							text: 'Kontakt jo’natish',
							request_contact: true,
							one_time_keyboard: true,
						},
					],
				],
				resize_keyboard: true,
			}),
		},
	);
});

composer.hears("Yo'q ❌", async (ctx) => {
	await ctx.replyWithHTML(
		`
			<b>Agar kontakt qoldirmasangiz qayta a'loqa yo'lga quya olmaymiz!</b>
		`,
		{
			reply_markup: JSON.stringify({
				force_reply: true,
				keyboard: [
					[
						{
							text: 'Kontakt jo’natish',
							request_contact: true,
							one_time_keyboard: true,
						},
					],
				],
				resize_keyboard: true,
			}),
		},
	);
});

composer.hears('Yes ✅', async (ctx) => {
	await ctx.replyWithHTML(
		`
			<b>Please leave a contact to get in touch</b>
		`,
		{
			reply_markup: JSON.stringify({
				force_reply: true,
				keyboard: [
					[
						{
							text: 'Send Contact',
							request_contact: true,
							one_time_keyboard: true,
						},
					],
				],
				resize_keyboard: true,
			}),
		},
	);
});

composer.hears('No ❌', async (ctx) => {
	await ctx.replyWithHTML(
		`
			<b>If you do not leave a contact, we will not be able to contact you again!</b>
		`,
		{
			reply_markup: JSON.stringify({
				force_reply: true,
				keyboard: [
					[
						{
							text: 'Send Contact',
							request_contact: true,
							one_time_keyboard: true,
						},
					],
				],
				resize_keyboard: true,
			}),
		},
	);
});

composer.hears('Да ✅', async (ctx) => {
	await ctx.replyWithHTML(
		`
			<b>Пожалуйста, оставьте контакт для связи</b>
		`,
		{
			reply_markup: JSON.stringify({
				force_reply: true,
				keyboard: [
					[
						{
							text: 'Отправить контакт',
							request_contact: true,
							one_time_keyboard: true,
						},
					],
				],
				resize_keyboard: true,
			}),
		},
	);
});

composer.hears('Нет ❌', async (ctx) => {
	await ctx.replyWithHTML(
		`
			<b>Если вы не оставите контакт, мы больше не сможем с вами связаться!</b>
		`,
		{
			reply_markup: JSON.stringify({
				force_reply: true,
				keyboard: [
					[
						{
							text: 'Отправить контакт',
							request_contact: true,
							one_time_keyboard: true,
						},
					],
				],
				resize_keyboard: true,
			}),
		},
	);
});

composer.hears("🇺🇿 O'zbekcha", async(ctx) => {
	ctx.lang = 'uz'
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
})

composer.hears("🇬🇧 English", async(ctx) => {
	ctx.lang = 'en'
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
})

composer.hears("🇷🇺 Русский", async(ctx) => {
	ctx.lang = 'ru'
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
})

module.exports = composer
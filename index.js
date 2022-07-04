const { Telegraf, session } = require('telegraf');
require('dotenv').config();
const path = require('path')
const fs = require('fs')

const token = process.env.BOT_TOKEN;
const bot = new Telegraf(token);

const category = require('./data/category');
const data = require('./data/data')

let lang = '';

bot.use(session());

// Start command and Select language

bot.command('start', async (ctx) => {
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

//

bot.on('callback_query', async (ctx) => {
	try {
		lang = ctx.update.callback_query.data;
		if (lang == 'uz') {
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

		if (lang == 'en') {
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

		if (lang == 'ru') {
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

bot.hears('Ha ✅', async (ctx) => {
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

bot.hears("Yo'q ❌", async (ctx) => {
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

bot.hears('Yes ✅', async (ctx) => {
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

bot.hears('No ❌', async (ctx) => {
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

bot.hears('Да ✅', async (ctx) => {
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

bot.hears('Нет ❌', async (ctx) => {
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
for (let i = 0; i < category.uz_category.length; i++) {
	bot.hears(`${category.uz_category[i].text}`, async (ctx) => {
		const findData = data.uz_data.find(e => e.id == category.uz_category[i].id)
		if(ctx.update.message.text == '❇️ Manzil'){
			await ctx.replyWithHTML(`
				<b>${findData?.title}</b>\n${findData?.data}
			`);
			await bot.telegram.sendLocation(ctx.chat.id, findData?.x, findData?.y)
		}
		else {
			await ctx.replyWithHTML(`
				<b>${findData?.title}</b>\n${findData?.data}
			`);
		}
	});
}

for (let i = 0; i < category.en_category.length; i++) {
	bot.hears(`${category.en_category[i].text}`, async (ctx) => {
		const findData = data.en_data.find(e => e.id == category.en_category[i].id)
		if(ctx.update.message.text == '❇️ Location'){
			await ctx.replyWithHTML(`
				<b>${findData?.title}</b>\n${findData?.data}
			`);
			await bot.telegram.sendLocation(ctx.chat.id, findData?.x, findData?.y)
		}
		else {
			await ctx.replyWithHTML(`
				<b>${findData?.title}</b>\n${findData?.data}
			`);
		}
		
	});
}

for (let i = 0; i < category.ru_category.length; i++) {
	bot.hears(`${category.ru_category[i].text}`, async (ctx) => {
		const findData = data.ru_data.find(e => e.id == category.ru_category[i].id)
		if(ctx.update.message.text == '❇️ Локация'){
			await ctx.replyWithHTML(`
				<b>${findData?.title}</b>\n${findData?.data}
			`);
			await bot.telegram.sendLocation(ctx.chat.id, findData?.x, findData?.y)
		}
		else {
			await ctx.replyWithHTML(`
				<b>${findData?.title}</b>\n${findData?.data}
			`);
		}
	});
}

bot.hears('📝 Savol yuborish', async(ctx) => {

	await ctx.replyWithHTML(
		`
			<b>Savolingizni yozing!</b>
		`,
		{
			reply_markup: {
				force_reply: true,
			},
		},
	);
})

bot.hears('📝 Submit a question', async(ctx) => {

	await ctx.replyWithHTML(
		`
			<b>Write your question!</b>
		`,
		{
			reply_markup: {
				force_reply: true,
			},
		},
	);
})

bot.hears('📝 Отправить вопрос', async(ctx) => {

	await ctx.replyWithHTML(
		`
			<b>Напишите свой вопрос!</b>
		`,
		{
			reply_markup: {
				force_reply: true,
			},
		},
	);
})

bot.hears('🔄 Tilni o’zgartirish', async(ctx) => {

	await ctx.replyWithHTML(
		`
			<b><b> Tilni tanlang 🇺🇿 </b>  <b> Chouse language 🇬🇧 </b>  <b> Выберите язык 🇷🇺 </b></b>
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
})

bot.hears('🔄 Change the language', async(ctx) => {

	await ctx.replyWithHTML(
		`
			<b><b> Tilni tanlang 🇺🇿 </b>  <b> Chouse language 🇬🇧 </b>  <b> Выберите язык 🇷🇺 </b></b>
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
})

bot.hears('🔄 Изменить язык', async(ctx) => {

	await ctx.replyWithHTML(
		`
			<b><b> Tilni tanlang 🇺🇿 </b>  <b> Chouse language 🇬🇧 </b>  <b> Выберите язык 🇷🇺 </b></b>
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
})

bot.hears("🇺🇿 O'zbekcha", async(ctx) => {
	lang = 'uz'
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

bot.hears("🇬🇧 English", async(ctx) => {
	lang = 'en'
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

bot.hears("🇷🇺 Русский", async(ctx) => {
	lang = 'ru'
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



bot.on('message', async (ctx) => {
	try {

		fs.readFile()
		if (
			(ctx.update.message.contact || ctx.update.message.text) &&
			lang == 'uz' && ctx.update.message.reply_to_message?.text != 'Savolingizni yozing!'
		) {
			await ctx.replyWithHTML(
				`
				<b>O’zingizni qiziqtirgan savollarga javob olishgiz mumkin</b>
				`,
				{
					reply_markup: JSON.stringify({
						keyboard: category.uz_keyboard,
					}),
				},
			);
		}
		if (
			(ctx.update.message.contact || ctx.update.message.text) &&
			lang == 'en' && ctx.update.message.reply_to_message?.text != 'Write your question!'
		) {
			await ctx.replyWithHTML(
				`
				<b>You can get answers to the questions you are interested in</b>
			`,
				{
					reply_markup: JSON.stringify({
						keyboard: category.en_keyboard,
					}),
				},
			);
		}
		if (
			(ctx.update.message.contact || ctx.update.message.text) &&
			lang == 'ru' && ctx.update.message.reply_to_message?.text != 'Напишите свой вопрос!'
		) {
			await ctx.replyWithHTML(
				`
				<b>Вы можете получить ответы на интересующие вас вопросы</b>
			`,
				{
					reply_markup: JSON.stringify({
						keyboard: category.ru_keyboard,
					}),
				},
			);
		}

		if(ctx.update.message.reply_to_message?.text == 'Savolingizni yozing!') {
			await ctx.replyWithHTML(
				`
				<b>Savolingiz qabul qilindi</b>
				`,
				{
					reply_markup: JSON.stringify({
						keyboard: category.uz_keyboard,
					}),
				},
			);
		}

		if(ctx.update.message.reply_to_message?.text == 'Write your question!') {
			await ctx.replyWithHTML(
				`
				<b>Your question has been accepted</b>
				`,
				{
					reply_markup: JSON.stringify({
						keyboard: category.en_keyboard,
					}),
				},
			);
		}

		if(ctx.update.message.reply_to_message?.text == 'Напишите свой вопрос!') {
			await ctx.replyWithHTML(
				`
				<b>Ваш вопрос принят</b>
				`,
				{
					reply_markup: JSON.stringify({
						keyboard: category.ru_keyboard,
					}),
				},
			);
		}
	} catch (e) {
		console.error('cant handle start command', e);
	}
});

bot.launch().then(() => {
	console.log(`bot started on @${bot.options.username}`);
});

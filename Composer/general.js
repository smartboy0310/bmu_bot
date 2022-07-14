const { Composer } = require('telegraf');
const Markup = require('telegraf/markup');
const FS = require('../fs/fs');
const path = require('path');

require('dotenv').config();
const adminId = process.env.ADMIN_ID;
let lang = '';

const composer = new Composer();
const category = require('../data/category');

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

composer.on('message', async (ctx) => {
	try {
		console.log(ctx.update.message.reply_to_message.entities);
		if (
			ctx.update.message.reply_to_message?.text ==
				"Agar kontakt qoldirmasangiz qayta a'loqa yo'lga quya olmaymiz!" ||
			ctx.update.message.reply_to_message?.text ==
				'Iltimos bog’lanish uchun kontakt qoldiring'
		) {
			await ctx.replyWithHTML(
				`
				<b>O’zingizni qiziqtirgan savollarga javob olishgiz mumkin</b>
				`,
				Markup.keyboard(
					category.uz_keyboard
				)
					.oneTime()
					.resize()
					.extra()
			);
			let newUser = {};
			const phone = ctx.update.message.contact.phone_number;
			const name = ctx.update.message.contact.first_name;
			const userId = ctx.update.message.contact.user_id;
			const oldUser = new FS(
				path.resolve(__dirname, '..', 'data', 'users.json'),
			);
			const allUser = JSON.parse(oldUser.read());
			const findData = allUser.find((e) => e.user_id == userId);

			if (!findData) {
				newUser.user_id = userId;
				newUser.user_name = name;
				newUser.user_phone = phone;
				newUser.user_number = allUser.length + 1;
				allUser.push(newUser);
				await ctx.telegram.sendContact(adminId, `${phone}`, `${name}`);
				await ctx.telegram.sendMessage(
					adminId,
					`Info: New User\nUser serial number: ${allUser.length}`,
				);
			}

			new FS(path.resolve(__dirname, '..', 'data', 'users.json')).write(
				allUser,
			);
		}
		if (
			ctx.update.message.reply_to_message?.text ==
				'Please leave a contact to get in touch' ||
			ctx.update.message.reply_to_message?.text ==
				'If you do not leave a contact, we will not be able to contact you again!'
		) {
			await ctx.replyWithHTML(
				`
				<b>You can get answers to the questions you are interested in</b>
			`,
			Markup.keyboard(
				category.en_keyboard
			)
				.oneTime()
				.resize()
				.extra()
			);

			let newUser = {};
			const phone = ctx.update.message.contact.phone_number;
			const name = ctx.update.message.contact.first_name;
			const userId = ctx.update.message.contact.user_id;

			const oldUser = new FS(
				path.resolve(__dirname, '..', 'data', 'users.json'),
			);
			const allUser = JSON.parse(oldUser.read());
			const findData = allUser.find((e) => e.user_id == userId);

			if (!findData) {
				newUser.user_id = userId;
				newUser.user_name = name;
				newUser.user_phone = phone;
				newUser.user_number = allUser.length + 1;

				allUser.push(newUser);
				await ctx.telegram.sendContact(adminId, `${phone}`, `${name}`);
				await ctx.telegram.sendMessage(
					adminId,
					`Info: New User\nUser serial number: ${allUser.length}`,
				);
			}

			new FS(path.resolve(__dirname, '..', 'data', 'users.json')).write(
				allUser,
			);
		}
		if (
			ctx.update.message.reply_to_message?.text ==
				'Пожалуйста, оставьте контакт для связи' ||
			ctx.update.message.reply_to_message?.text ==
				'Если вы не оставите контакт, мы больше не сможем с вами связаться!'
		) {
			await ctx.replyWithHTML(
				`
				<b>Вы можете получить ответы на интересующие вас вопросы</b>
			`,
			Markup.keyboard(
				category.ru_keyboard
			)
				.oneTime()
				.resize()
				.extra()
			);
			let newUser = {};
			const phone = ctx.update.message.contact.phone_number;
			const name = ctx.update.message.contact.first_name;
			const userId = ctx.update.message.contact.user_id;

			const oldUser = new FS(
				path.resolve(__dirname, '..', 'data', 'users.json'),
			);
			const allUser = JSON.parse(oldUser.read());
			const findData = allUser.find((e) => e.user_id == userId);

			if (!findData) {
				newUser.user_id = userId;
				newUser.user_name = name;
				newUser.user_phone = phone;
				newUser.user_number = allUser.length + 1;

				allUser.push(newUser);
				await ctx.telegram.sendContact(adminId, `${phone}`, `${name}`);
				await ctx.telegram.sendMessage(
					adminId,
					`Info: New User\nUser serial number: ${allUser.length}`,
				);
			}

			new FS(path.resolve(__dirname, '..', 'data', 'users.json')).write(
				allUser,
			);
		}

		if (
			ctx.update.message.reply_to_message?.text == 'Savolingizni yozing!'
		) {
			await ctx.replyWithHTML(
				`
				<b>Savolingiz qabul qilindi</b>
				`,
				Markup.keyboard(
					category.uz_keyboard
				)
					.oneTime()
					.resize()
					.extra()
			);
			let newQuestion = {};
			const userId = ctx.update.message.from.id;

			const fs = new FS(
				path.resolve(__dirname, '..', 'data', 'users.json'),
			);
			const allUser = JSON.parse(fs.read());
			const foundUser = allUser.find((e) => e.user_id == userId);

			const phone = foundUser?.user_phone;
			const name = foundUser?.user_name;

			const question = ctx.update.message.text;

			const oldQuestion = new FS(
				path.resolve(__dirname, '..', 'data', 'question.json'),
			);
			const allQuestion = JSON.parse(oldQuestion.read());

			newQuestion.user_name = name;
			newQuestion.user_phone = phone;
			newQuestion.user_question = question;
			newQuestion.question_number = allQuestion.length + 1;
			newQuestion.user_id = userId;

			allQuestion.push(newQuestion);
			await ctx.telegram.sendContact(adminId, `${phone}`, `${name}`);
			await ctx.telegram.sendMessage(
				adminId,
				`New Question:\n${question}\nQuestion number: ${allQuestion.length}`,
			);

			new FS(
				path.resolve(__dirname, '..', 'data', 'question.json'),
			).write(allQuestion);
		}

		if (
			ctx.update.message.reply_to_message?.text == 'Write your question!'
		) {
			await ctx.replyWithHTML(
				`
				<b>Your question has been accepted</b>
				`,
				Markup.keyboard(
					category.en_keyboard
				)
					.oneTime()
					.resize()
					.extra()
			);
			let newQuestion = {};
			const userId = ctx.update.message.from.id;

			const fs = new FS(
				path.resolve(__dirname, '..', 'data', 'users.json'),
			);
			const allUser = JSON.parse(fs.read());
			const foundUser = allUser.find((e) => e.user_id == userId);

			const phone = foundUser.user_phone;
			const name = foundUser.user_name;

			const question = ctx.update.message.text;

			const oldQuestion = new FS(
				path.resolve(__dirname, '..', 'data', 'question.json'),
			);
			const allQuestion = JSON.parse(oldQuestion.read());

			newQuestion.user_name = name;
			newQuestion.user_phone = phone;
			newQuestion.user_question = question;
			newQuestion.question_number = allQuestion.length + 1;
			newQuestion.user_id = userId;

			allQuestion.push(newQuestion);
			await ctx.telegram.sendContact(adminId, `${phone}`, `${name}`);
			await ctx.telegram.sendMessage(
				adminId,
				`New Question:\n${question}\nQuestion number: ${allQuestion.length}`,
			);

			new FS(
				path.resolve(__dirname, '..', 'data', 'question.json'),
			).write(allQuestion);
		}

		if (
			ctx.update.message.reply_to_message?.text == 'Напишите свой вопрос!'
		) {
			await ctx.replyWithHTML(
				`
				<b>Ваш вопрос принят</b>
				`,
				Markup.keyboard(
					category.ru_keyboard
				)
					.oneTime()
					.resize()
					.extra()
			);
			let newQuestion = {};
			const userId = ctx.update.message.from.id;

			const fs = new FS(
				path.resolve(__dirname, '..', 'data', 'users.json'),
			);
			const allUser = JSON.parse(fs.read());
			const foundUser = allUser.find((e) => e.user_id == userId);
			console.log(allUser, foundUser, userId);
			const phone = foundUser.user_phone;
			const name = foundUser.user_name;

			const question = ctx.update.message.text;

			const oldQuestion = new FS(
				path.resolve(__dirname, '..', 'data', 'question.json'),
			);
			const allQuestion = JSON.parse(oldQuestion.read());

			newQuestion.user_name = name;
			newQuestion.user_phone = phone;
			newQuestion.user_question = question;
			newQuestion.question_number = allQuestion.length + 1;
			newQuestion.user_id = userId;

			allQuestion.push(newQuestion);
			await ctx.telegram.sendContact(adminId, `${phone}`, `${name}`);
			await ctx.telegram.sendMessage(
				adminId,
				`New Question:\n${question}\nQuestion number: ${allQuestion.length}`,
			);

			new FS(
				path.resolve(__dirname, '..', 'data', 'question.json'),
			).write(allQuestion);
		}
	} catch (e) {
		console.error('cant handle start command', e);
	}
});

module.exports = composer;

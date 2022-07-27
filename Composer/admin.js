const { Composer } = require('telegraf');
require('dotenv').config();
const FS = require('../fs/fs');
const path = require('path');
const Markup = require('telegraf/markup');

const adminId = process.env.ADMIN_ID;

const composer = new Composer();

composer.hears("👥 Foydalanuvchilar ro'yxati", async (ctx) => {
	try {
		if (ctx.update.message.chat?.id == adminId) {
			const fs = new FS(
				path.resolve(__dirname, '..', 'data', 'users.json'),
			);
			const allUser = JSON.parse(fs.read());

			for (let i = 0; i < allUser.length; i++) {
				await ctx.replyWithHTML(
					` <b>Foydalanuvchi tartib raqami: ${allUser[i]?.user_number}</b>\n<b>Foydalanuvchi nomi: ${allUser[i]?.user_name}</b>\n<b>Foydalanuvchi telefon raqami: ${allUser[i]?.user_phone}</b>`,
				);
			}
		}
	} catch (e) {
		console.error(e);
	}
});

composer.hears('✉️ Maxsus savollar', async (ctx) => {
	try {
		if (ctx.update.message.chat?.id == adminId) {
			await ctx.replyWithHTML(` <b>Barcha savollar</b>`);
			const fs = new FS(
				path.resolve(__dirname, '..', 'data', 'question.json'),
			);
			const allQuestion = JSON.parse(fs.read());
			for (let i = 0; i < allQuestion?.length; i++) {
				await ctx.replyWithHTML(
					` <b>Savol egasi: ${allQuestion[i]?.user_name}</b>\n<b>Savol matni: ${allQuestion[i]?.user_question}</b>\n<b>Foydalanuvchi telefon raqami: ${allQuestion[i]?.user_phone}</b>`,
					Markup.inlineKeyboard([
						Markup.callbackButton('✏️ Javob Yozish', `${allQuestion[i]?.user_id}`),
					]).extra(),
				);
			}
		}
	} catch (e) {
		console.error(e);
	}
});

composer.hears('🔍 Savollarni qidirish', async (ctx) => {
	try {
		if (ctx.update.message.from.id == adminId) {
			await ctx.scene.enter('searchQuestionScene');
		}
	} catch (e) {
		console.error(e);
	}
});

composer.hears('🔍 Foydalanuvchilarni qidirish', async (ctx) => {
	try {
		if (ctx.update.message.from.id == adminId) {
			await ctx.scene.enter('searchUserScene');
		}
	} catch (e) {
		console.error(e);
	}
});

composer.on('callback_query', async (ctx, next) => {
	try {
		if (ctx.update.callback_query.from.id == adminId) {
			await ctx.scene.enter('answerScene');
			ctx.session.userId = ctx.update.callback_query?.data;
		}
		next();
	} catch (e) {
		console.error(e);
	}
});

module.exports = composer;

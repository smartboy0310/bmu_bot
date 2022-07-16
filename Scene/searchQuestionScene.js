const Scene = require('telegraf/scenes/base');
const Markup = require('telegraf/markup');
const FS = require('../fs/fs');
const path = require('path');

require('dotenv').config();
const adminId = process.env.ADMIN_ID;
const category = require('../data/category');
const Extra = require('telegraf/extra');

const searchQuestionScene = new Scene('searchQuestionScene');

searchQuestionScene.enter(async (ctx) => {
	await ctx.replyWithHTML(` <b>Savol matni yoki savol egasi haqida biror ma'lumot kiriting</b> `);
});

searchQuestionScene.on('text', async (ctx) => {
		const searchData = await ctx.update.message?.text
		const fs = new FS(path.resolve(__dirname, '..','data','question.json'))
		const searchResult = new RegExp(searchData, 'gi');
		const allQuestion = JSON.parse(fs.read())

		let resultQuestion = allQuestion?.filter(e => e.user_name.match(searchResult) || e.user_question.match(searchResult))
		await ctx.replyWithHTML(` <b>Qidirish natijasi:</b>`)
		for(let i = 0; i < resultQuestion?.length; i++) {
			await ctx.replyWithHTML(` <b>Savol egasi: ${resultQuestion[i]?.user_name}</b>\n<b>Savol matni: ${resultQuestion[i]?.user_question}</b>\n<b>Foydalanuvchi telefon raqami: ${resultQuestion[i]?.user_phone}</b>`)
	  }
	  return  ctx.scene.leave()
});



module.exports = searchQuestionScene;

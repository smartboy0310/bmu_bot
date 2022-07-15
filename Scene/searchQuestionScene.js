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
		const searchData = await ctx.update.message.text
		const fs = new FS(path.resolve(__dirname, '..','data','question.json'))
		const allQuestion = JSON.parse(fs.read())
});



module.exports = searchQuestionScene;

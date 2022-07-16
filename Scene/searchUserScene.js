const Scene = require('telegraf/scenes/base');

const FS = require('../fs/fs');
const path = require('path');

require('dotenv').config();
const adminId = process.env.ADMIN_ID;


const searchUserScene = new Scene('searchUserScene');

searchUserScene.enter(async (ctx) => {
	await ctx.replyWithHTML(` <b>Foydalanuvchi ismi yoki telefon raqami haqida biror ma'lumot kiriting</b> `);
});

searchUserScene.on('text', async (ctx) => {
		const searchData = await ctx.update.message?.text
		const fs = new FS(path.resolve(__dirname, '..','data','users.json'))
		const searchResult = new RegExp(searchData, 'gi');
		const allUsers = JSON.parse(fs.read())

		let resultUsers = allUsers?.filter(e => e.user_name.match(searchResult) || e.user_phone.match(searchResult))
		await ctx.replyWithHTML(` <b>Qidirish natijasi:</b>`)
		for(let i = 0; i < resultUsers?.length; i++) {
			await ctx.replyWithHTML(` <b>Foydalanuvchi tartib raqami: ${resultUsers[i]?.user_number}</b>\n<b>Foydalanuvchi nomi: ${resultUsers[i]?.user_name}</b>\n<b>Foydalanuvchi telefon raqami: ${resultUsers[i]?.user_phone}</b>`)
	  }
	  return  ctx.scene.leave()
});



module.exports = searchUserScene;

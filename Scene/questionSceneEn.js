const Scene = require('telegraf/scenes/base');
const Markup = require('telegraf/markup');
const FS = require('../fs/fs');
const path = require('path');

require('dotenv').config();
const adminId = process.env.ADMIN_ID;
const category = require('../data/category');
const Extra = require('telegraf/extra');

const questionSceneEn = new Scene('questionSceneEn');

questionSceneEn.enter(async ctx => {
   await ctx.replyWithHTML(
		`
			<b>Write your question!</b>
		`,
		Extra.markup(Markup.forceReply())
	);
});

questionSceneEn.on('text', async (ctx) => {
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
   const userId = ctx.update.message.from?.id;

   const fs = new FS(path.resolve(__dirname, '..', 'data', 'users.json'));
   const allUser = JSON.parse(fs.read());
   const foundUser = allUser.find((e) => e.user_id == userId);

   const phone = foundUser?.user_phone;
   const name = foundUser?.user_name;

   const question = ctx.update.message?.text;

   const oldQuestion = new FS(path.resolve(__dirname, '..', 'data', 'question.json'));
   const allQuestion = JSON.parse(oldQuestion.read());

   newQuestion.user_name = name;
   newQuestion.user_phone = phone;
   newQuestion.user_question = question;
   newQuestion.question_number = allQuestion.length + 1;
   newQuestion.user_id = userId;

   allQuestion.push(newQuestion);
   
   await ctx.telegram.sendMessage(adminId, `New Question:\n${question}\nQuestion number: ${allQuestion.length}`);
   await ctx.telegram.sendContact(adminId, `${phone}`, `${name}`);

   new FS(path.resolve(__dirname, '..', 'data', 'question.json')).write(allQuestion);
   return  ctx.scene.leave()
});


module.exports = questionSceneEn;

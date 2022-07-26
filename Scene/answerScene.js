const Scene = require('telegraf/scenes/base');


const answerScene = new Scene('answerScene');

answerScene.enter(async (ctx) => {
	await ctx.replyWithHTML(` <b>Javob matnini kiriting</b> `);
});

answerScene.on('text', async (ctx) => {

		const answerText = await ctx.update.message?.text
      const userId = ctx.session.userId
      ctx.telegram.sendMessage(userId, `${answerText}`);
		return  ctx.scene.leave()
});

answerScene.leave(ctx => ctx.replyWithHTML(` <b>Javob yuborildi</b> `))


module.exports = answerScene;

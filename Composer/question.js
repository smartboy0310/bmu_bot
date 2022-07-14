const { Composer } = require('telegraf');
const Extra = require('telegraf/extra');
const Markup = require('telegraf/markup');

const composer = new Composer();

composer.hears('📝 Maxsus savol berish', async (ctx) => {
	await ctx.replyWithHTML(
		`
			<b>Savolingizni yozing!</b>
		`,
		Extra.markup(Markup.forceReply())
	);
});

composer.hears('📝 Ask custom question', async (ctx) => {
	await ctx.replyWithHTML(
		`
			<b>Write your question!</b>
		`,
		Extra.markup(Markup.forceReply()),
	);
});

composer.hears('📝 Задать пользовательский вопрос', async (ctx) => {
	await ctx.replyWithHTML(
		`
			<b>Напишите свой вопрос!</b>
		`,
		Extra.markup(Markup.forceReply()),
	);
});

module.exports = composer;

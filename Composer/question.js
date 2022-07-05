const {Composer} = require('telegraf')

const composer = new Composer()

composer.hears('📝 Maxsus savol berish', async (ctx) => {
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
});

composer.hears('📝 Ask custom question', async (ctx) => {
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
});

composer.hears('📝 Задать пользовательский вопрос', async (ctx) => {
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
});

module.exports = composer




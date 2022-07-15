const { Composer } = require('telegraf');
const Extra = require('telegraf/extra');
const Markup = require('telegraf/markup');

const composer = new Composer();

composer.hears('📝 Maxsus savol berish', async (ctx) => {
	await ctx.scene.enter('questionSceneUz')
});

composer.hears('📝 Ask custom question', async (ctx) => {
	await ctx.scene.enter('questionSceneEn')
});

composer.hears('📝 Задать пользовательский вопрос', async (ctx) => {
	await ctx.scene.enter('questionSceneRu')
});

module.exports = composer;

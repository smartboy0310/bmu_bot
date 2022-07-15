const { Composer } = require('telegraf');
const { markup } = require('telegraf/extra');
const Extra = require('telegraf/extra');
const Markup = require('telegraf/markup');

const composer = new Composer();

// const category = require('../data/category');
// // const data = require('../data/data');
// // const subCategory = require('../data/subcategory');

composer.hears('Ha ✅', async ctx => {
	await ctx.scene.enter('contactSceneUz')
});

composer.hears("Yo'q ❌", async (ctx) => {
	await ctx.scene.enter('contactSceneUz')
});

composer.hears('Yes ✅', async (ctx) => {
	await ctx.scene.enter('contactSceneEn')
});

composer.hears('No ❌', async (ctx) => {
	await ctx.scene.enter('contactSceneEn')
});

composer.hears('Да ✅', async (ctx) => {
	await ctx.scene.enter('contactSceneRu')
});

composer.hears('Нет ❌', async (ctx) => {
	await ctx.scene.enter('contactSceneRu')
});


module.exports = composer;

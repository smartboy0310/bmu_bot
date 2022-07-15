const Scene = require('telegraf/scenes/base');
const Markup = require('telegraf/markup');
const FS = require('../fs/fs');
const path = require('path');

require('dotenv').config();
const adminId = process.env.ADMIN_ID;
const category = require('../data/category');
const Extra = require('telegraf/extra');

const contactSceneRu = new Scene('contactSceneRu');

contactSceneRu.enter(async ctx => {
	await ctx.replyWithHTML(
		`
			<b>Пожалуйста, оставьте контакт для связи</b>
		`,
		Extra.markup(
			Markup.resize().keyboard([Markup.contactRequestButton('Отправить контакт')]),
		),
	);
});

contactSceneRu.on('message', async (ctx) => {
	const userContact = Number(ctx.update.message.text?.substr(1));

	if (userContact  || ctx.update.message?.contact) {
		await ctx.replyWithHTML(
			`
         <b>Вы можете получить ответы на интересующие вас вопросы</b>
         `,
			Markup.keyboard(category.ru_keyboard).oneTime().resize().extra(),
		);
		let newUser = {};
		let phone = ' ';
		let name = ' ';
		let userId = ' ';

		if (ctx.update.message.contact) {
			phone = ctx.update.message.contact?.phone_number;
			name = ctx.update.message.contact?.first_name;
			userId = ctx.update.message.contact?.user_id;
		} else {
			phone = ctx.update.message?.text;
			name = ctx.update.message.chat?.first_name;
			userId = ctx.update.message.chat?.id;
		}
		
		const oldUser = new FS(
			path.resolve(__dirname, '..', 'data', 'users.json'),
		);
		const allUser = JSON.parse(oldUser.read());
		const findData = allUser.find((e) => e.user_id == userId);

		if (!findData) {
			newUser.user_id = userId;
			newUser.user_name = name;
			newUser.user_phone = phone;
			newUser.user_number = allUser.length + 1;
			allUser.push(newUser);
			
			await ctx.telegram.sendMessage(adminId, `Info: New User\nUser serial number: ${allUser.length}`);
			await ctx.telegram.sendContact(adminId, `${phone}`, `${name}`);
		}

		new FS(path.resolve(__dirname, '..', 'data', 'users.json')).write(
			allUser,
		);
	} else {
		return await ctx.scene.leave();
	}
});

contactSceneRu.leave(async (ctx) =>
	await ctx.replyWithHTML(
		`
         <b>Контакт был введен неправильно. Пожалуйста, попробуйте еще раз:\n /start</b>
      `,
	),
);

module.exports = contactSceneRu;

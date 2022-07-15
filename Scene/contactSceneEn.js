const Scene = require('telegraf/scenes/base');
const Markup = require('telegraf/markup');
const FS = require('../fs/fs');
const path = require('path');

require('dotenv').config();
const adminId = process.env.ADMIN_ID;
const category = require('../data/category');
const Extra = require('telegraf/extra');

const contactSceneEn = new Scene('contactSceneEn');

contactSceneEn.enter(async (ctx) => {
	await ctx.replyWithHTML(
		`
		<b>Please leave a contact to get in touch</b>
			`,
		Extra.markup(
			Markup.resize().keyboard([
				Markup.contactRequestButton('Send contact'),
			]),
		),
	);
});

contactSceneEn.on('message', async (ctx) => {
	const userContact = Number(await ctx.update.message.text?.substr(1));

	if (userContact || await ctx.update.message?.contact) {
		await ctx.replyWithHTML(
			`
         <b>You can get answers to the questions you are interested in</b>
         `,
			Markup.keyboard(category.en_keyboard).oneTime().resize().extra(),
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
		return await ctx.scene.leave(async (ctx) =>
		await ctx.replyWithHTML(
			`
				<b>The contact was entered incorrectly. Please try again:\n /start</b>
			`,
		),);
	}
	return await ctx.scene.leave();
});


module.exports = contactSceneEn;

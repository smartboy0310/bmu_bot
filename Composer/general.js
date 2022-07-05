const {Composer} = require('telegraf')

const composer = new Composer()
const category = require('../data/category');

composer.on('message', async (ctx) => {
	try {
		if (
			ctx.update.message.reply_to_message?.text ==
				"Agar kontakt qoldirmasangiz qayta a'loqa yo'lga quya olmaymiz!" ||
			ctx.update.message.reply_to_message?.text ==
				'Iltimos bog’lanish uchun kontakt qoldiring'
		) {
			await ctx.replyWithHTML(
				`
				<b>O’zingizni qiziqtirgan savollarga javob olishgiz mumkin</b>
				`,
				{
					reply_markup: JSON.stringify({
						keyboard: category.uz_keyboard,
					}),
				},
			);
		}
		if (
			ctx.update.message.reply_to_message?.text ==
				"Please leave a contact to get in touch" ||
			ctx.update.message.reply_to_message?.text ==
				'If you do not leave a contact, we will not be able to contact you again!'
		) {
			await ctx.replyWithHTML(
				`
				<b>You can get answers to the questions you are interested in</b>
			`,
				{
					reply_markup: JSON.stringify({
						keyboard: category.en_keyboard,
					}),
				},
			);
		}
		if (
			ctx.update.message.reply_to_message?.text ==
				"Пожалуйста, оставьте контакт для связи" ||
			ctx.update.message.reply_to_message?.text ==
				'Если вы не оставите контакт, мы больше не сможем с вами связаться!'
		) {
			await ctx.replyWithHTML(
				`
				<b>Вы можете получить ответы на интересующие вас вопросы</b>
			`,
				{
					reply_markup: JSON.stringify({
						keyboard: category.ru_keyboard,
					}),
				},
			);
		}

		if (
			ctx.update.message.reply_to_message?.text == 'Savolingizni yozing!'
		) {
			await ctx.replyWithHTML(
				`
				<b>Savolingiz qabul qilindi</b>
				`,
				{
					reply_markup: JSON.stringify({
						keyboard: category.uz_keyboard,
					}),
				},
			);
		}

		if (
			ctx.update.message.reply_to_message?.text == 'Write your question!'
		) {
			await ctx.replyWithHTML(
				`
				<b>Your question has been accepted</b>
				`,
				{
					reply_markup: JSON.stringify({
						keyboard: category.en_keyboard,
					}),
				},
			);
		}

		if (
			ctx.update.message.reply_to_message?.text == 'Напишите свой вопрос!'
		) {
			await ctx.replyWithHTML(
				`
				<b>Ваш вопрос принят</b>
				`,
				{
					reply_markup: JSON.stringify({
						keyboard: category.ru_keyboard,
					}),
				},
			);
		}
	} catch (e) {
		console.error('cant handle start command', e);
	}
});


module.exports = composer
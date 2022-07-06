const {Composer} = require('telegraf')
const FS = require('../fs/fs')
const path = require('path')

require('dotenv').config();
const adminId = process.env.ADMIN_ID

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
				let newUser = {}
				const phone =  ctx.update.message.contact.phone_number
			   const name =  ctx.update.message.contact.first_name
			   const userId =  ctx.update.message.contact.user_id
				const oldUser = new FS(path.resolve(__dirname, '..','data','users.json'))
				const allUser = JSON.parse(oldUser.read())
				const findData = allUser.find(e => e.user_id == userId)
				
				if(!findData) {					
					newUser.user_id = userId
					newUser.user_name = name
					newUser.user_phone = phone
					newUser.user_number = allUser.length + 1
					allUser.push(newUser)
					await ctx.telegram.sendContact(adminId, `${phone}`,`${name}`)
					await ctx.telegram.sendMessage(adminId, `Info: New User\nUser serial number: ${allUser.length}`)
				}						
						
				 new FS(path.resolve(__dirname, '..','data','users.json')).write(allUser)
			
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

				let newUser = {}
				const phone =  ctx.update.message.contact.phone_number
			   const name =  ctx.update.message.contact.first_name
			   const userId =  ctx.update.message.contact.user_id

				
				const oldUser = new FS(path.resolve(__dirname, '..','data','users.json'))
				const allUser = JSON.parse(oldUser.read())
				const findData = allUser.find(e => e.user_id == userId)
				
				if(!findData) {					
					newUser.user_id = userId
					newUser.user_name = name
					newUser.user_phone = phone
					newUser.user_number = allUser.length + 1

					allUser.push(newUser)
					await ctx.telegram.sendContact(adminId, `${phone}`,`${name}`)
					await ctx.telegram.sendMessage(adminId, `Info: New User\nUser serial number: ${allUser.length}`)
				}						
						
				 new FS(path.resolve(__dirname, '..','data','users.json')).write(allUser)
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
				let newUser = {}
				const phone =  ctx.update.message.contact.phone_number
			   const name =  ctx.update.message.contact.first_name
			   const userId =  ctx.update.message.contact.user_id

				const oldUser = new FS(path.resolve(__dirname, '..','data','users.json'))
				const allUser = JSON.parse(oldUser.read())
				const findData = allUser.find(e => e.user_id == userId)
				
				if(!findData) {					
					newUser.user_id = userId
					newUser.user_name = name
					newUser.user_phone = phone
					newUser.user_number = allUser.length + 1

					allUser.push(newUser)
					await ctx.telegram.sendContact(adminId, `${phone}`,`${name}`)
					await ctx.telegram.sendMessage(adminId, `Info: New User\nUser serial number: ${allUser.length}`)
				}						
						
				 new FS(path.resolve(__dirname, '..','data','users.json')).write(allUser)
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
				let newQuestion = {}
				const userId =  ctx.update.message.from.id
				
				const fs = new FS(path.resolve(__dirname, '..','data','users.json'))
				const allUser = JSON.parse(fs.read())
				const foundUser = allUser.find(e => e.user_id == userId)
				console.log(allUser, foundUser, userId);
				const phone =  foundUser.user_phone
			   const name =  foundUser.user_name
				
			   const question =  ctx.update.message.text

				const oldQuestion = new FS(path.resolve(__dirname, '..','data','question.json'))
				const allQuestion = JSON.parse(oldQuestion.read())
				
					newQuestion.user_name = name
					newQuestion.user_phone = phone
					newQuestion.user_question = question
					newQuestion.question_number = allQuestion.length + 1
					newQuestion.user_id = userId
					
					allQuestion.push(newQuestion)
					await ctx.telegram.sendContact(adminId, `${phone}`,`${name}`)
					await ctx.telegram.sendMessage(adminId, `New Question:\n${question}\nQuestion number: ${allQuestion.length}`)
										
						
				 new FS(path.resolve(__dirname, '..','data','question.json')).write(allQuestion)
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
			let newQuestion = {}
			const userId =  ctx.update.message.from.id
			
			const fs = new FS(path.resolve(__dirname, '..','data','users.json'))
			const allUser = JSON.parse(fs.read())
			const foundUser = allUser.find(e => e.user_id == userId)
			console.log(allUser, foundUser, userId);
			const phone =  foundUser.user_phone
			const name =  foundUser.user_name
			
			const question =  ctx.update.message.text

			const oldQuestion = new FS(path.resolve(__dirname, '..','data','question.json'))
			const allQuestion = JSON.parse(oldQuestion.read())
			
				newQuestion.user_name = name
				newQuestion.user_phone = phone
				newQuestion.user_question = question
				newQuestion.question_number = allQuestion.length + 1
				newQuestion.user_id = userId
				
				allQuestion.push(newQuestion)
				await ctx.telegram.sendContact(adminId, `${phone}`,`${name}`)
				await ctx.telegram.sendMessage(adminId, `New Question:\n${question}\nQuestion number: ${allQuestion.length}`)
									
					
			 new FS(path.resolve(__dirname, '..','data','question.json')).write(allQuestion)
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
			let newQuestion = {}
			const userId =  ctx.update.message.from.id
			
			const fs = new FS(path.resolve(__dirname, '..','data','users.json'))
			const allUser = JSON.parse(fs.read())
			const foundUser = allUser.find(e => e.user_id == userId)
			console.log(allUser, foundUser, userId);
			const phone =  foundUser.user_phone
			const name =  foundUser.user_name
			
			const question =  ctx.update.message.text

			const oldQuestion = new FS(path.resolve(__dirname, '..','data','question.json'))
			const allQuestion = JSON.parse(oldQuestion.read())
			
				newQuestion.user_name = name
				newQuestion.user_phone = phone
				newQuestion.user_question = question
				newQuestion.question_number = allQuestion.length + 1
				newQuestion.user_id = userId
				
				allQuestion.push(newQuestion)
				await ctx.telegram.sendContact(adminId, `${phone}`,`${name}`)
				await ctx.telegram.sendMessage(adminId, `New Question:\n${question}\nQuestion number: ${allQuestion.length}`)
									
					
			 new FS(path.resolve(__dirname, '..','data','question.json')).write(allQuestion)
		}
	} catch (e) {
		console.error('cant handle start command', e);
	}
});


module.exports = composer
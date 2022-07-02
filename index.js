const { Telegraf,  session } = require('telegraf')
require('dotenv').config()

const token = process.env.BOT_TOKEN
const bot = new Telegraf(token)

let lang = ''

bot.use(session())

bot.command('start', async (ctx) => {
	try {
			await ctx.replyWithHTML(`
		 <b>Tilni tanlang 🇺🇿 </b>\n<b>Chouse language 🇬🇧</b>\n<b>Выберите язык 🇷🇺</b>
    `, {
		reply_markup: {
         inline_keyboard: [
            [
               {
                  text: '🇺🇿 O\'zbekcha',
						callback_data: 'uz'
               },
               {
                  text: '🇬🇧 English',
						callback_data: 'en'
               },
               {
                  text: '🇷🇺 Русский',
						callback_data: 'ru'
               }
            ]
         ],
         resize_keyboard: true
      }
	 })
	} catch (e) {
		console.error('cant handle start command', e)
	}
})

bot.on('callback_query', async (ctx) => {
	try {
		lang = ctx.update.callback_query.data
		if(lang == "uz"){
		await ctx.replyWithHTML(`
			<b>Salom ${ctx.from.first_name}, Xush kelibsiz</b>\n<b>Qayta a'loqa uchun To’liq ismingizni yozing!</b>
		`,{
			reply_markup: {
				force_reply: true
			}
		})
		}

		if(lang == "en"){
			await ctx.replyWithHTML(`
				<b>Hello ${ctx.from.first_name}, Welcome</b>\n<b>Please write your full name for contact back!</b>
			`,{
            reply_markup: {
               force_reply: true
            }
         })
		}

			if(lang == "ru"){
				await ctx.replyWithHTML(`
					<b>Привет ${ctx.from.first_name}, Добро пожаловать</b>\n<b>Пожалуйста, напишите свое полное имя для обратной связи!</b>
				`,{
					reply_markup: {
						force_reply: true
					}
				})
			}
} catch (e) {
	console.error('cant handle start command', e)
}
})

bot.on('message', async (ctx) => {
	try {
		if(lang == "uz"){
			await ctx.replyWithHTML(`
				<b>Iltimos bog’lanish uchun kontak qoldiring</b>
			`,{
				reply_markup: JSON.stringify({
					force_reply: true,
					keyboard:
					[
						 [
							  {
									text: 'Kontakt jo’natish',
									request_contact: true,
									one_time_keyboard: true
							  }
						 ]
					],
					resize_keyboard: true
			  })		
		  })
			}
	
			if(lang == "en"){
				await ctx.replyWithHTML(`
					<b>Please leave a contact to get in touch</b>
				`,{
					reply_markup: JSON.stringify({
						force_reply: true,
						keyboard:
						[
							 [
								  {
										text: 'Send Contact',
										request_contact: true,
										one_time_keyboard: true
								  }
							 ]
						],
						resize_keyboard: true
				  })		
			  })
			}
	
				if(lang == "ru"){
					await ctx.replyWithHTML(`
						<b>Пожалуйста, оставьте контакт для связи</b>
					`,{
						reply_markup: JSON.stringify({
							force_reply: true,
							keyboard:
							[
								 [
									  {
											text: 'Отправить контакт',
											request_contact: true,
											one_time_keyboard: true
									  }
								 ]
							],
							resize_keyboard: true
					  })		
				  })
				}
		
} catch (e) {
	console.error('cant handle start command', e)
}
})

bot.launch().then(() => {
	console.log(`bot started on @${bot.options.username}`)
})


require('dotenv').config()
const Discord = require('discord.js')
const prefix = '/'

const bot = new Discord.Client()
bot.on('ready', () => {
    console.log(`Logged in as ${bot.user.tag}!`)
})
bot.on('message', (msg) => {
    if(msg.author.bot) return
    if(!msg.content) return

    const text = msg.content

    if(text.substring(0, prefix.length) == prefix) {
        const command = text.substring(prefix.length, text.includes(' ') ? text.indexOf(' ') : text.length)
        const rest = text.slice(prefix.length + command.length).trim()
        const args = rest.split(/\s+/)

        if(commands[command]) commands[command](msg, command, args, rest)
    }
})
bot.login(process.env.BOT_TOKEN)

const commands = {
    'furi': require('./commands/furi.js'),
    'yomi': require('./commands/furi.js')
}

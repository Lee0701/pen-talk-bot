
const Discord = require('discord.js')

const puppeteer = require('puppeteer')
const marked = require('marked')

marked.setOptions({
    gfm: true,
    breaks: true,
})

const COLOR = '#dcddde'
const FONT_SIZE = '120%'
const BACKGROUND = '#36393f'

module.exports = (msg, cmd, args, rest) => {
    (async () => {
        const text = rest
        const content = getContent(replace(marked(text)))

        const browser = await puppeteer.launch({defaultViewport: null})
        const page = await browser.newPage()
        await page.setContent(content)
        await page.setViewport({width: 768, height: 320})
        const dimensions = await page.evaluate(() => {
            return {
                width: document.body.offsetWidth,
                height: document.body.offsetHeight,
            }
        })
        await page.setViewport(dimensions)
        const buffer = await page.screenshot({fullPage: true})
        
        const attachment = new Discord.MessageAttachment(buffer)
        msg.reply('', attachment)
    })()
}

const replace = (text) => text.replace(/([^()<>\s]+)\(([^()<>\s]*)\)/g, (_match, rb, rt) => `<ruby><rb>${rb}</rb><rp>(</rp><rt>${rt}</rt><rp>)</rp></ruby>`)

const getContent = (text) => `
<html>
<head>
    <style>
    body {
        display: inline-block;
        margin: 0px;
        padding: 10px;
        background: ${BACKGROUND};
        font-size: ${FONT_SIZE};
        color: ${COLOR};
        font-family: 'Noto Sans CJK KR';
		ruby-align: center;
    }
    </style>
</head>
<body>
    ${text}
</body>
</html>
`

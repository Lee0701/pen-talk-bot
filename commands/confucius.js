
const fs = require('fs')
const sf = require('sf')
const confucius = fs.readFileSync('data/confucius.txt').toString().split('\n')
const confuciusTop = confucius.shift()
const confuciusRest = confucius.join('\n')

module.exports = (msg, cmd, args, rest) => {
    const leftWidth = 26
    const rightWidth = 5
    const width = 10
    const totalWidth = leftWidth + width + rightWidth
    const height = 6
    const lines = args.join(' ')
            .match(new RegExp(`.{1,${Math.floor(width/2)}}`, 'g'))
            .map((line, i, arr) => (i == arr.length-1) ? '| ' + line : '  ' + line)
    lines.unshift('  ' + ' '.repeat(width) + '|')
    lines.unshift('  ' + ' '.repeat(width-2) + '--')
    lines.push('|__')
    if(lines.length < height) lines.unshift(...new Array(height - lines.length).fill(''))
    const topLines = (lines.length > height) ? lines.splice(0, lines.length - height) : []
    const topMessageLines = topLines.map((line) => sf(confuciusTop, line))
    const restMessage = sf(confuciusRest, ...lines).split('\n')
    const text = padLines([...topMessageLines, ...restMessage], totalWidth).join('\n')
    msg.channel.send('```' + text + '```')
}

const padLines = (lines, width) => lines.map((line) => padLine(line, width))
const padLine = (line, width) => line + new Array(getPadWidth(line, width)).fill(' ').join('')
const getPadWidth = (line, width) => Math.max(0, width - line.length - (line.match(/[^ -~]/g) || []).length)
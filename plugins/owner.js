import syntaxerror from 'syntax-error'
import { format } from 'util'
import { fileURLToPath } from 'url'
import { dirname } from 'path'
import { createRequire } from 'module'

const __dirname = dirname(fileURLToPath(import.meta.url))
const require = createRequire(__dirname)
//
let handler = async (m, _2) => {
  let { conn, usedPrefix, noPrefix, args, groupMetadata } = _2
  let _return
  let _syntax = ''
  let _text = (/^=/.test(usedPrefix) ? 'return ' : '') + noPrefix
  let old = m.exp * 1
  try {
    let i = 15
    let f = {
      exports: {}
    }
    let exec = new (async () => { }).constructor('print', 'm', 'handler', 'require', 'conn', 'Array', 'process', 'args', 'groupMetadata', 'module', 'exports', 'argument', _text)
    _return = await exec.call(conn, (...args) => {
      if (--i < 1) return
      console.log(...args)
      return conn.sendMessage(m.chat, { text: format(...args), 
contextInfo: {
  externalAdReply: {
    title: '🍷 𝐒𝐡𝐚𝐝𝐨𝐰 𝐁𝐨𝐭 🍷',
    body: '🍷 𝑺𝒉𝒂𝒅𝒐𝒘 𝑩𝒐𝒕 🍷',
    mediaType: 1,
    thumbnailUrl: 'https://qu.ax/tNPfx.jpg',
    renderLargerThumbnail: false,
    sourceUrl: ''
  }
},
 }, { quoted: m })
    }, m, handler, require, conn, CustomArray, process, args, groupMetadata, f, f.exports, [conn, _2])
  } catch (e) {
    let err = syntaxerror(_text, 'Función de ejecución', {
      allowReturnOutsideFunction: true,
      allowAwaitOutsideFunction: true,
        sourceType: 'module'
    })
    if (err) _syntax = '```' + err + '```\n\n'
    _return = e
  } finally {
    conn.reply(m.chat, _syntax + format(_return), m)
    m.exp = old
  }
}
handler.help = ['>', '=>']
handler.tags = ['advanced']
handler.customPrefix = /^=?> /
handler.command = /(?:)/i

export default handler

class CustomArray extends Array {
  constructor(...args) {
    if (typeof args[0] == 'number') return super(Math.min(args[0], 10000))
    else return super(...args)
  }
}
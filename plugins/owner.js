import syntaxerror from 'syntax-error'
import { format } from 'util'
import { fileURLToPath } from 'url'
import { dirname } from 'path'
import { createRequire } from 'module'

const __dirname = dirname(fileURLToPath(import.meta.url))
const require = createRequire(__dirname)

// 🧠 Poner aquí tu número (sin el +)
const OWNER_NUMBERS = ['5217227584934'] // <-- reemplaza con tu número

let handler = async (m, _2) => {
  let { conn, usedPrefix, noPrefix, args, groupMetadata } = _2
  const senderNumber = m.sender.split('@')[0]

  // 🔒 Si no es el owner, ignorar totalmente sin mensaje
  if (!OWNER_NUMBERS.includes(senderNumber)) return

  let _return
  let _text = (/^=/.test(usedPrefix) ? 'return ' : '') + noPrefix.trim()

  if (!_text || _text.length < 3 || !/[=+\-*/{}()$]|(let|await|return|console|function)/.test(_text)) return

  let err = syntaxerror(_text, 'Evaluación del dueño', {
    allowReturnOutsideFunction: true,
    allowAwaitOutsideFunction: true,
    sourceType: 'module'
  })

  if (err) return

  try {
    let f = { exports: {} }
    let exec = new (async () => {}).constructor(
      'print', 'm', 'handler', 'require', 'conn', 'Array', 'process', 'args', 'groupMetadata', 'module', 'exports', 'argument',
      _text
    )

    await exec.call(conn, (...args) => {
      return conn.reply(m.chat, format(...args), m)
    }, m, handler, require, conn, CustomArray, process, args, groupMetadata, f, f.exports, [conn, _2])

  } catch {
    return // tampoco mostrar errores de ejecución
  }
}

handler.help = ['>', '=>']
handler.tags = ['advanced']
handler.customPrefix = /^=?> /
handler.command = /(?:)/i
handler.owner = false // para que no dispare global.dfail

export default handler

class CustomArray extends Array {
  constructor(...args) {
    if (typeof args[0] === 'number') return super(Math.min(args[0], 10000))
    else return super(...args)
  }
}
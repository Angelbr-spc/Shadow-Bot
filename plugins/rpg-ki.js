let handler = async (m, {conn, usedPrefix}) => {
   let who = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : m.sender
   if (who == conn.user.jid) return error 
   if (!(who in global.db.data.users)) return conn.sendMessage(m.chat, { text: 'El usuario no se encuentra en mi base de Datos.', 
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
   let user = global.db.data.users[who]
   await m.reply(`${who == m.sender ? `Tienes *${user.limit} ⚡ KI* en tu Cartera` : `El usuario @${who.split('@')[0]} tiene *${user.limit} ⚡ KI* en su Cartera`}. `, null, { mentions: [who] })
}

handler.help = ['ki']
handler.tags = ['rpg']
handler.command = ['ki']
handler.register = true 
export default handler
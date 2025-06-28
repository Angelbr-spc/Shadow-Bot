let noAceptarHandler = async (m, { conn, text, usedPrefix, command }) => {

  //if (!global.staffs || !Array.isArray(global.staffs)) global.staffs = []


  if (!m.isGroup) return m.reply(`Este comando solo se puede usar en el grupo del staff.`)
  //if (!global.staffs.includes(m.sender)) return m.reply(`❌ No tienes permisos para usar este comando.`)

  if (!m.quoted) return m.reply(`❗️ Responde al mensaje de sugerencia para rechazarlo.`)
  let razon = text.trim() || 'Sin razón especificada.'

  let regex = /wa\.me\/(\d+)/i
  let match = m.quoted.text.match(regex)
  if (!match) {
    return m.reply(`❗️ No se pudo extraer el número del usuario de la sugerencia.`)
  }
  let userId = match[1] + "@s.whatsapp.net"


  await conn.sendMessage(userId, { text: `❌ *Tu sugerencia fue RECHAZADA*\n\n_El staff ha revisado tu propuesta y decidió no implementarla._\nRazón: ${razon}`, 
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
  m.reply(`❌ Sugerencia rechazada y notificada al usuario.`)
}
noAceptarHandler.help = ['noaceptar']
noAceptarHandler.tags = ['staff']
noAceptarHandler.command = ['noaceptar']
export default noAceptarHandler
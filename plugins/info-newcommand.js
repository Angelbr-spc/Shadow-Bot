
 let handler = async (m, { conn, text, usedPrefix, command, nombre }) => {
    if (!text) return conn.sendMessage(m.chat, { text: '🐉 Que comando quieres sugerir?', 
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
    if (text.length < 10) return conn.reply(m.chat, '☁️ La sugerencia debe ser más de 10 caracteres.', m)
    if (text.length > 1000) return conn.reply(m.chat, '💨 Máximo de la sugerencia es de 1000 caracteres.', m)

    // Asegúrate de que 'nombre' esté definido
    if (!nombre) nombre = "Usuario Desconocido"; // Valor por defecto si no se proporciona

    const teks = `🐲 Sugerencia de un nuevo comando del usuario *${nombre}*

🐉 Comando Sugerido:
> ${text}`

    await conn.reply('584146277368@s.whatsapp.net', m.quoted ? teks + m.quoted.text : teks, m, { mentions: conn.parseMention(teks) })

    m.reply('☁️ La sugerencia se envió a mi propietario🖥️.')
}

handler.help = ['newcommand']
handler.tags = ['info']
handler.command = ['newcommand', 'sug']

export default handler
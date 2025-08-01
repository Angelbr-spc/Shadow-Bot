export const handler = async (m, { conn, args, usedPrefix, command }) => {
  const texto = args.join(' ')
  if (!texto) {
    return conn.reply(
      m.chat,
      `✳️ *Uso correcto:*\n${usedPrefix + command} <texto>\n\n📌 *Ejemplo:*\n${usedPrefix + command} Hola, ¿cómo estás?`,
      m
    )
  }

  // Reacción de inicio
  await conn.sendMessage(m.chat, {
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
 react: { text: '🔵', key: m.key } })

  try {
    const url = `https://api.siputzx.my.id/api/tools/ttsgoogle?text=${encodeURIComponent(texto)}`
    const res = await fetch(url)

    if (!res.ok) throw 'Error al obtener el audio.'

    const buffer = await res.arrayBuffer()

    await conn.sendMessage(
      m.chat,
      {
        audio: Buffer.from(buffer),
        mimetype: 'audio/mp4',
        ptt: true
      },
      { quoted: m }
    )

    // Reacción de éxito
    await conn.sendMessage(m.chat, { react: { text: '🟢', key: m.key } })

  } catch (e) {
    console.error(e)
    await conn.sendMessage(m.chat, { react: { text: '🔴', key: m.key } })
    conn.sendMessage(m.chat, { text: '🔴 Ocurrió un error al generar el audio.', 
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
  }
}

handler.help = ['tts <texto-voz>']
handler.tags = ['herramientas']
handler.command = /^tts$/i
export default handler
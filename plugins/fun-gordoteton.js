
let handler = async (m, { conn, args }) => {
    // Verificar si se menciona a un usuario
    if (!args[0]) {
        return conn.sendMessage(m.chat, {
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
 text: "⚠️ Debes mencionar a un usuario. Usa el formato: .gordoteton @usuario" }, { quoted: m });
    }

    // Obtener el ID del usuario mencionado
    let userMentioned = m.mentionedJid[0];
    
    // Generar un porcentaje aleatorio entre 1 y 100
    let porcentaje = Math.floor(Math.random() * 100) + 1;

    // Mensaje que se enviará
    const mensaje = `🤣 ¡${conn.getName(userMentioned)} tiene un ${porcentaje}% de ser gordoteton! ¡No te lo tomes a mal!`;

    // Enviar el mensaje al chat
    await conn.sendMessage(m.chat, { text: mensaje }, { quoted: m });
}
handler.help = ['gordoteton @usuario'];
handler.tags = ['diversión'];
handler.command = ['gordoteton'];

export default handler;
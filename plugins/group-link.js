
var handler = async (m, { conn, args }) => {
    try {
        let group = m.chat;
        let link = 'https://chat.whatsapp.com/' + await conn.groupInviteCode(group);
        conn.reply(m.chat, '🔗 ' + link, m, { detectLink: true });
    } catch (error) {
        conn.sendMessage(m.chat, { text: 'Error al obtener el enlace del grupo. Asegúrate de que soy administrador y estoy en un grupo.', 
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
 }, { quoted: m });
    }
}

handler.help = ['link'];
handler.tags = ['grupo'];
handler.command = ['link', 'linkgroup'];

handler.group = true;
handler.botAdmin = true;

export default handler;
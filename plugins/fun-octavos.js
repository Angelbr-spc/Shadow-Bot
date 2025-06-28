
let handler = async (m, { conn }) => {
    const imageUrl = 'https://i.ibb.co/fdXKyX73/file.jpg'; // Reemplaza esto con la URL de tu imagen
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
 image: { url: imageUrl } }, { quoted: m });
}

handler.help = ['cuartoschampions'];
handler.tags = ['info'];
handler.command = ['cuartoschampions'];

export default handler;

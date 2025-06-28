let handler = async (m, { conn }) => {
  const usuario = m.pushName || 'Usuario';
  const videoUrl = 'https://qu.ax/yTjnH.mp4';

  const texto = `Hola @${m.sender.split('@')[0]} aquí está el tutorial para hacerte subbot en 𝐒𝐡𝐚𝐝𝐨𝐰-Bot.`;

  const options = {
    quoted: m,
    caption: texto,
    mentions: [m.sender]
  };

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
 video: { url: videoUrl }, ...options });
};

handler.command = ['tutosub']

export default handler;
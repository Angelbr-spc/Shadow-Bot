
import fetch from 'node-fetch';

const handler = async (m, { conn, args }) => {
  if (!args[0]) {
    return conn.reply(m.chat, '🤖 Por favor, proporciona un texto para generar la imagen.\nEjemplo: .barbozai Hola mundo', m);
  }

  const text = args.join(' ');
  const fontSize = 50; 
  const apiUrl = `https://api.dorratz.com/v3/text-image?text=${encodeURIComponent(text)}&fontSize=${fontSize}`;

  try {
    await m.react('⏳');

    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error('Error al generar la imagen desde la API.');
    }

    const imageUrl = apiUrl;

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

      image: { url: imageUrl },
      caption: `✨ Imagen generada con el texto: "${text}"`,
    }, { quoted: m });

    await m.react('✅');

  } catch (error) {
    console.error('Error al generar la imagen:', error);
    await m.react('❌');

    conn.sendMessage(m.chat, { text: `❌ Ocurrió un error al generar la imagen: ${error.message}`, 
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
};

handler.command = ['barbozai'];
handler.help = ['barbozai <texto>'];
handler.tags = ['image'];

export default handler;
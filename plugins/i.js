/*
- 🗣️ Crear imagenes con *IA*
*/

// *`[🕯️ DALLE 🕯️]`*

import axios from 'axios';

const handler = async (m, { conn, args }) => {
    if (!args[0]) {
        await conn.sendMessage(m.chat, { text: '✨ Por favor proporciona una descripción para generar la imagen.', 
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
        return;
    }

    const prompt = args.join(' ');
    const apiUrl = `https://api.dorratz.com/v3/ai-image?prompt=${prompt}`;

    try {
        conn.reply(m.chat, '*🧧 Espere un momento...*', m);

        const response = await axios.get(apiUrl);

        if (response.data && response.data.data && response.data.data.image_link) {
            const imageUrl = response.data.data.image_link;

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
        } else {
            throw new Error('No se encontró la imagen en la respuesta.');
        }
    } catch (error) {
        console.error('Error al generar la imagen:', error);
        await conn.reply(m.chat,`${error}`, m);
    }
};

handler.command = ['dalle'];
handler.help = ['dalle'];
handler.tags = ['tools'];

export default handler;
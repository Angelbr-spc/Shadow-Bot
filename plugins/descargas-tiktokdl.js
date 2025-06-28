
import axios from "axios";
import cheerio from "cheerio";

const handler = async (m, { conn, args}) => {
    if (!args[0]) return conn.sendMessage(m.chat, { text: '❌ *Debes proporcionar un enlace de TikTok!*', 
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

    const url = args[0];
    const apiUrl = `https://api.nekorinn.my.id/downloader/tikwm?url=${encodeURIComponent(url)}`;

    try {
        await m.react('🕒');

        const response = await axios.get(apiUrl);
        const data = response.data;

        if (data && data.video && data.video.url) {
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

                video: { url: data.video.url},
                caption: `✅ *Descarga completada!* 🎥\n🔗 *Fuente:* ${url}`,
});
} else {
            await conn.reply(m.chat, '⚠️ *No se pudo obtener el video. Intenta con otro enlace.*', m);
}
} catch (error) {
        console.error(error);
        await conn.reply(m.chat, '❌ *Hubo un problema con la API. Inténtalo más tarde.*', m);
}
};

handler.command = ["tiktokdl"];
export default handler;

import axios from "axios";

const handler = async (m, { conn, args}) => {
    if (!args[0]) return conn.sendMessage(m.chat, { text: "❌ *Debes proporcionar un término de búsqueda!*", 
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

    const query = encodeURIComponent(args.join(" "));
    const apiUrl = `https://api.siputzx.my.id/api/s/pinterest?query=${query}`;

    try {
        await m.react("🕒");

        const response = await axios.get(apiUrl);
        const data = response.data.data;

        if (!data || data.length === 0) {
            await conn.reply(m.chat, `⚠️ *No se encontraron imágenes para:* ${args.join(" ")}`, m);
            return;
}

        const randomImage = data[Math.floor(Math.random() * data.length)];
        const imageUrl = randomImage.images_url;

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

            image: { url: imageUrl},
            caption: `✅ *Imagen de Pinterest encontrada!*\n🔎 *Búsqueda:* ${args.join(" ")}`,
}, { quoted: m});

        await m.react("✅");

} catch (error) {
        await m.react("✖️");
        console.error("Error al obtener la imagen:", error);
        await conn.reply(m.chat, "❌ *Ocurrió un error al obtener la imagen. Inténtalo nuevamente.*", m);
}
};

handler.command = ["pinterest"];
export default handler;
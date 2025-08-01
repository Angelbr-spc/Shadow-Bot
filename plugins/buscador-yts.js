import yts from 'yt-search';

let ytSearchHandler = async (m, { conn, text, usedPrefix, command }) => {
  // Verificar que se haya proporcionado un término de búsqueda
  if (!text || !text.trim()) {
    await conn.reply(
      m.chat,
      `Uso: ${usedPrefix + command} <término de búsqueda>\nEjemplo: ${usedPrefix + command} Nio Garcia Infinitamente remix`,
      m
    );
    return;
  }
  text = text.trim();

  // Notificar que se está realizando la búsqueda
  await conn.sendMessage(m.chat, { text: `Buscando en YouTube por: ${text}`, 
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

  try {
    // Realizar la búsqueda en YouTube
    const searchResults = await yts(text);
    if (!searchResults?.videos?.length) throw new Error("No se encontraron resultados en YouTube.");

    // Seleccionar los primeros 5 resultados
    const videos = searchResults.videos.slice(0, 5);

    // Enviar cada resultado por separado
    for (const video of videos) {
      let caption = `⌘━─━─≪𓄂*𝐒𝐡𝐚𝐝𝐨𝐰*𝄢─━─━⌘\n\n`;
      caption += `➷ Título: ${video.title}\n`;
      caption += `➷ Duración: ${video.timestamp || "Desconocida"}\n`;
      caption += `SI QUIERES DESCARGAR AUDIO/VIDEO USA LOS COMANDOS MAS LA URL DEL VIDEO\n`;
      caption += `.ytmp3+ ${video.url} Audio\n`;
      caption += `.ytmp4+ ${video.url} Video\n\n`;
      caption += `> © Prohibido la copia, Código Oficial de 𝐒𝐡𝐚𝐝𝐨𝐰 MD™`;

      // Enviar mensaje con imagen y descripción
      await conn.sendMessage(
        m.chat,
        {
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
 image: { url: video.image }, caption },
        { quoted: m }
      );
    }
  } catch (error) {
    console.error("❌ Error:", error);
    await conn.reply(m.chat, `🚨 *Error:* ${error.message || "Error desconocido"}`, m);
  }
};

ytSearchHandler.help = ['ytsearch/yts <texto>']
ytSearchHandler.tags = ['búsquedas']
ytSearchHandler.command = /^(yts|ytsearch)$/i
export default ytSearchHandler
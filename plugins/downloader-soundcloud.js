import fetch from 'node-fetch';

const handler = async (m, { conn, args, text }) => {
  if (!text) {
    await m.react('📀');
    return m.reply(`╭─⬣「 𝐀𝐧𝐠𝐞𝐥 」⬣
│  ❗ *Uso Incorrecto*
│  ➤ Escribe: play nombre de canción
│  ➤ *Ejemplo:* play Shakira loba
╰`);
  }

  try {
    await m.react('📀'); // buscando...

    const searchApi = `https://delirius-apiofc.vercel.app/search/ytsearch?q=${encodeURIComponent(text)}`;
    const searchResponse = await fetch(searchApi);
    const searchData = await searchResponse.json();

    if (!searchData?.data || searchData.data.length === 0) {
      await m.react('🔴');
      return m.reply(`╭─⬣「 *𝐀𝐧𝐠𝐞𝐥* 」⬣
│  ⚠️ *Sin Resultados*
│  ➤ No se encontró nada para:
│  ➤ *"${text}"*
╰`);
    }

    const video = searchData.data[0];

    await conn.sendMessage(m.chat, {
      image: { url: video.image },
      caption: `╭─⬣「 *𝐀𝐧𝐠𝐞𝐥* 」⬣
│  ≡◦🎵 *Título:* ${video.title}
│  ≡◦📺 *Canal:* ${video.author.name}
│  ≡◦⏱️ *Duración:* ${video.duration}
│  ≡◦👁️ *Vistas:* ${video.views}
│  ≡◦📅 *Publicado:* ${video.publishedAt}
│  ≡◦🔗 *Enlace:* ${video.url}
╰`
    }, { quoted: m });

    const downloadApi = `https://api.vreden.my.id/api/ytmp3?url=${video.url}`;
    const downloadResponse = await fetch(downloadApi);
    const downloadData = await downloadResponse.json();

    if (!downloadData?.result?.download?.url) {
      await m.react('🔴');
      return m.reply(`╭─⬣「 *𝐀𝐧𝐠𝐞𝐥* 」⬣
│  ❌ *Error al descargar*
│  ➤ No se pudo obtener el audio del video.
╰`);
    }

    await conn.sendMessage(m.chat, {
      audio: { url: downloadData.result.download.url },
      mimetype: 'audio/mpeg',
      fileName: `${video.title}.mp3`
    }, { quoted: m });

    await m.react('🟢'); // éxito
  } catch (e) {
    console.error(e);
    await m.react('🔴');
    m.reply(`╭─⬣「 *𝐀𝐧𝐠𝐞𝐥* 」⬣
│  ❌ *Error Interno*
│  ➤ ${e.message}
╰`);
  }
};

// ✅ Aquí está el truco: usar RegExp directo como `command`
handler.command = /^play\s.+/i;
handler.register = true;

export default handler;
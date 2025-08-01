import fetch from 'node-fetch';

const handler = async (m, { conn, args }) => {
  const text = args.join(' ');
  if (!text) {
    await m.react('📀');
    return m.reply(`╭─⬣「 𝐀𝐧𝐠𝐞𝐥 」⬣
│ ❗ *Uso Incorrecto*
│ ➤ Escribe: play nombre de canción
│ ➤ *Ejemplo:* play Shakira loba
╰`);
  }

  try {
    await m.react('📀');

    const search = await fetch(`https://delirius-apiofc.vercel.app/search/ytsearch?q=${encodeURIComponent(text)}`);
    const data = await search.json();
    const video = data?.data?.[0];

    if (!video) {
      await m.react('🔴');
      return m.reply(`╭─⬣「 *𝐀𝐧𝐠𝐞𝐥* 」⬣
│ ⚠️ *No se encontró nada para:* "${text}"
╰`);
    }

    const caption = `╭─⬣「 *𝐀𝐧𝐠𝐞𝐥* 」⬣
│ ≡◦🎵 *Título:* ${video.title}
│ ≡◦📺 *Canal:* ${video.author.name}
│ ≡◦⏱️ *Duración:* ${video.duration}
│ ≡◦👁️ *Vistas:* ${video.views}
│ ≡◦📅 *Publicado:* ${video.publishedAt}
│ ≡◦🔗 *Link:* ${video.url}
╰`;

    await conn.sendMessage(m.chat, {
      image: { url: video.image },
      caption
    }, { quoted: m });

    const dl = await fetch(`https://api.vreden.my.id/api/ytmp3?url=${video.url}`);
    const result = await dl.json();

    if (!result?.result?.download?.url) {
      await m.react('🔴');
      return m.reply(`╭─⬣「 *𝐀𝐧𝐠𝐞𝐥* 」⬣
│ ❌ *Error al descargar el audio.*
╰`);
    }

    await conn.sendMessage(m.chat, {
      audio: { url: result.result.download.url },
      mimetype: 'audio/mpeg',
      fileName: `${video.title}.mp3`
    }, { quoted: m });

    await m.react('🟢');
  } catch (e) {
    console.error(e);
    await m.react('🔴');
    m.reply(`╭─⬣「 *𝐀𝐧𝐠𝐞𝐥* 」⬣
│ ❌ *Error Interno:* ${e.message}
╰`);
  }
};

handler.customPrefix = /^play\s+/i;
handler.command = new RegExp;
handler.register = true;

export default handler;
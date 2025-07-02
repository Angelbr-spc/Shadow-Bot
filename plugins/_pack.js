import fetch from 'node-fetch';

let handler = async (m, { conn }) => {
  let txt = 'Pack🔥🔥🔥\n> Toca *Siguiente* para ver otro ✨';
  let img = 'https://delirius-apiofc.vercel.app/nsfw/girls';

  await conn.sendMessage(
    m.chat,
    {
      image: { url: img },
      caption: txt,
      footer: '🍷 Shadow Bot 🍷',
      templateButtons: [
        {
          index: 1,
          quickReplyButton: {
            displayText: '👉 Siguiente',
            id: '.pack'
          }
        }
      ],
      contextInfo: {
        externalAdReply: {
          title: '🍷 Shadow Bot 🍷',
          body: 'Canal Oficial',
          mediaType: 1,
          thumbnailUrl: 'https://qu.ax/tNPfx.jpg',
          renderLargerThumbnail: false,
          sourceUrl: ''
        }
      }
    },
    { quoted: m } // 👈🏻 ESTO SÍ EXISTE
  )
}

handler.command = /^pack$/i;
export default handler;
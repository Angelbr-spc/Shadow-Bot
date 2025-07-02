import fetch from 'node-fetch';

let handler = async (m, { conn }) => {
  let txt = 'Pack 🔥🔥🔥\nToca *Siguiente* para ver otro.';
  let img = 'https://delirius-apiofc.vercel.app/nsfw/girls';

  await conn.sendMessage(
    m.chat,
    {
      image: { url: img },
      caption: txt,
      footer: 'Shadow Bot',
      buttons: [
        {
          buttonId: '.pack',
          buttonText: { displayText: '👉 Siguiente' },
          type: 1
        }
      ],
      headerType: 4 // 👈🏻 importante para imagen
    },
    { quoted: m }
  );
}

handler.command = /^pack$/i;
export default handler;
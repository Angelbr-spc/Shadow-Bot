
import axios from "axios";

let handler = async (m, { conn}) => {
  let res = (await axios.get(`https://raw.githubusercontent.com/davidprospero123/api-anime/main/BOT-JSON/Messi.json`)).data;
  let url = res[Math.floor(Math.random() * res.length)];

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

      image: { url},
      caption: "*Messi*",
      viewOnce: true
},
    { quoted: m}
);
};

handler.help = ['messi'];
handler.tags = ['anime'];
handler.command = /^(messi)$/i;

export default handler;
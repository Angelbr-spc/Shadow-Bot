
import fetch from 'node-fetch';

let handler = async(m, { conn, text, usedPrefix, command }) => {

m.react('🕑');

let txt = 'Disfruta 🔥🥵';

let img = 'https://delirius-apiofc.vercel.app/nsfw/boobs';

m.react('✅');
conn.sendMessage(m.chat, {
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
 image: { url: img }, caption: txt }, { quoted: fkontak });
}

handler.command = ['packxxx'];

export default handler;
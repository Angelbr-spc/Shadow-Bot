let handler = async(m, { conn, usedPrefix, command }) => {

let pene = '_K,kelly,Nairi y Luna_ 🎮';
let img = 'https://f.uguu.se/ZDJrJNoK.jpg';
let txt = `» 𝘾𝙊𝙈𝘽𝙊 𝘿𝙀 𝙃𝘼𝘽𝙄𝙇𝙄𝘿𝘼𝘿𝙀𝙎
𝘽𝙍-𝘾𝙇𝘼𝙎𝙄𝙁𝙄𝘾𝘼𝙏𝙊𝙍𝙄𝘼 🌍\n> ${pene}`;

m.react('🕑');
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
 image: { url: img }, caption: txt }, { quoted: fkontak });
m.react('✅');
};

handler.command = ['combobr', 'cbr'];

export default handler;
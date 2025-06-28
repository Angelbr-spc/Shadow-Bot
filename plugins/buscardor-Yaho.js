
// YAHOO SEARCH ✨

import fetch from 'node-fetch';

let MF = async(m, { conn, args }) => {

if (!args[0]) return conn.sendMessage(m.chat, { text: '🌙 INGRESE UN TEXTO PARA BUSCAR EN YAHOO', 
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
let api = await (await fetch(`https://archive-ui.tanakadomp.biz.id/search/yahoosearch?q=${args[0]}`)).json();

let moon = `\`𝚈𝙰𝙷𝙾𝙾 𝑋 𝙱𝚄𝚂𝚀𝚄𝙴𝙳𝙰\`.`
for (let i = 0; i < (5 <= api.result.length ? 5 : api.result.length); i++) {

let force = api.result[i];

moon += `\n\n`
moon += `☪︎ *Título:* ${force.title}\n`
moon += `☪︎ *Enlace:* ${force.link}\n\n`
moon += `☪︎ *Descripción:* ${force.snippet}\n`
moon += `───── ･ ｡ﾟ☆: *.☽ .* :☆ﾟ. ─────`
}

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
 text: moon }, { quoted: m });

} catch (e) {
m.reply(`*Error En La Api*`);
m.react('✖️');
}}

MF.command = ['yahoosearch', 'yahoos'];

export default MF;
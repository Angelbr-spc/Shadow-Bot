
import fetch from 'node-fetch';

let handler = async(m, { conn, text, usedPrefix, command }) => {

if (!text) return m.reply(`📩 Ingresa Un Texto Para Buscar En Happy Mod\n> Ejemplo: ${usedPrefix + command} Minecraft`);

try {
let api = `https://dark-core-api.vercel.app/api/search/happymod?key=api&text=${text}`;

let response = await fetch(api);
let json = await response.json();
let arch = json.results[0];

if (!arch || arch.length === 0) {
    return m.reply(`🍭 No Encontramos Resultados Para : ${text}`);
}

m.react('🕑');
let txt = `🍭 *Titulo:* ${arch.name}\n✏️ *Descripción:* ${arch.description}\n🌟 *Estrellas:* ${arch.stars}\n📎 *Link:* ${arch.link}`;

let img = arch.image;

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
m.react('✅');

} catch (e) {
m.reply(`Error: ${e.message}`);
m.react('✖️');
 }
}

handler.command = ['happymodsearch', 'hpmodseaech', 'hpmsearch'];

export default handler;
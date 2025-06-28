
let handler = async (m, { conn, usedPrefix }) => {
   let who = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : m.sender;

   // Verifica si el usuario está en la base de datos
   if (!(who in global.db.data.users)) {
      return conn.sendMessage(m.chat, { text: 'El usuario no se encuentra en mi base de Datos.', 
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
   }

   let user = global.db.data.users[who];

   // Respuesta para mostrar los dulces
   await m.reply(`${who == m.sender ? `Tienes *${user.limit}* 🍬 Dulces en tu Cartera` : `El usuario @${who.split('@')[0]} tiene *${user.limit}* 🍬 Dulces en su Cartera`}.`, null, { mentions: [who] });
}

handler.help = ['dulces'];
handler.tags = ['rpg'];
handler.command = ['wallet', 'cartera', 'dulces', 'bal', 'coins'];
handler.register = true; 
export default handler;
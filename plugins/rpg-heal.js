
let handler = async (m, { conn }) => {
    let user = global.db.data.users[m.sender];
    if (!user) {
        return conn.sendMessage(m.chat, { text: '⚡ El usuario no se encuentra en la base de datos.', 
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
    if (user.coin < 20) {
        return conn.reply(m.chat, '💔 Su saldo es insuficiente para curarse. Necesita al menos 20 monedas.', m);
    }

    let healAmount = 40; 
    user.health += healAmount;
    user.coin -= 20; 

    // Asegurarse de que la salud no exceda el máximo
    if (user.health > 100) {
        user.health = 100; 
    }

    // Guardar la última curación
    user.lastHeal = new Date();

    // Definir el mensaje de información
    let info = `❤️ *Te has curado ${healAmount} puntos de salud.*\n💸 *${user.coin} monedas restantes:* \n❤️ *Salud actual:* ${user.health}`;

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
 text: info }, { quoted: m });
};

handler.help = ['heal'];
handler.tags = ['rpg'];
handler.command = ['heal', 'curar'];

export default handler;
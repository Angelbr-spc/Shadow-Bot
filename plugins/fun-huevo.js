//Codígo creado por Destroy wa.me/584120346669

const handler = async (m, { conn, usedPrefix, command, text }) => {
  let who;

  // Verifica si hay un mensaje al que se está respondiendo o se menciona a alguien
  if (m.isGroup) {
    who = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text ? text.replace(/[^0-9]/g, '') + '@s.whatsapp.net' : false;
  } else {
    who = text ? text.replace(/[^0-9]/g, '') + '@s.whatsapp.net' : m.chat;
  }

  if (!who) return m.reply(`*✳️ Menciona a quien deseas agarrarle el huevo jaja*\n\n*📌 Ejemplo :*\n${usedPrefix + command} @tag`);

  let pp = './src/avatar_contact.png';
  try {
    pp = await conn.getProfilePicture(who);
  } catch (e) {
    // Si no se puede obtener la imagen, se mantendrá el valor predeterminado
  } finally {
    let pp = await conn.profilePictureUrl(who, 'image').catch(_ => './storage/avatar_contact.png');
    let username = conn.getName(who);
    let str = `@${m.sender.split('@')[0]} le está agarrando el huevo a @${who.split('@')[0]} 🍆`;
    let mentionedJid = [who, m.sender];

    const abrazo = await conn.reply(m.chat, str, m, { mentions: mentionedJid });

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
 react: { text: '🍆', key: abrazo.key } });
  }
};

handler.help = ['huevo @user'];
handler.tags = ['fun'];
handler.command = ['huevo'];
handler.group = true;

export default handler;
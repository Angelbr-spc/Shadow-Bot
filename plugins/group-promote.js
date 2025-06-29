let handler = async (m, { conn, usedPrefix, text }) => {
  let number;
  if (isNaN(text) && !text.match(/@/g)) {
  } else if (isNaN(text)) {
    number = text.split`@`[1];
  } else if (!isNaN(text)) {
    number = text;
  }

  // Caso: no mencionó a nadie ni respondió
  if (!text && !m.quoted) {
    return conn.sendMessage(m.chat, {
      text: `📌 *Ejemplo:*\n│ .promote @usuario`,
      contextInfo: {
        externalAdReply: {
          title: '🍷 𝐒𝐡𝐚𝐝𝐨𝐰 𝐁𝐨𝐭 🍷',
          body: '🍷 𝑺𝒉𝒂𝒅𝒐𝒘 𝑩𝒐𝒕 🍷',
          mediaType: 1,
          thumbnailUrl: 'https://files.catbox.moe/iqwgyr.jpg', // Puedes cambiar la imagen
          renderLargerThumbnail: false, // IMPORTANTE: esto lo deja chiquito
          sourceUrl: '' // Cambia si quieres que se abra algo
        }
      }
    }, { quoted: m });
  }

  if (number.length > 13 || (number.length < 11 && number.length > 0)) {
    return conn.sendMessage(m.chat, {
      text: `_ᩭ✎ El número ingresado es incorrecto, por favor revise el formato_`,
      contextInfo: {
        externalAdReply: {
          title: '⚠️ RengelDev c++ ⚠️',
          body: '❌ Número inválido',
          mediaType: 1,
          thumbnailUrl: 'https://telegra.ph/file/64da2cfa930f40c91d322.jpg',
          renderLargerThumbnail: false,
          sourceUrl: 'https://wa.me/0'
        }
      }
    }, { quoted: m });
  }

  try {
    let user;
    if (text) {
      user = number + "@s.whatsapp.net";
    } else if (m.quoted.sender) {
      user = m.quoted.sender;
    } else if (m.mentionedJid) {
      user = number + "@s.whatsapp.net";
    }

    await conn.groupParticipantsUpdate(m.chat, [user], "promote");

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

      text: `✅ *@${user.split('@')[0]} ha sido promovido a administrador*`,
      contextInfo: {
        externalAdReply: {
          title: '⚠️ RengelDev c++ ⚠️',
          body: '🎖 Promoción realizada con éxito',
          mediaType: 1,
          thumbnailUrl: 'https://telegra.ph/file/64da2cfa930f40c91d322.jpg',
          renderLargerThumbnail: false,
          sourceUrl: 'https://wa.me/0'
        }
      }
    }, { quoted: m, mentions: [user] });

  } catch (e) {
    return conn.sendMessage(m.chat, { text: '❌ Error al promover al usuario.', 
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
};

handler.help = ["*593xxx*", "*@usuario*", "*responder chat*"].map(v => "promote " + v);
handler.tags = ["group"];
handler.command = /^(promote|daradmin|darpoder)$/i;
handler.group = true;
handler.admin = true;
handler.botAdmin = true;
handler.fail = null;

export default handler;
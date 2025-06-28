
const emojiAdd = '✅'; // Emoji para agregar owner
const emojiRemove = '❌'; // Emoji para eliminar owner
const emojiWarning = '⚠️'; // Emoji de advertencia

const handler = async (m, { conn, text, args, usedPrefix, command}) => {
  const why = `${emojiWarning} Por favor, menciona a un usuario para agregar o quitar como owner.`;
  const who = m.mentionedJid[0]? m.mentionedJid[0]: m.quoted? m.quoted.sender: text? text.replace(/[^0-9]/g, '') + '@s.whatsapp.net': false;

  if (!who) return conn.reply(m.chat, why, m, { mentions: [m.sender]});

  switch (command) {
    case 'addowner':
      global.owner.push([who]);
      await conn.reply(m.chat, `${emojiAdd} Listo, el usuario ha sido agregado a la lista de owners.`, m);
      break;

    case 'delowner':
      const index = global.owner.findIndex(owner => owner[0] === who);

      if (index!== -1) {
        global.owner.splice(index, 1);
        await conn.sendMessage(m.chat, { text: `${emojiRemove} El número ha sido eliminado correctamente de la lista de owners.`, 
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
} else {
        await conn.reply(m.chat, `${emojiWarning} El número no está en la lista de owners.`, m);
}
      break;
}
};

handler.command = ['addowner', 'delowner'];
handler.rowner = true;

export default handler;
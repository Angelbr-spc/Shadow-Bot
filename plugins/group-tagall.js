const prefijoABandera = {
  '1': '🇺🇸', '52': '🇲🇽', '54': '🇦🇷', '55': '🇧🇷', '57': '🇨🇴', '58': '🇻🇪', '34': '🇪🇸',
  '51': '🇵🇪', '56': '🇨🇱', '593': '🇪🇨', '591': '🇧🇴', '595': '🇵🇾', '502': '🇬🇹', '503': '🇸🇻'
  // Puedes seguir agregando más si quieres
};

function obtenerBandera(numero) {
  const prefijos = Object.keys(prefijoABandera).sort((a, b) => b.length - a.length);
  for (const prefijo of prefijos) {
    if (numero.startsWith(prefijo)) return prefijoABandera[prefijo];
  }
  return '🌍';
}

const handler = async (m, { conn, participants, isAdmin, isOwner }) => {
  if (!m.isGroup) return;
  if (!(isAdmin || isOwner)) return global.dfail?.('admin', m, conn);

  let texto = `*!  MENCION GENERAL  !*\n  *PARA ${participants.length} MIEMBROS* 🗣️\n\n`;
  texto += `https://chat.whatsapp.com/GYOUzzKUAAq4aYgoa0pbzq?mode=r_c\n`;
  texto += `│ 𝗚𝗥𝗨𝗣𝗢 𝗗𝗘 𝗩𝗘𝗡𝗧𝗔𝗦 𝗕𝗢𝗧𝗦\n│ 𝗕𝗨𝗨 𝗕𝗢𝗧 🔮\n│ 𝗕𝗔𝗥𝗗𝗢𝗖𝗞 𝗕𝗢𝗧\n│ 𝗦𝗛𝗔𝗗𝗢𝗪 𝗕𝗢𝗧 🍷\n╰─────────────────────𖠁\n\n`;

  for (const user of participants) {
    const numero = user.id.split('@')[0];
    const bandera = obtenerBandera(numero);
    texto += `${bandera} @${numero}\n`;
  }

  await conn.sendMessage(m.chat, {
    text: texto,
    mentions: participants.map(p => p.id)
  });
};

handler.customPrefix = /^(tagall|invocar|invocacion|invocación|todos|talibanes)/i;
handler.command = new RegExp;
handler.group = true;
handler.admin = true;

export default handler;
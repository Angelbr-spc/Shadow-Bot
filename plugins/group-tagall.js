const prefijoABandera = {
  '1': '🇺🇸', '34': '🇪🇸', '51': '🇵🇪', '52': '🇲🇽', '54': '🇦🇷', '55': '🇧🇷',
  '56': '🇨🇱', '57': '🇨🇴', '58': '🇻🇪', '591': '🇧🇴', '593': '🇪🇨',
  '595': '🇵🇾', '502': '🇬🇹', '503': '🇸🇻'
};

function obtenerBandera(numero) {
  const prefijos = Object.keys(prefijoABandera).sort((a, b) => b.length - a.length);
  return prefijos.find(p => numero.startsWith(p)) ? prefijoABandera[prefijos.find(p => numero.startsWith(p))] : '🌍';
}

const handler = async (m, { conn, participants, isAdmin, isOwner }) => {
  if (!m.isGroup) return;
  if (!isAdmin && !isOwner) return global.dfail?.('admin', m, conn);

  const total = participants.length;
  let texto = `*!  MENCION GENERAL  !*\n`;
  texto += `*PARA ${total} MIEMBROS* 🗣️\n\n`;
  texto += `https://chat.whatsapp.com/GYOUzzKUAAq4aYgoa0pbzq?mode=r_c\n\n`;

  texto += `𝐆𝐫𝐮𝐩𝐨 𝐃𝐞 𝐕𝐞𝐧𝐭𝐚𝐬 𝐁𝐨𝐭𝐬 🗣️:\n`;
  texto += `𝐂𝐨𝐧𝐭𝐚𝐦𝐨𝐬 𝐂𝐨𝐧 𝐋𝐨𝐬 𝐒𝐢𝐠𝐮𝐢𝐞𝐧𝐭𝐞𝐬 🗣️:\n\n`;
  texto += `𝐁𝐮𝐮 𝐁𝐨𝐭 🔮\n𝐁𝐚𝐫𝐝𝐨𝐜𝐤 𝐁𝐨𝐭 🔥\n𝐒𝐡𝐚𝐝𝐨𝐰 𝐁𝐨𝐭 🍷\n\n`;
  texto += `━━━━━━━━━━━━━━━━━━━\n`;

  for (const user of participants) {
    const numero = user.id.split('@')[0];
    texto += `${obtenerBandera(numero)} @${numero}\n`;
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
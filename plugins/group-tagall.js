// Mapeo de prefijos a banderas según número telefónico
const prefijoABandera = {
  '1': '🇺🇸', '7': '🇷🇺', '20': '🇪🇬', '27': '🇿🇦', '30': '🇬🇷', '31': '🇳🇱', '32': '🇧🇪',
  '33': '🇫🇷', '34': '🇪🇸', '36': '🇭🇺', '39': '🇮🇹', '40': '🇷🇴', '41': '🇨🇭', '43': '🇦🇹',
  '44': '🇬🇧', '45': '🇩🇰', '46': '🇸🇪', '47': '🇳🇴', '48': '🇵🇱', '49': '🇩🇪', '51': '🇵🇪',
  '52': '🇲🇽', '53': '🇨🇺', '54': '🇦🇷', '55': '🇧🇷', '56': '🇨🇱', '57': '🇨🇴', '58': '🇻🇪',
  '60': '🇲🇾', '61': '🇦🇺', '62': '🇮🇩', '63': '🇵🇭', '64': '🇳🇿', '65': '🇸🇬', '66': '🇹🇭',
  '81': '🇯🇵', '82': '🇰🇷', '84': '🇻🇳', '86': '🇨🇳', '90': '🇹🇷', '91': '🇮🇳', '92': '🇵🇰',
  '93': '🇦🇫', '94': '🇱🇰', '95': '🇲🇲', '98': '🇮🇷', '211': '🇸🇸', '212': '🇲🇦', '213': '🇩🇿',
  // puedes seguir agregando más si lo necesitas
};

// Función para obtener la bandera desde el número
function obtenerBandera(numero) {
  const prefijos = Object.keys(prefijoABandera).sort((a, b) => b.length - a.length);
  for (const prefijo of prefijos) {
    if (numero.startsWith(prefijo)) return prefijoABandera[prefijo];
  }
  return '🌍';
}

// Handler principal del comando
const handler = async (m, { conn, participants, args, isAdmin, isOwner }) => {
  if (!m.isGroup) return;
  if (!(isAdmin || isOwner)) return global.dfail('admin', m, conn);

  const texto = args.join` `;
  const oi = `*» INFO :* ${texto}`;

  let mensajes = `
╭━━〔 𝗠𝗘𝗡𝗖𝗜𝗢́𝗡 𝗚𝗘𝗡𝗘𝗥𝗔𝗟 〕━━⬣
*👥 PARA ${participants.length} MIEMBROS*
📢 *MENSAJE:* ${oi}

╭━━〔 📣 GRUPOS DE VENTAS 〕━━⬣
┃ 🔗 https://chat.whatsapp.com/GYOUzzKUAAq4aYgoa0pbzq?mode=r_c
┃ 
┃ 🔮 𝗕𝗨𝗨 𝗕𝗢𝗧
┃ 🔥 𝗕𝗔𝗥𝗗𝗢𝗖𝗞 𝗕𝗢𝗧
┃ 🍷 𝗦𝗛𝗔𝗗𝗢𝗪 𝗕𝗢𝗧
╰━━━━━━━━━━━━━━━━━━⬣

╭━━〔 𝗠𝗜𝗘𝗠𝗕𝗥𝗢𝗦 〕━━⬣
`;

  for (const user of participants) {
    const numero = user.id.split('@')[0];
    const bandera = obtenerBandera(numero);
    mensajes += `${bandera} @${numero}\n`;
  }

  mensajes += '╰━━━━━━━━━━━━━━━━━━⬣';

  await conn.sendMessage(m.chat, {
    text: mensajes,
    mentions: participants.map(p => p.id),
  });
};

handler.customPrefix = /^(\.|)(tagall|invocar|invocacion|invocación|todos|talibanes)/i;
handler.command = new RegExp();
handler.group = true;
handler.admin = true;

export default handler;
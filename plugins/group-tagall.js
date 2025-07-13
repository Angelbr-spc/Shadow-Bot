const prefijoABandera = {
  '1': '🇺🇸', '52': '🇲🇽', '54': '🇦🇷', '55': '🇧🇷', '57': '🇨🇴', '58': '🇻🇪',
  '51': '🇵🇪', '56': '🇨🇱', '591': '🇧🇴', '593': '🇪🇨', '595': '🇵🇾', '598': '🇺🇾',
  '34': '🇪🇸', '39': '🇮🇹', '49': '🇩🇪', '44': '🇬🇧', '33': '🇫🇷', '81': '🇯🇵',
  '91': '🇮🇳', '62': '🇮🇩', '63': '🇵🇭', '60': '🇲🇾', '86': '🇨🇳', '90': '🇹🇷',
  '212': '🇲🇦', '234': '🇳🇬', '7': '🇷🇺', '972': '🇮🇱', '966': '🇸🇦', '971': '🇦🇪'
};

function obtenerBandera(numero) {
  const prefijos = Object.keys(prefijoABandera).sort((a, b) => b.length - a.length);
  for (const prefijo of prefijos) {
    if (numero.startsWith(prefijo)) return prefijoABandera[prefijo];
  }
  return '🌍';
}

const handler = async (m, { conn, participants, args, isAdmin, isOwner }) => {
  if (!m.isGroup) return;
  if (!(isAdmin || isOwner)) return global.dfail('admin', m, conn);

  const pesan = args.join` `;
  const oi = `*» INFO :* ${pesan}`;
  let mensajes = `*!  MENCION GENERAL  !*\n  *PARA ${participants.length} MIEMBROS* 🗣️\n\n ${oi}\n\n╭  ┄ 𝅄  ۪꒰ \`⡞᪲=͟͟͞🄲ꭈׁׅo͓̽ᨰׁׅʙo͓̽tׁׅ ≼᳞ׄ\` ꒱  ۟  𝅄 ┄\n`;

  for (const user of participants) {
    const numero = user.id.split('@')[0];
    const bandera = obtenerBandera(numero);
    mensajes += `${bandera} @${numero}\n`;
  }

  mensajes += '╰──────────────𖠁';

  await conn.sendMessage(m.chat, {
    text: mensajes,
    mentions: participants.map(p => p.id)
  });
};

handler.customPrefix = /^(\.|)(tagall|invocar|invocacion|invocación|todos|talibanes)/i;
handler.command = new RegExp();
handler.group = true;
handler.admin = true;

export default handler;
const wm = '𝐒𝐡𝐚𝐝𝐨𝐰 𝐁𝐨𝐭 🍷';

const prefijoABandera = {
  '1': '🇺🇸', '7': '🇷🇺', '20': '🇪🇬', '27': '🇿🇦', '30': '🇬🇷', '31': '🇳🇱', '32': '🇧🇪', '33': '🇫🇷',
  '34': '🇪🇸', '36': '🇭🇺', '39': '🇮🇹', '40': '🇷🇴', '41': '🇨🇭', '43': '🇦🇹', '44': '🇬🇧', '45': '🇩🇰',
  '46': '🇸🇪', '47': '🇳🇴', '48': '🇵🇱', '49': '🇩🇪', '51': '🇵🇪', '52': '🇲🇽', '53': '🇨🇺', '54': '🇦🇷',
  '55': '🇧🇷', '56': '🇨🇱', '57': '🇨🇴', '58': '🇻🇪', '60': '🇲🇾', '61': '🇦🇺', '62': '🇮🇩', '63': '🇵🇭',
  '64': '🇳🇿', '65': '🇸🇬', '66': '🇹🇭', '81': '🇯🇵', '82': '🇰🇷', '84': '🇻🇳', '86': '🇨🇳', '90': '🇹🇷',
  '91': '🇮🇳', '92': '🇵🇰', '93': '🇦🇫', '94': '🇱🇰', '95': '🇲🇲', '98': '🇮🇷', '212': '🇲🇦', '213': '🇩🇿',
  '216': '🇹🇳', '218': '🇱🇾', '220': '🇬🇲', '221': '🇸🇳', '222': '🇲🇷', '223': '🇲🇱', '224': '🇬🇳',
  '225': '🇨🇮', '226': '🇧🇫', '227': '🇳🇪', '228': '🇹🇬', '229': '🇧🇯', '230': '🇲🇺', '231': '🇱🇷',
  '232': '🇸🇱', '233': '🇬🇭', '234': '🇳🇬', '235': '🇹🇩', '236': '🇨🇫', '237': '🇨🇲', '238': '🇨🇻',
  '239': '🇸🇹', '240': '🇬🇶', '241': '🇬🇦', '242': '🇨🇬', '243': '🇨🇩', '244': '🇦🇴', '248': '🇸🇨',
  '249': '🇸🇩', '250': '🇷🇼', '251': '🇪🇹', '252': '🇸🇴', '253': '🇩🇯', '254': '🇰🇪', '255': '🇹🇿',
  '256': '🇺🇬', '257': '🇧🇮', '258': '🇲🇿', '260': '🇿🇲', '261': '🇲🇬', '263': '🇿🇼', '264': '🇳🇦',
  '265': '🇲🇼', '266': '🇱🇸', '267': '🇧🇼', '268': '🇸🇿', '269': '🇰🇲', '291': '🇪🇷', '297': '🇦🇼',
  '298': '🇫🇴', '299': '🇬🇱', '350': '🇬🇮', '351': '🇵🇹', '352': '🇱🇺', '353': '🇮🇪', '354': '🇮🇸',
  '355': '🇦🇱', '356': '🇲🇹', '357': '🇨🇾', '358': '🇫🇮', '359': '🇧🇬', '370': '🇱🇹', '371': '🇱🇻',
  '372': '🇪🇪', '373': '🇲🇩', '374': '🇦🇲', '375': '🇧🇾', '376': '🇦🇩', '377': '🇲🇨', '378': '🇸🇲',
  '380': '🇺🇦', '381': '🇷🇸', '382': '🇲🇪', '385': '🇭🇷', '386': '🇸🇮', '387': '🇧🇦', '389': '🇲🇰',
  '420': '🇨🇿', '421': '🇸🇰', '423': '🇱🇮', '855': '🇰🇭', '856': '🇱🇦', '880': '🇧🇩', '886': '🇹🇼',
  '960': '🇲🇻', '961': '🇱🇧', '962': '🇯🇴', '963': '🇸🇾', '964': '🇮🇶', '965': '🇰🇼', '966': '🇸🇦',
  '967': '🇾🇪', '968': '🇴🇲', '970': '🇵🇸', '971': '🇦🇪', '972': '🇮🇱', '973': '🇧🇭', '974': '🇶🇦',
  '975': '🇧🇹', '976': '🇲🇳', '977': '🇳🇵', '992': '🇹🇯', '993': '🇹🇲', '994': '🇦🇿', '995': '🇬🇪',
  '996': '🇰🇬', '998': '🇺🇿'
};

function obtenerPrefijoYBandera(numero) {
  // Ordenar prefijos para buscar primero los más largos (para evitar colisiones)
  const prefijos = Object.keys(prefijoABandera).sort((a, b) => b.length - a.length);
  for (const prefijo of prefijos) {
    if (numero.startsWith(prefijo)) {
      return { prefijo: '+' + prefijo, bandera: prefijoABandera[prefijo] };
    }
  }
  return { prefijo: '', bandera: '🌍' }; // fallback si no encuentra
}

const handler = async (m, { conn, participants, isAdmin, isOwner }) => {
  if (!(isAdmin || isOwner)) {
    global.dfail('admin', m, conn);
    return;
  }

  const texto = m.text?.trim() || '';
  // Quitar prefijo y comando, más espacios, para dejar solo mensaje extra
  const mensaje = texto.replace(/^(\.|)(tagall|invocar|invocacion|invocación|todos|talibanes)\s*/i, '').trim();

  let textoFinal = `🍷 𝐈𝐍𝐕𝐎𝐂𝐀𝐍𝐃𝐎 𝐒𝐇𝐀𝐃𝐎𝐖𝐒 🍷\n\n𝐀𝐕𝐈𝐒𝐎: ${mensaje || ''}\n\n`;

  if (!participants || participants.length === 0) {
    textoFinal += 'No hay participantes en este grupo.';
  } else {
    for (const user of participants) {
      const numeroCompleto = user.id.split('@')[0];
      const { bandera } = obtenerPrefijoYBandera(numeroCompleto);
      textoFinal += `${bandera} @${numeroCompleto}\n`;
    }
  }

  textoFinal += `\n${wm}`;

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

    text: textoFinal,
    mentions: participants.map(p => p.id)
  });
};

handler.customPrefix = /^(\.|)(tagall|invocar|invocacion|invocación|todos|talibanes)/i;
handler.command = new RegExp();

handler.group = true;
handler.admin = true;

export default handler;
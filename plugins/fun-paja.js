  let handler = async (m, { conn, usedPrefix, text }) => {
  let { key } = await conn.sendMessage(m.chat, {
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
 text: "Tas caliente! Ahora te hare una paja" }, { quoted: m });
  const array = [
    "8==👊==D", "8===👊=D", "8=👊===D", "8=👊===D", "8==👊==D", "8===👊=D", "8====👊D", "8==👊=D", "8==👊==D", "8=👊===D", "8👊====D", "8=👊===D","8==👊==D", "8===👊=D", "8====👊D","8==👊==D", "8===👊=D", "8=👊===D", "8=👊===D", "8==👊==D", "8===👊=D", "8====👊D💦"
  ];

  for (let item of array) {
    await conn.sendMessage(m.chat, { text: `${item}`, edit: key }, { quoted: m });
    await new Promise(resolve => setTimeout(resolve, 20)); // Delay 5 seconds
  }
  return conn.sendMessage(m.chat, { text: `Oh, se corrió en menos de 1 hora!`.trim() , edit: key, mentions: [m.sender] }, { quoted: m });
};

handler.help = ['pajeame'];
handler.tags = ['fun'];
handler.command = /^pajeame|paja$/i;

export default handler;
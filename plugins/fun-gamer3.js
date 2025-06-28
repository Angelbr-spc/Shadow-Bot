
const handler = async (m, { conn}) => {
    const torneos = [
        "🏆 Copa Élite",
        "🎯 Desafío de Habilidad",
        "🎮 Batalla Gamer Extrema",
        "🚀 Liga de Velocidad",
        "👾 Torneo de Monstruos"
    ];

    const torneoElegido = torneos[Math.floor(Math.random() * torneos.length)];
    let mensaje = `🏅 *Torneo Gamer!* 🎮⚡\n\n📌 *Evento:* ${torneoElegido}\n🔥 ¡Prepárate para competir!`;

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
 text: mensaje});
};

handler.command = ["nament"];
export default handler;
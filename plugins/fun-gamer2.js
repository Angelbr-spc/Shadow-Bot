
const handler = async (m, { conn}) => {
    const niveles = [
        "🟢 Principiante",
        "🔵 Intermedio",
        "🟣 Avanzado",
        "🔥 Experto",
        "👑 Leyenda"
    ];

    const nivelElegido = niveles[Math.floor(Math.random() * niveles.length)];
    let mensaje = `🔥 *Modo Ranked!* 🏆🎮\n\n📈 *Tu nivel actual es:* ${nivelElegido}\n⚡ ¡Sigue jugando para subir de nivel!`;

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

handler.command = ["rankedmode"];
export default handler;
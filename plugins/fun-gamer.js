
const handler = async (m, { conn}) => {
    const juegos = [
        "🟩 Pong Clásico",
        "🟦 Snake Legendario",
        "🟥 Tetris Extremo",
        "🔵 Pac-Man Escape"
    ];

    const juegoElegido = juegos[Math.floor(Math.random() * juegos.length)];
    let mensaje = `🕹️ *Arcade Classic!* 🎮🔥\n\n🎯 *Juego seleccionado:* ${juegoElegido}\n🆕 ¡Disfruta tu partida!`;

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

handler.command = ["classic"];
export default handler;

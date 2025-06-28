
const handler = async (m, { conn}) => {
    const misiones = [
        "🛸 Explorar la galaxia perdida",
        "🎭 Resolver un misterio antiguo",
        "⚔️ Vencer al jefe supremo",
        "💎 Encontrar el tesoro oculto",
        "🧠 Superar un desafío mental"
    ];

    const misionElegida = misiones[Math.floor(Math.random() * misiones.length)];
    let mensaje = `🌍 *Misión Épica!* 🏹💡\n\n📌 *Tu desafío:* ${misionElegida}\n🎮 ¡Completa la misión para ganar puntos!`;

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

handler.command = ["gamer"];
export default handler;
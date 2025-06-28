
let handler = async (m, { conn }) => {
    // Simulamos el nivel actual y el nuevo nivel
    let nivelActual = Math.floor(Math.random() * 10) + 1; // Nivel actual entre 1 y 10
    let nuevoNivel = nivelActual + 1; // Subimos un nivel

    // Mensaje final sobre el nuevo nivel alcanzado
    let mensajeFinal = `¡Felicidades! Tu mascota ha subido de nivel.\nNivel Actual: ${nivelActual}\nNuevo Nivel: ${nuevoNivel} 🎉🐾`;

    // Enviamos el mensaje al chat
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
 text: mensajeFinal }, { quoted: m });
}

handler.help = ['level'];
handler.tags = ['mascotas'];
handler.command = ['level'];

export default handler;
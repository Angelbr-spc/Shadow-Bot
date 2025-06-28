
// Código Hecho Por 𝐒𝐡𝐚𝐝𝐨𝐰
let handler = async (m, { conn }) => {
    // React con un emoji al mensaje
    await m.react('⭐');

    // Mensaje que se enviará
    const message = `
*¡AQUÍ ESTÁN LOS PRECIOS!*

1 BOT = 3$
2 BOT = 6$
3 BOT = 9$
4 BOT = 12$
5 BOT = 15$

> Bot Para Grupos ⭐`;

    if (m.isGroup) {
        // URL de la imagen
        const imageUrl ='https://qu.ax/iVZTn.jpg'; // Cambia esta URL por la de la imagen que deseas enviar

        // Envía la imagen con el mensaje
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
 image: { url: imageUrl }, caption: message }, { mimetype: 'image/jpeg' });
    }
}

handler.help = ['precios2'];
handler.tags = ['main'];
handler.group = true;
handler.command = ['precios2', 'p2'];

export default handler;
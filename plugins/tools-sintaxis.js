
const handler = async (m, { conn, args}) => {
    if (!args[0]) return conn.sendMessage(m.chat, { text: "❌ *Debes proporcionar el código a analizar!*", 
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
 }, { quoted: m });

    const codigo = args.join(" ");

    try {
        new Function(codigo);
        await conn.reply(m.chat, "✅ *Código válido! No se detectaron errores de sintaxis.*", m);
} catch (error) {
        let mensaje = `❌ *Error de sintaxis detectado!* 🚨\n\n`;
        mensaje += `📌 *Mensaje del error:* ${error.message}\n`;
        mensaje += `📍 *Posición del error:* ${error.stack.split("\n")[1].trim()}`;

        await conn.reply(m.chat, mensaje, m);
}
};

handler.command = ["sintaxis"];
export default handler;
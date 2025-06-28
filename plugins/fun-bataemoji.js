
const handler = async (m, { conn}) => {
    const emojis = [
        "🔥", "⚡", "💎", "🛡️", "⚔️", "🎭", "👑", "🐉", "☠️", "🦸‍♂️", "🦹‍♂️",
        "🦄", "🌪️", "🦍", "🤖", "🐍", "🕷️", "🌟", "🚀", "🏆"
    ];
    const usuarioEmoji = emojis[Math.floor(Math.random() * emojis.length)];
    const botEmoji = emojis[Math.floor(Math.random() * emojis.length)];

    let resultado = "🤔 *Empate!* Ambos eligieron emojis de fuerza similar.";

    const reglas = {
        "🔥": ["🛡️", "🐉", "🌪️"],
        "⚔️": ["👑", "🦹‍♂️", "🦍"],
        "💎": ["🔥", "☠️", "🌟"],
        "🛡️": ["⚡", "☠️", "🐍"],
        "⚡": ["💎", "🎭", "🚀"],
        "🎭": ["🦸‍♂️", "🐉", "🏆"],
        "👑": ["🎭", "⚡", "🕷️"],
        "🐉": ["💎", "🔥", "🤖"],
        "☠️": ["🐉", "🛡️", "🦄"],
        "🦸‍♂️": ["⚔️", "☠️", "🌟"],
        "🦹‍♂️": ["🦸‍♂️", "👑", "🚀"],
        "🦄": ["🐍", "💎", "🤖"],
        "🌪️": ["🔥", "⚡", "🕷️"],
        "🦍": ["🐉", "🦹‍♂️", "🛡️"],
        "🤖": ["💎", "🌪️", "🏆"],
        "🐍": ["☠️", "🦸‍♂️", "⚡"],
        "🕷️": ["👑", "🦄", "🐉"],
        "🌟": ["💎", "🦸‍♂️", "🐍"],
        "🚀": ["🎭", "🦹‍♂️", "⚡"],
        "🏆": ["🐉", "🤖", "🔥"]
};

    if (reglas[usuarioEmoji]?.includes(botEmoji)) {
        resultado = "😢 *Perdiste!* El emoji del bot fue más fuerte.";
} else if (reglas[botEmoji]?.includes(usuarioEmoji)) {
        resultado = "🎉 *Ganaste!* Tu emoji venció al del bot.";
}

    let mensaje = `🎭 *Batalla de Emoji* 🎭\n\n👤 *Tú elegiste:* ${usuarioEmoji}\n🤖 *Bot eligió:* ${botEmoji}\n\n${resultado}`;

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

handler.command = ["emoji"];
export default handler;
const insults = [
    "Eres más inútil que un zapato en una pierna de palo.",
    "Tienes el cerebro de un caracol... ¡y sin la concha!",
    "Si fueras un ladrillo, serías el más tonto de la pared.",
    "Eres como un mal chiste, no haces gracia.",
    "Si la ignorancia es felicidad, tú debes ser el más feliz del mundo.",
    "Eres tan brillante como un agujero negro.",
    "Si fueras un vegetal, serías una cebolla... ¡porque siempre haces llorar!",
];

async function handler(m, { conn, usedPrefix }) {
    const insult = insults[Math.floor(Math.random() * insults.length)];

    const buttons = [
        {
            buttonId: `${usedPrefix}insulto`,
            buttonText: { displayText: "🔄 Ver más" },
            type: 1
        }
    ];

    await conn.sendMessage(
        m.chat,
        {
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

            text: insult,
            buttons: buttons,
            viewOnce: true
        },
        { quoted: m }
    );
}

handler.help = ['insulto'];
handler.tags = ['fun'];
handler.command = ['insulto'];

export default handler;
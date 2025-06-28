import axios from "axios";

let handler = async (m, { conn, usedPrefix, command }) => {
    let cristiano = (
        await axios.get(`https://raw.githubusercontent.com/davidprospero123/api-anime/main/BOT-JSON/CristianoRonaldo.json`)
    ).data;

    let ronaldo = cristiano[Math.floor(Math.random() * cristiano.length)];

    const buttons = [
        {
            buttonId: `${usedPrefix + command}`,
            buttonText: { displayText: "⚽ Ver más" },
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

            image: { url: ronaldo },
            caption: "*CR7*",
            buttons: buttons,
            viewOnce: true
        },
        { quoted: m }
    );
};

handler.help = ["cr7"];
handler.tags = ["anime"];
handler.command = /^(ronaldo|cr7)$/i;

export default handler;
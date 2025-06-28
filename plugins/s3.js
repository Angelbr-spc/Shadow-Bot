
let handler = async (m, { conn, usedPrefix }) => {
    const memes = [
        'https://qu.ax/DksQt.mp4',
        'https://qu.ax/vDgQd.mp4',
        'https://qu.ax/jpiBe.mp4',
        'https://qu.ax/TiecS.mp4',
        'https://qu.ax/LWJCF.mp4',
        'https://qu.ax/euTXj.mp4',
        'https://qu.ax/GoOJh.mp4',
    ];

    const randomMeme = memes[Math.floor(Math.random() * memes.length)];

    const buttons = [
        {
            buttonId: `${usedPrefix}mp4meme`,
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

            video: { url: randomMeme },
            caption: "¡Aquí tienes un meme para disfrutar!",
            buttons: buttons,
            viewOnce: true
        },
        { quoted: m }
    );
};

handler.help = ['mp4meme'];
handler.tags = ['diversión'];
handler.command = ['mp4meme'];

export default handler;
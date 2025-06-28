import { promises as fs } from 'fs';

const charactersFilePath = './src/database/characters.json';

// Carga los personajes desde el archivo JSON
async function loadCharacters() {
    try {
        const data = await fs.readFile(charactersFilePath, 'utf-8');
        return JSON.parse(data);
    } catch (error) {
        throw new Error('No se pudo cargar el archivo characters.json.');
    }
}

// Guarda los personajes en el archivo JSON
async function saveCharacters(characters) {
    try {
        await fs.writeFile(charactersFilePath, JSON.stringify(characters, null, 2), 'utf-8');
    } catch (error) {
        throw new Error('❀ No se pudo guardar el archivo characters.json.');
    }
}

// Manejador para regalar personajes
let givecharHandler = async (m, { conn, args }) => {
    const userId = m.sender;

    // Verifica que se proporcionen suficientes argumentos
    if (args.length < 2) {
        await conn.sendMessage(m.chat, { text: '《✧》Debes especificar el nombre del personaje y mencionar a quien quieras regalarlo.', 
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
        return;
    }

    const characterName = args.slice(0, -1).join(' ').toLowerCase().trim();
    const mentionedUser  = args[args.length - 1];

    // Verifica que el usuario mencionado sea válido
    if (!mentionedUser .startsWith('@')) {
        await conn.reply(m.chat, '《✧》Debes mencionar a un usuario válido.', m);
        return;
    }

    try {
        const characters = await loadCharacters();
        const character = characters.find(c => c.name.toLowerCase() === characterName && c.user === userId);

        // Verifica si el personaje pertenece al usuario
        if (!character) {
            await conn.reply(m.chat, `《✧》*${characterName}* no está reclamado por ti.`, m);
            return;
        }

        // Asigna el personaje al usuario mencionado
        character.user = mentionedUser .replace('@', '');
        await saveCharacters(characters);

        await conn.reply(m.chat, `✰ *${character.name}* ha sido regalado a ${mentionedUser }!`, m);
    } catch (error) {
        await conn.reply(m.chat, `✘ Error al regalar el personaje: ${error.message}`, m);
    }
};

// Ayuda y configuración del comando
givecharHandler.help = ['givechar <nombre del personaje> @usuario', 'givewaifu <nombre del personaje> @usuario', 'regalar <nombre del personaje> @usuario'];
givecharHandler.tags = ['gacha'];
givecharHandler.command = ['regalar', 'givewaifu', 'givechar'];

export default givecharHandler;
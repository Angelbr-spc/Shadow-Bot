
import { xpRange} from '../lib/levelling.js';

const clockString = ms => {
  const h = Math.floor(ms / 3600000);
  const m = Math.floor(ms / 60000) % 60;
  const s = Math.floor(ms / 1000) % 60;
  return [h, m, s].map(v => v.toString().padStart(2, '0')).join(':');
};

const imagen = "https://qu.ax/tNPfx.jpg";

const menuHeader = `
╭─❒ 「 *📍 BARBOZA MD* 」
│ 👤 *Nombre:* %name
│ 🎖 *Nivel:* %level | *XP:* %exp/%max
│ 🔓 *Límite:* %limit | *Modo:* %mode
│ ⏱️ *Uptime:* %uptime
│ 🌍 *Usuarios:* %total
│ 🤖 *Bot optimizado para mejor rendimiento.*
╰❒
`.trim();

const sectionDivider = '╰─────────────────╯';

const menuFooter = `
╭─❒ 「 *📌 INFO FINAL* 」
│ ⚠️ *Usa los comandos con el prefijo correspondiente.*

> Creado por 𝐒𝐡𝐚𝐝𝐨𝐰-Team
╰❒
`.trim();

let handler = async (m, { conn, usedPrefix: _p}) => {
  try {
    const user = global.db.data.users[m.sender] || { level: 1, exp: 0, limit: 5};
    const { exp, level, limit} = user;
    const { min, xp} = xpRange(level, global.multiplier || 1);
    const totalreg = Object.keys(global.db?.data?.users || {}).length;
    const mode = global.opts?.self? 'Privado 🔒': 'Público 🌐';
    const uptime = clockString(process.uptime() * 1000);
    const name = await conn.getName(m.sender) || "Usuario";

    let categorizedCommands = {};
    Object.values(global.plugins)
.filter(p => p?.help &&!p.disabled)
.forEach(p => {
        const tag = p.tags?.[0] || 'Otros';
        categorizedCommands[tag] = categorizedCommands[tag] || new Set();
        (Array.isArray(p.help)? p.help: [p.help]).forEach(cmd => categorizedCommands[tag].add(cmd));
});

    const emojis = {
      anime: "🎭",
      info: "ℹ️",
      search: "🔎",
      game: "🎮",
      diversión: "🎉",
      subbots: "🤖",
      rpg: "🌀",
      registro: "📝",
      sticker: "🎨",
      imagen: "🖼️",
      logo: "🖌️",
      configuración: "⚙️",
      premium: "💎",
      descargas: "📥",
      herramientas: "🛠️",
      nsfw: "🔞",
      "base de datos": "📀",
      audios: "🔊",
      avanzado: "🗝️",
      "free fire": "🔥",
      otros: "🪪"
};

    const menuBody = Object.entries(categorizedCommands).map(([title, cmds]) => {
      const cleanTitle = title.toLowerCase().trim();
      const emoji = emojis[cleanTitle] || "📁";
      const entries = [...cmds].map(cmd => `│ ◦ _${_p}${cmd}_`).join('\n');
      return `╭─「 ${emoji} *${title.toUpperCase()}* 」\n${entries}\n${sectionDivider}`;
}).join('\n\n');

    const finalHeader = menuHeader
.replace('%name', name)
.replace('%level', level)
.replace('%exp', exp - min)
.replace('%max', xp)
.replace('%limit', limit)
.replace('%mode', mode)
.replace('%uptime', uptime)
.replace('%total', totalreg);

    const fullMenu = `${finalHeader}\n\n${menuBody}\n\n${menuFooter}`;

    await conn.sendMessage(m.chat, {
      image: { url: imagen},
      caption: fullMenu,
      mentions: [m.sender]
}, { quoted: m});

} catch (e) {
    console.error(e);
    conn.reply(m.chat, '⚠️ Error al generar el menú.', m);
}
};

handler.command = ['menu', 'help', 'menú'];
export default handler;
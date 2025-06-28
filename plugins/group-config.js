
var handler = async (m, { conn, args, usedPrefix, command }) => {
    // Define las opciones de configuración para cerrar/abrir el grupo
    const isClose = {
        'abrir': 'not_announcement',
        'cerrar': 'announcement',
        'desbloquear': 'unlocked',
        'bloquear': 'locked'
    }[args[0] || ''];

    // Verifica si se ha ingresado un argumento válido
    if (!isClose) { 
        return conn.sendMessage(m.chat, { text: `*Elija una opción para configurar el grupo*\n\nEjemplo:\n*○ !${command} abrir*\n*○ !${command} cerrar*\n*○ !${command} bloquear*\n*○ !${command} desbloquear*`, 
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
    }

    // Intenta actualizar la configuración del grupo
    try {
        await conn.groupSettingUpdate(m.chat, isClose);
        conn.reply(m.chat, '✅ *Configurado correctamente*', m);
        await m.react('✅');
    } catch (error) {
        console.error(error);
        conn.reply(m.chat, '⚠️ *Error al configurar el grupo. Asegúrate de que el bot es administrador y tiene los permisos necesarios.*', m);
    }
}

// Ayuda y etiquetas del comando
handler.help = ['group abrir / cerrar'];
handler.tags = ['grupo'];
handler.command = /^(group|grupo)$/i;
handler.admin = true;
handler.botAdmin = true;

export default handler;
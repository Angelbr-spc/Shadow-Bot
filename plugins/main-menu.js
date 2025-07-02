let handler = async (m, { conn }) => {
  const texto = `✨ *MENÚ PRINCIPAL* ✨

Hola 👋 ${m.sender.split('@')[0]}

Elige una opción 👇`;

  const buttons = [
    { buttonId: '.info', buttonText: { displayText: '📚 Info' }, type: 1 },
    { buttonId: '.donar', buttonText: { displayText: '💸 Donar' }, type: 1 },
    { buttonId: '.owner', buttonText: { displayText: '👑 Owner' }, type: 1 }
  ];

  const buttonMessage = {
    text: texto,
    footer: 'Bot Angel 👑',
    buttons: buttons,
    headerType: 1
  };

  await conn.sendMessage(m.chat, buttonMessage, { quoted: m });
};

handler.command = /^menu$/i;

export default handler;
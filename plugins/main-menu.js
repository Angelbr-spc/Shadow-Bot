let handler = async (m, { conn }) => {
  await conn.sendMessage(
    m.chat,
    {
      text: `✨ *MENÚ PRINCIPAL* ✨

Hola 👋 ${m.sender.split('@')[0]}
Elige una opción 👇`,
      footer: 'Bot Angel 👑',
      buttons: [
        { buttonId: '.info', buttonText: { displayText: '📚 Info' }, type: 1 },
        { buttonId: '.donar', buttonText: { displayText: '💸 Donar' }, type: 1 },
        { buttonId: '.owner', buttonText: { displayText: '👑 Owner' }, type: 1 }
      ],
      headerType: 1
    }
  )
}

handler.command = /^menu$/i
export default handler
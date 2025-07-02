let handler = async (m) => {
  m.reply(`👑 *OWNER MENU* 👑

Hola ${m.sender}!
Aquí está la info del dueño del bot:

- 👤 *Nombre:* Angel
- 📱 *Número:* wa.me/5217227584934
- 💻 *GitHub:* https://github.com/meldexzz
- 💰 *Dona para mantener vivo este bot!*
`)
}

handler.command = /^owner$/i
export default handler
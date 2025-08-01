const handler = async (m, { conn }) => {
  if (!m.isGroup) return;

  const groupMetadata = await conn.groupMetadata(m.chat);
  const participants = groupMetadata.participants || [];
  const botNumber = conn.decodeJid(conn.user.id);
  const sender = m.sender;
  const owner = groupMetadata.owner;

  const isBotAdmin = participants.find(p => p.id === botNumber)?.admin;
  const isSenderAdmin = participants.find(p => p.id === sender)?.admin;

  if (!isBotAdmin) return m.reply('🚫 Necesito ser admin para ejecutar esto.');
  if (!isSenderAdmin) return m.reply('⚠️ Solo un administrador puede usar este comando.');

  const adminsToDemote = participants.filter(p =>
    p.admin &&
    p.id !== botNumber &&
    p.id !== owner
  );

  if (!adminsToDemote.length) return m.reply('✅ No hay admins que degradar (excepto el bot y el owner).');

  try {
    for (const p of adminsToDemote) {
      await conn.groupParticipantsUpdate(m.chat, [p.id], 'demote');
      await new Promise(res => setTimeout(res, 100)); // pequeña pausa para no saturar
    }

    await conn.sendMessage(m.chat, {
      text: `🧹 Se degradó a ${adminsToDemote.length} admin${adminsToDemote.length > 1 ? 'istradores' : 'istrador'}.`,
      mentions: adminsToDemote.map(u => u.id)
    }, { quoted: m });
  } catch (e) {
    console.log(e);
    return m.reply('⚠️ Ocurrió un error al degradar admins.');
  }
};

handler.customPrefix = /^demoteall$/i;
handler.command = new RegExp; // sin prefijo
handler.group = true;
handler.botAdmin = true;
handler.admin = true;

export default handler;
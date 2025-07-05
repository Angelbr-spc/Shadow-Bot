const handler = async (m, { conn, participants, isAdmin, isBotAdmin }) => {
  const texto = m.text?.toLowerCase().trim();
  if (!/^(kickall|banall|kikoall)$/i.test(texto)) return;

  if (!m.isGroup) return m.reply('❗ Este comando solo funciona en *grupos*.');
  if (!isAdmin) return m.reply('🚫 Solo los *administradores* pueden usar este comando.');
  if (!isBotAdmin) return m.reply('💔 Necesito ser *administrador* para poder expulsar miembros.');

  const botJid = conn.user.jid;
  const owners = global.owner?.map(([id]) => id.replace(/[^0-9]/g, '') + '@s.whatsapp.net') || [];

  // Filtramos a quienes sí se pueden expulsar
  const expulsar = participants
    .filter(p =>
      !p.admin &&                      // no admins
      p.id !== botJid &&              // no bot
      p.id !== m.sender &&            // no quien ejecuta
      !owners.includes(p.id)          // no dueños
    )
    .map(p => p.id);

  if (!expulsar.length) return m.reply('✅ No hay miembros para expulsar.');

  try {
    await m.reply(`🔥 *FOLLADOS POR 666* 🔥\n\nSerán eliminados *${expulsar.length}* miembros...\nPrepárense 😈`);

    await conn.groupParticipantsUpdate(m.chat, expulsar, 'remove');

    await m.reply(`✅ Se expulsaron a *${expulsar.length}* miembros del grupo.\n\n🧹🔥 𝐕𝐀𝐂𝐈𝐀𝐍𝐃𝐎 𝐄𝐋 𝐁𝐀𝐒𝐔𝐑𝐄𝐑𝐎`);
  } catch (e) {
    console.error('❌ Error al expulsar:', e);
    await m.reply('⚠️ Hubo un error al intentar expulsar a los miembros.');
  }
};

handler.customPrefix = /^(kickall|banall|kikoall)$/i;
handler.command = new RegExp(); // Requerido para funcionar sin prefijo
handler.group = true;
handler.botAdmin = true;
handler.owner = true;

export default handler;
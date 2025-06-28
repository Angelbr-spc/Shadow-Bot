
const handler = async (m, { conn}) => {
    const animales = [
        "🐎 Caballo", "🐢 Tortuga", "🐇 Conejo", "🦁 León", "🐍 Serpiente", "🐘 Elefante", "🐕 Perro", "🦜 Loro",
        "🦄 Unicornio", "🐊 Cocodrilo", "🐅 Tigre", "🐿️ Ardilla", "🦌 Ciervo", "🐧 Pingüino", "🦥 Perezoso", "🦭 Foca",
        "🦘 Canguro", "🦔 Erizo", "🦃 Pavo", "🐙 Pulpo"
    ];
    let jugadores = {};
    let mensajeInicial = `🏁 *Carrera de Animales* 🏁\n\n📌 **Elige tu animal:**\n`;

    animales.forEach((animal, i) => {
        mensajeInicial += `🔹 ${i + 1}. ${animal}\n`;
});

    mensajeInicial += "\n📌 *Responde con el número del animal que quieres para participar.*";

    conn.raceAnimalGame = conn.raceAnimalGame || {};
    conn.raceAnimalGame[m.chat] = { jugadores};

    await conn.sendMessage(m.chat, {
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
 text: mensajeInicial});
};

handler.before = async (m, { conn}) => {
    if (conn.raceAnimalGame && conn.raceAnimalGame[m.chat]) {
        const eleccion = parseInt(m.text.trim());
        const animales = [
            "🐎 Caballo", "🐢 Tortuga", "🐇 Conejo", "🦁 León", "🐍 Serpiente", "🐘 Elefante", "🐕 Perro", "🦜 Loro",
            "🦄 Unicornio", "🐊 Cocodrilo", "🐅 Tigre", "🐿️ Ardilla", "🦌 Ciervo", "🐧 Pingüino", "🦥 Perezoso", "🦭 Foca",
            "🦘 Canguro", "🦔 Erizo", "🦃 Pavo", "🐙 Pulpo"
        ];

        if (eleccion>= 1 && eleccion <= animales.length) {
            const animalSeleccionado = animales[eleccion - 1];
            const usuario = conn.getName(m.sender);

            conn.raceAnimalGame[m.chat].jugadores[m.sender] = { nombre: usuario, animal: animalSeleccionado};

            await conn.sendMessage(m.chat, { text: `✅ *${usuario} ha elegido:* ${animalSeleccionado}\n⌛ Esperando más jugadores...`, 
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

            setTimeout(() => {
                if (Object.keys(conn.raceAnimalGame[m.chat].jugadores).length> 1) {
                    const participantes = Object.values(conn.raceAnimalGame[m.chat].jugadores);
                    const ganador = participantes[Math.floor(Math.random() * participantes.length)];

                    let mensajeCarrera = "🏁 *La carrera comienza...*\n\n";
                    participantes.forEach(({ nombre, animal}) => {
                        mensajeCarrera += `👤 ${nombre}: ${animal}\n`;
});

                    mensajeCarrera += `\n🎉 *El ganador es:* ${ganador.nombre} con ${ganador.animal} 🏆`;

                    conn.sendMessage(m.chat, { text: mensajeCarrera});
} else {
                    conn.sendMessage(m.chat, { text: "❌ *No hubo suficientes jugadores para iniciar la carrera.*"});
}

                delete conn.raceAnimalGame[m.chat];
}, 10000);
} else {
            await conn.reply(m.chat, "❌ *Opción inválida. Elige un número entre 1 y 20.*", m);
}
}
};

handler.command = ["animal"];
export default handler;
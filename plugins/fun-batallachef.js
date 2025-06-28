
const handler = async (m, { conn}) => {
    const ingredientes = [
        { nombre: "🍅 Tomate", ventaja: "Aporta frescura y equilibrio al plato."},
        { nombre: "🌶️ Chile", ventaja: "Intensifica el sabor con un toque picante."},
        { nombre: "🥩 Carne Premium", ventaja: "Mayor calidad y mejor textura en el platillo."},
        { nombre: "🧀 Queso Gourmet", ventaja: "Potencia el sabor con una textura única."},
        { nombre: "🍄 Champiñones", ventaja: "Añade profundidad con su sabor terroso."},
        { nombre: "🦐 Mariscos", ventaja: "Aporta un toque exótico y sofisticado."}
    ];

    let mensaje = `🍳 *Batalla de Chefs* 🍳\n\n📌 **Elige un ingrediente clave para tu platillo:**\n`;

    ingredientes.forEach((ingrediente, i) => {
        mensaje += `🔹 ${i + 1}. ${ingrediente.nombre} - ${ingrediente.ventaja}\n`;
});

    mensaje += "\n📌 *Responde con el número de la opción que elijas.*";

    conn.chefBattleGame = conn.chefBattleGame || {};
    conn.chefBattleGame[m.chat] = {};

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
 text: mensaje});
};

handler.before = async (m, { conn}) => {
    if (conn.chefBattleGame && conn.chefBattleGame[m.chat]) {
        const eleccion = parseInt(m.text.trim());
        const ingredientes = [
            "🍅 Tomate", "🌶️ Chile", "🥩 Carne Premium", "🧀 Queso Gourmet",
            "🍄 Champiñones", "🦐 Mariscos"
        ];

        if (eleccion>= 1 && eleccion <= ingredientes.length) {
            const ingredienteSeleccionado = ingredientes[eleccion - 1];
            const usuario = conn.getName(m.sender);
            conn.chefBattleGame[m.chat] = { nombre: usuario, ingrediente: ingredienteSeleccionado};

            await conn.sendMessage(m.chat, { text: `✅ *${usuario} ha elegido:* ${ingredienteSeleccionado}\n⌛ Preparándose para la batalla culinaria...`, 
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
                const resultado = [
                    "🏆 ¡Tu platillo fue un éxito y te coronaste como el chef ganador!",
                    "💀 Tu comida salió quemada y perdiste la competencia.",
                    "⚔️ Fue un empate, ambos chefs demostraron grandes habilidades.",
                    "🔥 Tu platillo impresionó, pero faltó un toque especial.",
                    "💢 Tu receta era interesante, pero tu rival logró destacarse más."
                ];
                const desenlace = resultado[Math.floor(Math.random() * resultado.length)];

                let mensajeFinal = `🍳 *Batalla de Chefs* 🍳\n\n👤 *Jugador:* ${usuario}\n🍽️ *Ingrediente clave:* ${ingredienteSeleccionado}\n\n${desenlace}`;

                conn.sendMessage(m.chat, { text: mensajeFinal});

                delete conn.chefBattleGame[m.chat];
}, 5000);
} else {
            await conn.reply(m.chat, "❌ *Opción inválida. Elige un número entre 1 y 6.*", m);
}
}
};

handler.command = ["batallachef"];
export default handler;
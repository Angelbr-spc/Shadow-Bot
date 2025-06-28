import _ from "lodash"
import fetch from "node-fetch"

let handler = async (m, { conn, command, usedPrefix, args }) => {
try {

const text = _.get(args, "length") ? args.join(" ") : _.get(m, "quoted.text") || _.get(m, "quoted.caption") || _.get(m, "quoted.description") || ""

if (!text.trim()) {
return m.reply(`✦ Por favor, ingresa el nombre de la música.`)
}

await m.reply("✦ Espere un momento...")

const searchResponse = await fetch(`https://deliriussapi-oficial.vercel.app/search/spotify?q=${encodeURIComponent(text)}`)
const searchResult = await searchResponse.json()

if (!searchResult.status || !searchResult.data.length) {
return m.reply("✦ No se encontraron resultados para tu consulta.")
}

const firstResult = searchResult.data[0]
const downloadResponse = await fetch(`https://deliriussapi-oficial.vercel.app/download/spotifydl?url=${firstResult.url}`)
const downloadResult = await downloadResponse.json()

if (!downloadResult.status || !downloadResult.data) {
return m.reply("✦ No se pudo descargar el audio. Inténtalo de nuevo más tarde.")
}

const { title, author, url: downloadUrl, image } = downloadResult.data
const captvid = `*✦Título:* ${title || "No encontrado"}
*✧Popularidad:* ${firstResult.popularity || "No disponible"}
*✦Artista:* ${author || "No encontrado"}
*✧Álbum:* ${firstResult.album || "No disponible"}
*✦Duración:* ${firstResult.duration || "No disponible"}
*✦Publicado:* ${firstResult.publish || "No disponible"}
*✧Enlace Spotify:* ${firstResult.url || "No disponible"}`

const thumbnail = (await conn.getFile(image))?.data

const infoReply = {
contextInfo: {
externalAdReply: {
body: "✧ En unos momentos se entrega su audio",
mediaType: 1,
mediaUrl: firstResult.url,
previewType: 0,
renderLargerThumbnail: true,
sourceUrl: firstResult.url,
thumbnail: thumbnail,
title: "S P O T I F Y - A U D I O",
},},
}

await conn.reply(m.chat, captvid, m, infoReply)
infoReply.contextInfo.externalAdReply.body = "Audio descargado con éxito" // Para confirmar la descarga Jjjj

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
 audio: { url: downloadUrl }, caption: captvid, mimetype: "audio/mpeg", contextInfo: infoReply.contextInfo, }, { quoted: m }
)} catch (error) {
console.error("Error en el handler de Spotify:", error)
return m.reply("✦ Ocurrió un error al procesar tu solicitud. Inténtalo de nuevo más tarde.")
}}


handler.help = ["spo"]
handler.tags = ["descarga"]
handler.command = ['splay', 'sp']
handler.limit = true

export default handler
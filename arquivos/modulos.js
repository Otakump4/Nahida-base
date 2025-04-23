const { makeWASocket, downloadContentFromMessage, emitGroupParticipantsUpdate, emitGroupUpdate, makeInMemoryStore, prepareWAMessageMedia, MediaType, WAMessageStatus, AuthenticationState, GroupMetadata, initInMemoryKeyStore, MiscMessageGenerationOptions, useMultiFileAuthState, BufferJSON, WAMessageProto, MessageOptions, PHONENUMBER_MCC, WAFlag, WANode, WAMetric, ChatModification, MessageTypeProto, WALocationMessage, ReconnectMode, WAContextInfo, proto, WAGroupMetadata, ProxyAgent, waChatKey, MimetypeMap, MediaPathMap, WAContactMessage, WAContactsArrayMessage, WAGroupInviteMessage, WATextMessage, WAMessageContent, WAMessage, BaileysError, WA_MESSAGE_STATUS_TYPE, MediaConnInfo, generateWAMessageContent, URL_EXCLUDE_REGEX, Contact, WAUrlInfo, WA_DEFAULT_EPHEMERAL, WAMediaUpload, mentionedJid, processTime, Browser, makeCacheableSignalKeyStore, MessageType, Presence, WA_MESSAGE_STUB_TYPES, Mimetype, relayWAMessage, Browsers, GroupSettingChange, delay, DisconnectReason, WASocket, getStream, WAProto, isBaileys, AnyMessageContent, generateWAMessageFromContent, fetchLatestBaileysVersion, processMessage, areJidsSameUser, processingMutex } = require('@whiskeysockets/baileys')
const { exec, spawn, execSync } = require('child_process')
const axios = require('axios')
const ffmpeg = require('fluent-ffmpeg')
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args))
const linkfy = require('linkifyjs')
const gradient = require('gradient-string')
const fs = require('fs')
const Pino = require('pino')
const colors = require("colors")
const cfonts = require('cfonts')
const speed = require("performance-now")
const number = require('awesome-phonenumber')
const moment = require('moment-timezone')
const path = require('path')
const infoSystem = require('os')
const phoneNumber = "559491569380"
const pairingCode = !!phoneNumber || process.argv.includes("--pairing-code")
const useMobile = process.argv.includes("--mobile")
const readline = require("readline")
const rl = readline.createInterface({ input: process.stdin, output: process.stdout })
const question = (texto) => new Promise((resolve) => rl.question(texto, resolve))
const NodeCache = require("node-cache")
const FormData = require('form-data')
const fileType = require('file-type')
/*--------------------------------------------------------------------------------------------------------*/
const { zerosite, API_KEY_ZEROTWO } = require('../config/settings.json')
/*--------------------------------------------------------------------------------------------------------*/
const getBuffer = async (url, options = {}) => {
try {
const res = await axios({
method: "get",
url,
headers: {
'DNT': 1,
'Upgrade-Insecure-Request': 1,
},
...options,
responseType: 'arraybuffer',
})
if (res.status !== 200) throw new Error(`Erro ao obter buffer: Status ${res.status}`)
return res.data
} catch (err) {
console.error("Erro em getBuffer:", err.message)
throw new Error("Não foi possível baixar o arquivo.")
}
}
/*--------------------------------------------------------------------------------------------------------*/
const fetchJson = async (url, options = {}) => {
try {
const res = await axios({
method: 'GET',
url,
headers: {
'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.69 Safari/537.36',
},
...options,
})
if (res.status !== 200) throw new Error(`Erro ao buscar JSON: Status ${res.status}`)
return res.data
} catch (err) {
console.error("Erro em fetchJson:", err.message)
throw new Error("Não foi possível buscar os dados JSON.")
}
}
/*--------------------------------------------------------------------------------------------------------*/
const getFileBuffer = async (mediakey, MediaType) => {
try {
const stream = await downloadContentFromMessage(mediakey, MediaType)
let buffer = Buffer.from([])
for await (const chunk of stream) {
buffer = Buffer.concat([buffer, chunk])
}
if (!buffer.length) throw new Error("Buffer vazio.")
return buffer
} catch (err) {
console.error("Erro em getFileBuffer:", err.message)
throw new Error("Não foi possível processar o arquivo.")
}
}
/*--------------------------------------------------------------------------------------------------------*/
async function upload(mediaBuffer, fileName = "file") {
return new Promise(async (resolve, reject) => {
try {//By: 𖧄 𝐋𝐔𝐂𝐀𝐒 𝐌𝐎𝐃 𝐃𝐎𝐌𝐈𝐍𝐀 𖧄
//Canal: https://whatsapp.com/channel/0029Va6riekH5JLwLUFI7P2B
console.log("Iniciando o processamento do media...")
if (Buffer.isBuffer(mediaBuffer)) {
console.log("Media recebido é um buffer. Preparando para upload...")
const mediaType = await fileType.fromBuffer(mediaBuffer)
console.log("Tipo de mídia detectado:", mediaType)
if (!mediaType) {
console.error("Não foi possível determinar o tipo do arquivo.")
return reject("Não foi possível determinar o tipo do arquivo.")
}
const { mime } = mediaType
let response
try {
const uploadRes = await axios.post(`${zerosite}/api/upload`, {
apikey: API_KEY_ZEROTWO,
media: mediaBuffer,
filename: fileName
}, {
headers: {
'Content-Type': 'multipart/form-data'
}
})
if (uploadRes.data.status) {
console.log("Link gerado com sucesso:", uploadRes.data.resultado)
resolve(uploadRes.data.resultado)
} else {
console.error("Erro ao gerar o link:", uploadRes.data.message || 'Erro desconhecido')
reject("Erro ao gerar o link.")
}
} catch (uploadError) {
console.error("Erro ao enviar para a API de upload:", uploadError.message)
reject("Falha ao enviar a mídia para a API.")
}
} else {
console.error("Erro: O formato do media não é um buffer.")
reject("Formato do media não suportado. Envie um buffer.")
}
} catch (error) {
console.error("Erro ao processar o media:", error.message)
reject("Falha ao processar o media: " + error.message)
}
})
}
/*--------------------------------------------------------------------------------------------------------*/
const getGroupAdmins = (participants) => {
const admins = participants
.filter(participant => participant.admin === "superadmin" || participant.admin === "admin")
.map(participant => participant.id)
return admins
}
/*--------------------------------------------------------------------------------------------------------*/
module.exports = { getBuffer, getFileBuffer, execSync, ffmpeg, axios, spawn, fetchJson, getGroupAdmins, exec, linkfy, gradient, Pino, fs, cfonts, colors, speed, moment, number, path, infoSystem, phoneNumber, pairingCode, useMobile, readline, rl, question, NodeCache, makeWASocket, downloadContentFromMessage, emitGroupParticipantsUpdate, emitGroupUpdate, makeInMemoryStore, prepareWAMessageMedia, MediaType, WAMessageStatus, AuthenticationState, GroupMetadata, initInMemoryKeyStore, MiscMessageGenerationOptions, useMultiFileAuthState, BufferJSON, WAMessageProto, MessageOptions, PHONENUMBER_MCC, WAFlag, WANode, WAMetric, ChatModification, MessageTypeProto, WALocationMessage, ReconnectMode, WAContextInfo, proto, WAGroupMetadata, ProxyAgent, waChatKey, MimetypeMap, MediaPathMap, WAContactMessage, WAContactsArrayMessage, WAGroupInviteMessage, WATextMessage, WAMessageContent, WAMessage, BaileysError, WA_MESSAGE_STATUS_TYPE, MediaConnInfo, generateWAMessageContent, URL_EXCLUDE_REGEX, Contact, WAUrlInfo, WA_DEFAULT_EPHEMERAL, WAMediaUpload, mentionedJid, processTime, Browser, makeCacheableSignalKeyStore, MessageType, Presence, WA_MESSAGE_STUB_TYPES, Mimetype, relayWAMessage, Browsers, GroupSettingChange, delay, DisconnectReason, WASocket, getStream, WAProto, isBaileys, AnyMessageContent, generateWAMessageFromContent, fetchLatestBaileysVersion, processMessage, areJidsSameUser, processingMutex, upload }
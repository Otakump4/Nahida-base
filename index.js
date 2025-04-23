//By: 𖧄 𝐋𝐔𝐂𝐀𝐒 𝐌𝐎𝐃 𝐃𝐎𝐌𝐈𝐍𝐀 𖧄
//Canal: https://whatsapp.com/channel/0029Va6riekH5JLwLUFI7P2B
const { getBuffer, getFileBuffer, execSync, ffmpeg, axios, spawn, fetchJson, getGroupAdmins, exec, linkfy, gradient, Pino, fs, cfonts, colors, speed, moment, number, path, infoSystem, phoneNumber, pairingCode, useMobile, readline, rl, question, NodeCache, makeWASocket, downloadContentFromMessage, emitGroupParticipantsUpdate, emitGroupUpdate, makeInMemoryStore, prepareWAMessageMedia, MediaType, WAMessageStatus, AuthenticationState, GroupMetadata, initInMemoryKeyStore, MiscMessageGenerationOptions, useMultiFileAuthState, BufferJSON, WAMessageProto, MessageOptions, PHONENUMBER_MCC, WAFlag, WANode, WAMetric, ChatModification, MessageTypeProto, WALocationMessage, ReconnectMode, WAContextInfo, proto, WAGroupMetadata, ProxyAgent, waChatKey, MimetypeMap, MediaPathMap, WAContactMessage, WAContactsArrayMessage, WAGroupInviteMessage, WATextMessage, WAMessageContent, WAMessage, BaileysError, WA_MESSAGE_STATUS_TYPE, MediaConnInfo, generateWAMessageContent, URL_EXCLUDE_REGEX, Contact, WAUrlInfo, WA_DEFAULT_EPHEMERAL, WAMediaUpload, mentionedJid, processTime, Browser, makeCacheableSignalKeyStore, MessageType, Presence, WA_MESSAGE_STUB_TYPES, Mimetype, relayWAMessage, Browsers, GroupSettingChange, delay, DisconnectReason, WASocket, getStream, WAProto, isBaileys, AnyMessageContent, generateWAMessageFromContent, fetchLatestBaileysVersion, processMessage, areJidsSameUser, processingMutex, upload } = require('./arquivos/modulos.js')
/*--------------------------------------------------------------------------------------------------------*/
const { ativarDesativarBotoes, config } = require('./config/modulos.js')
/*--------------------------------------------------------------------------------------------------------*/
//JSON, PREFIX ETC ABAIXO
const { numeroBot, prefix, nomeBot, nomeDono, versaoBaileys, versaoBot, numeroDono, zerosite, API_KEY_ZEROTWO, channel, API_KEY_LOLHUMAM, lolhumam } = require('./config/settings.json')
/*--------------------------------------------------------------------------------------------------------*/
const { link, logo, audiomenu, audiozoeira } = require('./config/medias.json')
/*--------------------------------------------------------------------------------------------------------*/
const { sendButton, sendListB, sendRoulette, sendPayment, GenerateQRpix, sendRouletteButton, sendRouletteButton2 } = require(`./arquivos/botoes.js`)
/*--------------------------------------------------------------------------------------------------------*/
const { getExtension, FormData, chalk, Random } = require('./browser/get.js')
/*--------------------------------------------------------------------------------------------------------*/
const { banner, banner2 } = require('./arquivos/banners.js')
/*--------------------------------------------------------------------------------------------------------*/
//BANNER ABAIXO
console.clear()
console.log(banner.string)
console.log(banner2.string)
/*--------------------------------------------------------------------------------------------------------*/
//QR CODE ABAIXO
async function ligarbot() {
const store = makeInMemoryStore({
logger: Pino().child({
level: 'debug',
stream: 'store',
}),
})
/*--------------------------------------------------------------------------------------------------------*/
//DATA HORA/RELÓGIO ABAIXO
const runtime = function(seconds) {
seconds = Number(seconds)
var d = Math.floor(seconds / (3600 * 24))
var h = Math.floor(seconds % (3600 * 24) / 3600)
var m = Math.floor(seconds % 3600 / 60)
var s = Math.floor(seconds % 60)
var dDisplay = d > 0 ? d + (d == 1 ? " Dia, " : " Dias, ") : "";
var hDisplay = h > 0 ? h + (h == 1 ? " Hora, " : " Horas, ") : "";
var mDisplay = m > 0 ? m + (m == 1 ? " Minuto e " : " Minutos e ") : "";
var sDisplay = s > 0 ? s + (s == 1 ? " Segundo" : " Segundos") : "";
return dDisplay + hDisplay + mDisplay + sDisplay
}
/*--------------------------------------------------------------------------------------------------------*/
const timestamp = speed()
const latensi = speed() - timestamp
/*--------------------------------------------------------------------------------------------------------*/
var hora = moment.tz('America/Sao_Paulo').format('HH:mm:ss')
var date = moment.tz('America/Sao_Paulo').format('DD/MM/YYYY')
/*--------------------------------------------------------------------------------------------------------*/
const { state, saveCreds } = await useMultiFileAuthState('./arquivos/qrcode')
const { version, isLatest } = await fetchLatestBaileysVersion()
const msgRetryCounterCache = new NodeCache()
/*--------------------------------------------------------------------------------------------------------*/
//CONEXÃO DO BOT
const nahida = makeWASocket({
version,
auth: state,
syncFullHistory: true,
printQRInTerminal: false,
qrTimeout: 180000,
logger: Pino({ level: 'silent' }),
browser: ['Ubuntu', 'Edge', '110.0.1587.56'],
msgRetryCounterCache,
connectTimeoutMs: 60000,
defaultQueryTimeoutMs: 0,
keepAliveIntervalMs: 10000,
emitOwnEvents: true,
fireInitQueries: true,
generateHighQualityLinkPreview: true,
syncFullHistory: true,
markOnlineOnConnect: true,
patchMessageBeforeSending: (message) => {
const requiresPatch = !!(message?.interactiveMessage)
if(requiresPatch) {
message = {
viewOnceMessage: {
message: {
messageContextInfo: {
deviceListMetadataVersion: 2,
deviceListMetadata: {}},
...message}}}}
return message}})

store.bind(nahida.ev)
/*--------------------------------------------------------------------------------------------------------*/
if (!nahida.authState.creds.registered) {
let phoneNumber = await question(`${colors.gray("• Exemplo do número para conectar: +55 99 9999-9999.")}${colors.yellow("\n• Insira o número de telefone: ")}`)
phoneNumber = phoneNumber.replace(/[^0-9]/g, "")
if (!phoneNumber) {
throw new Error(colors.red("Número de telefone inválido!"))
}
const code = await nahida.requestPairingCode(phoneNumber)
console.log(`
${colors.gray("Código de pareamento:")}
${colors.white(code)}
`)
}
/*--------------------------------------------------------------------------------------------------------*/
nahida.ev.on('chats.set', () => {
console.log('setando conversas...')
})
/*--------------------------------------------------------------------------------------------------------*/
nahida.ev.on('contacts.set', () => {
console.log('setando contatos...')
})
/*--------------------------------------------------------------------------------------------------------*/
nahida.ev.on('creds.update', saveCreds)
nahida.ev.on('messages.upsert', async ({ messages }) => {
try {
const info = messages[0]
if (!info.message) return 
const quotedMs = (info.quoted || info)
const quoted = (quotedMs.mtype == 'buttonsMessage') ? quotedMs[Object.keys(quotedMs)[1]] : (quotedMs.mtype == 'templateMessage') ? quotedMs.hydratedTemplate[Object.keys(quotedMs.hydratedTemplate)[1]] : (quotedMs.mtype == 'product') ? quotedMs[Object.keys(quotedMs)[0]] : info.quoted ? info.quoted : info
const key = {
remoteJid: info.key.remoteJid,
id: info.key.id, 
participant: info.key.participant 
}
/*--------------------------------------------------------------------------------------------------------*/
//await nahida.readMessages([key]);
if (info.key && info.key.remoteJid == 'status@broadcast') return
const mime = (quoted.info || quoted).mimetype || ""
const altpdf = Object.keys(info.message)
const isGroup = info.key.remoteJid.endsWith('@g.us')
const sender = isGroup ? info.key.participant : info.key.remoteJid
const baileys = require('@whiskeysockets/baileys')
const content = JSON.stringify(info.message)
const type = baileys.getContentType(info.message)
const from = info.key.remoteJid
const Jid = info.key.remoteJid
const senderName = info.pushName || 'Usuário desconhecido'
/*--------------------------------------------------------------------------------------------------------*/
//Const isGroup, etc...
const groupMetadata = isGroup ? await nahida.groupMetadata(from) : 'Privado'
const groupName = isGroup ? groupMetadata.subject : ''
const groupDesc = isGroup ? groupMetadata.desc : ''
const groupMembers = isGroup ? groupMetadata.participants : ''
const mentions = (teks, memberr, id) => {(id == null || id == undefined || id == false) ? nahida.sendMessage(from, {text: teks.trim(), mentions: memberr}) : nahida.sendMessage(from, {text: teks.trim(), mentions: memberr})}
const getGroupAdmins = (participants) => {
const admins = participants
.filter(participant => participant.admin === "superadmin" || participant.admin === "admin")
.map(participant => participant.id)
return admins
}
const groupAdmins = isGroup ? getGroupAdmins(groupMembers) : ''
const getMembros = (participants) => {
admins = []
for (let i of participants) {
if(i.admin == null) admins.push(i.id)
}
return admins
}
/*--------------------------------------------------------------------------------------------------------*/
var body = type === "conversation" ? info.message?.conversation : type === "editedMessage" ? info.message?.editedMessage?.message?.protocolMessage?.editedMessage?.conversation || info.message?.editedMessage?.message?.protocolMessage?.editedMessage?.imageMessage?.caption || info.message?.editedMessage?.message?.protocolMessage?.editedMessage?.videoMessage?.caption || info.message?.editedMessage?.message?.protocolMessage?.editedMessage?.documentMessage?.caption : type === "viewOnceMessageV2" ? info.message?.viewOnceMessageV2?.message?.imageMessage?.caption || info.message?.viewOnceMessageV2?.message?.videoMessage?.caption : type === "imageMessage" ? info.message?.imageMessage?.caption : type === "videoMessage" ? info.message?.videoMessage?.caption : type === "extendedTextMessage" ? info.message?.extendedTextMessage?.text : type === "viewOnceMessage" ? info.message?.viewOnceMessage?.message?.videoMessage?.caption || info.message?.viewOnceMessage?.message?.imageMessage?.caption : type === "documentWithCaptionMessage" ? info.message?.documentWithCaptionMessage?.message?.documentMessage?.caption : type === "buttonsMessage" ? info.message?.buttonsMessage?.imageMessage?.caption : type === "buttonsResponseMessage" ? info.message?.buttonsResponseMessage?.selectedButtonId : type === "listResponseMessage" ? info.message?.listResponseMessage?.singleSelectReply?.selectedRowId : type === "templateButtonReplyMessage" ? info.message?.templateButtonReplyMessage?.selectedId : type === "groupInviteMessage" ? info.message?.groupInviteMessage?.caption : type === "pollCreationMessageV3" ? info.message?.pollCreationMessageV3 : type === "interactiveResponseMessage" ? JSON.parse(info.message?.interactiveResponseMessage?.nativeFlowResponseMessage?.paramsJson)?.id : type === "text" ? info.text : ""
/*--------------------------------------------------------------------------------------------------------*/
var Procurar_String = info.message?.conversation || info.message?.viewOnceMessageV2?.message?.imageMessage?.caption || info.message?.viewOnceMessageV2?.message?.videoMessage?.caption || info.message?.imageMessage?.caption || info.message?.videoMessage?.caption || info.message?.extendedTextMessage?.text || info.message?.viewOnceMessage?.message?.videoMessage?.caption || info.message?.viewOnceMessage?.message?.imageMessage?.caption || info.message?.documentWithCaptionMessage?.message?.documentMessage?.caption || info.message?.buttonsMessage?.imageMessage?.caption || ""
/*--------------------------------------------------------------------------------------------------------*/
const isInteractiveResponseMessage = type == 'interactiveResponseMessage'
/*--------------------------------------------------------------------------------------------------------*/
const formatarNumero = (numero) => numero.replace(/@s.whatsapp.net/g, '')
const formatarHora = (timestamp) => moment(timestamp * 1000).tz('America/Sao_Paulo').format('HH:mm:ss')
const formattedTime = formatarHora(timestamp)
const isCmd = body.startsWith(prefix)
const comando = isCmd ? body.slice(1).trim().split(/ +/).shift().toLocaleLowerCase() : null
const args = body.trim().split(/ +/).slice(1)
const q = args.join(' ')
const nome = pushName = info.pushName ? info.pushName: nomeBot
const pushname = info.pushName ? info.pushName : ""
//Outras const...
const isBot = info.key.fromMe ? true : false
const criador = `${numeroDono}@s.whatsapp.net`
const isDono = criador.includes(sender)
const numeroBot = nahida.user.id.split(':')[0]+'@s.whatsapp.net'
const isGroupAdmins = groupAdmins.includes(sender) || false
const isBotGroupAdmins = groupAdmins.includes(numeroBot) || false
/*--------------------------------------------------------------------------------------------------------*/
//BUDY ABAIXO
var budy = (type === 'conversation') ? info.message?.conversation : (type === 'extendedTextMessage') ? info.message?.extendedTextMessage?.text : ''
/*--------------------------------------------------------------------------------------------------------*/
if (budy.includes("prefixo") || budy.includes("Prefixo")) {
nahida.sendMessage(from,{text: `aqui está o prefixo (${prefix})`}, {quoted: info})
}
/*--------------------------------------------------------------------------------------------------------*/
var texto = (type === 'conversation') ? info.message.conversation : (type === 'extendedTextMessage') ? info.message.extendedTextMessage.text : ''
/*--------------------------------------------------------------------------------------------------------*/
//MSG ABAIXO

//EXEMPLO
msg = {
registro: `Para ver o menu você precisa se registrar use ${prefix}registro`,
msgdono: 'Comando somente para meu dono'
}
/*--------------------------------------------------------------------------------------------------------*/
react1 = ['❤️', '🧡', '💛', '💚', '💙', '💜', '🖤', '🤍', '🤎', '❤‍🔥', '❤‍🩹', '💞', '💗', '💖']
react2 = react1[Math.floor(Math.random()*react1.length)]
/*--------------------------------------------------------------------------------------------------------*/
//ISSO É PRO COMANDO DE FIGURINHA
const getRandom = (ext) => {
return `${Math.floor(Math.random() * 10000)}${ext}`
}
const { getExtension, Random, getFileBuffer } = require("./arquivos/get.js")
/*--------------------------------------------------------------------------------------------------------*/
//ASYNC ABAIXO
async function bufferImg(imageUrl) {
const fileName = 'imagem.jpg'
const headers = {'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/85.0.4183.121 Safari/537.36'}
axios.get(imageUrl, { responseType: 'arraybuffer', headers }).then(async(response) => {
fs.writeFileSync(fileName, response.data)
nahida.sendMessage(from, {image: {url: fileName}}, {quoted: info})
}).catch((err) => {
return reply("Erro!!")
})
}
/*--------------------------------------------------------------------------------------------------------*/
async function escrever (texto) {
await nahida.sendPresenceUpdate('composing', from) 
await esperar(1000) 
nahida.sendMessage(from, { text: texto }, {quoted: info})
}
/*--------------------------------------------------------------------------------------------------------*/
//SELO QUOTED VERIFICADO PODE ADICIONAR MAIS SE QUISER🍆
const selocarrinho = { key: { fromMe: false, participant: "0@s.whatsapp.net", remoteJid: "120363022697760691@g.us" }, message: { orderMessage: { itemCount: 999, status: 200, jpegThumbnail: await getBuffer(`${logo}`), surface: 200, message: `🔍Olá: ${pushname}`, orderTitle: 'up', sellerJid: '0@s.whatsapp.net' }}, contextInfo: { forwardingScore: 999, isForwarded: true }, sendEphemeral: true }

const selo = { key: { remoteJid: 'status@broadcast', fromMe: false, participant: '0@s.whatsapp.net' }, message: { listResponseMessage: { title: nomeBot }}}

const fdoc = { key: { participant: '0@s.whatsapp.net' }, message: { documentMessage: { title: `mama`, jpegThumbnail: await getBuffer(`${logo}`)}}}

const floc = { key: { participant: '0@s.whatsapp.net' }, message: { locationMessage: { title: pushname, jpegThumbnail: await getBuffer(`${logo}`)}}}

const fakeaudio = { key: { fromMe: false, participant: `0@s.whatsapp.net`, ...(from ? { remoteJid: "status@broadcast" } : {}) }, message: { "audioMessage": { "mimetype":"audio/ogg; codecs=opus", "seconds": "10", "ptt": "true" }} }
/*--------------------------------------------------------------------------------------------------------*/
//CONSTS REPLYS E ENVIAR NORMAL
/*const reply = (texto) => {
nahida.sendMessage(from, { text: texto }, {quoted: info})
}

const enviar = (texto) => {
nahida.sendMessage(from, { text: texto }, {quoted: info})
}*/
//MODIFICADAS
const reply = (texto) => {
nahida.sendMessage(from, { 
text: texto, 
contextInfo: {
forwardingScore: 999,
isForwarded: true,
"externalAdReply": {
"title": nomeBot,
"body": `lucas_mod_domina </>`,
"mediaType": 10,
"thumbnailUrl": `${logo}`,
"sourceUrl": `https://wa.me//559491569380`
}
}
}, { quoted: info })
}
/*--------------------------------------------------------------------------------------------------------*/
const enviar = (texto) => {
nahida.sendMessage(from, { 
text: texto, 
contextInfo: {
forwardingScore: 999,
isForwarded: true,
"externalAdReply": {
"title": nomeBot,
"body": `lucas_mod_domina </>`,
"mediaType": 10,
"thumbnailUrl": `${logo}`,
"sourceUrl": `https://wa.me//559491569380`
}
}
}, { quoted: info })
}
/*--------------------------------------------------------------------------------------------------------*/
//REAGIR E ESPERAR E SLEEP
const reagir = (reagi) => {
nahida.sendMessage(from, {react: {text: reagi, key: info.key}})}
/*--------------------------------------------------------------------------------------------------------*/
const esperar = async (tempo) => {
return new Promise(funcao => setTimeout(funcao, tempo))
}
/*--------------------------------------------------------------------------------------------------------*/
const envPV = (texto) => {
nahida.sendMessage(sender, {text: texto})
}
/*--------------------------------------------------------------------------------------------------------*/
const envImagePV = (link, mark) => {
nahida.sendMessage(sender, {image: {url: link}}, {quoted: mark})
}
/*--------------------------------------------------------------------------------------------------------*/
const sendSticker = (from, filename, info) => {
nahida.sendMessage(from, {sticker: {url: fileName}}, {quoted: info})
}
/*--------------------------------------------------------------------------------------------------------*/
async function sendContact(id, nome1, nome2, nmr) {
nmr1 = `${nmr.split('@')[0].replace(new RegExp("[()+-/ +/]", "gi"), "")}`
nmr2 = "+" + nmr1.slice(0, 2) + " " + nmr1.slice(2, 4) + " " + nmr1.slice(4, nmr1.length - 4) + "-" + nmr1.slice(nmr1.length - 4, nmr1.length)
vcard = 'BEGIN:VCARD\n' // metadata of the contact card
+ 'VERSION:3.0\n' 
+ `FN: ${nome1}\n` // full name
+ `ORG: ${nome2};\n` // the organization of the contact
+ `TEL;type=CELL;type=VOICE;waid=${nmr1}:${nmr2}\n` // WhatsApp ID + phone number
+ 'END:VCARD'
await nahida.sendMessage(id, {contacts: {displayName: nome1,contacts: [{ vcard }] }})
}
/*--------------------------------------------------------------------------------------------------------*/
async function sendUrlText(id, texto, title, desc, foto, link, hehe) {
try {
let menc = []
if (Buffer.isBuffer(texto)) {
console.log("Texto é um Buffer. Convertendo para string...")
texto = texto.toString('utf-8')
}
if (typeof texto === 'string') {
let sp = texto.split(' ')
for (let i of sp) {
if (i.includes('@')) {
menc.push(identArroba(i))
}
}
await nahida.sendMessage(id, { text: texto, contextInfo: { mentionedJid: menc, externalAdReply: { title: title, body: desc, thumbnail: await getBuffer(foto), mediaType: 1, showAdAttribution: true, sourceUrl: link }}}, { quoted: hehe })
} else {
throw new Error("O parâmetro 'texto' não é uma string ou buffer válido.")
}
} catch (error) {
console.error("Erro ao enviar a mensagem:", error.message)
}
}
/*--------------------------------------------------------------------------------------------------------*/
async function sendUrlText2(id, texto, title, desc, foto, link, hehe) {
nahida.sendMessage(id, {text: texto, contextInfo: {externalAdReply: {title: title, body: desc, thumbnail: await getBuffer(foto), mediaType: 1, renderLargerThumbnail: true, showAdAttribution: true, sourceUrl: link}}}, {quoted: hehe})
}
/*--------------------------------------------------------------------------------------------------------*/
async function sendUrlDoc(id, txt, tipo, titulo, tamanho, nome, desc, thumb, link, hehe) {
nahida.sendMessage(id, {document: Buffer.from('oi curioso'), caption: txt, mimetype: tipo, fileName: titulo, fileLength: 1000000 * Number(tamanho), contextInfo: {externalAdReply: {title: nome, body: desc, mediaType: 1, thumbnail: await getBuffer(thumb), showAdAttribution: true, renderLargerThumbnail: true, sourceUrl: link}}}, {quoted: hehe})
}
/*--------------------------------------------------------------------------------------------------------*/
function sendChannelText(id, txt, channel, name, hehe) {
menc = []
sp = txt.split(` `)
for(i of sp) {
if(i.includes(`@`)) menc.push(identArroba(i))
}
nahida.sendMessage(id, {text: txt, mentions: menc, contextInfo: {forwardingScore: 999, isForwarded: true, forwardedNewsletterMessageInfo: {newsletterJid: channel, newsletterName: name}}}, {quoted: hehe})}
/*--------------------------------------------------------------------------------------------------------*/
function sendChannelImage(id, img, txt, channel, hehe) {
menc = []
sp = txt.split(` `)
for(i of sp) {
if(i.includes(`@`)) menc.push(identArroba(i))
}
nahida.sendMessage(id, {image: {url: img}, caption: txt, mentions: menc, contextInfo: {forwardingScore: 999, isForwarded: true, forwardedNewsletterMessageInfo: {newsletterJid: channel, newsletterName: name}}}, {quoted: hehe})}

const sendText = async(ChatID, texto) => {
await nahida.sendMessage(ChatID, {text: texto}).catch(async(error) => {
await nahida.sendMessage(from, {text: 'Ocorreu um erro ao encaminhar o texto pré-definido na função.'}, {quoted: info})
})
}
/*--------------------------------------------------------------------------------------------------------*/
const sendVideo = (id, link, desc, zero) => {
return nahida.sendMessage(id, {video: {url: link}, caption: desc, mentions: [sender], mimetype: 'video/mp4'}, {quoted: info})
}
/*--------------------------------------------------------------------------------------------------------*/
const sendVideo2 = (id, link, desc, contextinfo) => {
return nahida.sendMessage(id, {video: { url: link }, caption: desc, mimetype: 'video/mp4', contextInfo: contextInfo}, { quoted: info })
}
/*--------------------------------------------------------------------------------------------------------*/
const sendAudio = (id, link, tipo, zero) => {
return nahida.sendMessage(id, {audio: {url: link}, mimetype: tipo, ptt: true}, {quoted: info})
}
/*--------------------------------------------------------------------------------------------------------*/
const sendImage = (id, ytb, cap) => {
nahida.sendMessage(from, {image: {url: ytb}, caption: cap}, {quoted: info})
}
/*--------------------------------------------------------------------------------------------------------*/
const sendMess = (zero, ytb, yah) => {
nahida.sendMessage(zero, {text: ytb}, {quoted: info})
}
/*--------------------------------------------------------------------------------------------------------*/
const sendMenu = (cap) => {
nahida.sendMessage(from, {image: {url: logos.link}, caption: cap, mentions: [sender]}, {quoted: info})
}
/*--------------------------------------------------------------------------------------------------------*/
var downoff = 'Sistema apresenta instabilidades... Pfvr, volte mais tarde.'
var downon = 'Sistema cancelou a operação, devido a demora na resposta...'
var semfoto = `https://telegra.ph/file/d9909cc45b86459fcb8a9.jpg`
/*--------------------------------------------------------------------------------------------------------*/
const sleep = async (tempo) => {
return new Promise(funcao => setTimeout(funcao, tempo))
}
/*--------------------------------------------------------------------------------------------------------*/
const time2 = moment().tz('America/Sao_Paulo').format('HH:mm:ss')
if(time2 > "00:00:00" && time2 < "05:00:00"){
var tempo = 'Boa madrugada'
} if(time2 > "05:00:00" && time2 < "12:00:00"){
var tempo = 'Bom dia'
} if(time2 > "12:00:00" && time2 < "18:00:00"){
var tempo = 'Boa tarde'
} if(time2 > "18:00:00"){
var tempo = 'Boa noite'
}
/*--------------------------------------------------------------------------------------------------------*/
const time_emoji = moment().tz('America/Sao_Paulo').format('HH:mm:ss')
if(time_emoji > "00:00:00" && time_emoji < "05:00:00"){
var tempo_emoji = '🌑'
} if(time_emoji > "05:00:00" && time_emoji < "12:00:00"){
var tempo_emoji = '☀️'
} if(time_emoji > "12:00:00" && time_emoji < "18:00:00"){
var tempo_emoji = '🍃'
} if(time_emoji > "18:00:00"){
var tempo_emoji = '🌙'
}
/*--------------------------------------------------------------------------------------------------------*/
const time_pro = moment().tz('America/Sao_Paulo').format('HH:mm:ss')
if(time_pro > "00:00:00" && time_pro < "05:00:00"){
var tempo_pro = 'uma'
} if(time_pro > "05:00:00" && time_pro < "12:00:00"){
var tempo_pro = 'um'
} if(time_pro > "12:00:00" && time_pro < "18:00:00"){
var tempo_pro = 'uma'
} if(time_pro > "18:00:00"){
var tempo_pro = 'uma'
}
/*--------------------------------------------------------------------------------------------------------*/
const largeNumber = (value) => {
if(!Number(value)) return value + " não é número..."
if(Number(value) < 0) return "O número precisa ser ≥ 0"
nmr = `${Number(value).toFixed(0)}`
if(nmr.length >= 4) {
const existPoint = (nmr) => {
if(Number(nmr) !== 0) return "." + `${nmr}`
return ``
}
if(nmr.length >= 4) txt = nmr.slice(0, (nmr.length - 3)) + existPoint(nmr.slice((nmr.length - 3), (nmr.length - 2))) + "K"
if(nmr.length >= 7) txt = nmr.slice(0, (nmr.length - 6)) + existPoint(nmr.slice((nmr.length - 6), (nmr.length - 5))) + "M"
if(nmr.length >= 10) txt = nmr.slice(0, (nmr.length - 9)) + existPoint(nmr.slice((nmr.length - 9), (nmr.length - 8))) + "B"
if(nmr.length >= 13) txt = nmr.slice(0, (nmr.length - 12)) + existPoint(nmr.slice((nmr.length - 12), (nmr.length - 11))) + "T"
} else { txt = nmr }
return txt
}
/*--------------------------------------------------------------------------------------------------------*/
const alerandom = (nmr) => {
return Math.floor(Math.random()*nmr)
}
/*--------------------------------------------------------------------------------------------------------*/
const convertBytes = function(bytes) {
const sizes = ["Bytes", "KB", "MB", "GB", "TB"]
if(bytes == 0) {
return "n/a"
}
const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)))
if(i == 0) {
return bytes + " " + sizes[i]
}
return (bytes / Math.pow(1024, i)).toFixed(1) + " " + sizes[i]
}
/*--------------------------------------------------------------------------------------------------------*/
function kyun(seconds){
function pad(s){
return (s < 10 ? '0' : '') + s
}
var hours = Math.floor(seconds / (60*60))
var minutes = Math.floor(seconds % (60*60) / 60)
var seconds = Math.floor(seconds % 60)
return `${pad(hours)} Hora${Number(pad(hours)) !== 1 ? "s" : ""}, ${pad(minutes)} Minuto${Number(pad(minutes)) !== 1 ? "s" : ""} e ${pad(seconds)} Segundo${Number(pad(seconds)) !== 1 ? "s" : ""}`
}
/*--------------------------------------------------------------------------------------------------------*/
const msToTime = (duration) => {
const seconds = Math.floor((duration / 1000) % 60)
const minutes = Math.floor((duration / (1000 * 60)) % 60)
const hours = Math.floor((duration / (1000 * 60 * 60)) % 24)
return `${hours}h ${minutes}m ${seconds}s`
}
/*--------------------------------------------------------------------------------------------------------*/
const contar = (frase, letraProcurada) => {
total = 0
for(i = 0; i < frase.length; i++) {
if(letraProcurada == frase[i]) total += 1
}
return total
}
/*--------------------------------------------------------------------------------------------------------*/
const converterDias = (dias) => {
nmr = Number(dias)
if(nmr < 0) return "A quantidade de dias precisa ser ≥ 0"
year = (nmr - (nmr % 365)) / 365
mm = ((nmr % 365) - ((nmr % 365) % 30)) / 30
day = (nmr % 365) % 30
txt = year > 0 ? year + ` Ano${year != 1 ? "s" : ""}${day > 0 ? mm > 0 ? ", " : " e " : ""}` : ``
txt += mm > 0 ? mm + ` M${mm != 1 ? "eses" : "ês"}${day > 0 ? " e " : ""}` : ``
txt += day > 0 ? day + ` Dia${day != 1 ? "s" : ""}` : ``
return txt.slice(0, txt.length - 2)
}
/*--------------------------------------------------------------------------------------------------------*/
const contarMin = (base_a) => {
if(contar(base_a, `:`) != 1) return `É necessário o uso dos : no horário, seguindo apenas horas e minutos`
var [a, b] = base_a.split(':')
return Number(Number(a) * 60) + Number(b)
}
/*--------------------------------------------------------------------------------------------------------*/
const converterMin = (base_b) => {
if(!Number(base_b)) return `Precisa ser um número`
nmr = Number(base_b)
b = nmr % 60
a = (nmr - b) / 60
return `${a < 10 ? `0` + a : a}:${b < 10 ? `0` + b : b}`
}
/*--------------------------------------------------------------------------------------------------------*/
const rmLetras = (txt) => {
return txt.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "")
}
/*--------------------------------------------------------------------------------------------------------*/
var isUrl = (url) => {
if(linkfy.find(url)[0]) return true
return false
}
/*--------------------------------------------------------------------------------------------------------*/
const replaceAll = (frase, txt, rp) => {
caixa = [frase]
for(i = 0; i < 1000; i++) {
caixa.push(caixa[i].replace(txt, rp))
}
return caixa[caixa.length - 1]
}
/*--------------------------------------------------------------------------------------------------------*/
async function carregamento(id, txt, zero) {
var download = [
`${txt} ${txt.length > 0 ? "\n" : ""}ʟᴏᴀᴅɪɴɢ〘█▒▒▒▒▒▒▒▒▒〙10%`,
`${txt} ${txt.length > 0 ? "\n" : ""}ʟᴏᴀᴅɪɴɢ〘███▒▒▒▒▒▒▒〙35%`,
`${txt} ${txt.length > 0 ? "\n" : ""}ʟᴏᴀᴅɪɴɢ〘█████▒▒▒▒▒〙51%`,
`${txt} ${txt.length > 0 ? "\n" : ""}ʟᴏᴀᴅɪɴɢ〘███████▒▒▒〙62%`,
`${txt} ${txt.length > 0 ? "\n" : ""}ʟᴏᴀᴅɪɴɢ〘████████▒▒〙80%`,
`${txt} ${txt.length > 0 ? "\n" : ""}ʟᴏᴀᴅɪɴɢ〘██████████〙100%`,
`${txt.length > 0 ? `~_*© ${nomeBot}*_~\n` : ""}𝙻𝙾𝙰𝙳𝙸𝙽𝙶 𝙲𝙾𝙼𝙿𝙻𝙴𝚃𝙴𝙳...`
]
let { key } = await nahida.sendMessage(id, {text: `${txt} ${txt.length > 0 ? "\n" : ""}ʟᴏᴀᴅɪɴɢ〘▒▒▒▒▒▒▒▒▒▒〙0%`}, {quoted: info})
await sleep(2000)
for(let i = 0; i < download.length; i++) {
await nahida.sendMessage(id, {text: download[i], edit: key }, {quoted: info})
}
}
/*--------------------------------------------------------------------------------------------------------*/
//Const isQuoted.
const isImage = type == "imageMessage"
const isVideo = type == "videoMessage"
const isAudio = type == "audioMessage"
const isVisu = type == 'viewOnceMessageV2'
const isSticker = type == "stickerMessage"
const isContact = type == "contactMessage"
const isLocation = type == "locationMessage"
const isProduct = type == "productMessage"
const isMedia = (type === "imageMessage" || type === "videoMessage" || type === "audioMessage") 
typeMessage = body.substr(0, 50).replace(/6/g, "")
if (isImage) typeMessage = "Image"
else if (isVideo) typeMessage = "Video"
else if (isAudio) typeMessage = "Audio"
else if (isSticker) typeMessage = "Sticker"
else if (isContact) typeMessage = "Contact"
else if (isLocation) typeMessage = "Location"
else if (isProduct) typeMessage = "Product"
/*--------------------------------------------------------------------------------------------------------*/
const isQuotedMsg = type === "extendedTextMessage" && content.includes("textMessage")
const isQuotedImage = type === "extendedTextMessage" && content.includes("imageMessage")
const isQuotedVisuU = type === 'extendedTextMessage' && content.includes('viewOnceMessage')
const isQuotedVisuU2 = type === 'extendedTextMessage' && content.includes('viewOnceMessageV2')
const isQuotedVideo = type === "extendedTextMessage" && content.includes("videoMessage")
const isQuotedDocument = type === "extendedTextMessage" && content.includes("documentMessage")
const isQuotedAudio = type === "extendedTextMessage" && content.includes("audioMessage")
const isQuotedSticker = type === "extendedTextMessage" && content.includes("stickerMessage")
const isQuotedContact = type === "extendedTextMessage" && content.includes("contactMessage")
const isQuotedLocation = type === "extendedTextMessage" && content.includes("locationMessage")
const isQuotedProduct = type === "extendedTextMessage" && content.includes("productMessage")
const isQuotedDocW = type === 'extendedTextMessage' && content.includes('documentWithCaptionMessage')
/*--------------------------------------------------------------------------------------------------------*/
//LEITOR DE MENSAGEM ABAIXO
const groupID = isGroup ? info.key.remoteJid : 'N/A'
const messageID = info.key.id
const messageType = Object.keys(info.message || {})[0] || 'desconhecido'
const isDeleted = !!info.message?.protocolMessage
const isForwarded = !!info.message?.extendedTextMessage?.contextInfo?.isForwarded
const replyText = info.message?.extendedTextMessage?.contextInfo?.quotedMessage?.conversation || null
let conteudoMensagem = ''
switch (messageType) {
case 'conversation':
case 'extendedTextMessage':
conteudoMensagem = info.message?.conversation || info.message?.extendedTextMessage?.text || '📎 Mensagem de texto vazia'
break
case 'imageMessage':
conteudoMensagem = '🖼️ Imagem enviada'
break
case 'videoMessage':
conteudoMensagem = '🎥 Vídeo enviado'
break
case 'audioMessage':
conteudoMensagem = '🎵 Áudio enviado'
break
case 'stickerMessage':
conteudoMensagem = '🎭 Sticker enviado'
break
case 'documentMessage':
conteudoMensagem = '📄 Documento enviado'
break
case 'contactMessage':
conteudoMensagem = '📇 Contato compartilhado'
break
case 'locationMessage':
conteudoMensagem = '📍 Localização enviada'
break
case 'protocolMessage':
conteudoMensagem = '🚫 Mensagem apagada'
break
default:
conteudoMensagem = '❓ Tipo de mensagem desconhecido'
break
}
/*--------------------------------------------------------------------------------------------------------*/
async function main() {
const c = await chalk
const separator = c.gray('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
const boxTop = c.cyanBright('╭───────────────────────────────────────╮')
const boxBottom = c.cyanBright('╰───────────────────────────────────────╯')
const title = gradient.passion(`📩 NOVA MENSAGEM - ${formattedTime}`)
console.log(`\n${boxTop}`)
console.log(c.bold(title))
console.log(separator)
if (isGroup) {
console.log(`
${c.bgGreen.black(' 🏠 GRUPO ')} : ${c.greenBright(groupName)}
${c.bgGray.black(' 🆔 ID GRUPO ')} : ${c.gray(groupID)}
${c.bgYellow.black(' 👤 USUÁRIO ')} : ${c.yellowBright(senderName)} (${c.gray(sender)})
${c.bgMagenta.black(' 🏷️ TIPO ')} : ${c.magentaBright(messageType.toUpperCase())}
${c.bgBlue.black(' 📡 CONTEÚDO ')} : ${c.blueBright(conteudoMensagem)}
${c.bgRed.black(' ⏳ HORA ')} : ${c.redBright(formattedTime)}
${c.bgGray.black(' 🆔 ID MENSAGEM ')} : ${c.gray(messageID)}
${isForwarded ? c.bgCyan.black(' 🔄 ENC. ') + ` : ${c.cyanBright('Mensagem encaminhada')}` : ''}
${replyText ? c.bgMagenta.black(' 🔁 RESPOSTA ') + ` : ${c.magentaBright(replyText)}` : ''}
`)
} else {
console.log(`
${c.bgYellow.black(' 👤 USUÁRIO ')} : ${c.yellowBright(senderName)} (${c.gray(sender)})
${c.bgMagenta.black(' 🏷️ TIPO ')} : ${c.magentaBright(messageType.toUpperCase())}
${c.bgBlue.black(' 📡 CONTEÚDO ')} : ${c.blueBright(conteudoMensagem)}
${c.bgRed.black(' ⏳ HORA ')} : ${c.redBright(formattedTime)}
${c.bgGray.black(' 🆔 ID MENSAGEM ')} : ${c.gray(messageID)}
${isForwarded ? c.bgCyan.black(' 🔄 ENC. ') + ` : ${c.cyanBright('Mensagem encaminhada')}` : ''}
${replyText ? c.bgMagenta.black(' 🔁 RESPOSTA ') + ` : ${c.magentaBright(replyText)}` : ''}
`)
}
console.log(separator)
console.log(boxBottom)
}
main().catch(console.error)
/*--------------------------------------------------------------------------------------------------------*/
// ABREVIAÇÕES DE CLIENTES PARA SEU CLIENTE
client = nahida
zerotwo = nahida
conn = nahida
blackmd = nahida
athena = nahida
agatha = nahida
blk = nahida
rimuru = nahida
/*--------------------------------------------------------------------------------------------------------*/
// INÍCIO DOS COMANDOS COM PREFIXO ❤️
switch(comando) {

// COMANDOS DE MENUS
case 'menu':
reagir("🎅")
await esperar(1000)
reagir("🫧")
await sendAudio(from, audiomenu, "audio/mpeg", info)
nahida.sendMessage(from, { image: { url: link }, caption: `
🌸🌟 *INFORMAÇÕES DO BOT* 🌟🌸
╭───────────────「 *INFO* 」──────────────
│🔢 *Número:* @${sender.split("@")[0]}
│🔑 *Prefix Atual:* ${prefix}
│🤖 *Nome do Bot:* ${nomeBot}
│〽️ *Dono:* ${nomeDono}
│👑 *Criador:* 𖧄 𝐋𝐔𝐂𝐀𝐒 𝐌𝐎𝐃 𝐃𝐎𝐌𝐈𝐍𝐀 𖧄
╰───────────────────────────────────────
🌠📅 *DATA E HORA ATUAL* 📅🌠
╭────────────「 *Data & Hora* 」──────────
│🗓️ *Data:* ${date}
│⏰ *Hora:* ${hora}
╰───────────────────────────────────────

🌼✨ *MENU PRINCIPAL* ✨🌼
╭──────────────「 *Comandos* 」────────────
│🎮 *${prefix}menu*
│🎶 *${prefix}play*
│🎶 *${prefix}play2*
│🎶 *${prefix}play3*
│🎶 *${prefix}play4*
│🎶 *${prefix}playvideo*
│🎶 *${prefix}playvideo2*
│🎶 *${prefix}playdoc*
│🎶 *${prefix}playdoc2*
│🎶 *${prefix}playlist*
│📋 *${prefix}ytsearch*
│🎶 *${prefix}playstore*
│📶 *${prefix}ping*
│📜 *${prefix}doc/doc2* (fake)
│🔗 *${prefix}gerarlink*
│🔗 *${prefix}uploadapi*
│🖼️ *${prefix}toimg*
│📝 *${prefix}s*
│🔎 *${prefix}sn*
│📋 *${prefix}listagrupos*
│📋 *${prefix}perfil*
│📋 *${prefix}gemini*
│📋 *${prefix}botoes*
│📋 *${prefix}tiktokstalk*
│📋 *${prefix}tiktokviews*
│📋 *${prefix}igstalk*
│📋 *${prefix}whatsappstalk*
│📋 *${prefix}igstory*
│📋 *${prefix}ytstalk*
│📋 *${prefix}ghstalk*
│📋 *${prefix}ipstalk*
│📋 *${prefix}insta_destaques*
│📋 *${prefix}spotify*
│📋 *${prefix}happymod*
╰───────────────────────────────────────
`, mentions: [sender]}, { quoted: info })
break

// COMANDOS DE ADMINS

// COMANDOS DE DONO
case 'listagrupos':
if (!isDono) return reply('Este comando é restrito aos donos do bot.')
try {
dddEstados = {
'11': 'São Paulo', '12': 'São Paulo', '13': 'São Paulo', '14': 'São Paulo',
'15': 'São Paulo', '16': 'São Paulo', '17': 'São Paulo', '18': 'São Paulo',
'19': 'São Paulo', '21': 'Rio de Janeiro', '22': 'Rio de Janeiro', '24': 'Rio de Janeiro',
'27': 'Espírito Santo', '28': 'Espírito Santo', '31': 'Minas Gerais', '32': 'Minas Gerais',
'33': 'Minas Gerais', '34': 'Minas Gerais', '35': 'Minas Gerais', '37': 'Minas Gerais',
'38': 'Minas Gerais', '41': 'Paraná', '42': 'Paraná', '43': 'Paraná',
'44': 'Paraná', '45': 'Paraná', '46': 'Paraná', '47': 'Santa Catarina',
'48': 'Santa Catarina', '49': 'Santa Catarina', '51': 'Rio Grande do Sul',
'53': 'Rio Grande do Sul', '54': 'Rio Grande do Sul', '55': 'Rio Grande do Sul',
'61': 'Distrito Federal', '62': 'Goiás', '64': 'Goiás', '63': 'Tocantins',
'65': 'Mato Grosso', '66': 'Mato Grosso', '67': 'Mato Grosso do Sul', '68': 'Acre',
'69': 'Rondônia', '71': 'Bahia', '73': 'Bahia', '74': 'Bahia', '75': 'Bahia',
'77': 'Bahia', '79': 'Sergipe', '81': 'Pernambuco', '87': 'Pernambuco',
'82': 'Alagoas', '83': 'Paraíba', '84': 'Rio Grande do Norte', '85': 'Ceará',
'88': 'Ceará', '86': 'Piauí', '89': 'Piauí', '91': 'Pará', '93': 'Pará',
'94': 'Pará', '92': 'Amazonas', '97': 'Amazonas', '95': 'Roraima', '96': 'Amapá',
'98': 'Maranhão', '99': 'Maranhão'
}
let grupos = await nahida.groupFetchAllParticipating()
let resposta = `*📋 Lista de Grupos e Participantes por DDD (Estados) 📋*\n\n`
let mentions = []
for (let [id, grupo] of Object.entries(grupos)) {
let participantes = grupo.participants || []
let estadoCategorias = {}
for (let participante of participantes) {
let numero = participante.id.split('@')[0].replace(/\D/g, '')
if (numero.length < 11 || !numero.startsWith('55')) {
console.log(`Número inválido: ${numero}`)
continue
}
let ddd = numero.substring(2, 4)
let estado = dddEstados[ddd] || 'Desconhecido'
if (!estadoCategorias[estado]) estadoCategorias[estado] = []
estadoCategorias[estado].push(`+${numero}`)
mentions.push(participante.id)
}
resposta += `*📍 Grupo:* *${grupo.subject}*\n`
resposta += `👥 *Total de participantes:* ${participantes.length}\n\n`
for (let [estado, usuarios] of Object.entries(estadoCategorias)) {
resposta += `*🌎 Estado: ${estado}*\n`
usuarios.forEach((numero, index) => {
resposta += `${index + 1}. ${numero}\n`
})
resposta += `\n`
}
resposta += `${'-'.repeat(40)}\n\n`
}
await nahida.sendMessage(from, { text: resposta.trim(), mentions }, { quoted: info})
} catch (error) {
console.log('[LISTA_GRUPOS] Erro:', error)
reply('Ocorreu um erro ao listar os grupos. Tente novamente.')
}
break

// COMANDOS NORMAIS
case 'sn':
if(!q) return reply(`*Faça uma pergunta para o bot responder com sim/não...*\n*Exemplo:* ${prefix+comando} New cases vai sempre alcançar suas metas?`)
s_n = ['sim', 'não']
sera= ["creio que", "acredito que", "acho que", "receio que"]
const vish = s_n[Math.floor(Math.random() * (s_n.length))]
cases = sera[Math.floor(Math.random() * (sera.length))]
seinao = `= ⧽ ${q}\n\n*Segundo meus cálculos... ${cases} ${vish}* 🤷🏻‍♂️`
reply(seinao)
break

case 'sticker':
case 'stick':
case 's':
case 'stickergif':
case 'sgif':
case 'st':
case 'stk':
if(!q && info.message.extendedTextMessage === null) return enviar('Marque uma imagem ou um video de 10 segundos!')
enviar('`Calma paizão`')
{
(async function () {
var legenda = q ? q?.split("/")[0] : `
🌐 • Solicitado:
🪬 • Dono:
🤖 • Bot:
`
var autor = q ? q?.split("/")[1] : q?.split("/")[0] ? '' : `
⪧${pushname}
⪧${nomeDono}
⪧${nomeBot}`
const RSM = info.message?.extendedTextMessage?.contextInfo?.quotedMessage
const boij = RSM?.imageMessage || info.message?.imageMessage || RSM?.viewOnceMessageV2?.message?.imageMessage || info.message?.viewOnceMessageV2?.message?.imageMessage || info.message?.viewOnceMessage?.message?.imageMessage || RSM?.viewOnceMessage?.message?.imageMessage
const boij2 = RSM?.videoMessage || info.message?.videoMessage || RSM?.viewOnceMessageV2?.message?.videoMessage || info.message?.viewOnceMessageV2?.message?.videoMessage || info.message?.viewOnceMessage?.message?.videoMessage || RSM?.viewOnceMessage?.message?.videoMessage
if (boij || (boij2 && boij2?.seconds < 11)) {
const mediaType = boij ? 'image' : 'video'
const mediaObj = boij || boij2
const rane = getRandom('.' + await getExtension(mediaObj.mimetype))
const buff = await getFileBuffer(mediaObj, mediaType)
fs.writeFileSync(rane, buff)
const rano = getRandom('.webp')
exec(`ffmpeg -i ${rane} -vcodec libwebp -filter:v fps=fps=15 -lossless 1 -loop 0 -preset default -an -vsync 0 -s 200:200 ${rano}`, (err) => {
fs.unlinkSync(rane)
let json = {
"sticker-pack-name": legenda,
"sticker-pack-publisher": autor
}
let exifAttr = Buffer.from([0x49, 0x49, 0x2A, 0x00, 0x08, 0x00, 0x00, 0x00, 0x01, 0x00, 0x41, 0x57, 0x07, 0x00, 0x00, 0x00, 0x00, 0x00, 0x16, 0x00, 0x00, 0x00])
let jsonBuff = Buffer.from(JSON.stringify(json), "utf-8")
let exif = Buffer.concat([exifAttr, jsonBuff])
exif.writeUIntLE(jsonBuff.length, 14, 4)
let nomemeta = "temp.exif"
fs.writeFileSync(`./${nomemeta}`, exif) 
exec(`webpmux -set exif ${nomemeta} ${rano} -o ${rano}`, () => {
nahida.sendMessage(from, {sticker: fs.readFileSync(rano)}, {quoted: info})
fs.unlinkSync(nomemeta)
fs.unlinkSync(rano)
})
})
} else {
enviar(`Você precisa enviar ou marcar uma imagem ou vídeo com no máximo 10 segundos`)
}
})().catch(e => {
console.log(e)
enviar("Hmm deu erro")
try {
if (fs.existsSync("temp.exif")) fs.unlinkSync("temp.exif")
if (fs.existsSync(rano)) fs.unlinkSync(rano)
if (fs.existsSync(media)) fs.unlinkSync(media)
} catch {}
})
}
break

case 'toimg':
if (!isBot) return
if (!isQuotedSticker) return enviar('`Marque uma Figurinha!!`')
buff = await getFileBuffer(info.message.extendedTextMessage.contextInfo.quotedMessage.stickerMessage, 'sticker')
try {
nahida.sendMessage(from, {image: buff}, {quoted: info})
} catch(e) {
console.log(e)
enviar('erro...')
}
break

case 'perfil':
try {
ppimg = await nahida.profilePictureUrl(`${sender.split('@')[0]}@c.us`, 'image')
} catch {
ppimg = 'https://i0.wp.com/www.gambarunik.id/wp-content/uploads/2019/06/Top-Gambar-Foto-Profil-Kosong-Lucu-Tergokil-.jpg'
}
const randomPercentage = () => `${Math.floor(Math.random() * 10)}${Math.floor(Math.random() * 10)}`
const randomProgramPrice = () => Math.ceil(Math.random() * 10000)
const bio = await nahida.fetchStatus(sender)
const bioo = bio.status || "Sem bio disponível"
const programa = randomProgramPrice()
const dptr = `
╭─────────────────💫 𝗦𝗘𝗨 𝗣𝗘𝗥𝗙𝗜𝗟 🌟─────────────────╮
│*DATA* 📅: ${date}
│*HORA* ⏰: ${hora}
│
│ 🧑‍💻 𝗜𝗡𝗙𝗢𝗥𝗠𝗔𝗖̧𝗢𝗘𝗦 𝗗𝗢 𝗨𝗦𝗨𝗔́𝗥𝗜𝗢 🧑‍💻
│
│*NOME 💬*: ${pushname}
│*BIO 📄*: ${bioo}
│${!isGroup ? `*PRIVADO 💬*: ${pushname}` : `*GRUPO 💬*: ${groupName}`}
│*GADISSE 😏*: ${randomPercentage()}%
│*PUTARIA 🔥*: ${randomPercentage()}%
│*GOSTOSURA 😋*: ${randomPercentage()}%
│*TELEFONE📱*: ${
info.key.id.length > 21 
? 'Android 👾' 
: info.key.id.substring(0, 2) === '3A' 
? 'iOS 🍎🍏' 
: 'Zap zap web 🖥️💻'
}
│*PROGRAMA 🤑*: R$${programa}
╰─────────────────────────────────────────────────╯
`
const daftarimg = await getBuffer(ppimg)
await nahida.sendMessage(from, { image: daftarimg, caption: dptr }, { quoted: info })
break

case 'ping':
try {
let responseTime = (Date.now() / 1000) - info.messageTimestamp
let uptime = process.uptime()
let currentTime = moment.tz('America/Sao_Paulo').format('HH:mm:ss')
let systemInfo = {
osType: infoSystem.type(),
osRelease: infoSystem.release(),
totalMemory: (infoSystem.totalmem() / Math.pow(1024, 3)).toFixed(2),
freeMemory: (infoSystem.freemem() / Math.pow(1024, 3)).toFixed(2),
}
let responseMessage = `
⏱️ *Velocidade de Resposta:* ${responseTime.toFixed(3)} _segundos._
🤖 *O bot está online há:* ${runtime(uptime)}
💻 *Sistema Operacional:* ${systemInfo.osType}
📂 *Versão do SO:* ${systemInfo.osRelease}
💾 *Memória RAM total:* ${systemInfo.totalMemory} GB
💾 *Memória RAM disponível:* ${systemInfo.freeMemory} GB
`.trim()
const imageUrl = `https://eruakorl.sirv.com/Bot%20dudinha/ping.jpeg?text.0.text=VELOCIDADE%20DO%20BOT&text.0.position.gravity=north&text.0.position.y=15%25&text.0.size=40&text.0.font.family=Teko&text.0.font.weight=800&text.0.background.opacity=100&text.0.outline.blur=100&text.1.text=${responseTime.toFixed(3)}&text.1.position.gravity=center&text.1.size=30&text.1.color=ffffff&text.1.font.family=Teko&text.1.font.weight=800&text.1.background.opacity=100&text.1.outline.blur=100`
await nahida.sendMessage(from, {image: { url: imageUrl }, caption: responseMessage, mentions: [sender]}, { quoted: info })
} catch (err) {
console.log(err)
enviar(`Ops ocorreu um erro`)
}
break

case 'doc':
try {
sprd = "|"
if(!q) {
let buttonMessage = {
document: fs.readFileSync('./arquivos/docf.txt'),
mimetype: 'application/vnd.android.package-archive',
fileName: `exemplo`,
fileLength: 500000000,
caption: `${prefix} exemplo${sprd}500${sprd}apk

Os tipos aceitos por enquanto são:

> pdf
> xml
> zip
> jpg
> ppt
> apk
> txt
> aac
> pptx
> aac
> m4a
> mp4
> mp3
> svg
> png

`,
headerType: 4,
}
return nahida.sendMessage(from, buttonMessage, {quoted:info})
}
kls = args.join(' ')
let nomedoc = kls.split(sprd)[0] || `${nomeBot}`
let peso = kls.split(sprd)[1] * 1000000 || '1000000'
let mimetyp = kls.split(sprd)[2].replace(" ", "") || 'gif'
let thumbc = kls.split(sprd)[3] || 'https://google.com/'
if(mimetyp.toLowerCase() == 'pdf') mimetyp = 'application/pdf'
if(mimetyp.toLowerCase() == 'apk') mimetyp = 'application/vnd.android.package-archive'
if(mimetyp.toLowerCase() == 'aac') mimetyp = 'audio/aac'
if(mimetyp.toLowerCase() == 'xml') mimetyp = 'application/xml'
if(mimetyp.toLowerCase() == 'zip') mimetyp = 'application/zip'
if(mimetyp.toLowerCase() == 'jpg') mimetyp = 'image/jpeg'
if(mimetyp.toLowerCase() == 'ppt') mimetyp = 'application/vnd.ms-powerpoint'
if(mimetyp.toLowerCase() == 'pptx') mimetyp = 'application/vnd.openxmlformats-officedocument.presentationml.presentation'
if(mimetyp.toLowerCase() == 'mp4') mimetyp = 'video/mp4'
if(mimetyp.toLowerCase() == 'm4a') mimetyp = 'audio/mp4'
if(mimetyp.toLowerCase() == 'mp3') mimetyp = 'audio/mpeg'
if(mimetyp.toLowerCase() == 'gif') mimetyp = 'image/gif'
if(mimetyp.toLowerCase() == 'png') mimetyp = 'image/png'
if(mimetyp.toLowerCase() == 'svg') mimetyp = 'image/svg+xml'
if(mimetyp.toLowerCase() == 'txt') mimetyp = 'text/plain'
let Messagemdoc = {
document: fs.readFileSync('./arquivos/docf.txt'),
mimetype: mimetyp,
jpegThumbnail: await getBuffer(thumbc),
fileName: nomedoc,
fileLength: peso,
headerType: 4,
contextInfo:{
forwardingScore:999,
isForwarded:true,
}
}
nahida.sendMessage(from, Messagemdoc, {quoted:info})
} catch (err) {
console.log(err)
enviar(`Ops ocorreu um erro`)
}
break

case "botoes":
if (!isDono) return reply(msg.msgdono)
try {
await ativarDesativarBotoes(reply)
} catch (e) {
console.log(e)
reply("Houve um erro ao tentar alterar a configuração.")
}
break

// COMANDOS DA API ZERO TWO:
case 'videourl':
case 'gerarlink':
case 'videopralink':
case 'imgpralink':
case 'audiolink':
try {//By: 𖧄 𝐋𝐔𝐂𝐀𝐒 𝐌𝐎𝐃 𝐃𝐎𝐌𝐈𝐍𝐀 𖧄
//Canal: https://whatsapp.com/channel/0029Va6riekH5JLwLUFI7P2B
if ((isMedia && (info.message.videoMessage || info.message.imageMessage || info.message.audioMessage)) || (isQuotedImage || isQuotedVideo || isQuotedAudio)) {
let boij
let owgi
let res
if (isQuotedImage || (isMedia && info.message.imageMessage)) {
boij = isQuotedImage && info.message.extendedTextMessage.contextInfo?.quotedMessage ? info.message.extendedTextMessage.contextInfo.quotedMessage.imageMessage : info.message.imageMessage
if (boij) {
owgi = await getFileBuffer(boij, 'image')
const uploadRes = await axios.post(`${zerosite}/api/upload`, {
apikey: API_KEY_ZEROTWO,
media: owgi
}, {
headers: { 'Content-Type': 'multipart/form-data' }
})
if (uploadRes.data.status) {
return sendUrlText(from, uploadRes.data.resultado, `Link da imagem gerado com sucesso ↴`, '', uploadRes.data.resultado, uploadRes.data.resultado, selocarrinho)
} else {
reply('Erro ao gerar o link da imagem.')
}
}
}
if ((isQuotedVideo || (isMedia && info.message.videoMessage))) {
reply('Gerando link do vídeo pra você...')
boij = isQuotedVideo ? info.message.extendedTextMessage.contextInfo.quotedMessage.videoMessage : info.message.videoMessage
if (boij) {
owgi = await getFileBuffer(boij, 'video')
const uploadRes = await axios.post(`${zerosite}/api/upload`, {
apikey: API_KEY_ZEROTWO,
media: owgi
}, {
headers: { 'Content-Type': 'multipart/form-data' }
})
if (uploadRes.data.status) {
return sendUrlText(from, uploadRes.data.resultado, `Link do vídeo gerado com sucesso ↴`, '', link, uploadRes.data.resultado, selocarrinho)
} else {
reply('Erro ao gerar o link do vídeo.')
}
}
}
if ((isQuotedAudio || (isMedia && info.message.audioMessage))) {
reply('Gerando link do áudio pra você...')
boij = isQuotedAudio ? info.message.extendedTextMessage.contextInfo.quotedMessage.audioMessage : info.message.audioMessage
if (boij) {
owgi = await getFileBuffer(boij, 'audio')
const uploadRes = await axios.post(`${zerosite}/api/upload`, {
apikey: API_KEY_ZEROTWO,
media: owgi
}, {
headers: { 'Content-Type': 'multipart/form-data' }
})
if (uploadRes.data.status) {
return sendUrlText(from, uploadRes.data.resultado, `Link do áudio gerado com sucesso ↴`, '', link, uploadRes.data.resultado, selocarrinho)
} else {
reply('Erro ao gerar o link do áudio.')
}
}
}
} else {
reply("Você deve marcar uma imagem, vídeo ou áudio.")
}
} catch (error) {
console.log('Erro:', error)
reply('Ocorreu um erro ao gerar o link. Tente novamente mais tarde.')
}
break

case 'uploadapi':
reagir(from, "💾")
try {//By: 𖧄 𝐋𝐔𝐂𝐀𝐒 𝐌𝐎𝐃 𝐃𝐎𝐌𝐈𝐍𝐀 𖧄
let media, type, mimetype
if (isQuotedSticker || (info.message.stickerMessage && info.message.stickerMessage.mimetype === 'image/webp')) {
media = isQuotedSticker ? info.message.extendedTextMessage.contextInfo.quotedMessage.stickerMessage : info.message.stickerMessage
mimetype = 'image/webp'
type = 'sticker'
} else if (isQuotedImage || isImage) {
media = isQuotedImage ? info.message.extendedTextMessage.contextInfo.quotedMessage.imageMessage : info.message.imageMessage
mimetype = media.mimetype
type = 'image'
} else if (isQuotedVideo || isVideo) {
media = isQuotedVideo ? info.message.extendedTextMessage.contextInfo.quotedMessage.videoMessage : info.message.videoMessage
mimetype = media.mimetype
type = 'video'
} else if (isQuotedAudio || isAudio) {
media = isQuotedAudio ? info.message.extendedTextMessage.contextInfo.quotedMessage.audioMessage : info.message.audioMessage
mimetype = media.mimetype
type = 'audio'
} else if (isQuotedDocument || isDocument) {
media = isQuotedDocument ? info.message.extendedTextMessage.contextInfo.quotedMessage.documentMessage : info.message.documentMessage
mimetype = media.mimetype
type = mimetype.split('/')[0]
} else {
return reply('❌ Marque uma Imagem, Vídeo, Áudio, Sticker ou Documento.')
}
const ext = mimetype.split('/').pop()
const validExtensions = { mpeg: 'mp3', m4a: 'mp3' }
const finalExt = validExtensions[ext] || ext
const tempFile = `temp_${Date.now()}.${finalExt}`
const fileBuffer = await getFileBuffer(media, type)
fs.writeFileSync(tempFile, fileBuffer)
console.log(`🟢 Enviando arquivo para a API: ${tempFile}`)
const FormData = require('form-data')
const form = new FormData()
form.append('file', fs.createReadStream(tempFile))
const response = await axios.post('https://zero-two.info/upload', form, {
headers: { ...form.getHeaders() }
})
if (!response || !response.data || !response.data.fileUrl) {
throw new Error('❌ Sem resposta válida da API de upload.')
}
const fileUrl = response.data.fileUrl
const fileExtension = fileUrl.split('.').pop()
if (fileExtension === 'webp' && type === 'sticker') {
reply(`🖼️ É uma figurinha.\n\n🔗 *LINK:* ${fileUrl}`)
nahida.sendMessage(from, { sticker: fileBuffer }, { quoted: selocarrinho })
} else if (['jpg', 'jpeg', 'png', 'gif'].includes(fileExtension)) {
reply('🖼️ É uma imagem.')
nahida.sendMessage(from, { image: fileBuffer, caption: `🔗 *LINK:* ${fileUrl}` }, { quoted: selocarrinho })
} else if (['mp4'].includes(fileExtension)) {
reply('🎥 É um vídeo.')
nahida.sendMessage(from, { video: fileBuffer, caption: `🔗 *LINK:* ${fileUrl}` }, { quoted: selocarrinho })
} else if (['mp3', 'wav'].includes(fileExtension)) {
reply(`🎵 É um áudio.\n\n🔗 *LINK:* ${fileUrl}`)
nahida.sendMessage(from, { audio: { url: fileUrl }, mimetype: "audio/mpeg", ptt: true }, { quoted: selocarrinho })
} else {
reply('📄 É um documento.')
nahida.sendMessage(from, { document: fileBuffer, caption: `🔗 *LINK:* ${fileUrl}`, mimetype, fileName: `arquivo.${fileExtension}` }, { quoted: selocarrinho })
}
console.log(`🟢 Arquivo enviado com sucesso: ${fileUrl}`)
fs.unlinkSync(tempFile)
} catch (error) {
console.error('❌ Erro no upload:', error)
reply('❌ Ocorreu um erro durante o upload.')
}
break

case 'gemini':
if (!q) return reply(`🌟 *Atenção:* Por favor, informe sua pergunta para que o Gemini possa ajudar. Você também pode mencionar uma imagem com o comando e fazer uma pergunta ao Gemini sobre a imagem.\n\n*• Exemplo:* ${prefix + comando} Olá, tudo bem?\n\n*• Sobre:* Este comando utiliza o modelo Gemini-pro.`)
try {
const prompt = q
let imageUrl = null
if (isQuotedImage || isMedia) {
let post
if (isQuotedImage) {
post = JSON.parse(JSON.stringify(info).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo.message.imageMessage
} else if (isMedia) {
post = info.message.imageMessage
}
const imagem = await downloadContentFromMessage(post, 'image')
if (!imagem || imagem.length === 0) {
return reply("😔 _Erro ao processar a imagem. Por favor, tente novamente._")
}
let buffer = Buffer.from([])
for await (const chunk of imagem) {
buffer = Buffer.concat([buffer, chunk])
}
imageUrl = await upload(buffer)
if (!imageUrl) {
return reply("😔 _Erro ao obter o link da imagem após o upload._")
}
}
const apiUrl = `${zerosite}/gemini/texto/imagem?query=${encodeURIComponent(prompt)}${imageUrl ? `&imageUrl=${encodeURIComponent(imageUrl)}` : ''}&apikey=${API_KEY_ZEROTWO}`
const { data } = await axios.get(apiUrl)
if (data.status) {
const caption = `🌟 *Gemini Respondeu:*\n\n${data.resposta}`
if (data.url) {
nahida.sendMessage(from, { image: { url: data.url }, caption: caption }, {quoted: selocarrinho})
} else {
reply(caption)
}
} else {
reply("😔 _Erro ao obter resposta da API Gemini._")
}
} catch (e) {
console.error(e)
return reply("😔 _Ocorreu um erro ao processar sua solicitação. Por favor, tente novamente._")
}
break

case 'play':
try {
reagir(from, "🎵")
if (!q) return reply(`${prefix + comando} link ou nome`)
if (!isUrl(q)) {
ABC = await fetchJson(zerosite + `/api/ytsrc?q=${q}&apikey=` + API_KEY_ZEROTWO)
data = ABC.resultado[0]
con = converterMin(Number((contarMin(data.timestamp || "5:32") / 100) * 30).toFixed(0))
ini = con.includes(`ser um`) ? `0:35` : con.slice(1, con.length)
thumb = [`anime`, `classic`, `dynamic`, `space`, `space2`]
img = zerosite + `/api/canvas/musicardbun/music?nome=${encodeURI(data.title || "indefinido")}&autor=${encodeURI(data?.author?.name || "indefinido")}&tipo=${encodeURI(thumb[alerandom(thumb.length)])}&opacity=75&thumb=${encodeURI(data.thumbnail || logoslink.logo)}&progresso=30&start=${encodeURI(ini)}&end=${encodeURI(data.timestamp || "5:32")}`
if (isGroup && !config.botoes) { 
carregamento(from, `▧⃯⃟𝙴𝚗𝚟𝚒𝚊𝚗𝚍𝚘 𝚂𝚞𝚊 𝙼ú𝚜𝚒𝚌𝚊.•🛸 ݈݇─`, info)
await sleep(3000) 
}
bla = `${!config.botoes ? `
╭━━ 🎵 𝐖𝐄𝐋𝐂𝐎𝐌𝐄 𝐌𝐔𝐒𝐈𝐂 𝐋𝐎𝐕𝐄𝐑𝐒 🎶 ━━╮
┃ ✨ Olá, *${pushname}*!
┃ 🎧 Prepare-se para sentir a vibe!
╰━━━━━━━━━━━━━━━━━━━━━━━╯
` : ``}

╭─╼🎼 *MÚSICA DETALHES* ╾─╮
┃ 🎙 *TÍTULO* : ${data.title}
┃ ⏱️ *DURAÇÃO* : ${data?.timestamp || "Indefinido"}
┃ 👀 *VIEWS* : ${Number(data?.views) > 0 ? largeNumber(data?.views) : "Indefinidas"}
┃ 📺 *CANAL* : ${data?.author?.name || "Indefinido"}
┃ 📅 *POSTADO* : ${data?.ago || "Indefinido"}
┃ 📝 *DESCRIÇÃO* : ${data?.description || "Sem descrição disponível"}
╰─────────────────────────╯
${!config.botoes ? `
╭━ 💖 𝐀𝐏𝐑𝐄𝐂𝐈𝐄 𝐒𝐄𝐌 𝐌𝐎𝐃𝐄𝐑𝐀ÇÃ𝐎 💖 ━╮
┃ 🤖 *BOT* : ${nomeBot}
┃ 👑 *DONO* : ${nomeDono}
┃ 🔊 *VOLUME* : ▰▰▰▰▰▰▰ 100%
╰━━━━━━━━━━━━━━━━━━━━━━━╯
✨ *Curta a música!* 🎶 ${tempo} 🥰
` : ``}`
audio = data.url
butao = [
{ type: `cmd`, text: `𝘼́𝙐𝘿𝙄𝙊 🎵`, command: `${prefix}play ${audio}` },
{ type: `cmd`, text: `𝙑𝙄́𝘿𝙀𝙊 🎥`, command: `${prefix}playvideo ${audio}` }
]
sendRouletteButton(from, { image: { url: img }, caption: bla, footer: nomeBot }, nahida, sender, butao, selocarrinho)
if (config.botoes) return
} else {
carregamento(from, `▧⃯⃟𝙴𝚗𝚟𝚒𝚊𝚗𝚍𝚘 𝚂𝚞𝚊 𝙼ú𝚜𝚒𝚌𝚊͘.•🛸 ݈݇─`, info)
await sleep(5000)
audio = q
}
await sleep(1000)
sendAudio(from, zerosite + `/api/dl/ytaudio2?url=${audio}&apikey=` + API_KEY_ZEROTWO, "audio/mpeg", selocarrinho).catch(e => {
return reply(downon)
})
} catch (e) {
console.log(e)
return reply(downoff)
}
break

case 'play2':
{
try {
if(!q) return reply(`${prefix+comando} link ou nome`)
reagir(from, "🔥")
zeroTwoCarregamento(from, `ৎ❥̤֟٭ۣۜ𝙴𝚗𝚟𝚒𝚊𝚗𝚍𝚘 𝚂𝚞𝚊 𝙼ú𝚜𝚒𝚌𝚊🍧.ᩦ୭✧ࣶᭂ`, selocarrinho)
data = await fetchJson(`${zerosite}/api/ytsrc/videos?q=${q}&apikey=`+API_KEY_ZEROTWO)
console.log(color('[PLAY 2]', 'magenta'), color(`PROCURANDO MÚSICA NO YT`, 'yellow')) 
nahida.sendMessage(from, {audio: {url: `${zerosite}/api/dl/ytaudio2?url=${data.resultado[0].url}&apikey=`+API_KEY_ZEROTWO}, fileName: data.resultado[0].title+'.mp3', mimetype: 'audio/mp4', ptt: true, headerType: 4, contextInfo: { externalAdReply: { title: data.resultado[0].title, body: data.resultado[0].description, showAdAttribution: true, thumbnail: await getBuffer(data.resultado[0].image), mediaType: 2, mediaUrl: data.resultado[0].url, sourceUrl: data.resultado[0].url}}}, {quoted: selocarrinho}).catch(e => {
return reply(downon)
})
} catch (e) {
console.log(e)
return reply(downoff)
}
}
break

case 'play3':
reagir(from, "🔥")
try {
if(!q) return reply(`> Exemplo:\n\n${prefix+comando} poze desabafo`)
await reply(`> Estou atendendo seu pedido [ ${pushname} ]`)
ABC = await fetchJson(`${zerosite}/api/ytsrc/videos?q=${q}&apikey=`+API_KEY_ZEROTWO)
data = ABC.resultado[0]
const buffer = await getBuffer(data.thumbnail) 
nahida.sendMessage(from, {audio: {url: `${zerosite}/api/dl/ytaudio2?url=${data.url}&apikey=`+API_KEY_ZEROTWO}, mimetype: "audio/mp4",
headerType: 4,
contextInfo: {
externalAdReply: {
title: `${nomeBot}`,
body:`0:00 ❍─────${data.timestamp} ↻ ⊲ Ⅱ ⊳ ↺`,
fileName: `❒ 𝚃í𝚝𝚞𝚕𝚘: ${data.title}`,
showAdAttribution: true,
thumbnail: buffer,
mediaType: 2,
mediaUrl: `https://www.youtube.com/@Otaku.mp4`,
sourceUrl: `https://www.youtube.com/@Otaku.mp4`}}}, {quoted: selocarrinho})
} catch (erro) {
console.log(erro)
}
break

case 'play4':
try {
reagir(from, "🎵")
if (!q) return reply(`${prefix + comando} link ou nome`)
if (!isUrl(q)) {
ABC = await fetchJson(zerosite + `/api/ytsrc?q=${q}&apikey=` + API_KEY_ZEROTWO);
data = ABC.resultado[0]
con = converterMin(Number((contarMin(data.timestamp || "5:32") / 100) * 30).toFixed(0))
ini = con.includes(`ser um`) ? `0:35` : con.slice(1, con.length)
thumb = [`anime`, `classic`, `dynamic`, `space`, `space2`]
img = zerosite + `/api/canvas/musicardbun/music?nome=${encodeURI(data.title || "indefinido")}&autor=${encodeURI(data?.author?.name || "indefinido")}&tipo=${encodeURI(thumb[alerandom(thumb.length)])}&opacity=75&thumb=${encodeURI(data.thumbnail || logoslink.logo)}&progresso=30&start=${encodeURI(ini)}&end=${encodeURI(data.timestamp || "5:32")}`
if (isGroup) { 
carregamento(from, `▧⃯⃟𝙴𝚗𝚟𝚒𝚊𝚗𝚍𝚘 𝚂𝚞𝚊 𝙼ú𝚜𝚒𝚌𝚊.•🛸 ݈݇─`, info)
await sleep(3000)
}
bla = `
╭━━ 🎵 𝐖𝐄𝐋𝐂𝐎𝐌𝐄 𝐌𝐔𝐒𝐈𝐂 𝐋𝐎𝐕𝐄𝐑𝐒 🎶 ━━╮
┃ ✨ Olá, *${pushname}*!
┃ 🎧 Prepare-se para sentir a vibe!
╰━━━━━━━━━━━━━━━━━━━━━━━╯

╭─╼🎼 *MÚSICA DETALHES* ╾─╮
┃ 🎙 *TÍTULO* : ${data.title}
┃ ⏱️ *DURAÇÃO* : ${data?.timestamp || "Indefinido"}
┃ 👀 *VIEWS* : ${Number(data?.views) > 0 ? largeNumber(data?.views) : "Indefinidas"}
┃ 📺 *CANAL* : ${data?.author?.name || "Indefinido"}
┃ 📅 *POSTADO* : ${data?.ago || "Indefinido"}
┃ 📝 *DESCRIÇÃO* : ${data?.description || "Sem descrição disponível"}
╰─────────────────────────╯

╭━ 💖 𝐀𝐏𝐑𝐄𝐂𝐈𝐄 𝐒𝐄𝐌 𝐌𝐎𝐃𝐄𝐑𝐀ÇÃ𝐎 💖 ━╮
┃ 🤖 *BOT* : ${nomeBot}
┃ 👑 *DONO* : ${nomeDono}
┃ 🔊 *VOLUME* : ▰▰▰▰▰▰▰ 100%
╰━━━━━━━━━━━━━━━━━━━━━━━╯
✨ *Curta a música!* 🎶 ${tempo} 🥰`
await sendImage(from, img, bla, info)
audio = data.url
} else {
carregamento(from, `▧⃯⃟𝙴𝚗𝚟𝚒𝚊𝚗𝚍𝚘 𝚂𝚞𝚊 𝙼ú𝚜𝚒𝚌𝚊.•🛸 ݈݇─`, info)
await sleep(5000)
audio = q
}
await sleep(1000)
sendAudio(from, zerosite + `/api/dl/ytaudio2?url=${audio}&apikey=` + API_KEY_ZEROTWO, "audio/mpeg", selocarrinho)
.catch(e => reply(downon))
} catch (e) {
console.log(e)
return reply(downoff)
}
break

case 'playvideo':
setTimeout(() => {reagir(from, "🎥")}, 300)
try {
if(!q) return reply(`${prefix+comando} link ou nome`)
if(!isUrl(q)) {
reply(`⇒𝙿𝚎𝚜𝚚𝚞𝚒𝚜𝚊: _"${q}"_`)
setTimeout(async() => {
nahida.sendMessage(from, {text: `ৎ❥̤֟٭ۣۜ𝙴𝚗𝚟𝚒𝚊𝚗𝚍𝚘 𝚅í𝚍𝚎𝚘🍧.ᩦ୭✧ࣶᭂ`})
}, 1100)
ABC = await fetchJson(`${zerosite}/api/ytsrc?q=${q}&apikey=${API_KEY_ZEROTWO}`)
data = ABC.resultado[0]
bla = `
❬❬ [B̲̲̅̅E̲̲̅̅M̲̲̅̅ ̲̲̅̅V̲̲̅̅I̲̲̅̅N̲̲̅̅D̲̲̅̅O̲̲̅̅(̲̲̅̅A̲̲̅̅)̲̲̅♬̅] ❭❭
𖡋ꦿ@${sender.split('@')[0]}♪

🎙️❒ 𝚃í𝚝𝚞𝚕𝚘: ${data.title}
⏰❒ 𝚃𝚎𝚖𝚙𝚘: ${data?.timestamp || "indefinido"}
🔎❒ 𝚅𝚒𝚜𝚞𝚊𝚕𝚒𝚣𝚊çõ𝚎𝚜: ${data.views}
🎞️❒ 𝙲𝚊𝚗𝚊𝚕: ${data?.author?.name || "indefinido"}
📹❒ 𝙿𝚘𝚜𝚝𝚊𝚍𝚘: ${data?.ago || "indefinido"}
🗞️❒ 𝙳𝚎𝚜𝚌𝚛𝚒çã𝚘: ${data?.description || "indefinida"}

0:35 ━❍────────-${data.timestamp || "5:32"} ↻ ⊲ Ⅱ ⊳ ↺
VOLUME: ▁▂▃▄▅▆▇ 100%

${tempo}❣️
ılı.lıllılı.ıllı..ılı.lıllılı.ıllı`
link = data.url
} else {link = q
bla = ``}
sendVideo(from, zerosite+`/api/dl/ytvideo2?url=${link}&apikey=`+API_KEY_ZEROTWO, bla, selocarrinho).catch(e => {
return reply(downon)
})
function getRandomAudioEndpoint() {
const endpoints = ['ytvideo', 'ytvideo2', 'ytvideo3', 'ytvideo4']
return endpoints[Math.floor(Math.random() * endpoints.length)]
}
const randomEndpoint = getRandomAudioEndpoint()
sendVideo(from, zerosite+`/api/dl/${randomEndpoint}?url=${link}&apikey=`+API_KEY_ZEROTWO, bla, selocarrinho ).catch(e => {
return reply(downon)
})
} catch (e) {
return reply(downoff)
}
break

case 'playvideo2':
setTimeout(() => { reagir(from, "🎥") }, 300)
try {
if (!q) return reply(`${prefix + comando} link ou nome`)
let link, bla
reply(`⇒ 𝙿𝚎𝚜𝚚𝚞𝚒𝚜𝚊: _"${q}"_`)
if (!isUrl(q)) {
const videoInfo = await fetchJson(`${zerosite}/api/ytsrc?q=${q}&apikey=${API_KEY_ZEROTWO}`)
if (videoInfo?.resultado?.[0]) {
const data = videoInfo.resultado[0]
bla = `
❬❬ [B̲̲̅̅E̲̲̅̅M̲̲̅̅ ̲̲̅̅V̲̲̅̅I̲̲̅̅N̲̲̅̅D̲̲̅̅O̲̲̅̅(̲̲̅̅A̲̲̅♬̅] ❭❭
𖡋ꦿ@${sender.split('@')[0]}♪

🎙️❒ 𝚃𝚒𝚝𝚞𝚕𝚘: ${data.title}
⏰❒ 𝚃𝚎𝚖𝚙𝚘: ${data?.timestamp || "indefinido"}
🔎❒ 𝚅𝚒𝚜𝚞𝚊𝚕𝚒𝚣𝚊çõ𝚎𝚜: ${data.views}
🎞️❒ 𝙲𝚊𝚗𝚊𝚕: ${data?.author?.name || "indefinido"}
📹❒ 𝙿𝚘𝚜𝚝𝚊𝚍𝚘: ${data?.ago || "indefinido"}
🗞️❒ 𝙳𝚎𝚜𝚌𝚛𝚒çã𝚘: ${data?.description || "indefinida"}

0:35 ━❍────────-${data.timestamp || "5:32"} ↻ ⊲ Ⅱ ⊳ ↺
VOLUME: ▁▂▃▄▅▆▇ 100%

${tempo}❣️
ılı.lıllılı.ıllı..ılı.lıllılı.ıllı
`
link = data.url
} else {
throw new Error("Vídeo não encontrado")
}
} else {
link = q
bla = ''
}
await sendVideo(from, `${zerosite}/api/dl/ytvideo2?url=${link}&apikey=${API_KEY_ZEROTWO}`, bla, info)
} catch (error) {
console.log("Erro ao processar o comando playvideo:", error)
return reply("Erro ao processar o download do vídeo. Tente novamente mais tarde.")
}
break

case 'playdoc': case 'pdoc':
if(!q) return reply("KD o nome da música?")
try {
ABC = await fetchJson(`${zerosite}/api/ytsrc?q=${q}&apikey=${API_KEY_ZEROTWO}`)
data = ABC.resultado[0]
txt = `
⟬ ${nomeBot} ⟭

🎙️❒ 𝚃í𝚝𝚞𝚕𝚘: ${data.title}
⏰❒ 𝚃𝚎𝚖𝚙𝚘: ${data?.timestamp || "indefinido"}
🔎❒ 𝚅𝚒𝚜𝚞𝚊𝚕𝚒𝚣𝚊çõ𝚎𝚜: ${data.views}
🎞️❒ 𝙲𝚊𝚗𝚊𝚕: ${data?.author?.name || "indefinido"}
📹❒ 𝙿𝚘𝚜𝚝𝚊𝚍𝚘: ${data.ago || "indefinido"}
🗞️❒ 𝙳𝚎𝚜𝚌𝚛𝚒çã𝚘: ${data.description || "indefinida"}
`
reply(`ৎ❥̤֟٭ۣۜ𝙴𝚗𝚟𝚒𝚊𝚗𝚍𝚘 𝚂𝚞𝚊 𝙼ú𝚜𝚒𝚌𝚊🍧.ᩦ୭✧ࣶᭂ`)
nahida.sendMessage(from, {document: {url: `${zerosite}/api/dl/ytaudio2?url=${data.url}&apikey=`+API_KEY_ZEROTWO}, caption: txt, mimetype: 'audio/mp4', fileName: data.title+".m4a", fileLength: 1000000 * ((Number(data.timestamp.replace(":", "") || 420) / 100) * (alerandom(1) + 1)), contextInfo: {externalAdReply: {title: nomeBot, body: '', mediaType: 1, thumbnail: await getBuffer(`${data.thumbnail}`), showAdAttribution: true, renderLargerThumbnail: true, sourceUrl: data.url}}}, {quoted: selocarrinho})
} catch(e) {
console.log(e)
reply("Erro")
}
break

case 'playdoc2': case 'pdoc2':
if(!q) return reply("KD o nome da vídeo?")
try {
ABC = await fetchJson(`${zerosite}/api/ytsrc?q=${q}&apikey=${API_KEY_ZEROTWO}`)
data = ABC.resultado[0]
txt = `
⟬ ${nomeBot} ⟭

🎙️❒ 𝚃í𝚝𝚞𝚕𝚘: ${data.title}
⏰❒ 𝚃𝚎𝚖𝚙𝚘: ${data?.timestamp || "indefinido"}
🔎❒ 𝚅𝚒𝚜𝚞𝚊𝚕𝚒𝚣𝚊çõ𝚎𝚜: ${data.views}
🎞️❒ 𝙲𝚊𝚗𝚊𝚕: ${data?.author?.name || "indefinido"}
📹❒ 𝙿𝚘𝚜𝚝𝚊𝚍𝚘: ${data.ago || "indefinido"}
🗞️❒ 𝙳𝚎𝚜𝚌𝚛𝚒çã𝚘: ${data.description || "indefinida"}
`
reply( `ৎ❥̤֟٭ۣۜ𝙴𝚗𝚟𝚒𝚊𝚗𝚍𝚘 𝚅í𝚍𝚎𝚘🍧.ᩦ୭✧ࣶᭂ`)
nahida.sendMessage(from, {document: {url: `${zerosite}/api/dl/ytvideo2?url=${data.url}&apikey=`+API_KEY_ZEROTWO}, caption: txt, mimetype: 'video/mp4', fileName: data.title+".mp4", fileLength: 1000000 * ((Number(data.timestamp.replace(":", "") || 204) / 10) * (alerandom(2) + 1)), contextInfo: {externalAdReply: {title: nomeBot, body: '', mediaType: 1, thumbnail: await getBuffer(`${data.thumbnail}`), showAdAttribution: true, renderLargerThumbnail: true, sourceUrl: data.url}}}, {quoted: selocarrinho})
} catch(e) {
console.log(e)
reply("Erro")
}
break

case 'playlist':
reagir(from, react2)
try {
if(!q) return reply(`Digite o nome de algum vídeo ou música que deseja encontrar..`)
ABC = await fetchJson(zerosite+`/api/ytsrc?q=${encodeURI(q)}&apikey=`+API_KEY_ZEROTWO)
caixa = []
for(a = 0 ; a < ABC.resultado.length; a++) {
i = ABC.resultado[a]
caixa.push({title: `RESULTADO ${a + 1}`, options: [{name: `🎵 ÁUDIO`, title: i.title, body: i.description, command: prefix+`play `+i.url}, {name: `🎥 VÍDEO`, title: i.title, body: i.description, command: prefix+`playvideo2 `+i.url}]})
}
if(caixa.length <= 0) return reply(`Sem resultados disponíveis..`)
ytresult = ABC.resultado[0]
if(isGroup) return sendUrlText(from, ABC.resultado.map(r =>
`🎙️ 𝕋𝕀́𝕋𝕌𝕃𝕆: ${r.title}
⏰ 𝕋𝔼𝕄ℙ𝕆: ${r?.timestamp || "indefinido"}
📹 ℙ𝕆𝕊𝕋𝔸𝔻𝕆: ${r?.ago || "indefinido"}
🎞️ ℂ𝔸ℕ𝔸𝕃: ${r?.author?.name || "indefinido"}
📎 𝕌ℝ𝕃: ${r.url}`).join(`\n${`-`.repeat(40)}\n`), `📼 YT SEARCH - ${ytresult.title}`, (ytresult?.timestamp || `00:00`) + ` - ` + (ytresult?.author?.name || `indefinido`), ytresult.thumbnail, ytresult.url, selocarrinho)
sendRouletteButton(sender, {image: {url: ytresult.thumbnail}, caption: `📼 YT SEARCH - Exibindo ${ABC.resultado.length} resultados 🕹`, footer: `Escolha áudio ou vídeo...`}, zerotwo, sender, [{type: `list`, title: `💢 RESULTADOS 💢`, rowId: caixa}], selocarrinho)
} catch (e) {
console.log(e)
return reply(`Erro 404`)
}
break

case 'playstore':
if(!q) return reply(`KD o nome do app ?`)
try {
ABC = await fetchJson(`${zerosite}/api/playstore?nome=${encodeURI(q)}&apikey=`+API_KEY_ZEROTWO)
i = ABC.pesquisa.resultado[0]
txt = `
❪🏷️ฺ࣭࣪͘ꕸ▸ 𝙽𝚘𝚖𝚎৴▸ ${i.nome}
❪📟ฺ࣭࣪͘ꕸ▸ 𝙳𝚎𝚜𝚎𝚗𝚟𝚘𝚕𝚟𝚎𝚍𝚘𝚛৴▸ ${i.desenvolvedor}
❪⭐ฺ࣭࣪͘ꕸ▸ 𝙰𝚟𝚊𝚕𝚒𝚊çã𝚘৴▸ ${i.estrelas}
𖡋ꦿ𝙻𝚒𝚗𝚔ฺ࣭࣪͘ꕸ▸ ${i.link}
`
nahida.sendMessage(from, {text: txt, contextInfo: {
externalAdReply: {
title: `🎮 𝙋𝙇𝘼𝙔 𝙎𝙏𝙊𝙍𝙀 🎮`,
body: ``,
thumbnail: await getBuffer(i.imagem),
mediaType: 1,
sourceUrl: i.link
}, forwardingScore: 1000000, isForwarded: true, forwardedNewsletterMessageInfo: {newsletterJid: channel }}}, {quoted: selocarrinho})
} catch {
reply(`Não encontrei nenhum app, ou pode ser que a api caiu`)
}
break

case 'ytsearch':
if(q.trim().length < 4) return reply(`> Exemplo: ${prefix+comando} Mc Cabelinho`)
try {
ABC = await fetchJson(`${zerosite}/api/ytsrc/videos?q=${q}&apikey=`+API_KEY_ZEROTWO)
console.log(color('[YT PLAY SEARCH]', 'magenta'), color(`FAZENDO PESQUISAR QUE FOI SOLICITADA NO YT`, 'yellow')) 
RST = `> 🎥 [Total: ${ABC.resultado.length}] – *Pesquisa YouTube:*\n• Deseja realizar o download do áudio? Use o comando: *${prefix}ytall [link]*\n• Fazer download do vídeo? É fácil! Só usar o comando: *${prefix}ytall [link]*\n–\n`
RST += `${ABC.resultado.map((v, index) => `*${index+1}.* Link: *${v.url}*\n• Título: *${v.title}*\n• Duração: *${v.duration.timestamp} | ${v.duration.seconds} segundos.*`).join('\n–\n')}`
reply(RST)
} catch(e) {
return reply(`> Erro 404`)
}
break

case 'tiktokstalk':
if (!q) return reply('❯❯〘 ⚠️ Você precisa fornecer um nome de usuário do Instagram! ⚠️〙❮❮')
try {//By: 𖧄 𝐋𝐔𝐂𝐀𝐒 𝐌𝐎𝐃 𝐃𝐎𝐌𝐈𝐍𝐀 𖧄
nahida.sendMessage(from, { react: { text: `🙇🏻‍♀️`, key: info.key }})
const tiktokApiUrl = `${zerosite}/api/tiktokstalker?usuario=${q}&apikey=`+API_KEY_ZEROTWO
const response = await fetchJson(tiktokApiUrl)
if (response && response.resultado) {
const data = response.resultado
const tiktokMessage = `
❯❯ ${nomeBot} - TIKTOK STALK ❮❮

*❒᭄➭ Nome de usuário:* ${data.usuário}
*❒᭄➭ Nome:* ${data.nome}
*❒᭄➭ Seguidores:* ${data.seguidores}
*❒᭄➭ Seguindo:* ${data.seguindo}
*❒᭄➭ Descrição:* ${data.descrição}
`
await nahida.sendMessage(from, {image: { url: data.profile_photo }, caption: tiktokMessage}, {quoted: selocarrinho})
} else {
await nahida.sendMessage(from, { text: '❯❯〘 ⚠️ Não foi possível encontrar informações para este usuário. ⚠️〙❮❮' }, {quoted: selocarrinho})
}
} catch (error) {
if (error.code === 'ECONNREFUSED') {
await nahida.sendMessage(from, { text: '❯❯〘 ⚠️ Não foi possível conectar ao servidor. Por favor, tente novamente mais tarde. ⚠️〙❮❮' }, {quoted: selocarrinho})
} else {
console.log(error)
await nahida.sendMessage(from, { text: '❯❯〘 ⚠️ Ocorreu um erro ao tentar buscar as informações do TikTok! ⚠️〙❮❮' }, {quoted: selocarrinho})
}
}
break

case 'tiktokviews':
try {//By: 𖧄 𝐋𝐔𝐂𝐀𝐒 𝐌𝐎𝐃 𝐃𝐎𝐌𝐈𝐍𝐀 𖧄
//Canal: https://whatsapp.com/channel/0029Va6riekH5JLwLUFI7P2B
if (!q || !q.includes("/")) {
console.log("[LOG] Erro: Argumentos ausentes ou mal formatados.")
return reply(`❌ *Uso incorreto!*\n\n📌 *Exemplo:* \n${prefix + comando} LUCAS_MOD_DOMINA/https://vm.tiktok.com/ZMk48S1An/`)
}
const input = q.split("/")
const username = input.shift().trim()
let videolink = input.join("/").trim()
if (!videolink.startsWith("http")) {
videolink = "https://" + videolink
}
videolink = videolink.replace(/^https:\/\/https:\/\//, "https://")
if (!videolink.startsWith("http")) {
console.log("[LOG] Erro: Link do vídeo inválido.")
return reply("❌ *Erro:* O link do vídeo deve ser um URL válido do TikTok.")
}
const apiUrl = `https://lkteamtiktokvisits.vercel.app/boost?user=${encodeURIComponent(username)}&link=${encodeURIComponent(videolink)}`
reply("⏳ *Processando...* Aguarde enquanto enviamos as visualizações.\n⚠ *Atenção:* A API possui um limite de 1.000 visualizações por dia.")
fetch(apiUrl)
.then(response => {
console.log(`[LOG] Resposta da API recebida. Status: ${response.status}`)
if (!response.ok) throw new Error(`Erro na API: ${response.statusText}`)
return response.json()
})
.then(data => {
console.log(`[LOG] Dados da API: ${JSON.stringify(data)}`)
if (data.message) {
const message = 
`╭━━━『 🚀 *IMPULSO TIKTOK* 』━━━⬣\n` +
`┃ 👤 *Usuário:* ${username}\n` +
`┃ 🔗 *Vídeo:* ${videolink}\n` +
`┃ 🎯 *Status:* ${data.message}\n` +
`╰━━━━━━━━━━━━━━━━━━━━⬣`
nahida.sendMessage(from, { image: { url: "https://api.telegram.org/file/bot6369612385:AAGvQkKlh_BHBJbs9zH8rorSM84W9xQwlno/photos/file_50.jpg" }, caption: message }, { quoted: selocarrinho })
} else {
console.log("[LOG] Erro: Resposta inesperada da API.")
reply("❌ Ocorreu um erro ao enviar as visualizações.")
}
})
.catch(error => {
console.log("[ERRO] Falha ao se conectar com a API:", error)
reply("⚠ [ERRO] Falha ao se conectar com a API.")
})
} catch (error) {
console.log("[ERRO] Erro inesperado:", error)
reply("⚠ [ERRO] Ocorreu um erro inesperado.")
}
break

case 'igstalk':
if (!q) return reply('❯❯〘 ⚠️ Você precisa fornecer um nome de usuário do Instagram! ⚠️〙❮❮')
try {//By: 𖧄 𝐋𝐔𝐂𝐀𝐒 𝐌𝐎𝐃 𝐃𝐎𝐌𝐈𝐍𝐀 𖧄
//Canal: https://whatsapp.com/channel/0029Va6riekH5JLwLUFI7P2B
nahida.sendMessage(from, { react: { text: `🙇🏻‍♀️`, key: info.key } })
const apiUrl = `${zerosite}/api/instagram/user?username=${q}&apikey=${API_KEY_ZEROTWO}`
const response = await fetchJson(apiUrl)
if (response && response.resultado) {
const data = response.resultado
const message = `
❯❯ ${nomeBot} - INSTAGRAM STALK ❮❮

*❒᭄➭ Nome de usuário:* ${data.username}
*❒᭄➭ Nome completo:* ${data.fullname || 'Não informado'}
*❒᭄➭ Posts:* ${data.post_count || 0}
*❒᭄➭ Seguidores:* ${data.followers || 0}
*❒᭄➭ Seguindo:* ${data.following || 0}
*❒᭄➭ Biografia:* ${data.biography || 'Não disponível'}
*❒᭄➭ URL da biografia:* ${data.external_url || 'Não disponível'}
*❒᭄➭ Conta privada:* ${data.is_private ? 'Sim' : 'Não'}
*❒᭄➭ Conta verificada:* ${data.is_verified ? 'Sim' : 'Não'}
*❒᭄➭ Vídeos no IGTV:* ${data.total_igtv_videos || 0}
*❒᭄➭ É conta de negócios:* ${data.is_business ? 'Sim' : 'Não'}
*❒᭄➭ Tem vídeos:* ${data.has_videos ? 'Sim' : 'Não'}
*❒᭄➭ Possui reels destacados:* ${data.has_highlight_reels ? 'Sim' : 'Não'}

*❒᭄➭ Criador da API:* ${response.criador || "Não informado"}
`
await nahida.sendMessage(from, { image: { url: data.hd_profile_pic_url_info.url }, caption: message }, { quoted: selocarrinho })
} else {
await nahida.sendMessage(from, { text: '❯❯〘 ⚠️ Não foi possível encontrar informações para este usuário. ⚠️〙❮❮' }, { quoted: selocarrinho })
}
} catch (error) {
if (error.code === 'ECONNREFUSED') {
await nahida.sendMessage(from, { text: '❯❯〘 ⚠️ Não foi possível conectar ao servidor. Por favor, tente novamente mais tarde. ⚠️〙❮❮' }, { quoted: selocarrinho })
} else {
console.log(error)
await nahida.sendMessage(from, { text: '❯❯〘 ⚠️ Ocorreu um erro ao tentar buscar as informações do Instagram! ⚠️〙❮❮' }, { quoted: selocarrinho })
}
}
break

case 'whatsappstalk':
if (!q) return reply('❯❯〘 ⚠️ Você precisa fornecer o link do canal do WhatsApp! ⚠️〙❮❮')
try {//By: 𖧄 𝐋𝐔𝐂𝐀𝐒 𝐌𝐎𝐃 𝐃𝐎𝐌𝐈𝐍𝐀 𖧄
//Canal: https://whatsapp.com/channel/0029Va6riekH5JLwLUFI7P2B
nahida.sendMessage(from, { react: { text: `🔍`, key: info.key }})
const whatsappChannelApiUrl = `${zerosite}/api/stalker/whatsapp-channel?url=${q}&apikey=${API_KEY_ZEROTWO}`
const response = await fetchJson(whatsappChannelApiUrl)
if (response && response.status) {
const data = response.resultado
const channelMessage = `
❯❯ ${nomeBot} - WHATSAPP CHANNEL STALK ❮❮

*❒᭄➭ Criador:* ${response.criador}
*❒᭄➭ Nome do Canal:* ${data.channelName}
*❒᭄➭ Seguidores:* ${data.followersCount}
*❒᭄➭ Descrição:* ${data.description}

----------------------------------------------------------------
🔗 *Link do Canal:* ${q}
----------------------------------------------------------------
`
await nahida.sendMessage(from, { image: { url: data.imageUrl }, caption: channelMessage }, { quoted: selocarrinho })
} else {
await nahida.sendMessage(from, { text: '❯❯〘 ⚠️ Não foi possível encontrar informações para este canal. ⚠️〙❮❮' }, { quoted: selocarrinho })
}
} catch (error) {
if (error.code === 'ECONNREFUSED') {
await nahida.sendMessage(from, { text: '❯❯〘 ⚠️ Não foi possível conectar ao servidor. Por favor, tente novamente mais tarde. ⚠️〙❮❮' }, { quoted: selocarrinho })
} else {
console.log(error)
await nahida.sendMessage(from, { text: '❯❯〘 ⚠️ Ocorreu um erro ao tentar buscar as informações do canal do WhatsApp! ⚠️〙❮❮' }, { quoted: selocarrinho })
}
}
break

case 'igstory':
case 'instastory':
if (!q) return reply(`⏤͟͟͞͞⃝Cadê o *Usuário Da Pessoa* Que Você Deseja Stalkear?\nExemplo: ${prefix + comando} @alok`)
try {//By: 𖧄 𝐋𝐔𝐂𝐀𝐒 𝐌𝐎𝐃 𝐃𝐎𝐌𝐈𝐍𝐀 𖧄
//Canal: https://whatsapp.com/channel/0029Va6riekH5JLwLUFI7P2B
nahida.sendMessage(from, { react: { text: `⬇️`, key: info.key } })
reply(`*_Fazendo download... Aguarde um momento_* 🚨`)
let apiUrl = `${zerosite}/api/instagram/stories?username=${q.replace("@", "")}&apikey=${API_KEY_ZEROTWO}`
let response = await fetch(apiUrl)
let result = await response.json()
if (!result || !result.status || !result.resultado) {
console.log(chalk.red('[LOG] Retorno da API inválido ou erro no servidor.'))
return reply(`Não foi possível encontrar este perfil no Instagram ou a API está fora do ar.`)
}
let perfil = result.resultado
if (!perfil.stories_count || perfil.stories_count <= 0) {
console.log(chalk.red('[LOG] Nenhum story encontrado ou perfil privado.'))
return reply(`Não há stories disponíveis para este perfil, ou pode ser que a conta seja privada 🔒`)
}
if (perfil && perfil.graphql && perfil.graphql.user && perfil.graphql.user.profile_pic_url) {
const profilePicUrl = perfil.graphql.user.profile_pic_url
const imageResponse = await fetch(profilePicUrl)
if (!imageResponse.ok) throw new Error('Falha ao obter a imagem da URL')
const arrayBuffer = await imageResponse.arrayBuffer()
const imageBuffer = Buffer.from(arrayBuffer)
const uploadedImageUrl = await uploadToCloudinary(imageBuffer)
let captionPerfil = `📝 *Informações do Perfil:*\n\n` +
`👤 *Usuário:* @${q.replace("@", "")}\n` +
`📸 *Nome:* ${perfil.graphql.user.full_name || "Nome não disponível"}\n` +
`🔒 *Conta Privada:* ${perfil.graphql.user.is_private ? "Sim" : "Não"}\n` +
`📊 *Stories Disponíveis:* ${perfil.stories_count || "0"}\n` +
`🔗 *Link do Perfil:* https://instagram.com/${q.replace("@", "")}`
await nahida.sendMessage(from, { image: { url: uploadedImageUrl }, caption: captionPerfil }, { quoted: selocarrinho })
} else {
console.log(chalk.red('[LOG] Imagem de perfil não encontrada.'))
}
const aviso = `⚠️ *Preparando envio de stories do perfil @${q.replace("@", "")}...*\n\n` +
`_Aguarde enquanto processamos os ${perfil.stories_count} stories disponíveis._`
await nahida.sendMessage(from, { text: aviso }, {quoted: selocarrinho})
let stories = perfil.stories || []
for (let index = 0; index < stories.length; index++) {
let story = stories[index]
let caption = `Story ${index + 1} do perfil @${q.replace("@", "")}`
if (!story.url) {
console.log(chalk.red(`[ERRO] URL inválida no story ${index + 1}. Ignorando...`));
continue
}
if (story.type === 'image') {
await sleep(1000)
await nahida.sendMessage(from, { image: { url: story.url }, caption }, { quoted: selocarrinho })
} else if (story.type === 'video') {
await sleep(3000)
await nahida.sendMessage(from, { video: { url: story.url }, caption }, { quoted: selocarrinho })
}
}
} catch (e) {
console.log(chalk.red('[ERRO] Ocorreu um erro durante a execução do comando:'), e)
return reply(`Não foi possível encontrar esse perfil no Instagram, ou pode ser que a API esteja fora do ar...`)
}
break

case 'ytstalk':
if (!q) return reply(`Cadê o canal do YouTube que você deseja pesquisar? \n*Exemplo:* ${prefix + comando} @Otaku.mp4`)
nahida.sendMessage(from, { react: { text: `🔍`, key: info.key }})
try {//By: 𖧄 𝐋𝐔𝐂𝐀𝐒 𝐌𝐎𝐃 𝐃𝐎𝐌𝐈𝐍𝐀 𖧄
console.log(color('[YOUTUBE STALK]', 'magenta'), color(`BUSCANDO INFORMAÇÕES DO CANAL NO YOUTUBE`, 'yellow'))
res = await fetchJson(`${zerosite}/vip/youtube-channel?query=${encodeURIComponent(q)}&apikey=`+API_KEY_ZEROTWO)
let channel = res.resultado[0]
let responseMessage = `*⏤͟͟͞͞⃝💨Nome do Canal*: ${channel.channel_name}\n` +
`*⏤͟͟͞͞⃝📅Criado em*: ${new Date(channel.channel_created).toLocaleDateString()}\n` +
`*⏤͟͟͞͞⃝📝Sobre*: ${channel.channel_about}\n` +
`*⏤͟͟͞͞⃝🔔ID do Canal*: ${channel.channel_id}\n`
await nahida.sendMessage(from, {image: await getBuffer(channel.channel_picture.high.url), caption: responseMessage}, { quoted: selocarrinho }).catch(e => {
reply('*Vix, Api caiu ou não encontrei o canal informado.*')
})
} catch (e) {
if (String(e).includes("invalid json response body at")) {
console.log("A api caiu ou não foi possível executar esta ação, espere retornar")
} else {//By: 𖧄 𝐋𝐔𝐂𝐀𝐒 𝐌𝐎𝐃 𝐃𝐎𝐌𝐈𝐍𝐀 𖧄
reply('Nenhum canal foi encontrado, verifique se o nome do canal está correto.')
}
}
break

case 'ghstalk':
if (!q) return reply(`Cadê o usuário do GitHub que você deseja pesquisar? \n*Exemplo:* ${prefix + comando} Otakump4`)
nahida.sendMessage(from, { react: { text: `🔍`, key: info.key }})
try {//By: 𖧄 𝐋𝐔𝐂𝐀𝐒 𝐌𝐎𝐃 𝐃𝐎𝐌𝐈𝐍𝐀 𖧄
console.log(color('[GITHUB STALK]', 'magenta'), color(`BUSCANDO INFORMAÇÕES DO USUÁRIO NO GITHUB`, 'yellow'))
let res = await fetchJson(`${lolhumam}/api/github/${encodeURIComponent(q)}?apikey=${API_KEY_LOLHUMAM}`)
if (res.status !== 200 || !res.result) throw new Error("API request failed or no results found")
let user = res.result
let responseMessage = `*⏤͟͟͞͞⃝💨Nome*: ${user.name || 'N/A'}\n` +
`*⏤͟͟͞͞⃝🔗URL*: [${user.url}](${user.url})\n` +
`*⏤͟͟͞͞⃝👥Seguidores*: ${user.followers}\n` +
`*⏤͟͟͞͞⃝👀Seguindo*: ${user.following}\n` +
`*⏤͟͟͞͞⃝📦Repositórios Públicos*: ${user.public_repos}\n` +
`*⏤͟͟͞͞⃝📓Gists Públicos*: ${user.public_gists}\n` +
`*⏤͟͟͞͞⃝🏢Empresa*: ${user.company || 'N/A'}\n` +
`*⏤͟͟͞͞⃝📍Localização*: ${user.location || 'N/A'}\n` +
`*⏤͟͟͞͞⃝📧Email*: ${user.email || 'N/A'}\n` +
`*⏤͟͟͞͞⃝📝Bio*: ${user.bio || 'N/A'}`
await nahida.sendMessage(from, {
image: await getBuffer(user.avatar),
caption: responseMessage
}, { quoted: selocarrinho }).catch(e => {
reply('*Vix, Api caiu ou não encontrei o usuário informado.*')
})
} catch (e) {
if (String(e).includes("invalid json response body at")) {
console.log("A api caiu ou não foi possível executar esta ação, espere retornar")
} else {//By: 𖧄 𝐋𝐔𝐂𝐀𝐒 𝐌𝐎𝐃 𝐃𝐎𝐌𝐈𝐍𝐀 𖧄
reply('Nenhum usuário foi encontrado, verifique se o nome do usuário está correto.')
}
}
break

case 'ipstalk':
if (!q) return reply(`Cadê o endereço IP que você deseja pesquisar? \n*Exemplo:* ${prefix + comando} 114.142.169.38`)
nahida.sendMessage(from, { react: { text: `🔍`, key: info.key }})
try {//By: 𖧄 𝐋𝐔𝐂𝐀𝐒 𝐌𝐎𝐃 𝐃𝐎𝐌𝐈𝐍𝐀 𖧄
console.log(color('[IP STALK]', 'magenta'), color(`BUSCANDO INFORMAÇÕES DO ENDEREÇO IP`, 'yellow'))
let res = await fetchJson(`${lolhumam}/api/ipaddress/${encodeURIComponent(q)}?apikey=${API_KEY_LOLHUMAM}`)
if (res.status !== 200 || !res.result) throw new Error("API request failed or no results found")
let ipInfo = res.result
let responseMessage = `*⏤͟͟͞͞⃝💨Endereço IP*: ${ipInfo.query}\n` +
`*⏤͟͟͞͞⃝🌍País*: ${ipInfo.country} (${ipInfo.countryCode})\n` +
`*⏤͟͟͞͞⃝🗺️Região*: ${ipInfo.region} - ${ipInfo.regionName}\n` +
`*⏤͟͟͞͞⃝🏙️Cidade*: ${ipInfo.city}\n` +
`*⏤͟͟͞͞⃝📍Latitude*: ${ipInfo.lat}\n` +
`*⏤͟͟͞͞⃝📍Longitude*: ${ipInfo.lon}\n` +
`*⏤͟͟͞͞⃝⏰Fuso Horário*: ${ipInfo.timezone}\n` +
`*⏤͟͟͞͞⃝📡ISP*: ${ipInfo.isp}\n` +
`*⏤͟͟͞͞⃝🏢Organização*: ${ipInfo.org || 'N/A'}\n` +
`*⏤͟͟͞͞⃝🛡️AS*: ${ipInfo.as}`
await nahida.sendMessage(from, {
text: responseMessage
}, { quoted: selocarrinho }).catch(e => {
reply('*Vix, Api caiu ou não encontrei o endereço IP informado.*')
})
} catch (e) {
if (String(e).includes("invalid json response body at")) {
console.log("A api caiu ou não foi possível executar esta ação, espere retornar")
} else {//By: 𖧄 𝐋𝐔𝐂𝐀𝐒 𝐌𝐎𝐃 𝐃𝐎𝐌𝐈𝐍𝐀 𖧄
reply('Nenhum endereço IP foi encontrado, verifique se o endereço IP está correto.')
}
}
break

case 'insta_destaques':
nahida.sendMessage(from, { react: { text: `🔍`, key: info.key }})
if (!q) return reply('⚠️ *Erro*: Digite o nome de usuário do Instagram para buscar os destaques!')
try {//By: 𖧄 𝐋𝐔𝐂𝐀𝐒 𝐌𝐎𝐃 𝐃𝐎𝐌𝐈𝐍𝐀 𖧄
//Canal: https://whatsapp.com/channel/0029Va6riekH5JLwLUFI7P2B
reply('⏳ *Aguarde... Estamos recuperando os destaques de @' + q + '...*')
const apiUrl = `${zerosite}/api/instagram/highlights?username=${q}&apikey=${API_KEY_ZEROTWO}`
const response = await fetch(apiUrl)
const data = await response.json()
if (data && data.status && data.resultado) {
const { username, highlights_count, criador, data: highlights } = data.resultado
let message = `✨ *Destaques de @${username || 'Desconhecido'}*:\n\n🔢 *Total de Destaques*: ${highlights_count || 0}\n`
if (highlights && highlights.length > 0 && highlights[0].owner) {
const owner = highlights[0].owner
const ownerImage = owner && owner.profile_pic_url ? owner.profile_pic_url : null
if (ownerImage) {
await sendImage(from, ownerImage, message, selocarrinho)
} else {
reply('⚠️ *Aviso*: A imagem do dono do destaque não foi encontrada, mas os destaques foram recuperados.')
await sleep(2000)
reply(message)
}
} else {
reply('⚠️ *Aviso*: Nenhum destaque encontrado ou dono não possui imagem.')
}
reply('📬 *Estamos processando os destaques...*')
if (Array.isArray(highlights)) {
for (let index = 0; index < highlights.length; index++) {
const highlight = highlights[index]
const { title, cover, media_count, highlights_id, type, owner, taken_at, url } = highlight
let highlightMessage = `*❒᭄➭ Título: ${title || 'Desconhecido'}*\n*❒᭄➭ Mídias: ${media_count || 0}*\n*❒᭄➭ Link do Destaque: https://www.instagram.com/explore/highlights/${highlights_id || 'Desconhecido'}/*\n*❒᭄➭ Tipo de Mídia: ${type === 'video' ? 'Vídeo' : 'Imagem'}*\n`
if (type === 'video') {
await sendVideo(from, url, `❯❯ ${nomeBot} - INSTAGRAM DESTAQUE ${index + 1} ❮❮\n\n${highlightMessage}`, selocarrinho)
} else {
await sendImage(from, cover, `❯❯ ${nomeBot} - INSTAGRAM DESTAQUE ${index + 1} ❮❮\n\n${highlightMessage}`, selocarrinho)
}
await sleep(2000)
}
await sleep(2000)
reply('✅ *Os destaques foram enviados com sucesso!* 🎉')
} else {
reply('⚠️ *Aviso*: Nenhum destaque foi encontrado para esse usuário.')
}
} else {
reply('❌ *Erro*: Não foi possível recuperar os destaques. Verifique o nome de usuário e tente novamente.')
}
} catch (err) {
console.log(err)
reply('⚠️ *Erro*: Ocorreu um problema ao acessar os destaques do Instagram. Tente novamente mais tarde.')
}
break

case 'happymod':
if (!q) return reply(`Cadê o nome do app? *Use como exemplo:* ${prefix + comando} Pou.`)
try {//By: 𖧄 𝐋𝐔𝐂𝐀𝐒 𝐌𝐎𝐃 𝐃𝐎𝐌𝐈𝐍𝐀 𖧄
await reagir(from, '⌛')
const response = await axios.get(`${zerosite}/api/happymod?nome=${encodeURIComponent(q)}&apikey=${API_KEY_ZEROTWO}`)
if (response.data.status !== 200 || response.data.resultado.length === 0) {
return reply('Nenhum resultado encontrado.')
}
const app = response.data.resultado[0]
const appIconResponse = await axios.get(app.icon, { responseType: 'arraybuffer' })
const appIcon = Buffer.from(appIconResponse.data, 'binary')
const downloadLinkResponse = await axios.get(`https://tinyurl.com/api-create.php?url=${app.link}`)
const downloadLink = downloadLinkResponse.data
await nahida.sendMessage(from, {image: appIcon, caption: `🔍 *Aplicativo Encontrado!*\n\n📱 *Nome*: ${app.nome}\n📥 *Download*: ${downloadLink}`, contextInfo: {mentionedJid: [from], participant: from, quotedMessage: {conversation: `Aqui está o que você pediu, ${from}!`}, externalAdReply: {title: `🔍 Aplicativo: ${app.nome}`, thumbnail: appIcon, mediaType: 1, mediaUrl: downloadLink, sourceUrl: downloadLink}}}, { quoted: selocarrinho })
await reagir(from, '✅')
} catch (error) {
console.log(error)
return reply('Ocorreu um erro ao buscar o app.')
}
break

case 'spotify':
if (!q) return reply(`Use: ${prefix + comando} nome da música`)
try {//By: 𖧄 𝐋𝐔𝐂𝐀𝐒 𝐌𝐎𝐃 𝐃𝐎𝐌𝐈𝐍𝐀 𖧄
//Canal: https://whatsapp.com/channel/0029Va6riekH5JLwLUFI7P2B
reagir(from, "🔎")
const searchUrl = `${zerosite}/api/spotify/search?query=${encodeURIComponent(q)}&apikey=${API_KEY_ZEROTWO}`
const searchResult = await fetchJson(searchUrl)
if (!searchResult.resultado || !searchResult.resultado.items || searchResult.resultado.items.length === 0) {
return reply("Nenhuma música encontrada. Tente outro nome.")
}
const track = searchResult.resultado.items[0]
const downloadUrl = `${zerosite}/api/spotify/preview?url=${encodeURIComponent(track.external_urls.spotify)}&apikey=${API_KEY_ZEROTWO}`
const downloadResult = await fetchJson(downloadUrl)
if (!downloadResult.success || !downloadResult.resultado || !downloadResult.resultado.audio) {
return reply("Erro ao baixar a música. Por favor, tente novamente mais tarde.")
}
const details = downloadResult.resultado
const audioUrl = details.audio
const artistNames = track.artists.map(artist => artist.name).join(", ")
const albumImage = track.album.images[0]?.url || 'Imagem não disponível'
const duration = Math.floor(track.duration_ms / 60000) + ":" + Math.floor((track.duration_ms % 60000) / 1000).toString().padStart(2, '0')
const txt = `🎧 𝐒𝐏𝐎𝐓𝐈𝐅𝐘 🎧

❪🎵 𝙼ú𝚜𝚒𝚌𝚊: ${track.name}
❪⏱️ 𝙳𝚞𝚛𝚊çã𝚘: ${duration}
❪👥 𝙰𝚛𝚝𝚒𝚜𝚝𝚊(𝚜): ${artistNames}
❪💽 𝙰𝚕𝚋𝚞𝚖: ${track.album.name}
❪🌟 𝙿𝚘𝚙𝚞𝚕𝚊𝚛𝚒𝚍𝚊𝚍𝚎: ${details.popularidade || 'N/A'}
𖡋ꦿ 𝙻𝚒𝚗𝚔: ${track.external_urls.spotify}
----------------------------------------------
𝙱𝚢 ${nomeBot}`
await sendUrlText(from, txt, `Ouça agora ${track.name} em seu aplicativo Spotify 🔥`, `Music • Duração: ${duration}`, albumImage, track.external_urls.spotify, selocarrinho)
if (audioUrl) {
await sendAudio(from, audioUrl, "audio/mpeg", selocarrinho)
} else {
reply("Prévia de áudio não disponível.")
}
} catch (e) {
console.log('Error in Spotify command:', e)
return reply("Ocorreu um erro ao processar sua solicitação. Tente novamente.")
}
break

/*--------------------------------------------------------------------------------------------------------*/
default:
/*--------------------------------------------------------------------------------------------------------*/
// IF ABAIXO
if (body.startsWith('>')) {
try {
if (!isDono) return
result = eval(body.slice(2))
let response = typeof result === 'object' ? JSON.stringify(result) : String(result)
if (response === '{}') return
return nahida.sendMessage(from, {text: response }).catch(e => {
enviar(String(e))})
} catch (e) {
enviar(String(e))}}
/*--------------------------------------------------------------------------------------------------------*/
// IF DE PREFIX E ISCMD NO CASO DE COMANDO ERRADO
if (budy === prefix) {
await nahida.sendMessage(from, {text: ` Olá ${pushname} se deseja visualizar o menu, por favor, digite ${prefix}menu e leia atentamente!` }, {quoted: info} )
} else if (budy.startsWith(prefix)) {
await nahida.sendMessage(from, {text: `Desculpe, esse comando não existe,verifique o menu digitando ${prefix}menu.` }, {quoted: info })
}
}
} catch (erro) {
console.log(erro)
}})
/*--------------------------------------------------------------------------------------------------------*/
// PARTE DA CONEXÃO 
nahida.ev.on('connection.update', (update) => {
const { connection, lastDisconnect } = update
if(lastDisconnect === undefined) {
}
/*--------------------------------------------------------------------------------------------------------*/
if(connection === 'close') {
var shouldReconnect = (lastDisconnect.error.Boom)?.output?.statusCode !== DisconnectReason.loggedOut
ligarbot()
}
/*--------------------------------------------------------------------------------------------------------*/
if(update.isNewLogin) {
console.log(`conectado com sucesso`)
}})}
/*--------------------------------------------------------------------------------------------------------*/
ligarbot()
/*--------------------------------------------------------------------------------------------------------*/
// ATUALIZAÇÃO DOS ARQUIVOS DA BOT
const fileName = path.basename(__filename)
const file = require.resolve(__filename)
let timeout
fs.watchFile(file, () => { // By: 𖧄 𝐋𝐔𝐂𝐀𝐒 𝐌𝐎𝐃 𝐃𝐎𝐌𝐈𝐍𝐀 𖧄 
fs.unwatchFile(file)
clearTimeout(timeout)
console.log(colors.red(` Arquivo '${fileName}' foi atualizado. Atualizando a Bot...`))
timeout = setTimeout(() => {
delete require.cache[file]
require(file)
}, 2000)
})
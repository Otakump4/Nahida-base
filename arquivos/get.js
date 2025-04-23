const mimetype = require('mime-types')
const { downloadContentFromMessage, proto, delay, getContentType } = require('@whiskeysockets/baileys')
/*--------------------------------------------------------------------------------------------------------*/
// Função para obter a extensão do tipo MIME
const getExtension = async (type) => {
if (!type || typeof type !== "string") {
console.error("Erro: Tipo de mídia inválido ou não especificado.")
throw new Error("Tipo de mídia inválido ou não especificado.")
}
return await mimetype.extension(type)
}
/*--------------------------------------------------------------------------------------------------------*/
const getFileBuffer = async (mediakey, MediaType) => {
try {
if (!mediakey || !MediaType) {
throw new Error("Chave ou tipo de mídia inválidos.")
}
/*--------------------------------------------------------------------------------------------------------*/
const stream = await downloadContentFromMessage(mediakey, MediaType)
let buffer = Buffer.from([])
for await (const chunk of stream) {
buffer = Buffer.concat([buffer, chunk])
}
if (!buffer.length) throw new Error("Buffer de mídia vazio.")
return buffer
} catch (err) {
console.error("Erro em getFileBuffer:", err.message)
throw err
}
}
/*--------------------------------------------------------------------------------------------------------*/
// Função para identificar administradores do grupo
const getGroupAdmins = (participants) => {
const admins = participants
.filter(participant => participant.admin === "superadmin" || participant.admin === "admin")
.map(participant => participant.id)
return admins
}
/*--------------------------------------------------------------------------------------------------------*/
const Random = Math.random(10)
/*--------------------------------------------------------------------------------------------------------*/
module.exports = { getExtension, getFileBuffer, getGroupAdmins }
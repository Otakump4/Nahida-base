const mimetype = require('mime-types')
const FormData = require("form-data")
const { downloadContentFromMessage, proto, delay, getContentType } = require('@whiskeysockets/baileys')
/*--------------------------------------------------------------------------------------------------------*/
const Random = Math.random(10)
/*--------------------------------------------------------------------------------------------------------*/
const getExtension = async (type) => {
if (!type) throw new Error("Tipo de mídia inválido ou não especificado.")
return await mimetype.extension(type)
}
/*--------------------------------------------------------------------------------------------------------*/
async function loadChalk() {
const chalkImport = await import('chalk')
return chalkImport.default
}
/*--------------------------------------------------------------------------------------------------------*/
module.exports = { getExtension, FormData, Random, chalk: loadChalk() }
const fs = require('fs')
const path = require('path')
/*--------------------------------------------------------------------------------------------------------*/
const filePath = path.join(__dirname, './settings.json')
let config = { botoes: false }
/*--------------------------------------------------------------------------------------------------------*/
const loadConfig = async () => {
try {
const fileContent = await fs.promises.readFile(filePath, 'utf-8')
config = { ...config, ...JSON.parse(fileContent) }
} catch (err) {
console.error('Erro ao ler o arquivo de configuração:', err)
}
}
/*--------------------------------------------------------------------------------------------------------*/
const ativarDesativarBotoes = async (reply) => {
await loadConfig()
if (config && config.botoes !== undefined) {
try {
config.botoes = !config.botoes
fs.writeFileSync(filePath, JSON.stringify(config, null, 4))
reply(config.botoes ? "✔️ Os botões foram ativados... Use com sabedoria 〰️" 
: "✖️ Os botões foram desativados... Sábia atitude ➿")
console.log('Restart necessário para salvar dados..')
setTimeout(() => process.exit(), 3000)
} catch (e) {
console.log(e)
reply("Erro ao atualizar configuração.")
}
} else {
console.log("Erro: configuração 'botoes' não encontrada.")
}
}
/*--------------------------------------------------------------------------------------------------------*/
module.exports = { loadConfig, ativarDesativarBotoes, config }
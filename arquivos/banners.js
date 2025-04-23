const cfonts = require('cfonts')
/*--------------------------------------------------------------------------------------------------------*/
const { numeroBot, nomeBot, nomeDono, versaoBaileys, versaoBot, numeroDono, zerosite, API_KEY_ZEROTWO } = require('../config/settings.json')
/*--------------------------------------------------------------------------------------------------------*/
const colorOptions = ["red", "green", "yellow", "blue", "magenta", "cyan", "white"]
const randomColor = colorOptions[Math.floor(Math.random() * colorOptions.length)]
/*--------------------------------------------------------------------------------------------------------*/
// const banner = cfonts.render(`${nomeBot}`, {
const banner = cfonts.render(`NAHIDA|BASE`, {
font: 'block', 
align: 'center',
gradient: ['cyan', randomColor],
space: false,
})
/*--------------------------------------------------------------------------------------------------------*/
const banner2 = cfonts.render((`Conectada com sucesso!
Criador: @lucas_mod_domina
Número: 559491569380
IG: @lucas_mod_domina
TMJ!`), {
font: 'console',
align: 'center',
gradient: ['red', 'magenta'],
})
/*--------------------------------------------------------------------------------------------------------*/
module.exports = { banner, banner2, numeroBot, nomeBot, nomeDono, versaoBaileys, versaoBot, numeroDono, zerosite, API_KEY_ZEROTWO }
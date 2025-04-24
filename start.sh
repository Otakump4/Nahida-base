#!/bin/bash

# By: 𖧄 𝐋𝐔𝐂𝐀𝐒 𝐌𝐎𝐃 𝐃𝐎𝐌𝐈𝐍𝐀 𖧄
# Canal: https://whatsapp.com/channel/0029Va6riekH5JLwLUFI7P2B

# Cores personalizadas
BG='\033[40m'
RED='\033[1;31m'
GREEN='\033[1;32m'
YELLOW='\033[1;33m'
BLUE='\033[1;34m'
MAGENTA='\033[1;35m'
CYAN='\033[1;36m'
NC='\033[0m'

# Configurações
TMP_DIR="/tmp"

# Função para cabeçalho estilizado
header() {
clear
printf "${BG}${CYAN}╔════════════════════════════════════════════╗${NC}\n"
printf "${BG}${CYAN}║ㅤㅤㅤㅤㅤN A H I D Aㅤ- B A S Eㅤㅤㅤㅤㅤㅤ║${NC}\n"
printf "${BG}${CYAN}╠════════════════════════════════════════════╣${NC}\n"
printf "${BG}${CYAN}║${YELLOW} Versão 1.0 ${CYAN}│${YELLOW} Desenvolvido por: LUCAS MOD ${CYAN}ㅤ║${NC}\n"
printf "${BG}${CYAN}╚════════════════════════════════════════════╝${NC}\n\n"
}

# Verificação de ambiente
check_environment() {
if [ -d "/data/data/com.termux/files/usr" ]; then
export DEBIAN_FRONTEND=noninteractive
TMP_DIR="/data/data/com.termux/files/usr/tmp"
mkdir -p "$TMP_DIR"
else
printf "${BLUE}Modo servidor detectado${NC}\n"
fi
}

# Gerenciamento de locks
manage_locks() {
for file in \
"/var/lib/dpkg/lock-frontend" \
"/var/lib/dpkg/lock" \
"/var/cache/apt/archives/lock" \
"/data/data/com.termux/files/usr/var/lib/dpkg/lock-frontend" \
"/data/data/com.termux/files/usr/var/lib/dpkg/lock" \
"/data/data/com.termux/files/usr/var/cache/apt/archives/lock"
do
if [ -f "$file" ]; then
printf "${YELLOW}Removendo lock: ${file}${NC}\n"
rm -f "$file" 2>/dev/null
fi
done
}

# Barra de progresso
progress_bar() {
printf "${CYAN}"
for i in {1..10}; do
printf "▰"
sleep 0.1
done
printf "${NC}\n"
}

# Instalação de dependências
install_dependencies() {
header
printf "${YELLOW}Iniciando processo de instalação...${NC}\n"
manage_locks

printf "\n${BLUE}Atualizando repositórios...${NC}\n"
if [ -d "/data/data/com.termux/files/usr" ]; then
pkg update -y && pkg upgrade -y >/dev/null 2>&1 &
else
apt-get update -y && apt-get upgrade -y >/dev/null 2>&1 &
fi
progress_bar

printf "\n${BLUE}Instalando dependências principais:${NC}\n"
if [ -d "/data/data/com.termux/files/usr" ]; then
for pkg in nodejs ffmpeg wget tesseract git jq procps android-tools termux-api python openssh; do
printf "${CYAN}› ${pkg}...${NC}"
pkg install -y "$pkg" >/dev/null 2>&1
printf " ${GREEN}✓${NC}\n"
done
termux-setup-storage
else
apt-get install -y nodejs ffmpeg wget tesseract git jq procps android-tools python3 openssh-server >/dev/null 2>&1
fi

printf "\n${GREEN}Dependências instaladas com sucesso!${NC}\n"
sleep 2
}

# Execução imediata do bot
run_bot() {
header
mode="$1"
printf "${MAGENTA}Iniciando em modo: "
[ "$mode" = "--pairing-code" ] && printf "PAIRING CODE" || printf "MOBILE"
printf "${NC}\n\n"

node index.js "$mode"

printf "\n${BLUE}Pressione Enter para voltar...${NC}"
read -r
}

# Contato do criador
contact_creator() {
header
printf "${BG}${MAGENTA}╔════════════════════════════════════════════╗${NC}\n"
printf "${BG}${MAGENTA}║ㅤㅤㅤㅤㅤCONTATO DO CRIADORㅤㅤㅤㅤㅤㅤ║${NC}\n"
printf "${BG}${MAGENTA}╚════════════════════════════════════════════╝${NC}\n\n"

printf "${CYAN}Escolha uma forma de contato:${NC}\n"
printf "${YELLOW}1) ${GREEN}WhatsApp${NC}\n"
printf "${YELLOW}2) ${GREEN}Instagram${NC}\n"
printf "${YELLOW}3) ${GREEN}GitHub${NC}\n"
printf "${YELLOW}4) ${GREEN}YouTube${NC}\n"
printf "${YELLOW}5) ${GREEN}Telegram${NC}\n"
printf "${YELLOW}6) ${RED}Voltar ao menu${NC}\n"
printf "\n${CYAN}╰─➤ Digite sua escolha: ${NC}"
read -r contact_option

case $contact_option in
1) xdg-open "https://wa.me/message/4IV4I7JBGSU6M1" ;;
2) xdg-open "https://www.instagram.com/lucas_mod_domina" ;;
3) xdg-open "https://github.com/Otakump4" ;;
4) xdg-open "https://www.youtube.com/@Otaku.mp4" ;;
5) xdg-open "https://t.me/LUCAS_MOD_DOMINA" ;;
6) main_menu ; return ;;
*) 
printf "\n${RED}Opção inválida!${NC}\n"
sleep 1
contact_creator
return
;;
esac

printf "\n${BLUE}Pressione Enter para continuar...${NC}"
read -r
}

# Menu principal otimizado
main_menu() {
while true; do
header
printf "${CYAN}Selecione uma opção:\n"
printf "${YELLOW}1) ${GREEN}Iniciar com Pairing Code${NC}\n"
printf "${YELLOW}2) ${GREEN}Iniciar modo Mobile${NC}\n"
printf "${YELLOW}3) ${MAGENTA}Instalar Dependências${NC}\n"
printf "${YELLOW}4) ${CYAN}Contato do Criador${NC}\n"
printf "${YELLOW}5) ${RED}Sair${NC}\n"
printf "\n${CYAN}╰─➤ Digite sua escolha: ${NC}"

read -r choice
case $choice in
1) run_bot "--pairing-code" ;;
2) run_bot "--mobile" ;;
3) install_dependencies ;;
4) contact_creator ;;
5)
printf "\n${GREEN}✧ Até logo! ✧${NC}\n"
exit 0
;;
*)
printf "${RED}Opção inválida!${NC}\n"
sleep 1
;;
esac
done
}

# Inicialização
check_environment
main_menu

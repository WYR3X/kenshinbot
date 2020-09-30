const db = require('quick.db')
const Discord = require('discord.js')
exports.run = async (bot, message, args) => {

 if (!message.member.hasPermission("ADMINISTRATOR")) return message.reply(`Yeterli yetki bulunmamakta.`);

  let nesne = args[0]
  if (!nesne) return message.reply('<a:uyari_ver:726172121935511603> **Lütfen bir ID numarası belirtiniz.**')
  
  db.set(`katılabilir_${nesne}`, 'katılabilir')
  
  message.reply(`<:kenshin_tik:726170369379139675> Artık **\`\`${nesne}\`\`** ID'sine Sahip bot sunucuya katılabilir!**`)
}
 


exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 2
};


exports.help = {
  name: 'anti-raid-izin',
  description: 'Belirtilen kişilerin sunucuya katılmasına izin verir.',
  usage: 'anti-raid-katılabilir'
};
const Discord = require('discord.js');
const db = require('quick.db')
exports.run = async(client, message, args) => { 
let yılmaz = args[0]
if(!yılmaz) return message.channel.send("<a:uyari_ver:726172121935511603> **Lütfen Sunucu İçin Kullanılacak Prefix Gir!**")
db.set(`prefix_${message.guild.id}`, yılmaz)
message.channel.send('<:kenshin_tik:726170369379139675> **Botun yeni prefixi bu sunucu için** `' +yılmaz+ '` **olarak ayarlandı!**')
};
exports.conf = {
  enabled: true,  
  guildOnly: false, 
  aliases: ["prefix-ayarla"], 
  permLevel: 3
};
exports.help = {
  name: 'prefix',
  description: 'taslak', 
  usage: 'prefix'
};
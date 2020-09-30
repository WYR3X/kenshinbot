const Discord = require('discord.js') ///modulumuzu tanittik
const db = require('quick.db')
exports.run = (client,message) => { ///bot oldugunu ve mesaji tanittik
if (!message.member.hasPermission("BAN_MEMBERS")) return message.reply('**Bu komutu kullanabilmek için yeterli yetkiye sahip değilsin!**')
let avilio = message.mentions.channels.first()
if(!avilio) return message.reply('<a:uyari_ver:726172121935511603> **Lütfen bir kanal etiketle!**')
  db.set(`kanal_${message.guild.id}`, avilio.id)
    message.channel.send("<:kenshin_tik:726170369379139675> Ban Log kanalı başarıyla **" + avilio + "** olarak ayarlandı!")
}
exports.conf = {
enabled: true, ///kodu aktif ettik///
guildOnly: false, /// sunucuya özel olmadıgını söyledik ///
aliases: [], ///başka bir kullanım eklemedik 
permlevel: 2 ///tüm herkes kullanabilir dedik

}
exports.help =
{
name : "banlog",
despricton : "açıklama",
usage : "banlog"
}
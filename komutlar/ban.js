const Discord = require('discord.js') ///modulumuzu tanittik
const db = require('quick.db')

exports.run = (client,message, args) => { ///bot oldugunu ve mesaji tanittik
if (!message.member.hasPermission("BAN_MEMBERS")) return message.reply('**Bu komutu kullanabilmek için yeterli yetkiye sahip değilsin!**')
  let user = message.mentions.members.first();
  let reason = args.slice(1).join(" ")
 let kanal = client.channels.get(db.fetch(`kanal_${message.guild.id}`))
 
if(!kanal) return message.reply('<a:uyari_ver:726172121935511603> **Ban log kanalı ayarlanmamış! Log kanalı ayarlamak için k!banlog <#kanal>**')
  
if(!user) return message.reply('<a:uyari_ver:726172121935511603> **Kimi banlamam gerekse lütfen etiketle!**')
  
if(!reason) return message.channel.send('<a:uyari_ver:726172121935511603> **Ban sebebini yazmalısın!**')
  
message.guild.ban(user, 'Kenshin Ban Sistemi!') 
let ce = new Discord.RichEmbed()
.setTitle('Kenshin | Ban Log')
.setThumbnail( message.author.avatarURL )
.setColor('RANDOM')
.setFooter( message.author.username , client.user.avatarURL )
.setDescription(`<a:uyari_ver:726172121935511603> **Bir kişi sunucudan banlandı!** | \n Gerekli bilgiler aşağıda verildi! \n\n » **Yetkili Bilgileri** \n Yetkili ismi : ${message.author} \n Banlayan Yetkilinin IDsi : ${message.author.id} \n\n » **Banlanan Kişi Bilgileri** \n Kişi ismi : ${user} \n Banlanan Kişinin IDsi : ${user.id} \n Ban Sebebi : ${reason}`)
kanal.send(ce)
  let okey = new Discord.RichEmbed()
  .setFooter(client.user.username , client.user.avatarURL)
  .setThumbnail( message.author.avatarURL )
  .setDescription("<:kenshin_tik:726170369379139675> **Ban işlemi tamamlandı! Gerekli bilgiler BanLog kanalına gönderildi!**")
message.channel.send(okey)
}

exports.conf = {
enabled: true, ///kodu aktif ettik///
guildOnly: false, /// sunucuya özel olmadıgını söyledik ///
aliases: [], ///başka bir kullanım eklemedik 
permlevel: 2 ///tüm herkes kullanabilir dedik

}
exports.help =
{
name : "ban",
despricton : "açıklama",
usage : "ban"
}
 
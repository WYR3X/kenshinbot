const db = require('quick.db')
const Discord = require('discord.js')

exports.run = async (client, message, args) => {
  if(!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send(`**Bu komutu kullanabilmek için yeterli yetkiye sahip değilsin!**`);
  if (!args[0]) return message.channel.send('<a:uyari_ver:726172121935511603> **Komutu kullanabilmek için aç veya kapat yazmalısın! ``k!reklam-engel aç/kapat``**')
let kufur = await db.fetch(`kufur_${message.guild.id}`)
  if (args[0] == 'aç') {
if (kufur) {
message.channel.send('<:kenshin_tik:726170369379139675> **Görünüşe Göre Reklam Koruması Zaten Aktif Dostum :) \nKick Yetkisi Olanları Engellemez!**')
return
} else {
    db.set(`kufur_${message.guild.id}`, 'Açık')
     message.reply('**<:kenshin_aktif:726172216999280712> Reklam filtresi başarıyla aktif edildi!**')
}
  }
  else if (args[0] == 'kapat') {
    db.delete(`kufur_${message.guild.id}`)
      message.reply('**<:kenshin_deaktif:726172163844866079> Reklam Filtresi başarıyla deaktif edildi!**')
  }

}
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ['reklam'],
  permLevel: 3
};

exports.help = {
  name: 'reklam-engel',
  description: 'reklam',
  usage: 'reklam'
};
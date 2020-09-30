const Discord = require('discord.js');
const db = require('quick.db')

exports.run = async (bot, message) => {
   let c = message.mentions.channels.first()
   if (!c) return message.channel.send('<a:uyari_ver:726172121935511603> **Lütfen resimli güvenlik atacağım kanalı etiketle!**')
   db.set(`guvenlik${message.guild.id}`, c.id)
   message.reply('**<:kenshin_tik:726170369379139675> Resimli Güvenlik başarıyla aktif edildi!**')
}

module.exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['gks','güvenlik'],
  permLevel: 3
};

module.exports.help = {
  name: 'güvenlik',
  description: 'guvenlik',
  usage: 'güvenlik-ayarla'
};
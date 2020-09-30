const Discord = require('discord.js');
const db = require('quick.db');

exports.run = async (bot, message, args) => {
  
  if (!message.member.hasPermission('MANAGE_GUILD')) return message.channel.send('**Bu komutu kullanabilmek için yeterli yetkiye sahip değilsin!**')
  if (!args[0]) return message.channel.send('<a:uyari_ver:726172121935511603> **SA-AS Sistemini kullanabilmek için; k!sa-as aç/kapat**')
  
  if (args[0] == 'aç') {
    db.set(`saas_${message.guild.id}`,  'açık')
      message.reply(`**<:kenshin_aktif:726172216999280712> SA-AS Sistemi başarıyla aktif edildi!**`)
    
  }
  if (args[0] == 'kapat') {
    db.set(`saas_${message.guild.id}`,  'kapali')
      message.reply(`**<:kenshin_deaktif:726172163844866079> SA-AS sistemi başarıyla deaktif edildi!**`)
    
  }

}

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 3
};

exports.help = {
  name: 'sa-as',
  description: 'sa-as sistemi',
  usage: 'sa-as'
};
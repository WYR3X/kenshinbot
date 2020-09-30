const Discord = require('discord.js');
const db = require('quick.db')
const ayarlar = require('../ayarlar.json'),
      prefix = ayarlar.prefix
exports.run = async(client, message, args) =>{
  
let avilio_wyrex = await db.fetch(`wyrexotorol_${message.guild.id}`) || await db.fetch(`wyrexotorolkanal_${message.guild.id}`)
if(!avilio_wyrex) return message.reply(`<a:uyari_ver:726172121935511603> Bu sistem zaten kapalı durumda! Açmak için **${prefix}otorol <@rol> <#kanal>**`)
db.delete(`wyrexotorol_${message.guild.id}`) 
db.delete(`wyrexotorolkanal_${message.guild.id}`)
message.channel.send(`<a:uyari_ver:726172121935511603> **Otorol başarıyla kapatıldı! Artık Yeni gelen kullanıcılara hiçbir rolü vermeyeceğim!**`)
};  
exports.conf = {
  enabled: false, 
  guildOnly: false,  
  aliases: ['otorol kapat'],
  permLevel: 3 
};
exports.help = {
  name: 'otorol-kapat',
  description: 'Otorol Sistemi - Frenzy Code',
  usage: 'otorolkapat'
};



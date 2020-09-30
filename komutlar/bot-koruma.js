const Discord = require('discord.js')
const fs = require('fs');
const db = require('quick.db')
var ayarlar = require('../ayarlar.json');

exports.run = async (client, message, member, args) => {

if (!message.member.hasPermission("2")) return message.reply(`**Bu komutu kullanabilmek için yeterli yetkiye sahip değilsin!**`);
  
  const db = require('quick.db');

  let Kanal = message.mentions.channels.first()
  
    if (!Kanal) {
        return message.reply("<a:uyari_ver:726172121935511603> **Lütfen bir kanal belirtiniz.**")
    }
 
    db.set(`antiraid_${message.guild.id}`, "<#"+Kanal.id+">")
  
    message.channel.send(`<:kenshin_tik:726170369379139675> **Anti Raid sistemi başarıyla aktif edildi!** Anti Raid Bot İzni İçin **k!anti-raid-izin <ID> (Sadece Sunucu Sahibi)** Kapatmak İçin de **k!anti-raid-kapat**`)
}

      
    
exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['anti-raid-aç'],
    permLevel: 2
}

exports.help = {
    name: 'anti-raid',
    description: 'Anti-raid özelliği aktif eder.',
    usage: 'anti-raid-aç',
}
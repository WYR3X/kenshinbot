const Discord = require('discord.js')
const fs = require('fs');
const db = require('quick.db')
var ayarlar = require('../ayarlar.json');

exports.run = async (client, message, member, args) => {

if (!message.member.hasPermission("ADMINISTRATOR")) return message.reply(`**Bu komutu kullanabilmek için yeterli yetkiye sahip değilsin!**`);
  
  const db = require('quick.db');

  let Kanal = message.mentions.channels.first()
  
    if (!Kanal) {
        return message.reply("<a:uyari_ver:726172121935511603> **Lütfen bir kanal belirtiniz.**")
    }
 
    db.delete(`antiraid_${message.guild.id}`, "<#"+Kanal.id+">")
  
    message.channel.send(`<:kenshin_deaktif:726172163844866079> **Bot Koruma Sistemi başarıyla deaktif edildi!**`)
}


    
exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['bot-koruma kapat'],
    permLevel: 2
}

exports.help = {
    name: 'anti-raid-kapat',
    description: 'Anti-raid özelliği deaktif eder.',
    usage: 'anti-raid-kapat',
}
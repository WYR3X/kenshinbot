const Discord = require('discord.js');
const db = require('quick.db')
const ayarlar = require('../ayarlar.json')
exports.run = async (client, message, args) => {
  
  let prefix = await require('quick.db').fetch(`prefix_${message.guild.id}`) || ayarlar.prefix
  if (!message.member.hasPermission("MANAGE_GUILD")) return message.channel.send(`**Bu komutu kullanabilmek için yeterli yetkiye sahip değilsin!**`)
  
  let capslock = await db.fetch(`capslock_${message.guild.id}`)
  if (capslock) {
    db.delete(`capslock_${message.guild.id}`)
    message.reply(`**<:kenshin_deaktif:726172163844866079> Capslock Engelleme Sistemi Kapatıldı!**`)
  }
 
  if (!capslock) {
    db.set(`capslock_${message.guild.id}`, 'acik')
    message.reply(`**<:kenshin_aktif:726172216999280712> Capslock Engelleme Sistemi Aktif!**`)
  }
};
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['capslockengel','capslock','capslock-engelleme','cl'],
  permLevel: 3
};
exports.help = {
  name: 'capslock-engel',
  description: 'Capslock kullanımını engeller.',
  usage: 'capslock-engelleme'
};
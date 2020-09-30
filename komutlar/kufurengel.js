const Discord = require('discord.js');
const db = require('quick.db')
const moment = require('moment')
const client = new Discord.Client();

exports.run = async(client, message, args) => {

  if(!message.member.permissions.has("ADMINISTRATOR")) return message.reply("**Bu komutu kullanabilmek için yeterli yetkiye sahip değilsin!**")
  
  let veri = await db.fetch(`küfürengel_${message.guild.id}`)
  
  if(!veri) {
    message.reply("<:kenshin_aktif:726172216999280712> **Küfür engelleme sistemi başarıyla ``aktif`` edildi! Artık kimse küfür edemez!**")
  db.set(`küfürengel_${message.guild.id}`, "aktif")
  } else {
        message.reply("<:kenshin_deaktif:726172163844866079> **Küfür engel sistemi `deaktif` hale getirildi! Artık herkes küfür edebilir!**")
  db.delete(`küfürengel_${message.guild.id}`)
  }
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: 3
};

exports.help = {
  name: 'küfür-engel',
  description: 'Kod denemek için kullanılır.',
  usage: 'küfür-engel'
};
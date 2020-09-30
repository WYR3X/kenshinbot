const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json');
const db = require('quick.db');

exports.run = async(client, message, args, prefix, ayar, emoji) => {
  if (!message.member.hasPermission("ADMINISTRATOR")) return message.reply('<:kenshin_carpi:726170425779814413> Bu Komutu Kullanabilmek için Yeterli Yetkiye Sahip Değilsin!');
  
  if (args[0] === "sıfırla" || args[0] === "kapat") {
    if (!db.get(`otorol.${message.guild.id}`)) return message.reply('<:kenshin_carpi:726170425779814413> Sunucunun Otorolü zaten ayarlanmamış!');
    db.delete(`otorol.${message.guild.id}`);
    message.reply('<:kenshin_tik:726170369379139675> Sunucunun Otorolü başarıyla sıfırlandı!');
    return;
  };
  
  // !otorol @üye @bot #kanal
  // !otorol sıfırla  
  let uyeRolu = message.mentions.roles.first() || message.guild.roles.get(args[0]);
  let botRolu = message.mentions.roles.array()[1] || message.guild.roles.get(args[1]);
  let kanal = message.mentions.channels.first();
  
  if (!uyeRolu || !botRolu || !kanal) return message.reply(`<:kenshin_carpi:726170425779814413> Komutu doğru kullanmalısın!\n k!otorol <@ÜyeRolü> <@BotRolü> <#kanal>`);
  db.set(`otorol.${message.guild.id}`, { uyeRolu: uyeRolu.id, botRolu: botRolu.id, kanal: kanal.id });
  message.reply(`<:kenshin_tik:726170369379139675> Başarıyla Üye rolü başarıyla ${uyeRolu.name}, Bot rolü başarıyla ${botRolu.name} olarak, kanal ise ${kanal} olarak ayarlandı!`);
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: 3
};

exports.help = { 
  name: 'otorol', 
  description: 'Otorol.',
  usage: 'otorol @üyeRolü @botRolü #kanal / sıfırla',
  kategori: 'kullanıcı'
};
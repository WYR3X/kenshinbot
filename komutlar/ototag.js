const Discord = require('discord.js');
const db = require('quick.db');

exports.run = async (client, message, args) => {
  
  if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(`Bu komutu kullanabilmek için "\`Yönetici\`" yetkisine sahip olmalısın.`);
  
  let tag = args[0];
  let tagg = db.fetch(`tag_${message.guild.id}`)
  
  if (!tag) return message.reply('<:kenshin_carpi:726170425779814413> **Üyelere vereceğim bir tag girmelisin.**')
  
    if(args[0] === "sıfırla") {
    if(!tagg) {
      message.reply(`<:kenshin_carpi:726170425779814413> **Oto tag zaten ayarlı değil dostum :)**`)
      return
    }
    
    db.delete(`tag_${message.guild.id}`)
    message.reply(`<:kenshin_tik:726170369379139675> **Oto Tag başarıyla sıfırlandı.**`)
    return
  }
  
  db.set(`tag_${message.guild.id}`, tag)
  message.channel.send(`<:kenshin_tik:726170369379139675> **Tag başarıyla \`${tag}\` olarak ayarlandı.**`)
   
}

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: 2
};

exports.help = {
  name: 'ototag',
  description: 'Tagı ayarlar.',
  usage: 'tag <yazı>'
};
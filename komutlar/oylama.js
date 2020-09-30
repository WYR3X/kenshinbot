const Discord = require('discord.js');

exports.run = function(client, message, args){
  const hayir = '❌';
  const evet  =  '✅';
      if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send('<:kenshin_carpi:726170425779814413> **Bu komutu kullanabilmek için yeterli yetkiye sahip değilsin!**')
  const msg = args.join(' ');
  if(!msg) return message.channel.send('<:kenshin_carpi:726170425779814413> **Oylamam için bir yazı yaz!**');
  message.react('🆗');
  message.channel.send(new Discord.RichEmbed() .setTitle('Oylama') .setDescription(msg) .setColor('RANDOM') .setFooter(message.author.tag+' tarafından başlatıldı..',message.author.avatarURL)).then(function(i){
      i.react(evet)
      i.react(hayir)
// evet hayır Şeklinde Sorar :)

  });

}

exports.conf = {
 enabled:true,
  guildOnly:false,
  aliases:['oyla'],
  permLevel: 3

}
exports.help = {
  name:'oylama',
  description:'İstediğiniz şeyi oylar',
  category:'kullanıcı',
  usage:'oylama [İçerik]'

}

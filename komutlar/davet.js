const Discord = require('discord.js');
const db = require('quick.db')
exports.run = (client, message, args) => { 
  
  let yardım = new Discord.RichEmbed()
  .setTitle('**<a:kenshin_ayarlar:726155629248380998> Kenshin - Davet Menüsü**')
  .setAuthor(message.member.user.username, message.author.avatarURL)
  .setDescription('<a:kenshin_raptiye:726397959532707851> **Kenshin** davet menüsünü aşağıdan görebilirsin. Herhangi bir sorun,hata olursa **[Destek Sunucumuza](https://discord.gg/EFSN7u6)** gelip bizimle iletişim kurmayı unutma.')
  .addBlankField()
  .addField('**__Linkler__**', `**| [Kenshin'i Davet Et](https://discord.com/oauth2/authorize?client_id=718383676127313940&scope=bot&permissions=8) \n| [Kenshin Destek Sunucusu](https://discord.gg/EFSN7u6) \n| [Kenshin Web Site](https://kenshin-website.glitch.me/)**`)
  .setFooter(`Kenshin - Tüm Hakları Saklıdır. - ${message.author.username} Tarafından istedi!`, client.user.avatarURL)
  .setTimestamp()
  .setThumbnail(client.avatarURL)
  .setColor('RANDOM')
  message.channel.send(yardım)
  };

exports.conf = {
  enabled: true,  
  guildOnly: false, 
  aliases: [], 
  permLevel: 0
};

exports.help = {
  name: 'davet',
  description: 'taslak', 
  usage: 'yardıms'
};
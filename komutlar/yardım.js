const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json');

var prefix = ayarlar.prefix;


exports.run = (client, message, params) => {
  const embedyardim = new Discord.RichEmbed()
  .setTitle("**<a:kenshin_ayarlar:726155629248380998> Kenshin - Yardım Menüsü**")
    .setAuthor(message.member.user.username, message.author.avatarURL)
    .setDescription('<a:kenshin_raptiye:726397959532707851> **Kenshin** yardım menüsünü aşağıdan görebilirsin. Herhangi bir sorun,hata olursa **[Destek Sunucumuza](https://discord.gg/EFSN7u6)** gelip bizimle iletişim kurmayı unutma.')
    .addBlankField()
 .setColor('RANDOM')
 .addField("**<a:kenshin_kirmizi:726397765680234537> Eğlence Komutları**", `k!eğlence = Eğlence Komutlarına Bakarsınız. `)
 .addField("**<a:kenshin_aqua:726397835477647412> Kullanıcı Komutları**", `k!kullanıcı = Kullanıcı Komutlarına Bakarsınız.  `)
 .addField("**<a:kenshin_kirmizi:726397765680234537> Yetkili Komutları**", `k!yetkili k!yetkili2 = Yetkili Komutlarınıa Bakarsınız.`)
 .addField("**<a:kenshin_aqua:726397835477647412> Sunucu Yedekleme Komutları**", `k!backup = Sunucu Yedekleme Komutlarına Bakarsınız.`)
 //.addField("**<a:kenshin_kirmizi:726397765680234537> Kayıt Komutları (BAKIM)**", `k!kayıt-sistemi = Kayıt Sistemi Komutlarına Bakarsınız. `)
 .addField("**<a:kenshin_kirmizi:726397765680234537> Botun Ana Komutları**", `k!bot-komutları = Botun Ana Komutlarına Bakarsınız.`)
  .addField(`**__Linkler__**`, `**[Beni Davet Et](https://discord.com/oauth2/authorize?client_id=718383676127313940&scope=bot&permissions=8) - [Destek Sunucusu](https://discord.gg/EFSN7u6) - [Kenshin Web Site](https://kenshin-website.glitch.me/)**`)
  .setFooter(`Kenshin - Tüm Hakları Saklıdır. - ${message.author.username} Tarafından istedi!`, message.author.avatarURL)
if (!params[0]) {
    const commandNames = Array.from(client.commands.keys());
    message.channel.send(embedyardim);
  } else {
    let command = params[0];
    if (client.commands.has(command)) {
      command = client.commands.get(command);
      message.author.send('', `= ${command.help.name} = \n${command.help.description}\nDoğru kullanım: ` + prefix + `${command.help.usage}`);
    }
  }
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['h', 'halp', 'help', 'y'],
  permLevel: 0
};

exports.help = {
  name: 'yardım',
  description: 'Tüm komutları gösterir.',
  usage: 'yardım [komut]'
};



/*const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json');
const db = require('quick.db')
var prefix = ayarlar.prefix;
 
exports.run = async(client, message, args) => {
  
  let yardım = new Discord.RichEmbed()
  .setColor('#fff000')
  .setTitle('**Kenshin - Yardım Menüsü**')
  .setAuthor(message.member.user.username, message.author.avatarURL)
  .setDescription('**Kenshin** yardım menüsünü aşağıdan görebilirsin. Herhangi bir sorun,hata olursa **[Destek Sunucumuza](https://discord.gg/EFSN7u6)** gelip bizimle iletişim kurmayı unutma.')
  .addBlankField()
   .addField(`**Yetkili Kategorisi**`, `**:white_small_square: ${prefix}yetkili**`)
   .addField(`**Yetkili Kategorisi 2**`, `**:white_small_square: ${prefix}yetkili2**`)
  .addField(`**Kullanıcı Kategorisi**`, `**:white_small_square: ${prefix}kullanıcı**`)
  .addField(`**Eğlence Kategorisi**`, `**:white_small_square: ${prefix}eğlence**`)
  .addField(`**Bot Kategorisi**`, `**:white_small_square: ${prefix}bot**`)
  .addField(`**Ekonomi Kategorisi**`, `**:white_small_square: ${prefix}ekonomi**`)
  .addField(`**Yapımcı Kategorisi**`, `**:white_small_square: ${prefix}yapımcı**`)
  .addField(`**__Bağlantılar__**`, `**| [Beni Davet Et](https://discord.com/oauth2/authorize?client_id=718383676127313940&scope=bot&permissions=8) \n| [Destek Sunucusu](https://discord.gg/EFSN7u6) \n| [Kenshin Web Site](https://kenshin-website.glitch.me/)**`)
  .setFooter(`Kenshin - Tüm Hakları Saklıdır. - ${message.author.username} Tarafından istedi!`, message.author.avatarURL)
  .setTimestamp()
  .setThumbnail(client.user.avatarURL)
  //.setURL('https://discord.gg/y4cG9Ee')
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
  name: 'yardım',
  description: 'taslak', 
  usage: 'yardıms'
};*/
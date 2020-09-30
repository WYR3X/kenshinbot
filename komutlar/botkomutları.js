const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json');

var prefix = ayarlar.prefix;


exports.run = (client, message, params) => {
  const embedyardim = new Discord.RichEmbed()
  .setTitle("**<a:kenshin_ayarlar:726155629248380998> Kenshin - Bot Kategorisi**")
    .setAuthor(message.member.user.username, message.author.avatarURL)
    .setDescription('<a:kenshin_raptiye:726397959532707851> **Kenshin** bot kotegorisini aşağıdan görebilirsin. Herhangi bir sorun,hata olursa **[Destek Sunucumuza](https://discord.gg/EFSN7u6)** gelip bizimle iletişim kurmayı unutma.')
    .addBlankField()
  .setColor('RANDOM')
  .addField("**<a:kenshin_kirmizi:726397765680234537> Destek sunucumuzda yazarsanız size destekçi rolü verir! (BAKIM)**", `Örnek Kullanım = k!oyverdim`)
  .addField("**<a:kenshin_aqua:726397835477647412> Botun pingine bakarsınız!**", `Örnek Kullanım = k!ping`)
  .addField("**<a:kenshin_kirmizi:726397765680234537> Botun istatistiklerine bakarsınız!**", `Örnek Kullanım = k!istatistik`)
  .addField("**<a:kenshin_aqua:726397835477647412> Destek ekibi ile canlı desteğe geçersiniz!**", `Örnek Kullanım = k!canlıdestek`)
  .addField("**<a:kenshin_kirmizi:726397765680234537> Bot da bulduğunuz hataları bot sahibine iletirsiniz!**", `Örnek Kullanım = k!bug-bildir`)
  .addField("**<a:kenshin_aqua:726397835477647412> Bot da olmasını istediğiniz komutları bot sahibine iletirsiniz!**", `Örnek Kullanım = k!tavsiye <Tavsiyeniz>`)
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
  aliases: ['fun', 'funny'],
  permLevel: 0
};

exports.help = {
  name: 'bot-komutları',
  description: 'Tüm komutları gösterir.',
  usage: 'yardım [komut]'
};
const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json');

var prefix = ayarlar.prefix;


exports.run = (client, message, params) => {
  const embedyardim = new Discord.RichEmbed()
  .setTitle("**<a:kenshin_ayarlar:726155629248380998> Kenshin - Kullanıcı Kategorisi**")
    .setAuthor(message.member.user.username, message.author.avatarURL)
    .setDescription('<a:kenshin_raptiye:726397959532707851> **Kenshin** kullanıcı kategorisini aşağıdan görebilirsin. Herhangi bir sorun,hata olursa **[Destek Sunucumuza](https://discord.gg/EFSN7u6)** gelip bizimle iletişim kurmayı unutma.')
    .addBlankField()
 .setColor('RANDOM')
 .addField("**<a:kenshin_kirmizi:726397765680234537> İsmini yazdığınız Rol hakkında bilgi alırsınız!**", `Örnek Kullanım = k!rolinfo <rol ismi>`)
 .addField("**<a:kenshin_aqua:726397835477647412> Etiketlediğiniz kişi hakkında bilgi alırsınız!**", `Örnek Kullanım = k!kullanıcı-bilgi <@kişi>`)
 .addField("**<a:kenshin_kirmizi:726397765680234537> Etiketlediğiniz kişinin veya kendi avatarınıza bakarsınız!**", `Örnek Kullanım = k!avatar <@kişi>`)
 .addField("**<a:kenshin_aqua:726397835477647412> Etiketlediğniz kişinin veya kendi avatarınızı partner simgesi ekler!**", `Örnek Kullanım = k!partner <@kişi>`)
 .addField("**<a:kenshin_kirmizi:726397765680234537> Attığınız emojiyi resim olarak atar!**", `Örnek Kullanım = k!jumbo <:emoji:>`)
 .addField("**<a:kenshin_aqua:726397835477647412> Yazdığınız mesajı Trump Tweet yapar!**", `Örnek Kullanım = k!trump <Yazı>`)
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
  name: 'kullanıcı',
  description: 'Tüm komutları gösterir.',
  usage: 'yardım [komut]'
};
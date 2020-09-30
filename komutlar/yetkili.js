const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json');

var prefix = ayarlar.prefix;


exports.run = (client, message, params) => {
  const embedyardim = new Discord.RichEmbed()
  .setTitle("**<a:kenshin_ayarlar:726155629248380998> Kenshin - Yetkili Kategorisi**")
    .setAuthor(message.member.user.username, message.author.avatarURL)
    .setDescription('<a:kenshin_raptiye:726397959532707851> **Kenshin** yetkili kategorisi aşağıdan görebilirsin. Herhangi bir sorun,hata olursa **[Destek Sunucumuza](https://discord.gg/EFSN7u6)** gelip bizimle iletişim kurmayı unutma.')
    .addBlankField()
  .setColor('RANDOM')
  .addField("**<a:kenshin_kirmizi:726397765680234537> İstediğiniz kişiyi sunucudan banlar!**", `Örnek Kullanım = k!ban <@Üye> <Sebep>`)
  .addField("**<a:kenshin_aqua:726397835477647412> Sunucunuza güzel emojiler ekler!**", `Örnek Kullanım = k!emojikur`)
  .addField("**<a:kenshin_kirmizi:726397765680234537> Banladığınız kişileri detaylıca bir kanala gönderir! (ZORUNLU)**", `Örnek Kullanım = k!banlog <#kanal>`)
  .addField("**<a:kenshin_aqua:726397835477647412> İstediğiniz kişiyi sunucudan atar!**", `Örnek Kullanım = k!kick <@Üye> <Sebep>`)
  .addField("**<a:kenshin_kirmizi:726397765680234537> Sunucunuz için resimli hoşgeldin ayarlarsınız!**", `Örnek Kullanım = k!hg-kanal <#kanal>`)
  .addField("**<a:kenshin_aqua:726397835477647412> Sunucunuz için resimli görüşürüz ayarlarsınız!**", `Örnek Kullanım = k!bb-kanal <#kanal>`)
  .addField("**<a:kenshin_kirmizi:726397765680234537> Seçtiğiniz kanala resimli güvenlik atar!**", `Örnek Kullanım = k!güvenlik <#kanal>`)
  .addField("**<a:kenshin_aqua:726397835477647412> Sunucunuzda %80 büyük harfle yazanları engeller!**", `Örnek Kullanım = k!capslock-engel <aç/kapat>`)
  //.addField("**<a:kenshin_kirmizi:726397765680234537> Sunucunuzda spam yapanlar mı var? Bu işe yarayacak! (__YAKINDA__)**", `Örnek Kullanım = k!anti-spam <aç/kapat>`)
  .addField("**<a:kenshin_kirmizi:726397765680234537> Sunucunuza katılanlar için botun otomatik rol vermesini sağlar!**", `Örnek Kullanım = k!otorol <@ÜyeRol> <@BotRol> <#kanal>`)
  .addField("**<a:kenshin_aqua:726397835477647412> Sunucunuzda sayaç özelliğini açabilirsiniz!**", `Örnek Kullanım = k!sayaç <sayı> <#kanal>`)
   .addField("**<a:kenshin_kirmizi:726397765680234537> Sunucudan banlanan kullanıcının Ban sebebine bakarsınız!**", `Örnek Kullanım = k!ban-sorgu <ID>`)
   .addField("**<a:kenshin_aqua:726397835477647412> İstediğiniz kanalı belirttiğiniz süreye kadar kitler ve sizden başka kimse yazamaz!**", `Örnek Kullanım = k!kilit <1s,1m, 1h, 1w>`)
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
  aliases: ['mod', 'moderator'],
  permLevel: 0
};

exports.help = {
  name: 'yetkili',
  description: 'Tüm komutları gösterir.',
  usage: 'yardım [komut]'
};
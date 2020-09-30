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
  .addField("**<a:kenshin_kirmizi:726397765680234537> unucunuz için küfür engellemeyi açar/kapatır!**", `Örnek Kullanım = k!küfür-engel <aç/kapat>`)
  .addField("**<a:kenshin_aqua:726397835477647412> Sunucunuz için küfür reklam engellemeyi açar/kapatır!**", `Örnek Kullanım = k!reklam-engel <aç/kapat>`)
  .addField("**<a:kenshin_kirmizi:726397765680234537> Mod-Log kanalını değiştirmenizi/ayarlamanızı sağlar!**", `Örnek Kullanım = k!modlog-ayarla <#kanal>`)
  .addField("**<a:kenshin_aqua:726397835477647412> Sunucunuz için botun prefixini değişirsiniz!**", `Örnek Kullanım = k!prefix <Prefix>`)
  .addField("**<a:kenshin_kirmizi:726397765680234537> Sunucunuza yeni gelenlerin ismine belirttiğiniz tagı ekler!**", `Örnek Kullanım = k!ototag <Tag>`)
  .addField("**<a:kenshin_aqua:726397835477647412> Sunucuda istediğiniz kanalda belirttiğiniz süre kadar yavaş mod koyar!**", `Örnek Kullanım = k!yavaş-mod <1-120>`)
  .addField("**<a:kenshin_kirmizi:726397765680234537> Kullanıcı adı veya durum kısmında reklam olan kullanıcılara bakarsınız!**", `Örnek Kullanım = k!reklam-taraması`)
  .addField("**<a:kenshin_aqua:726397835477647412> Sunucuda istediğiniz oylamayı başlatır!**", `Örnek Kullanım = k!oylama <Yazı>`)
  .addField("**<a:kenshin_kirmizi:726397765680234537> Sunucuda süreli çekiliş yaparsınız!**", `Örnek Kullanım = k!çekiliş`)
  .addField("**<a:kenshin_aqua:726397835477647412> Belirttiğiniz miktarda mesaj siler!**", `Örnek Kullanım = k!temizle <5/100>`)
  //.addField("**<a:kenshin_kirmizi:726397765680234537> Belirttiğiniz kullanıcının adını değiştirir!**", `Örnek Kullanım = k!isim-değiş <@kişi> <yeni adı>`)
  .addField("**<a:kenshin_kirmizi:726397765680234537> Sunucuya kolay bir şekilde emoji eklersiniz!**", `Örnek Kullanım = k!emoji-ekle <link> <emojiadı>`)
  .addField("**<a:kenshin_aqua:726397835477647412> Sunucunuzun sürekli patlatılmasından bıktınız mı? Bu komut işinize yarayacak!**", `Örnek Kullanım = k!anti-raid-aç <#kanal>`)
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
  aliases: ['mod2', 'moderator2'],
  permLevel: 0
};

exports.help = {
  name: 'yetkili2',
  description: 'Tüm komutları gösterir.',
  usage: 'yardım [komut]'
};
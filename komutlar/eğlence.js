const Discord = require("discord.js");
const ayarlar = require("../ayarlar.json");

var prefix = ayarlar.prefix;

exports.run = (client, message, params) => {
  const embedyardim = new Discord.RichEmbed()
    .setTitle(
      "**<a:kenshin_ayarlar:726155629248380998> Kenshin - Eğlence Kategorisi**"
    )
    .setAuthor(message.member.user.username, message.author.avatarURL)
    .setDescription(
      "<a:kenshin_raptiye:726397959532707851> **Kenshin** eğlence kategorisi aşağıdan görebilirsin. Herhangi bir sorun,hata olursa **[Destek Sunucumuza](https://discord.gg/EFSN7u6)** gelip bizimle iletişim kurmayı unutma."
    )
    .addBlankField()
    .setColor("RANDOM")
    .addField(
      "**<a:kenshin_kirmizi:726397765680234537> Size özel kolay bir banner yapar!**",
      `Örnek Kullanım = k!banner <İsim>`
    )
    .addField(
      "**<a:kenshin_aqua:726397835477647412> Kral olursunuz kral gifi atar!**",
      `Örnek Kullanım = k!kral-ol`
    )
    .addField(
      "**<a:kenshin_kirmizi:726397765680234537> Bot ile adam asmaca oynarsınız!**",
      `Örnek Kullanım = k!adam-asmaca`
    )
    .addField(
      "**<a:kenshin_aqua:726397835477647412> 2 Kullanıcı arasındaki aşkı ölçersiniz! (BAKIMDA)**",
      `Örnek Kullanım = k!aşkölçer <@kişi>`
    )
    .addField(
      "**<a:kenshin_kirmizi:726397765680234537> Ülke kodunu girdiğiniz ülkenin korona istatistiğini atar!**",
      `Örnek Kullanım = k!korona <Ülke Kodu>`
    )
    .addField(
      "**<a:kenshin_aqua:726397835477647412> Bot ile Taş Kağıt Makas oynarsınız!**",
      `Örnek Kullanım = k!tkm <t,k,m>`
    )
    .addField(
      "**<a:kenshin_kirmizi:726397765680234537> Botun yardımı ile Türkçe Kelimeyi/Cümleyi ingilizceye çevirirsiniz!**",
      `Örnek Kullanım = k!çeviri <Kelime/Cümle>`
    )
    .addField(
      "**<a:kenshin_aqua:726397835477647412> Hayatınızın aşkına Evlenme teklifi edersiniz!**",
      `Örnek Kullanım = k!teklif <@Kullanıcı>`
    )
    .addField(
      "**<a:kenshin_kirmizi:726397765680234537> Yazdığınız IP'nin bilgilerini verir!**",
      `Örnek Kullanım = k!ip-bilgi <IP>`
    )
    .addField(
      `**__Linkler__**`,
      `**[Beni Davet Et](https://discord.com/oauth2/authorize?client_id=718383676127313940&scope=bot&permissions=8) - [Destek Sunucusu](https://discord.gg/EFSN7u6) - [Kenshin Web Site](https://kenshin-website.glitch.me/)**`
    )
    .setFooter(
      `Kenshin - Tüm Hakları Saklıdır. - ${message.author.username} Tarafından istedi!`,
      message.author.avatarURL
    );
  if (!params[0]) {
    const commandNames = Array.from(client.commands.keys());
    message.channel.send(embedyardim);
  } else {
    let command = params[0];
    if (client.commands.has(command)) {
      command = client.commands.get(command);
      message.author.send(
        "",
        `= ${command.help.name} = \n${command.help.description}\nDoğru kullanım: ` +
          prefix +
          `${command.help.usage}`
      );
    }
  }
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["fun", "funny"],
  permLevel: 0
};

exports.help = {
  name: "eğlence",
  description: "Tüm komutları gösterir.",
  usage: "yardım [komut]"
};

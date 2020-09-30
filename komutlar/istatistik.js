const Discord = require("discord.js");
const moment = require("moment");
const os = require('os');
require("moment-duration-format");
exports.run = async (bot, message, args) => {
  const duration = moment.duration(bot.uptime).format(" D [gün], H [saat], m [dakika], s [saniye]");
 
  let msg = message
   const bunemq = moment.duration(bot.uptime).format(" D [gün], H [saat], m [dakika], s [saniye]");
   const kenshinistatistik = new Discord.RichEmbed()
  .setColor('RANDOM')
  .setFooter('Kenshin - Tüm Hakları Saklıdır.', bot.user.avatarURL)
  .addField("<a:kenshin_tac:729955888135274548> **Bot Sahibi & Geliştirici**", "<@718136830754684999>,<@488285701788401664> | WyReX#1076, WyReX#3756")
  .addField("<a:kenshin_yukleniyor:727541429588721676> **Bellek kullanımı**", (process.memoryUsage().heapUsed / 512 / 512).toFixed(2) + ' MB', true)  
  .addField("<a:kenshin_hypesquad:725796881124556931> **Çalışma süresi**", bunemq)
  .addField('<a:kenshin_muzik:729962126814216286> **Müzik Çalınan Sunucu Sayısı**;', bot.voiceConnections.size)
  .addField('<:kenshin_kullanici:729964323383934986> **Kullanıcılar**:', bot.guilds.reduce((a, b) => a + b.memberCount, 0))
  .addField("<:kenshin_sunucu:729952965112365066> **Sunucular**", bot.guilds.size.toLocaleString(), true)
  .addField("<:kenshin_kanal:729952908766085151> **Kanallar**", bot.channels.size.toLocaleString(), true)
  .addField("<:kenshin_javascript:729955704055529473> **Discord.JS sürüm**", "v"+Discord.version, true)
  .addField("<:kenshin_javascript:729955704055529473> **Node.JS sürüm**", `${process.version}`, true)
  .addField(":ping_pong: **Ping**", bot.ping+" ms", true)
  .addField("<a:kenshin_yukleniyor:729961262951170079> **CPU**", `\`\`\`md\n${os.cpus().map(i => `${i.model}`)[0]}\`\`\``)
  .addField(":keyboard: **Bit**", `\`${os.arch()}\``, true)
  .addField("<a:kenshin_yildiz:729963460644831234> **İşletim Sistemi**", `\`\`${os.platform()}\`\``)
  .addField('**__Linkler__**', `**| [Kenshin'i Davet Et](https://discord.com/oauth2/authorize?client_id=718383676127313940&scope=bot&permissions=8) \n| [Kenshin Destek Sunucusu](https://discord.gg/EFSN7u6) \n| [Kenshin Web Site](https://kenshin-website.glitch.me/)**`)
  //.addField("**» Voteleme sayfası**", " [OYLAR MISIN?](https://top.gg/bot/596071936799277116/vote)", )

 return message.channel.send(kenshinistatistik);
  };
 
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [ 'i'],
  permLevel: 0
};
 
exports.help = {
  name: "istatistik",
  description: "Bot i",
  usage: "istatistik"
};
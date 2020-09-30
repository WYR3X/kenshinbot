const Discord = require("discord.js");
const ayarlar = require("../ayarlar.json");
const codepack = 'BLACK';
//codepack
exports.run = (client, message, params) => {
  if (!message.guild) {
    const ozelmesajuyari = new Discord.RichEmbed()
      .setColor(codepack)
      .setTimestamp()
      .setAuthor(message.author.username, message.author.avatarURL)
      .addField(`Eğlence Komutları Özel Mesajlarda Kullanılamaz!`);
    return message.author.sendEmbed(ozelmesajuyari);
  }
  if (message.channel.type !== "dm") {
    const kralol = new Discord.RichEmbed()
      .setAuthor(`${message.author.username} Artık Sen Bir Kralsın!`)
      .setColor(codepack)
      .setTimestamp()
       .setFooter(`Kenshin - Tüm Hakları Saklıdır.`)
      .setImage(`https://media.giphy.com/media/F0uvYzyr2a7Li/giphy.gif`);
    return message.channel.sendEmbed(kralol);
  }
};
//codepack
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: "kral-ol",
  description: "kralol",
  usage: "kralol"
};
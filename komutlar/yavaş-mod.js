const Discord = require('discord.js');

exports.run = async(client, message, args) => {
if (message.channel.type !== "text") return;
const limit = args[0] ? args[0] : 0;
  if(!limit) {
              var embed = new Discord.RichEmbed()
                .setDescription(`<:kenshin_carpi:726170425779814413> **Yanlış kullanım! /n Doğru kullanım: \`k!yavaş-mod <0/120>\`*`)
                .setColor("RANDOM")
                .setTimestamp()
            message.channel.send({embed})
            return
          }
if (limit > 120) {
    return message.channel.sendEmbed(new Discord.RichEmbed().setDescription("<:kenshin_carpi:726170425779814413> **Süre limiti maksimum ``120`` saniye olabilir!**").setColor("RANDOM"));
}
    message.channel.sendEmbed(new Discord.RichEmbed().setDescription(`<:kenshin_tik:726170369379139675> **Yazma süre limiti **${limit}** saniye olarak ayarlanmıştır!**`).setColor("RANDOM"));
var request = require('request');
request({
    url: `https://discordapp.com/api/v7/channels/${message.channel.id}`,
    method: "PATCH",
    json: {
        rate_limit_per_user: limit
    },
    headers: {
        "Authorization": `Bot ${client.token}`
    },
})};
  exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["slow-mode", "slowmode", "yavas-mod", 'yavasmod', 'yavaşmod'],
  permLevel: 3,
};

exports.help = {
  name: 'yavaş-mod',
  description: 'Sohbete yazma sınır (süre) ekler.',
  usage: 'yavaş-mod [1/120]',
};
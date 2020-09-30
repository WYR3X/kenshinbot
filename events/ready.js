const chalk = require('chalk');
const moment = require('moment');
const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json');

var prefix = ayarlar.prefix;

module.exports = client => {
  console.log(`[${moment().format('YYYY-MM-DD HH:mm:ss')}] BOT: Aktif, ${client.commands.size} komut yüklendi!`);
  console.log(`[${moment().format('YYYY-MM-DD HH:mm:ss')}] BOT: ${client.user.username} ismi ile giriş yapıldı!`);
  client.user.setStatus("idle");
  client.user.setGame(`k!yardım | k!davet | ${client.guilds.size} Sunucu`, "https://twitch.tv/wyrex_youtube");
  setInterval(() => {
    }, 1 * 5000);
}





/*const Discord = require("discord.js")


module.exports = bot => {
     console.log(`${bot.user.username} Başarıyla aktif oldu!`)
//bot.user.setActivity("Shizuka", {type: "STREAMING", url:"https://twitch.tv/wyrex_youtube"});

    let statuses = [ 
        `k!yardım | k!davet - Kenshin geri döndü!`,
        `k!yardım | k!davet - Kenshin geri döndü!`,
        `k!yardım | k!davet - Kenshin geri döndü!`,
        `k!yardım | k!davet - Kenshin geri döndü!`


    ]

    setInterval(function() {
        let status = statuses[Math.floor(Math.random() * statuses.length)];
        bot.user.setActivity(status, {type: "STREAMING", url:"https://twitch.tv/wyrex_youtube"});

    }, 10000)

}

const chalk = require('chalk');
const moment = require('moment');
const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json');

var prefix = ayarlar.prefix;

module.exports = client => {
  console.log(`[${moment().format('YYYY-MM-DD HH:mm:ss')}] BOT: Aktif, ${client.commands.size} komut yüklendi!`);
  console.log(`[${moment().format('YYYY-MM-DD HH:mm:ss')}] BOT: ${client.user.username} ismi ile giriş yapıldı!`);
  client.user.setStatus("idle");
  client.user.setGame(`a!yardım | a!davet | ${client.guilds.size} Sunucu`, "https://twitch.tv/wyrex_youtube");
  setInterval(() => {
    }, 1 * 5000);
}
*/
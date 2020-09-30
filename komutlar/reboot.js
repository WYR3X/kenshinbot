const {RichEmbed} = require("discord.js");
const ayarlar = require('../ayarlar.json')
exports.run = async (client, message, args, level) => {
  const db = require('quick.db');
  if(message.author.id !== "718136830754684999") return message.reply(`<a:carpi:707639155361972224>Bu komutu sadece Bot Sahibi kullanabilir!`);

  let embed = new RichEmbed()
  .setColor("BLACK")
  .setTitle("» Bot yeniden başlatılıyor...")
  await message.channel.send(embed); // send the embed

  
  console.log("Bot yeniden başlatılıyor...");


  client.commands.forEach( async cmd => {
    await client.unloadCommand(cmd);
  });


  process.exit(1);
}; 

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["reeboot", "reset", "yenile", "yeniden-başlat"],
  permLevel: 0,
 
};

exports.help = {
  name: "reboot",
  description: "Botu yeniden başlatır.",
  usage: "reboot",
 
};
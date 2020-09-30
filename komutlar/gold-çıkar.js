const Discord = require("discord.js");
const db = require("quick.db");
const ayarlar = require("../ayarlar.json");
const client = new Discord.Client();

exports.run = async (client, message, args) => {


  let GoldPlayer = args[0];
  if (!GoldPlayer) return message.channel.send(" Bir ID Girmelisin");
  message.react("703842141113417808");
  db.delete(`Gold_${GoldPlayer}`);
  message.channel.send(` **\`\`${GoldPlayer}\`\`** ID'sine Sahip <@${GoldPlayer}> Artık Gold Üye Değil!`
  );
  client.channels
    .get("725979980470812693")
    .send(`<:kenshin_tik:726170369379139675> Başarıyla **\`\`${GoldPlayer}\`\`** | <@${GoldPlayer}> adlı kullanıcı dan Gold Üye **alındı!**`
   );
  
};
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["gold-al"],
  permLevel: 4,
  kategori: "sahip"
};
exports.help = {
  name: "gold-kapat",
  description: "Gold Üye He ? :D",
  usage: "gold-Kapat"
};



/*const db = require('quick.db')
const Discord = require('discord.js')
const client = new Discord.Client();
exports.run = async (bot, message, args) => {
 //

  if (message.author.id !== '718136830754684999') return;
  let nesne = args[0]
  if (!nesne) return message.channel.send('<:kenshin_carpi:726170425779814413> **Bir kullanıcının IDsini girmelisin!**')
  
  db.delete(`avilio_gold${nesne}`, 'gold')
  
  message.channel.send(`<:kenshin_tik:726170369379139675> Başarıyla **${nesne}** IDli kullanıcı dan Gold Üye alındı!`)
}
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};
exports.help = {
  name: 'gold-al',
  description: '[Admin Komutu]',
  usage: 'karaliste <ID>'
};*/
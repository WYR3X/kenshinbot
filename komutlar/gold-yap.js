const Discord = require('discord.js')
const db = require('quick.db')
const ayarlar = require('../ayarlar.json')
const client = new Discord.Client();
exports.run = async (client, message, args) => {
  
  let GoldPlayer = args[0]
  if (!GoldPlayer) return message.channel.send(" Bir ID Girmelisin")
  db.set(`Gold_${GoldPlayer}`, 'Gold')
  message.channel.send(`<:kenshin_tik:726170369379139675> **\`\`${GoldPlayer}\`\`** | <@${GoldPlayer}> Kullanıcısı için Gold Üye Aktif edildi!`)
  client.channels
    .get("725979980470812693")
    .send(`<:kenshin_tik:726170369379139675> Başarıyla **\`\`${GoldPlayer}\`\`** | <@${GoldPlayer}> adlı kullanıcıya Gold Üye **verildi!**`
   );
};
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["gold-yap"],
  permLevel: 4,
kategori : 'sahip'
};
exports.help = {
  name: 'gold-ver',
  description: 'Gold Üye He ? :D',
  usage: 'gold-yap'
};

/*const db = require("quick.db");
const Discord = require("discord.js");
const client = new Discord.Client();
exports.run = async (client, message, args) => {
  if (message.author.id !== "718136830754684999")
    return message.channel.send(
      "<:kenshin_carpi:726170425779814413> **Bu Komutu Kullanabilmek için Yeterli Yetkiye Sahip Değilsin!**"
    );
  let nesne = args[0];
  if (!nesne)
    return message.channel.send(
      "<:kenshin_carpi:726170425779814413> **Bir kullanıcının IDsini girmelisin!**"
    );

  await db.set(`avilio_gold${message.member.id}`, "gold");
  message.channel.send(
    "<:kenshin_tik:726170369379139675> **<@!"+nesne+"> adlı kullanıcı Gold Üye oldu!**"
  );
  client.channels
    .get("725979980470812693")
    .send(
      "<:kenshin_tik:726170369379139675> **Başarıyla <@!"+nesne+">  adlı kullanıcı için Gold Üye aktifleştirildi!**"
    );
};
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};
exports.help = {
  name: "gold-ver",
  description: "[Admin Komutu]",
  usage: "karaliste <ID>"
};

/////

const db = require('quick.db')
const Discord = require('discord.js')
const client = new Discord.Client();
exports.run = async (bot, message, args) => {
 //

  if (message.author.id !== '718136830754684999') return;
  let nesne = args[0]
  if (!nesne) return message.channel.send('<:kenshin_carpi:726170425779814413> **Bir kullanıcının IDsini girmelisin!**')
  
  db.set(`avilio_gold${nesne}`, 'gold')
  
  message.channel.send(`<:kenshin_tik:726170369379139675> Başarıyla **${nesne}** IDli kullanıcı için Gold Üye aktifleştirildi!`)
}
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};
exports.help = {
  name: 'gold-ver',
  description: '[Admin Komutu]',
  usage: 'karaliste <ID>'
};*/
const Discord = require('discord.js')
const db = require('quick.db')

exports.run = async(client, message, args) => {
  if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(`**Bu komutu kullanabilmek için yeterli yetkiye sahip değilsin!**`);

let logk = message.mentions.channels.first();
let logkanal = await db.fetch(`codeminglog_${message.guild.id}`)
  
  if (args[0] === "sıfırla" || args[0] === "kapat") {
    if(!logkanal) return message.channel.sendEmbed(new Discord.RichEmbed().setDescription(`<a:uyari_ver:726172121935511603> Modlog Kanalı Zaten ayarlı değil!`).setColor("RANDOM"));
    
    db.delete(`codeminglog_${message.guild.id}`)
   message.channel.sendEmbed(new Discord.RichEmbed().setDescription(`<:kenshin_tik:726170369379139675> ModLog Kanalı başarıyla sıfırlandı!`).setColor("RANDOM"));

    return
  }
  
if (!logk) return message.channel.sendEmbed(new Discord.RichEmbed().setDescription(`<a:uyari_ver:726172121935511603> Bir Modlog kanalı belirt!`).setColor("RANDOM"));
 

db.set(`codeminglog_${message.guild.id}`, logk.id)

message.channel.sendEmbed(new Discord.RichEmbed().setDescription(`<:kenshin_tik:726170369379139675> Mod-Log kanalı başarıyla ${logk} olarak ayarlandı!`).setColor("RANDOM"));

console.log(`ModLog komutu ${message.author.username} Tarafından kullanıldı.`)
};

//CodEming //Jr.Escomat

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['mod-log','modlog'],
    permLevel: 3,//Kendi permlerinize göre ayarlayın,
  kategori:'moderasyon'
};

exports.help = {
    name: 'modlog-ayarla',
    description: 'Mod-Log kanalını belirler.',
    usage: 'mod-log <#kanal>'
};
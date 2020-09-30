const Discord = require('discord.js')
const fs = require('fs');
const ayarlar = require('../ayarlar.json');
let gkanal = JSON.parse(fs.readFileSync("./ayarlar/glog.json", "utf8"));

var prefix = ayarlar.prefix;

exports.run = async (client, message, args) => {
if (!message.member.hasPermission("ADMINISTRATOR")) return message.reply(`**Bu komutu kullanabilmek için yeterli yetkiye sahip değilsin!**`);
  
  let channel = message.mentions.channels.first()
    if (!channel) {
        message.reply(`<:kenshin_carpi:726170425779814413> **Yalnış Kullanım!\n**Doğru Kullanım: k!hg-kanal <#kanal>**`)
        return
    }
    if(!gkanal[message.guild.id]){
        gkanal[message.guild.id] = {
            resim: channel.id
        };
    }
    fs.writeFile("./ayarlar/glog.json", JSON.stringify(gkanal), (err) => {
        console.log(err)
    })
    message.channel.send(`╔══════════════════════╗`)
    message.channel.send(`║**Resimli Giriş ${channel} kanalına gönderilecektir!**`)
    message.channel.send(`╚══════════════════════╝`)
}
    
exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['hg-kanal'],
    permLevel: 2
}

exports.help = {
    name: 'hg-kanal',
    description: 'Giriş Çıkış Kanalını Ayarlar.',
    usage: 'b!hg-kanal <#kanal>'
}
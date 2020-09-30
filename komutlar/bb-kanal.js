const Discord = require('discord.js')
const fs = require('fs');
const ayarlar = require('../ayarlar.json');
let gkanal = JSON.parse(fs.readFileSync("./ayarlar/glog1.json", "utf8"));

var prefix = ayarlar.prefix;

exports.run = async (client, message, args) => {
if (!message.member.hasPermission("ADMINISTRATOR")) return message.reply(`**Bu komutu kullanabilmek için yeterli yetkiye sahip değilsin!**`);
  let channel = message.mentions.channels.first()
    if (!channel) {
        message.reply(`<:kenshin_carpi:726170425779814413> **Yanlış Kullanım!\n**Doğru Kullanım: k!bb-kanal <#kanal>**`)
        return
    }
    if(!gkanal[message.guild.id]){
        gkanal[message.guild.id] = {
            resim: channel.id
        };
    }
    fs.writeFile("./ayarlar/glog1.json", JSON.stringify(gkanal), (err) => {
        console.log(err)
    })
    message.channel.send(`╔══════════════════════╗`)
    message.channel.send(`║**Resimli Çıkış ${channel} kanalına gönderilecektir!**`)
    message.channel.send(`╚══════════════════════╝`)
}
    
exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['hg-kanal'],
    permLevel: 2
}

exports.help = {
    name: 'bb-kanal',
    description: 'Çıkış Kanalını Ayarlar.',
    usage: '!bb-kanal <#kanal>'
}
const Discord = require('discord.js');
//BLACK 
exports.run = (client, message, args) => {
    if (!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send("⛔ Yeterli yetkiniz yok");
    let kullanici = args[0];
    if (!kullanici) return message.channel.send("Bir kullanıcı ID girmen gerek")
    message.guild.fetchBans()
        .then(bans => {
            if (!bans.has(kullanici)) {
                return message.channel.send(`<:kenshin_carpi:726170425779814413> **Bu kullanıcı banlı değil!**`)
            }
        })
    message.guild.fetchBan(kullanici).then(({ user, reason }) => {
        message.channel.send(`<a:uyari_ver:726172121935511603> ${user.tag} adlı kullanıcının Ban nedeni: **${reason}**`)

    })
}

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: 0
};

exports.help = {
    name: 'ban-sorgu',
    description: 'Ban sorgulama yaparsınız.',
    usage: 'ban-sorgu'
}; 
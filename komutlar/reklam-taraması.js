const Discord = require('discord.js')
const ayarlar = require('../ayarlar.json')

exports.run = (client, message, args) => {
  
  if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply(`**Bu komutu kullanabilmek için yeterli yetkiye sahip değilsin!**`);

    const members = message.guild.members.filter(member => member.user.presence.game && /(discord|http|.com|.net|.org|invite|İnstagram|Facebook|watch|Youtube|youtube|facebook|instagram|.cf|.ml|Botumu)/g.test(member.user.presence.game.name));
    const memberss = message.guild.members.filter(member => member.user.username && /(discord|http|.com|.net|.org|invite|İnstagram|Facebook|watch|Youtube|youtube|facebook|.exe|.cf|.ml|Botumu)/g.test(member.user.username));
    const embed = new Discord.RichEmbed()
        .addField('**<a:uyari_ver:726172121935511603> Oynuyor Mesajı Reklam İçeren Kullanıcılar!**', members.map(member => `${member} = ${member.user.presence.game.name}`).join("\n") || "<:kenshin_tik:726170369379139675> Kimsenin Oynuyor Mesajı Reklam İçermiyor!")
        .addField('**<a:uyari_ver:726172121935511603> Kullanıcı Adı Reklam İçeren Kullanıcılar!**', memberss.map(member => `${member} = ${member.user.username}`).join("\n") || "<:kenshin_tik:726170369379139675> Kimsenin Kullanıcı Adı Reklam İçermiyor!")
        .setColor("RANDOM")
    message.channel.send({embed})
}

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ['reklam-ara', 'reklamara', 'reklamtaraması'],
    permLevel: 2
}

exports.help = {
    name: 'reklam-taraması',
    description: 'Kullanıcıların Oynuyor mesajındaki ve Kullanıcı adlarındaki reklamları tarar.',
    usage: 'reklam-taraması'
}
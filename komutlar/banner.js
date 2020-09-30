const Discord = require('discord.js');

exports.run = async (client, message, args) => {
  const yazi = args.slice(0).join('+'); 

  if(!yazi) return message.channel.send(`<:kenshin_carpi:726170425779814413> **Lütfen Bannerde Yazacak Yazıyı Yazın!**`)
  const linqo = `https://dummyimage.com/2000x500/33363c/ffffff&text=${yazi}`
  .replace(' ', '+')

  
  const embed = new Discord.RichEmbed()
  .setTitle("Banneriniz!")
  .setColor("#2ECC71")
  .setImage(linqo)
  .setFooter('Kenshin | Banner Sistemi')
  message.channel.send(embed)
}
exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: 0
}

exports.help = {
    name: 'banner',
    description: 'Yazdığınız yazıyı bannera çevirir.',
    usage: 'banner <yazı>'
}
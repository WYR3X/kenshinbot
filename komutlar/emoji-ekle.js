const Discord = require('discord.js');

exports.run = (client, message, args) => {
 if(!message.member.hasPermissions("MANAGE_EMOJIS")) return message.channel.send("**Bu komutu kullanabilmek için yeterli yetkiye sahip değilsin!**")
    let link = args[0]
    let isim = args[1];
    let guild = message.guild;
    if (!link) return message.channel.send('<a:uyari_ver:726172121935511603> **Emojinin alınacağı linki girmelisin!**')
    if (!isim) return message.channel.send('<a:uyari_ver:726172121935511603> **Emojinin ismini belirlemedin!**')

    guild.createEmoji(`${link}`, `${isim}`)
        .then(emoji => 
         message.channel.send(`**<:kenshin_tik:726170369379139675> ``${isim}`` İsmiyle yeni bir emoji oluşturuldu!**`))
         message.react('✅')
        .catch(console.error);

}

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['addemoji', 'emojioluştur'],
    permLevel: 3
}
exports.help = {
    name: 'emoji-ekle',
    description: 'Sunucuya emoji eklersiniz',
    usage: 'emojiekle <link> <isim>',
}
const Discord = require('discord.js');

exports.run = (client, message, args) => {

    let user = message.mentions.users.first() || message.author

    const avatar = new Discord.RichEmbed()
    .setColor("RANDOM")
    .setAuthor(user.username + "'in Avatarı!")
    .setTitle("Linke gitmek için tıkla!")
    .setURL(user.avatarURL)
    .setImage(user.avatarURL)
    .setFooter(`${message.author.username} Tarafından istedi!`)
    .setTimestamp()
    message.channel.send(avatar)
console.log(`${message.author.username} Tarafından istedi!`)
};

exports.conf = {
	enabled: true,
	guildOnly: false,
	aliases: ["pp","profil-foto","profil-fotoğraf"],
	permLevel: 0
}

exports.help = {
	name: 'avatar',
	description: 'Etiketlediğiniz kullanıcının avatarını gösterir.',
	usage: 'avatar'
}

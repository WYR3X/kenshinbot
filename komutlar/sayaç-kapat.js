const Discord = require('discord.js')
const fs = require('fs')

exports.run = async (client, message, args) => {
	let profil = JSON.parse(fs.readFileSync("./ayarlar/sayac.json", "utf8"));
		if(!profil[message.guild.id]) {
			const embed = new Discord.RichEmbed()
				.setDescription(`<a:uyari_ver:726172121935511603> **Sayaç ayarlı olmadığı için sıfırlanamaz!**`)
				.setColor("RANDOM")
				.setTimestamp()
			message.channel.send({embed})
			return
		}
		delete profil[message.guild.id]
		fs.writeFile("./ayarlar/sayac.json", JSON.stringify(profil), (err) => {
			console.log(err)
		})
		const embed = new Discord.RichEmbed()
			.setDescription(`**<:kenshin_deaktif:726172163844866079> Sayaç başarıyla deaktif edildi!**`)
			.setColor("RANDOM")
			.setTimestamp()
		message.channel.send({embed})
		return
	}

exports.conf = {
  enabled: true, 
  guildOnly: false, 
  aliases: [],
  permLevel: 3
};

exports.help = {
  name: 'sayaç-sıfırla', 
  description: 'Slots oyunu oynar',
  usage: 'sayaçsıfırla'
};
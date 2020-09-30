const Discord = require('discord.js')
const db = require('quick.db')
const fs = require('fs')

exports.run = async (client, message, args) => {
	if(!args[0]) {
		const embed = new Discord.RichEmbed()
			.setDescription(`<a:uyari_ver:726172121935511603> **Lütfen bir sayı yazın!**`)
			.setColor("RED")
			.setTimestamp()
		message.channel.send({embed})
		return
  }
  
	let profil = JSON.parse(fs.readFileSync("./ayarlar/sayac.json", "utf8"));
  var mentionedChannel = message.mentions.channels.first();
  if (!mentionedChannel && args[0] !== "sıfırla") return message.channel.send("Kanal seç!");


	if(args[0] === "sıfırla") {
		if(!profil[message.guild.id]) {
			const embed = new Discord.RichEmbed()
				.setDescription(`<a:uyari_ver:718532020472512563> **Sayaç ayarlı olmadığı için sıfırlanamaz!**`)
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
			.setDescription(`**<:deaktif:720913357502283776> Sayaç başarıyla deaktif edildi!**`)
			.setColor("RANDOM")
			.setTimestamp()
		message.channel.send({embed})
		return
	}

	if(isNaN(args[0])) {
		const embed = new Discord.RichEmbed()
			.setDescription(`<a:uyari_ver:718532020472512563> **Lütfen bir sayı yazın!**`)
			.setColor("RANDOM")
			.setTimestamp()
		message.channel.send({embed})
		return
	}

	if(args[0] <= message.guild.memberCount) {
		const embed = new Discord.RichEmbed()
			.setDescription(`<a:uyari_ver:718532020472512563> **Lütfen sunucu sayısından ``${message.guild.memberCount}`` daha yüksek bir değer girin!**`)
			.setColor("RANDOM")
			.setTimestamp()
		message.channel.send({embed})
		return
	}

	if(!profil[message.guild.id]){
		profil[message.guild.id] = {
			sayi: args[0],
      kanal: mentionedChannel.id
		};
	}
	
	profil[message.guild.id].sayi = args[0]
  profil[message.guild.id].kanal = mentionedChannel.id
	
	fs.writeFile("./ayarlar/sayac.json", JSON.stringify(profil), (err) => {
		console.log(err)
	})

	const embed = new Discord.RichEmbed()
		.setDescription(`**Sayaç başarıyla ${args[0]} olarak ayarlandı!\nSayaç kanalı başarıyla ${mentionedChannel} olarak ayarlandı!**`)
		.setColor("RANDOM")
		.setTimestamp()
	message.channel.send({embed})
}

exports.conf = {
	enabled: true,
	guildOnly: true,
	aliases: ['sayaç-ayarla', 'sayac', 'sayac-ayarla'],
	permLevel: 2
}

exports.help = {
	name: 'sayaç',
	description: 'Sayacı ayarlar.',
	usage: 'sayaç [sayı/sıfırla] [kanal]'
}
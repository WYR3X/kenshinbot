const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json');
const db = require('quick.db')
module.exports = async message => {
  let client = message.client;
  let prefix = db.fetch(`prefix_${message.guild.id}`) || ayarlar.prefix
  
  if (message.author.bot) return;
  if (!message.content.startsWith(prefix)) return;
  let command = message.content.split(' ')[0].slice(prefix.length);
  let params = message.content.split(' ').slice(1);
  let perms = client.elevation(message);
  let cmd;
  if (client.commands.has(command)) {
    cmd = client.commands.get(command);
  } else if (client.aliases.has(command)) {
    cmd = client.commands.get(client.aliases.get(command));
  }
  if (cmd) {    
      if (cmd.conf.enabled === false) {
      if (!ayarlar.sahip.includes(message.author.id) && !ayarlar.sahip.includes(message.author.id)) {
        const embed = new Discord.RichEmbed()
                    .setDescription(`**${cmd.help.name}** isimli komut şuanda geçici olarak kullanıma kapalıdır!`)
                    .setColor("RED")
                message.channel.send({embed})
                return
      }
    }
  
    
    if (cmd.conf.permLevel === 1) {
			if (!message.member.hasPermission("MANAGE_MESSAGES")) {
				const embed = new Discord.RichEmbed()
					.setDescription("**Bu komutu kullanabilmek için ``Mesajları Yönet`` iznine sahip olmalısın!**")
          .setColor("RED")
				message.channel.send({embed})
				return
			}
		}
		if (cmd.conf.permLevel === 2) {
			if (!message.member.hasPermission("KICK_MEMBERS")) {
				const embed = new Discord.RichEmbed()
					.setDescription("**Bu komutu kullanabilmek için ``Üyeleri At`` iznine sahip olmalısın!**")
					.setColor("RED")
				message.channel.send({embed})
				return
			}
		}
    if (cmd.conf.permLevel === 3) {
			if (!message.member.hasPermission("BAN_MEMBERS")) {
				const embed = new Discord.RichEmbed()
					.setDescription("**Bu komutu kullanabilmek için ``Üyeleri Yasakla`` iznine sahip olmalısın!**")
					.setColor("RED")
				message.channel.send({embed})
				return
			}
		}
		if (cmd.conf.permLevel === 4) {
			if (!message.member.hasPermission("ADMINISTRATOR")) {
				const embed = new Discord.RichEmbed()
					.setDescription("**Bu komutu kullanabilmek için ``Yönetici`` iznine sahip olmalısın!**")
					.setColor("RED")
				message.channel.send({embed})
				return
			}
		}
		if (cmd.conf.permLevel === 5) {
			if (!ayarlar.sahip.includes(message.author.id)) {
				const embed = new Discord.RichEmbed()
					.setDescription("**Bu komutu sadece ``Sahibim`` kullanabilir!**")
					.setColor("RED")
				message.channel.send({embed})
				return
			}
		}
    
    let veri = await db.fetch(`botbakım`)
if(veri) {
 if(message.author.id !== "718136830754684999") {
 
 let codeming = new Discord.RichEmbed()
 .setTitle('Kenshin - Bakım')
 .setDescription('Kenshin bot sahibi tarafından bakıma alındı!')
 .addField('**BAKIMA ALINMA SEBEBİ**:', veri)
 .setColor('RANDOM')
message.channel.send(codeming).then(m => m.delete(10000))
 return
 } 
  
}
      if (db.has(`kullanicikaraliste_${message.author.id}`) === true) {
    let embed = new Discord.RichEmbed()
    .setColor("RANDOM")
    .setDescription("**Sen komutarı kullanamazsın! Çünkü Bot sahibi tarafından Kara Listeye alındın!**")
    message.channel.send({embed: embed})
   // message.react("😡")
    return
  };

    if (perms < cmd.conf.permLevel) return;
    cmd.run(client, message, params, perms);
  }

};
 
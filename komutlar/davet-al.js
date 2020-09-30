const Discord = require('discord.js');

const db = require('quick.db')

const ayarlar = require('../ayarlar.json')

exports.run = (client, message, args) => { 

 

  if(message.author.id !== ayarlar.sahip) return message.reply( new Discord.RichEmbed() .setColor('RED') .setThumbnail( message.author.avatarURL ) .setTitle(' ❌ Yetki Hatası ') .setDescription('Bu komutu sadece sahibim kullanabilir.'))

  

  let guilds = client.guilds.get(args[0]) || client.guilds.find(s => s.name === args.slice(0).join(' '))

  

  if(!guilds) return message.reply('**Bir sunucunun IDsini veya bir sunucu ismi belirt. Örn: k!sunucu-davet Kenshin Destek')

  

  try {

    

   guilds.channels.get(guilds.channels.random()).createInvite({maxAge: 0}).then((invite) => { 

   

     let bilal = new Discord.RichEmbed()

     .setTitle('Sunucu Davet')

     .setDesciption('İstediğin **'+guilds.name+'** adlı sunucunun daveti: \n\n [Link]('+invite.url+')')

     .setColor('BLACK')

     .setFooter(message.guild.iconURL, 'darkcode')

     message.author.send(bilal)

    

   })

  } catch(e) {

    

    return message.reply('**Bir hatadan dolayı belirttiğin sunucunun davetini oluşturamadım, sanırım yetkim yok.**')

    

  }

  };

exports.conf = {

  enabled: true,  

  guildOnly: false, 

  aliases: [], 

  permLevel: 0

};

exports.help = {

  name: 'sunucu-davet',

  description: '', 

  usage: 'sunucu-davet'

};
const Discord = require('discord.js');
const moment = require('moment');
const ms = require('ms')
exports.run = async (client, message) => {
var time = moment().format('Do MMMM YYYY , hh:mm');
var room;
var title;
var duration;
var currentTime = new Date(),
hours = currentTime.getHours() + 3 ,
minutes = currentTime.getMinutes(),
done = currentTime.getMinutes() + duration,
seconds = currentTime.getSeconds();
if (minutes < 10) {
minutes = "0" + minutes;
}
var suffix = "AM";
if (hours >= 12) {
suffix = "PM";
hours = hours - 12;
}
if (hours == 0) {
hours = 12;
}
var filter = m => m.author.id === message.author.id;
 
  
  
      message.channel.send(`**Çekilişin yapılacağı kanalın adını yaz!**`).then(msg => {
      message.channel.awaitMessages(filter, {
        max: 1,
        time: 20000,
        errors: ['time']
      }).then(collected => {
        let room = message.guild.channels.find('name' , collected.first().content);
        if(!room) return message.channel.send('<a:uyari_ver:726172121935511603> **Lütfen kanalın ismini yaz! (Sunucu da ismi nasılsa öyle!)**');
        room = collected.first().content;
        collected.first().delete();
        msg.edit('<a:uyari_ver:726172121935511603> **Çekilişin süresini belirle (1s, 1m, 1h, 1d, 1w)**').then(msg => {
          message.channel.awaitMessages(filter, {
            max: 1,
            time: 20000,
            errors: ['time']
          }).then(collected => {
            if(!collected.first().content.match(/[1-60][s,m,h,d,w]/g)) return message.channel.send('<:kenshin_carpi:726170425779814413> **Böyle bir süre yok! Lütfen tekrar dene!**');
            duration = collected.first().content
            collected.first().delete();
            msg.edit('<a:uyari_ver:726172121935511603> **Çekiliş ödülü ne olacak?**').then(msg => {
              message.channel.awaitMessages(filter, {
                max: 1,
                time: 20000,
                errors: ['time']
              }).then(collected => {
                title = collected.first().content;
                collected.first().delete();
                msg.delete();
                message.delete();
                try {
                  let giveEmbed = new Discord.RichEmbed()
                  .setColor("#f558c9")
                  .setDescription(`**Ödül: ${title}** \n🎉'a Basarak Katıl \nKalan Süre : ${duration} \n **Başlama Zamanı :** ${hours}:${minutes}:${seconds} ${suffix}`)
                  .setFooter(message.author.username + " Kenshin - Tüm Hakları Saklıdır.", message.author.avatarURL);
                  message.guild.channels.find("name" , room).send('<:kenshin_tik:726170369379139675> **ÇEKİLİŞ BAŞLADI** <:kenshin_tik:726170369379139675>' , {embed: giveEmbed}).then(m => {
                     let re = m.react('🎉');
                     setTimeout(() => {
                       let users = m.reactions.get("🎉").users
                       let list = users.array().filter(u => u.id !== m.author.id !== client.user.id);
                       let gFilter = list[Math.floor(Math.random() * list.length) + 0]
                       let endEmbed = new Discord.RichEmbed()
                       .setAuthor(message.author.username, message.author.avatarURL)
                       .setTitle(title)
                       .setColor("#f558c9")
            .setFooter("Kenshin - Tüm Hakları Saklıdır.")
                       .addField('🎉 Çekiliş Bitti! 🎉',`Kazanan : ${gFilter} \nBitiş zamanı :`)
                       .setTimestamp()
                     m.edit('** 🎉 ÇEKİLİŞ BİTTİ 🎉**' , {embed: endEmbed});
                       
                       var embedLel = new Discord.RichEmbed()
                        .setColor("RANDOM")
                        .setDescription("<:kenshin_tik:726170369379139675> Ödülünü Moderatörleri Etiketleyerek Alabilirsin!")
                       .setFooter("Kenshin - Tüm Hakları Saklıdır.")
                    message.guild.channels.find("name" , room).send(`<a:uyari_ver:726172121935511603> **Tebrikler! ${gFilter}! \`${title}\` ödülünü kazandın!**` , embedLel)
                }, ms(duration));
            });
                } catch(e) {
                message.channel.send(`<:kenshin_carpi:726170425779814413> **Maalesef gerekli yetkilerim bulunmamakta!**`);
                  console.log(e);
                }
              });
            });
          });
        });
      });
    });
  
  
};
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 2
};
exports.help = {
  name: 'çekiliş',
  description: 'Çekiliş mi?? Sunucunda güzel şeyler olacak :3',
  usage: 'çekiliş'
};
   
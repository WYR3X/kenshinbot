const Discord = require('discord.js');
const db = require('quick.db')
exports.run = async(client, message, args) => { 
if(message.author.id !== "718136830754684999") return message.channel.send('**Bu komutu kullanamazsın! (Sadece sahibim kullanabilir!)**')
  
  if(args[0] === "kapat") {
let veri = await db.fetch(`botbakım`)
if(!veri) return message.reply('<a:uyari_ver:726172121935511603> **Anlaşılan bot zaten bakımda değil!**')
message.reply('<:kenshin_tik:726170369379139675> **Bot başarıyla bakım modundan çıkarıldı!**')
db.delete(`botbakım`)    
  return
}
 
    
if(args[0] === "al") {

  
  let avilio = args.slice(1).join(' ');
  let wyrex; 
  wyrex = 'Kenshin'
  if(!avilio) return message.reply('**Bu komutu kullanabilmek için yeterli yetkiye sahip değilsin!**')

  let yılmaz = new Discord.RichEmbed()
  .setTitle('Bot Bakıma Alındı!')
  .setDescription('Şu andan itibaren botu bakıma aldınız! Sizin dışında hiçbir kullanıcı siz bakımı kapayana kadar hiçbir bot komutunu kullanamayacak! \n\n **kapamak için:** k!bakım kapat \n\n Botu kullanmaya çalışan kişilere `'+avilio+'` sebebi ile bakımda olduğumu belirteceğim!')
  .setColor('RED')
  .setFooter(wyrex + ' Bot Bakım Sistemi')
message.channel.send(yılmaz)
  message.delete()
  db.set(`botbakım`, avilio)
 return
}
message.reply('<:kenshin_carpi:726170425779814413> **Yanlış kullanım! \n Doğru Kullanım; k!bakım al/kapat**')
};
exports.conf = {
  enabled: true,  
  guildOnly: false, 
  aliases: [], 
  permLevel: 0
};

exports.help = {
  name: 'bakım',
  description: 'taslak', 
  usage: 'bakım'
};
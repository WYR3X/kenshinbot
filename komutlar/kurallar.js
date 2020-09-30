const Discord = require('discord.js');

exports.run = async(client, message) => {

    const rules = new Discord.RichEmbed()
    
      .setColor('RED')
      .addField(`Kurallar`, [`
      
      - Küfür, Argo ve Reklam Kesinlikle **Yasaktır**!
      - Spam ve Flood **Yasaktır**!
      - Din, Dil, Irk ve Siyaset Konuşmak **Yasaktır**!
      - Herkes Birbirine Saygılı Olmalıdır!
      - Herkesin Görüşü Kendinedir Bu Yüzden Tartışmak **Yasaktır**!
      - Üstünlük Göstermek/Taslamak **Yasaktır**!
      - Caps ve Emoji Kullanımı **Yasaktır**! (Aşırı Olmadıkça)
      - Oynuyor/Durum Kısmına Reklam veya Küfür Yazmak **Yasaktır**!
      - Yetkililere Karşı Gelmek **Yasaktır**!
      - Bot Basmak/J4J Yapmak **Yasaktır**!
      - Rahatsızlık Vermek **Yasaktır**! \n\n
      - SUNUCUYA GİRDİĞİNİZ ANDA OKUMUŞ SAYILACAKSINIZ!

      `])

       message.delete();
      //message.react("🔴");

    return message.channel.send(rules).then(keleS => keleS.react("👍"));

}

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['rules'],
    permLevel: 2
}

exports.help = {
    name : 'kurallar',
    description: 'Hazır kuralları kanalınıza atar.',
    usage: '<prefix>kurallar/rules'
}
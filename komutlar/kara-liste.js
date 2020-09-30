const Discord = require('discord.js');
const db = require('quick.db');
const ayarlar = require('../ayarlar.json')


exports.run = (client, message, args) => {
    if( message.author.id !=ayarlar.sahip) {
        return message.reply("Bu komutu kullanabilmek için sahibim olman gerek")
    } else {
        let kisimq = args[0]
        let sebep = args.slice(1).join(" ")
        
        if(!sebep) return message.reply(+ kisimq + "** ID'li kullanıcıyı neden kara listeye aldığını yaz!**")

        if(!kisimq) {
            const hata = new Discord.RichEmbed()
            .setTitle("<a:uyari_ver:726172121935511603> **Bir kullanıcı ID'si belirtmelisin!**")
            return message.channel.send(hata)
        }
      
      message.reply('<:kenshin_tik:726170369379139675> **Gerekli bilgiler belirtilen kanala gönderildi!**')

        db.set(`kullanicikaraliste_${kisimq}`, 'aktif')
        const basari = new Discord.RichEmbed()
        .setTitle(client.user.username+ ` Kara Liste`)
        .setColor('BLACK')
        .setDescription("<:kenshin_tik:726170369379139675> Başarıyla **" + kisimq + "** ID'li sahip kullanıcı Kara listeye alındı! Kara Listeye Alınma Sebebi ise **" + sebep +  "** Artık Benim Komutlarını Kullanamayacak!**")
        
        client.channels.get("725979752166457444").send(basari)
    }

};


exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permlevel: 5
};


exports.help = {
    name: "kara-liste"
}

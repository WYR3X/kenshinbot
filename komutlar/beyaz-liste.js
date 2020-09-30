const Discord = require('discord.js');
const db = require('quick.db');
const ayarlar = require('../ayarlar.json');

exports.run = (client, message, args) => {
    if( message.author.id != ayarlar.sahip) {
        return message.reply("**Bu komutu sadece sahibim kullanabilir!**")
    } else {
        let kisimq = args[0]

        if(!kisimq) {
            const hata = new Discord.RichEmbed()
            .setColor("red")
            .setTitle("<a:uyari_ver:726172121935511603>**Lütfen bir kullanıcı ID'si belirtiniz!**")
            return message.channel.send(hata)
        };

       message.reply('<:kenshin_tik:726170369379139675> **Gerekli bilgiler belirtilen kanala gönderildi!**')

      
        db.delete(`kullanicikaraliste_${kisimq}`)

        const basari = new Discord.RichEmbed()
        .setTitle('WHITE')
        .setTitle(client.user.username+ ` Beyaz Liste`)
        .setDescription("<:kenshin_tik:726170369379139675> Başarıyla **" + kisimq +  "** IDye sahip kullanıcı Beyaz listeye alındı! Artık Benim Komutlarını Kullanabilecek!")
        //.setDescription(kisimq +  "Adlı kullanıcı beyaz listeye eklendi! <a:onaylandi:707508979156385852>")
        //return message.channel.send(basari)
        client.channels.get("725979752166457444").send(basari)
    };

};

exports.conf = {
    enbabled: true,
    guildOnly: false,
    aliases: [],
    permlevel: 5
};


exports.help = {
    name: "beyaz-liste"
};
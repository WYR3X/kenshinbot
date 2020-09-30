const Discord = require('discord.js');
const client = new Discord.Client();
const ayarlar = require('./ayarlar.json');
const chalk = require('chalk');
const moment = require('moment');
var Jimp = require('jimp');
const { Client, Util } = require('discord.js');
const weather = require('weather-js')
const fs = require('fs');
const db = require('quick.db');
require('./util/eventLoader.js')(client);
const path = require('path');
const request = require('request');
const snekfetch = require('snekfetch');
const queue = new Map();
const YouTube = require('simple-youtube-api');
const ytdl = require('ytdl-core');

const express = require('express');
const app = express();
const http = require('http');
    app.get("/", (request, response) => {
    console.log(`Bot Yeniden Aktif!`);
    response.sendStatus(404);
    });
    app.listen(process.env.PORT);
    setInterval(() => {
    http.get(`http://kenshin-bot.glitch.me/`);
    }, 280000);  




var prefix = ayarlar.prefix;

const log = message => {
    console.log(`${message}`);
};

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir('./komutlar/', (err, files) => {
    if (err) console.error(err);
    log(`${files.length} komut yüklenecek.`);
    files.forEach(f => {
        let props = require(`./komutlar/${f}`);
        log(`Yüklenen komut: ${props.help.name}.`);
        client.commands.set(props.help.name, props);
        props.conf.aliases.forEach(alias => {
            client.aliases.set(alias, props.help.name);
        });
    });
});




client.reload = command => {
    return new Promise((resolve, reject) => {
        try {
            delete require.cache[require.resolve(`./komutlar/${command}`)];
            let cmd = require(`./komutlar/${command}`);
            client.commands.delete(command);
            client.aliases.forEach((cmd, alias) => {
                if (cmd === command) client.aliases.delete(alias);
            });
            client.commands.set(command, cmd);
            cmd.conf.aliases.forEach(alias => {
                client.aliases.set(alias, cmd.help.name);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};

client.load = command => {
    return new Promise((resolve, reject) => {
        try {
            let cmd = require(`./komutlar/${command}`);
            client.commands.set(command, cmd);
            cmd.conf.aliases.forEach(alias => {
                client.aliases.set(alias, cmd.help.name);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};




client.unload = command => {
    return new Promise((resolve, reject) => {
        try {
            delete require.cache[require.resolve(`./komutlar/${command}`)];
            let cmd = require(`./komutlar/${command}`);
            client.commands.delete(command);
            client.aliases.forEach((cmd, alias) => {
                if (cmd === command) client.aliases.delete(alias);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};

client.elevation = message => {
    if (!message.guild) {
        return;
    }
    let permlvl = 0;
    if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
    if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
    if (message.author.id === ayarlar.sahip) permlvl = 4;
    return permlvl;
};

var regToken = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g;
// client.on('debug', e => {
//   console.log(chalk.bgBlue.green(e.replace(regToken, 'that was redacted')));
// });

client.on('warn', e => {
    console.log(chalk.bgYellow(e.replace(regToken, 'that was redacted')));
});

client.on('error', e => {
    console.log(chalk.bgRed(e.replace(regToken, 'that was redacted')));
});

client.login(ayarlar.token);

////SAYAÇ////
let sayac = JSON.parse(fs.readFileSync("./ayarlar/sayac.json", "utf8"));

client.on("message", async message => {
  let sayac = JSON.parse(fs.readFileSync("./ayarlar/sayac.json", "utf8"));
  if (sayac[message.guild.id]) {
    if (sayac[message.guild.id].sayi <= message.guild.members.size) {
      const embed = new Discord.RichEmbed()
        .setDescription(
          `:loudspeaker: Tebrikler! Başarılı Bir Şekilde **${sayac[message.guild.id].sayi}** Kullanıcıya Ulaştık! Sayaç Kapatıldı!`
        )
        .setColor("0x808080")
        .setTimestamp();
      message.channel.send({ embed });
      delete sayac[message.guild.id].sayi;
      delete sayac[message.guild.id];
      fs.writeFile("./ayarlar/sayac.json", JSON.stringify(sayac), err => {
        console.log(err);
      });
    }
  }
});
client.on("guildMemberRemove", async member => {
  let sayac = JSON.parse(fs.readFileSync("./ayarlar/sayac.json", "utf8"));
  let giriscikis = JSON.parse(fs.readFileSync("./ayarlar/sayac.json", "utf8"));
  let embed = new Discord.RichEmbed()
    .setTitle("Kenshin Sayaç Sistemi")
    .setDescription(``)
    .setColor("RED")
    .setFooter("© Kenshin 2020", client.user.avatarURL);

  if (!giriscikis[member.guild.id].kanal) {
    return;
  }

  try {
    let giriscikiskanalID = giriscikis[member.guild.id].kanal;
    let giriscikiskanali = client.guilds
      .get(member.guild.id)
      .channels.get(giriscikiskanalID);
    giriscikiskanali.send(
      `:loudspeaker: :outbox_tray: Görüşürüz **${member.user.tag}** Aramızdan Ayrıldı! \**${sayac[member.guild.id].sayi}\** Kişi Olmamıza \**${sayac[member.guild.id].sayi - member.guild.memberCount}\** Kişi Kaldı! \**${member.guild.memberCount}\** Kişiyiz! `
    );
  } catch (e) {
    // eğer hata olursa bu hatayı öğrenmek için hatayı konsola gönderelim.
    return console.log(e);
  }
});
client.on("guildMemberAdd", async member => {
  let sayac = JSON.parse(fs.readFileSync("./ayarlar/sayac.json", "utf8"));
  let giriscikis = JSON.parse(fs.readFileSync("./ayarlar/sayac.json", "utf8"));
  let embed = new Discord.RichEmbed()
    .setTitle("Kenshin Sayaç Sistemi")
    .setDescription(``)
    .setColor("GREEN")
    .setFooter("© Kenshin 2020", client.user.avatarURL);

  if (!giriscikis[member.guild.id].kanal) {
    return;
  }

  try {
    let giriscikiskanalID = giriscikis[member.guild.id].kanal;
    let giriscikiskanali = client.guilds
      .get(member.guild.id)
      .channels.get(giriscikiskanalID);
    giriscikiskanali.send(
      `:loudspeaker: :inbox_tray: Hoşgeldin **${member.user.tag}** Aramıza Katıldı! **${sayac[member.guild.id].sayi}** Kişi Olmamıza **${sayac[member.guild.id].sayi - member.guild.memberCount}** Kişi Kaldı! \**${member.guild.memberCount}\** Kişiyiz!`
    );
  } catch (e) {
    // eğer hata olursa bu hatayı öğrenmek için hatayı konsola gönderelim.
    return console.log(e);
  }
});
////OTOROL////
client.on("guildMemberAdd", async member => {
  let veri = db.get(`otorol.${member.guild.id}`);
  if (!veri) return;
  if(!member.guild.roles.has(veri.uyeRolu) || !member.guild.roles.has(veri.botRolu) || !member.guild.channels.has(veri.kanal)) return db.delete(`otorol.${member.guild.id}`);
  
  if (member.user.bot) {
    member.addRole(veri.botRolu);
    member.guild.channels.get(veri.kanal).send(`:loudspeaker: :inbox_tray: ${member} **adlı bot sunucuya katıldı! Bot rolü verildi!**`);
  } else {
    member.addRole(veri.uyeRolu);
    member.guild.channels.get(veri.kanal).send(`:loudspeaker: :inbox_tray: ${member} **adlı kullanıcı sunucuya katıldı! Üye rolü verildi!**`);
  };
});


/*client.on("guildMemberAdd", async member => {
let avilio_wyrex = await db.fetch(`wyrexotorol_${member.guild.id}`) 
let avilio_kanal = await db.fetch(`wyrexotorolkanal_${member.guild.id}`)
if(!avilio_wyrex || !avilio_kanal) return
member.addRole(avilio_wyrex)
client.channels.get(avilio_kanal).send(`:loudspeaker: :inbox_tray: Hoşgeldin! **@${member.user.username}!** Rolün Başarıyla Verildi!`)
});*/
////BOT DURUM////
client.on('ready', async message => { 
  const hook = new Discord.WebhookClient("733198976999751763", "64mDUo9KCblnYqCEyipyh6l8qvSkYZbJucc5KSIH1-KP3xvPaBPgVmrOOt1dn64_YcJx");
  let embed = new Discord.RichEmbed()
  .setColor('RANDOM')
  .setTitle(client.user.username+ ` Durum`)
  .setDescription(`**Aktif Oldum! Anlık olarak;\n\`${client.guilds.size}\` sunucuya\n\`${client.channels.size}\` kanala\n\`${client.guilds.reduce((a, b) => a + b.memberCount, 0)} \` kullanıcıya hizmet veriyorum.** \n**Daha fazla bilgi için: k!istatistik**`)
   .setTimestamp()
  hook.send(embed)
});
////SA-AS AYARLA////
client.on('message', async (msg, member, guild) => {
  let i = await  db.fetch(`saas_${msg.guild.id}`)
      if(i === 'açık') {
        if (msg.content.toLowerCase() === 'sa') {
        msg.reply('<a:kenshin_merhaba:730301910829105233> **Aleyküm Selam Hoşgeldin! Bugün Nasılsın? ^^**');      
      } 
      }
    });
////REKLAM ENGEL////
client.on("message", async msg => {
  let i = await db.fetch(`kufur_${msg.guild.id}`);
  if (i == "Açık") {
    const kufur = [
      "discord.gg",
      "https://",
      "http",
      ".com",
      ".xyz",
      ".net",
      ".com.tr",
      ".glitch.me",
      ".org",
      ".net",
      ".site",
      ".co",
      "discord",
      "serverime gelin",
      "youtube.com"
    ];
    if (kufur.some(word => msg.content.includes(word))) {
      try {
        if (!msg.member.hasPermission("BAN_MEMBERS")) {
          msg.delete();

          return msg
            .reply("**<a:uyari_ver:718532020472512563> Bu Sunucuda Reklamlar ``Kenshin`` Tarafından Engelleniyor. Reklam yapmana izin vermeyeceğim!**")
            .then(msg => msg.delete(5000));
        }
      } catch (err) {
        console.log(err);
      }
    }
  } else if (i == "Kapalı") {
  }
});
////AFK////
client.on("message" , async msg => {
  if(msg.content.startsWith(ayarlar.prefix+"afk")) return;
 
  let afk = msg.mentions.users.first()
 
  const kisi = db.fetch(`afkid_${msg.author.id}_${msg.guild.id}`)
 
  const isim = db.fetch(`afkAd_${msg.author.id}_${msg.guild.id}`)
 if(afk){
   const sebep = db.fetch(`afkSebep_${afk.id}_${msg.guild.id}`)
   const kisi3 = db.fetch(`afkid_${afk.id}_${msg.guild.id}`)
   if(msg.content.includes(kisi3)){
 
       msg.reply(`<a:uyari_ver:726172121935511603> **Etiketlediğiniz Kişi Şuanda AFK! \nSebep : __${sebep}__**`)
   }
 }
  if(msg.author.id === kisi){
 
       msg.reply(`<:kenshin_tik:726170369379139675> **Başarıyla AFK Modundan Çıktınız.**`)
  db.delete(`afkSebep_${msg.author.id}_${msg.guild.id}`)
  db.delete(`afkid_${msg.author.id}_${msg.guild.id}`)
  db.delete(`afkAd_${msg.author.id}_${msg.guild.id}`)
   msg.member.setNickname(isim)
   
 }
 
});
////FAKE KATIL AYRIL////
client.on('message', async message => {
if (message.content === 'k!katıl') { // ! yerine prefixi yaz
  client.emit('guildMemberAdd', message.member || await message.guild.fetchMember(message.author));
    }
});
client.on('message', async message => {
if (message.content === 'k!ayrıl') { // ! yerine prefixi yaz
  client.emit('guildMemberRemove', message.member || await message.guild.fetchMember(message.author));
    }
});
////GÜVENLİK////
client.on('guildMemberAdd',async member => {
  let user = client.users.get(member.id);
  let kanal = client.channels.get(db.fetch(`guvenlik${member.guild.id}`)) 
       const Canvas = require('canvas')
       const canvas = Canvas.createCanvas(360,100);
       const ctx = canvas.getContext('2d');
  
  const resim1 = await Canvas.loadImage('https://cdn.discordapp.com/attachments/688676354241069062/716640121478316042/1590930545113.png')
    const resim2 = await Canvas.loadImage('https://cdn.discordapp.com/attachments/688676354241069062/716640121260081172/1590930500838.png')
    const kurulus = new Date().getTime() - user.createdAt.getTime();
    const gün = moment(kurulus).format('dddd');  
    var kontrol;
      if (kurulus > 2629800000) kontrol = resim2
    if (kurulus < 2629800000) kontrol = resim1

       const background = await Canvas.loadImage('https://cdn.discordapp.com/attachments/688676354241069062/716640121746751508/PicsArt_05-31-04.10.32.jpg');
       ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
   

  const avatar = await Canvas.loadImage(member.user.displayAvatarURL);
  ctx.drawImage(kontrol,0,0,canvas.width, canvas.height)
  ctx.beginPath();
    ctx.lineWidth = 4;
  ctx.fill()
    ctx.lineWidth = 4;
  ctx.arc(180, 46, 36, 0, 2 * Math.PI);
    ctx.clip();
  ctx.drawImage(avatar, 143,10, 73, 72  );

   if (!kanal) return
       const attachment = new Discord.Attachment(canvas.toBuffer(), '  kenshin-güvenlik.png');
    kanal.send(attachment)
});
////ANTİ RAİD////
client.on('guildMemberAdd', (member) => {
  const db = require('quick.db');   
 
    const guild = member.guild;

       const katılabilir = db.fetch(`katılabilir_${member.id}`)

       const Kanal = db.fetch(`antiraid_${member.guild.id}`).replace("<#", "").replace(">", "")
                 if (katılabilir == undefined) {

       if(Kanal != undefined) {
         
       }

    if(member.user.bot !==true){

    } 
    else {
      member.guild.channels.get(Kanal).send(`📢 :white_check_mark: **${member}** Adlı Botun Giriş İzni Olmadığı İçin Sunucudan Atıldı!`)
       member.kick(member) 
  }
                 }
            if (katılabilir == 'katılabilir') {
              member.guild.channels.get(Kanal).send(`📢 :white_check_mark: **${member}** Adlı Botun Giriş İzni Olduğu İçin Sunucuya Katıldı!`)
              db.delete(`katılabilir_${member.id}`)
            }
        
  });
////DM LOG////
client.on("message", message => {
    if (message.channel.type === "dm") {
        if (message.author.bot) return;
        const dm = new Discord.RichEmbed()
         .setTitle(`${client.user.username}'e Özelden Mesaj Gönderildi `)
         .setColor("#7289DA")
         .addField(`Mesajı Gönderen`,message.author.tag)
         .addField(`Gönderilen Mesaj`,message.content)
         .setThumbnail(message.author.avatarURL) 
    client.channels.get("725799788045664308").send(dm);
    }
});
////ETİMET BİLGİ////
client.on ('message', message => {
 let prefix = require('quick.db').fetch(`prefix_${message.guild.id}`) || ayarlar.prefix
  if (message.content === '<@'+client.user.id+'>') {
  const embed = new Discord.RichEmbed()
  .setTitle('**Selam!**')
  .setDescription('Merhaba ' + message.member.user.username + '! **' + message.guild.name + '** Sunucusundaki Bilgilerim : \n Sunucudaki Prefixim : **' + prefix + '** \n **' + message.guild.name + '** Sunucu ID`si : **' + message.guild.id + '** ')
  .setColor('WHITE')
 message.channel.send(embed)
.then(msg => msg.delete(10000));
}
});
////EKLENDİM ATILDIM////
client.on("guildCreate", guild => {
  let codeming1 = client.channels.get("725979878876250113")

 const codeming = new Discord.RichEmbed()
.setTitle("SUNUCUYA EKLENDİM")
.setColor("GREEN")
.addField('** Sunucu ID**', `\`${guild.id}\``)
.addField('** Sunucu İsmi**', `\`${guild.name}\``)
.addField('** Üye Sayısı**', `\`${guild.members.size}\``)
.addField('** Kurucu**', `\`${guild.owner.user.tag}\``)
.addField('** Kurucu ID**', `\`${guild.owner.user.id}\``)
codeming1.send(codeming)
});

client.on("guildDelete", guild => {
  let codeming2 = client.channels.get("725979878876250113")

 const codeming3 = new Discord.RichEmbed()
.setTitle("SUNUCUDAN ATILDIM")
.setColor("RED")
.addField('** Sunucu ID**', `\`${guild.id}\``)
.addField('** Sunucu İsmi**', `\`${guild.name}\``)
.addField('** Üye Sayısı**', `\`${guild.members.size}\``)
.addField('** Kurucu**', `\`${guild.owner.user.tag}\``)
.addField('** Kurucu ID**', `\`${guild.owner.user.id}\``)
codeming2.send(codeming3)
});
////HG KANAL////
client.on("guildMemberAdd", async member => {
   const fs = require('fs');
    let gkanal = JSON.parse(fs.readFileSync("./ayarlar/glog.json", "utf8"));
    const gözelkanal = member.guild.channels.get(gkanal[member.guild.id].resim)
    if (!gözelkanal) return;
     let username = member.user.username;
        if (gözelkanal === undefined || gözelkanal === null) return;
        if (gözelkanal.type === "text") {
      gözelkanal.send(`**Hoşgeldin ${member.user} Sunucuya katıldı!**`)
            const bg = await Jimp.read("https://cdn.discordapp.com/attachments/688676354241069062/713811686204768266/PicsArt_05-23-08.52.31.png");
            const userimg = await Jimp.read(member.user.avatarURL);
            var font;
            if (member.user.tag.length <10) font = await Jimp.loadFont(Jimp.FONT_SANS_64_WHITE);
            else if (member.user.tag.length > 0) font = await Jimp.loadFont(Jimp.FONT_SANS_32_WHITE);
            else font = await Jimp.loadFont(Jimp.FONT_SANS_32_WHITE);
            await bg.print(font, 300, 300, member.user.tag);
            await userimg.resize(187, 169);////boyut
            await bg.composite(userimg, 317, 15).write("./img/"+ member.id + ".png");///sağa sola, yukarı aşşa
              setTimeout(function () {
                    gözelkanal.send(new Discord.Attachment("./img/" + member.id + ".png"));
              }, 1000);
              setTimeout(function () {
                fs.unlink("./img/" + member.id + ".png");
              }, 10000);
        }
    })

client.on('message', async message => {
    if (message.content === 'fake') {
        client.emit('guildMemberAdd', message.member || await message.guild.fetchMember(message.author));
    }
});

////BB-KANAL////
client.on("guildMemberRemove", async member => {
   const fs = require('fs');
    let gkanal = JSON.parse(fs.readFileSync("./ayarlar/glog1.json", "utf8"));
   const gözelkanal = member.guild.channels.get(gkanal[member.guild.id].resim)
    if (!gözelkanal) return;
        let username = member.user.username;
        if (gözelkanal === undefined || gözelkanal === null) return;
        if (gözelkanal.type === "text") {  
      gözelkanal.send(`**Görüşürüz! ${member.user} Sunucudan ayrıldı!**`)
                        const bg = await Jimp.read("https://cdn.discordapp.com/attachments/688676354241069062/713811267026157668/PicsArt_05-23-08.48.55.png");
            const userimg = await Jimp.read(member.user.avatarURL);
            var font;
             if (member.user.tag.length <10) font = await Jimp.loadFont(Jimp.FONT_SANS_64_WHITE);
            else if (member.user.tag.length > 0) font = await Jimp.loadFont(Jimp.FONT_SANS_32_WHITE);
            else font = await Jimp.loadFont(Jimp.FONT_SANS_32_WHITE);
            await bg.print(font, 300, 300, member.user.tag);
            await userimg.resize(189, 173);////boyut
            await bg.composite(userimg, 317, 15).write("./img/"+ member.id + ".png");///sağa sola, yukarı aşşa
              setTimeout(function () {
                    gözelkanal.send(new Discord.Attachment("./img/" + member.id + ".png"));
              }, 1000);
              setTimeout(function () {
                fs.unlink("./img/" + member.id + ".png");
              }, 10000);
        }
    })
////KÜFÜR ENGEL////
client.on("message", async (wyrex) => {
 let yılmaz = await db.fetch(`küfürengel_${wyrex.guild.id}`)
 if(!yılmaz) return
  
 let avilio = wyrex.content
 
 if(wyrex.member.permissions.has("ADMINISTRATOR")) return
 let küfürler = ["aq","amk","sikik","sik","yarak","pezevenk","orospu","orosbu","sikiş","sokuş","anal","annenin","oç", "oc","piç", "amq", "sik", "amcık", "çocu", "sex", "seks", "amına", "orospu çocuğu", "sg", "siktir git", "mk", "amk", "aq", "orospu", "oruspu", "oç", "sikerim", "yarrak", "piç", "amq", "sik", "amcık", "çocu", "sex", "seks", "amına", "orospu çocuğu", "sg", "siktir git"] // uzatabilirsiniz...
if (küfürler.some(word => wyrex.content.toLowerCase().includes(word)) ) {
 
  wyrex.delete(30)
  let avilio = await db.fetch(`küfür_${wyrex.guild.id}_${wyrex.author.id}`)
  if(!avilio) avilio = 1
  wyrex.channel.send("<@!"+wyrex.author.id+"> ** <a:uyari_ver:726172121935511603> Bu Sunucuda Küfürler ``"+client.user.username+"`` Tarafından Engelleniyor!** **Bu sunucuda etmiş olduğun küfür sayısı ``"+avilio+"``!**").then(m => m.delete(10000))
db.add(`küfür_${wyrex.guild.id}_${wyrex.author.id}`, 1)
}
})
////GOLD ÜYE////
client.on("message", async message => {
  //let Gold = client.emojis.get("703842046300913704");
  let TimeOut = 1800000;
  let LastSee = await db.fetch(`GoldS_${message.author.id}`);
  let R = await db.fetch(`Gold_${message.author.id}`);
  if (R == "Gold") {
    if (LastSee !== null && TimeOut - (Date.now() - LastSee) > 0) {
      //let Time = ms(TimeOut - (Date.now() - LastSee));
    } else {
      if (message.author.bot) return;
      if (message.content.length > 1) {
        db.set(`GoldS_${message.author.id}`, Date.now());
        const RevengeNYKS = new Discord.RichEmbed()
         // .setAuthor(message.author.tag, message.author.avatarURL)
          .setDescription(
              "<a:kenshin_gold:726171382139846747> Hizaya Geçin! <@" + message.author.id +"> **Gold Üyeliğe** Sahip!"
          )
          .setColor("RANDOM");
        message.channel
          .send(RevengeNYKS)
          .then(message => message.delete(12000));
      }
    }
  } else if (R == undefined) {
  }
  if (!R) return;
});
////CAPSLOCK ENGEL////
client.on("message", async msg => {
  if (msg.channel.type === "dm") return;
  if (msg.author.bot) return;
  if (msg.content.length > 4) {
    if (db.fetch(`capslock_${msg.guild.id}`)) {
      let caps = msg.content.toUpperCase();
      if (msg.content == caps) {
        if (!msg.member.hasPermission("ADMINISTRATOR")) {
          if (!msg.mentions.users.first()) {
            msg.delete();
            return msg.reply('<a:uyari_ver:726172121935511603> **Bu Sunucuda Capslock ``Kenshin`` tarafından engelleniyor!**')
              .then(m => m.delete(5000));
          }
        }
      }
    }
  }
});
////MOD LOG////
client.on('channelCreate', async channel => {
  const c = channel.guild.channels.get(db.fetch(`codeminglog_${channel.guild.id}`));
  if (!c) return;
    var embed = new Discord.RichEmbed()
                    .addField(`Yeni Bir Kanal Oluşturuldu`, `İsmi: \`${channel.name}\`\n Türü: **${channel.type}**\n ID: ${channel.id}`)
                    .setTimestamp()
                    .setColor("RANDOM")
                    .setFooter(`${channel.client.user.username}#${channel.client.user.discriminator}`, channel.client.user.avatarURL)
    c.send(embed)
});

client.on('channelDelete', async channel => {
  const c = channel.guild.channels.get(db.fetch(`codeminglog_${channel.guild.id}`));
  if (!c) return;
    let embed = new Discord.RichEmbed()
                    .addField(`Bir Kanal Silindi`, ` İsmi: \`${channel.name}\`\n Türü: **${channel.type}**\n ID: ${channel.id}`)
                    .setTimestamp()
                    .setColor("RANDOM")
                    .setFooter(`${channel.client.user.username}#${channel.client.user.discriminator}`, channel.client.user.avatarURL)

    c.send(embed)
});

   client.on('channelNameUpdate', async channel => {
  const c = channel.guild.channels.get(db.fetch(`codeminglog_${channel.guild.id}`));
  if (!c) return;
    var embed = new Discord.RichEmbed()
                    .addField(`Kanal İsmi Değiştirildi`, ` Yeni İsmi: \`${channel.name}\`\n ID: ${channel.id}`)
                    .setTimestamp()
                    .setColor("RANDOM")
                    .setFooter(`${channel.client.user.username}#${channel.client.user.discriminator}`, channel.client.user.avatarURL)
    c.send(embed)
});




client.on('emojiCreate', emoji => {
  const c = emoji.guild.channels.get(db.fetch(`codeminglog_${emoji.guild.id}`));
  if (!c) return;

    let embed = new Discord.RichEmbed()
                    .addField(`Yeni Bir Emoji Oluşturuldu`, ` İsmi: \`${emoji.name}\`\n GIF mi?: **${emoji.animated}**\n Emoji ID'si : ${emoji.id}`)
                    .setTimestamp()
                    .setColor("RANDOM")
                    .setFooter(`${emoji.client.user.username}#${emoji.client.user.discriminator}`, emoji.client.user.avatarURL)

    c.send(embed)
    });
client.on('emojiDelete', emoji => {
  const c = emoji.guild.channels.get(db.fetch(`codeminglog_${emoji.guild.id}`));
  if (!c) return;

  
    let embed = new Discord.RichEmbed()
                    .addField(`Bir Emoji Silindi`, ` İsmi: \`${emoji.name}\`\n GIF mi? : **${emoji.animated}**\n Emoji ID'si : ${emoji.id}`)
                    .setTimestamp()
                    .setColor("RANDOM")
                    .setFooter(`${emoji.client.user.username}#${emoji.client.user.discriminator}`, emoji.client.user.avatarURL)

    c.send(embed)
    });
client.on('emojiUpdate', (oldEmoji, newEmoji) => {
  const c = newEmoji.guild.channels.get(db.fetch(`codeminglog_${newEmoji.guild.id}`));
  if (!c) return;

    let embed = new Discord.RichEmbed()
                    .addField(`Bir Emoji Güncellendi`, ` Eski ismi: \`${oldEmoji.name}\`\n Yeni ismi: \`${newEmoji.name}\`\n ID: ${oldEmoji.id}`)
                    .setTimestamp()
                    .setColor("RANDOM")
                    .setFooter(`${newEmoji.client.user.username}#${newEmoji.client.user.discriminator}`, newEmoji.client.user.avatarURL)

    c.send(embed)
    });

client.on('guildBanAdd', async (guild, user) => {    
    const channel = guild.channels.get(db.fetch(`codeminglog_${guild.id}`));
  if (!channel) return;
  
  const entry = await guild.fetchAuditLogs({type: 'MEMBER_BAN_ADD'}).then(audit => audit.entries.first())

    let embed = new Discord.RichEmbed()
                    .setAuthor(`${user.username}#${user.discriminator}`, user.avatarURL)
                    .addField(`Bir Kullanıcı Banlandı`, ` İsmi: \`${user.username}\`\n ID: **${user.id}**\n Sebep: **${entry.reason || 'Belirtmedi'}**\n Banlayan Yetkili: **${entry.executor.username}#${entry.executor.discriminator}**`)
                    .setTimestamp()
                    .setColor("RANDOM")
                    .setFooter(`${entry.executor.username}#${entry.executor.discriminator} Tarafından`, entry.executor.avatarURL)

    channel.send(embed)
});


client.on('guildBanRemove', async (guild, user) => {    
    const channel = guild.channels.get(db.fetch(`codeminglog_${guild.id}`));
  if (!channel) return;
  
  const entry = await guild.fetchAuditLogs({type: 'MEMBER_BAN_ADD'}).then(audit => audit.entries.first())

    let embed = new Discord.RichEmbed()
                    .setAuthor(`${user.username}#${user.discriminator}`, user.avatarURL)
                    .addField(`Bir Kullanıcının Banı Açıldı`, ` İsmi: \`${user.username}\`\n ID: **${user.id}**\n Banı Kaldıran  Yetkili: **${entry.executor.username}#${entry.executor.discriminator}**`)
                    .setTimestamp()
                    .setColor("RANDOM")
                    .setFooter(`${entry.executor.username}#${entry.executor.discriminator} tarafından`, entry.executor.avatarURL)

    channel.send(embed)
});
client.on('messageDelete', async message => {    
  if(message.author.bot) return

    const channel = message.guild.channels.get(db.fetch(`codeminglog_${message.guild.id}`));
  if (!channel) return;
  
    let embed = new Discord.RichEmbed()
                    .setAuthor(`${message.author.username}#${message.author.discriminator}`, message.author.avatarURL)
                    .setTitle("Mesaj Silindi")                
                    .addField(`Silinen Mesaj : ${message.content}`,`Kanal: ${message.channel.name}`)
                  //  .addField(`Kanal:`,`${message.channel.name}`)
                    .setTimestamp()
                    .setColor("RANDOM")
                    .setFooter(`${message.client.user.username}#${message.client.user.discriminator}`, message.client.user.avatarURL)

    channel.send(embed)
});

client.on('messageUpdate', async(oldMessage, newMessage) => {
    if(oldMessage.author.bot) return;
    if(oldMessage.content == newMessage.content) return;

    const channel = oldMessage.guild.channels.get(db.fetch(`codeminglog_${oldMessage.guild.id}`));
    if(!channel) return;

    let embed = new Discord.RichEmbed()
    .setTitle("Mesaj güncellendi!")
    .addField("Eski mesaj : ",`${oldMessage.content}`)
    .addField("Yeni mesaj : ",`${newMessage.content}`)
    .addField("Kanal : ",`${oldMessage.channel.name}`)
    .setTimestamp()
    .setColor("RANDOM")
    .setFooter(`${oldMessage.client.user.username}#${oldMessage.client.user.discriminator}`,`${oldMessage.client.user.avatarURL}`)

    channel.send(embed)
});

client.on('roleCreate', async (role) => {    

    const channel = role.guild.channels.get(db.fetch(`codeminglog_${role.guild.id}`));
  if (!channel) return;
  
    let embed = new Discord.RichEmbed()
.addField(`Rol Oluşturuldu`, ` İsmi: \`${role.name}\`\n ID: ${role.id}`)                    
.setTimestamp()
.setColor("RANDOM")
.addField("Rol Renk Kodu : ",`${role.hexColor}`)
.setFooter(`${role.client.user.username}#${role.client.user.discriminator}`, role.client.user.avatarURL)

    channel.send(embed)
});

client.on('roleDelete', async (role) => {    

    const channel = role.guild.channels.get(db.fetch(`codeminglog_${role.guild.id}`));
  if (!channel) return;
  
    let embed = new Discord.RichEmbed()
.addField(`Rol Silindi`, ` İsmi: \`${role.name}\`\n ID: ${role.id}`)                    
.setTimestamp()
.setColor("RANDOM")
    .addField("Rol Renk kodu : ",`${role.hexColor}`)
.setFooter(`${role.client.user.username}#${role.client.user.discriminator}`, role.client.user.avatarURL)

    channel.send(embed)
})
client.on('voiceStateUpdate', (oldMember, newMember) => {
  
 // if (!logA[oldMember.guild.id]) return;
  
  if (db.has(`codeminglog_${oldMember.guild.id}`) === false) return;
  
  var kanal = oldMember.guild.channels.get(db.fetch(`codeminglog_${oldMember.guild.id}`).replace("<#", "").replace(">", ""))
  if (!kanal) return;
  
  let newUserChannel = newMember.voiceChannel
  let oldUserChannel = oldMember.voiceChannel

  if(oldUserChannel === undefined && newUserChannel !== undefined) {

    const embed = new Discord.RichEmbed()
    .setColor("RANDOM")
    .setDescription(`<:kenshin_tik:726170369379139675> ${newMember.user.tag} adlı kullanıcı \`${newUserChannel.name}\` isimli sesli kanala giriş yaptı!`)
    kanal.send(embed);
    
  } else if(newUserChannel === undefined){

    const embed = new Discord.RichEmbed()
    .setColor("RANDOM")
    .setDescription(`<:kenshin_carpi:726170425779814413> ${newMember.user.tag} adlı kullanıcı sesli kanaldan çıkış yaptı!`)
    kanal.send(embed);
    
  }
});
////OTO TAG////
client.on('guildMemberAdd', async member => {
  
  let tag = await db.fetch(`tag_${member.guild.id}`);
  let tagyazi;
  if (tag == null) tagyazi = member.setNickname(`${member.user.username}`)
  else tagyazi = member.setNickname(`${tag} | ${member.user.username}`)
});
////EKLENİNCE MESAJ////
client.on("guildCreate", guild => {
let kanal = guild.channels.filter(c => c.type === "text").random();

kanal.send(
":inbox_tray: | Kenshin sunucunuza başarıyla eklendi. \n k!yardım Yazarak Komutlarımıza Ulaşabilirsiniz. \n Kenshin siz ve üyelerinize yardımcı olmak üzerine kurulup, Her geçen gün kendini yenilemektedir. \n Eğerki sizde botumuza destek çıkmak istiyorsanız sunucularınızda kullanabilirsiniz. :yellow_heart: Kenshin Support ©️2020 - Sınırsız Davet Linki : https://discord.gg/EFSN7u6 \n **Not: Bu mesaj sadece rastgele bir kanala gönderilmiştir.**"
);
});

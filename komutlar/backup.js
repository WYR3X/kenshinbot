const { RichEmbed, Client, Util, Message } = require("discord.js");
const fs = require("fs");
const hastebins = require("hastebin-gen"),
db = require("quick.db");  

var backups = JSON.parse(fs.readFileSync("./Data/backups.json", "utf8"));

module.exports.run = async (client, message, args) => {
 
    try {
      let info = client.emojis.get("721407859866468402") || "ℹ️"; //https://cdn.discordapp.com/emojis/655091815401127966.png?v=1
      let waiting = client.emojis.get("708318415764324353") || "⌛"; //https://images-ext-1.discordapp.net/external/lWj3uW4qvfFB9t0QgGsDJ8vLvh5bSObQ-wwUxYFH4wo/https/images-ext-1.discordapp.net/external/AzWR8HxPJ4t4rPA1DagxJkZsOCOMp4OTgwxL3QAjF4U/https/cdn.discordapp.com/emojis/424900448663633920.gif
      let green = client.emojis.get("721408528761356349") || "✅"; //https://images-ext-2.discordapp.net/external/NU9I3Vhi79KV6srTXLJuHxOgiyzmEwgS5nFAbA13_YQ/https/cdn0.iconfinder.com/data/icons/small-n-flat/24/678134-sign-check-512.png
      let error = client.emojis.get("721408740947132498") || "❌"; //https://cdn.discordapp.com/emojis/655704809483141141.png?v=1
      let warning = client.emojis.get("712995782722322473") || "⚠️"; //https://cdn.discordapp.com/emojis/656030540310380574.png?v=1

      let guildsonlyEmbed = new RichEmbed()
        .setTitle(`${error} Hata!`)
        .setDescription(
          `Bu komutu özel mesajlarda kullanamazsın.
            
            [Destek için Tıkla!](https://discord.gg/EFSN7u6)`
        )
        .setColor("BLACK");
      if (message.channel.type === "dm")
        return message.channel.send(guildsonlyEmbed);
      if (args[0] === "al") {
        let creatingEmbed = new RichEmbed()
          .setTitle(`${waiting} Lütfen bekleyiniz...`)
          .setDescription("<a:kenshin_yukleniyor:727541429588721676> Yedek oluşturuluyor...");
        message.channel.send(creatingEmbed).then(m => {
          let id = makeid(16);

          const channels = message.guild.channels
            .sort(function(a, b) {
              return a.position - b.position;
            })
            .array()
            .map(c => {
              const channel = {
                type: c.type,
                name: c.name,
                postion: c.calculatedPosition
              };
              if (c.parent) channel.parent = c.parent.name;
              return channel;
            });

          const roles = message.guild.roles
            .filter(r => r.name !== "@everyone")
            .sort(function(a, b) {
              return a.position - b.position;
            })
            .array()
            .map(r => {
              const role = {
                name: r.name,
                color: r.color,
                hoist: r.hoist,
                permissions: r.permissions,
                mentionable: r.mentionable,
                position: r.position
              };
              return role;
            });

          if (!backups[message.author.id]) backups[message.author.id] = {};
          backups[message.author.id][id] = {
            icon: message.guild.iconURL,
            name: message.guild.name,
            owner: message.guild.ownerID,
            members: message.guild.memberCount,
            createdAt: message.guild.createdAt,
            roles,
            channels
          };

          save();
          let result = new RichEmbed()
            .setTitle(`${info}  Info`)
            .setDescription(
              `Bir yedek oluşturuldu! **${message.guild.name}** sunucusunun yedek idsi \`${id}\``
            )
            .addField(
              "Kullanım",
              `\`\`\`k!yedek yükle ${id}\`\`\`
\`\`\`k!yedek bilgi ${id}\`\`\``
            )
            .setColor("BLACK");

          message.author.send(result);

          let resultPublic = new RichEmbed()
            .setTitle(`${green} Başarılı!`)
            .setDescription(
              `<:kenshin_tik:726170369379139675> Bir yedek oluşturuldu! **${message.guild.name}** Sunucusunun Yedek ID'si \`${id}\``
            )
            .addField(
              "Kullanım",
              `\`\`\`k!yedek yükle ${id}\`\`\`
\`\`\`k!yedek bilgi ${id}\`\`\``
            )
            .setColor("BLACK");

          m.edit(resultPublic);
        });
      }

      if (args[0] === "sil") {
        let code = args[1];
        let errorEmbed = new RichEmbed()
          .setTitle(`${error} Hata!`)
          .setDescription(
            `<:kenshin_carpi:726170425779814413> Böyle bir ID bulunamadı! [Destek için Tıkla!](https://discord.gg/EFSN7u6)`
          )
          .setColor("BLACK");
        if (!code) return message.channel.send(errorEmbed);

        let cantfindbackup = new RichEmbed()
          .setTitle(`${error} Hata!`)
          .setTitle(`<:kenshin_carpi:726170425779814413> Böyle bir ${code} sunucu yedeği yok!`)
          .setDescription(
            `
[Destek](https://discord.gg/BxKehnS)`
          )
          .setColor("BLACK");
        if (!backups[message.author.id][code])
          return message.channel.send(cantfindbackup);

        delete backups[message.author.id][code];
        save();

        let deletedsuc = new RichEmbed()
          .setTitle(`${green} Başarılı!`)
          .setDescription(`<:kenshin_tik:726170369379139675> Başarılı **sunucu yedeği silindi!**`)
          .setColor("BLACK");
        message.channel.send(deletedsuc);
      }

      if (args[0] === "yükle") {
        let error = client.emojis.get("721408740947132498") || "❌";
        let code = args[1];
        let errorEmbed = new RichEmbed().setTitle(`${error} Hata`)
          .setDescription(`<:kenshin_carpi:726170425779814413> Lütfen bir sunucu yedek **ID**'si giriniz. [Destek için Tıkla!](https://discord.gg/EFSN7u6)`);
        if (!code) return message.channel.send(errorEmbed);
        let cantfindbackup = new RichEmbed()
          .setTitle(`${error}  Error`)
          .setTitle(`<:kenshin_carpi:726170425779814413> Böyle bir ${code} ID bulunamadı!`)
          .setDescription("[Destek için Tıkla!](https://discord.gg/EFSN7u6)")
          .setColor("BLACK");
        if (!backups[message.author.id][code])
          return message.channel.send(cantfindbackup);

        message.guild.channels.forEach(channel => {
          channel.delete("<a:kenshin_yukleniyor:727541429588721676> Yedek yükleniyor!");
        });

        message.guild.roles
          .filter(role => role.members.every(member => !member.user.bot))
          .forEach(role => {
            role.delete("<a:kenshin_yukleniyor:727541429588721676> Yedek yükleniyor!");
          });
        await backups[message.author.id][code].roles.forEach(async function(
          role
        ) {
          message.guild
            .createRole({
              name: role.name,
              color: role.color,
              permissions: role.permissions,
              hoist: role.hoist,
              mentionable: role.mentionable,
              position: role.position
            })
            .then(role => {
              role.setPosition(role.position);
            });
        });

        await backups[message.author.id][code].channels
          .filter(c => c.type === "category")
          .forEach(async function(ch) {
            message.guild.createChannel(
              ch.name,
              ch.type,
              ch.permissionOverwrites
            );
          });

        await backups[message.author.id][code].channels
          .filter(c => c.type !== "category")
          .forEach(async function(ch) {
            message.guild
              .createChannel(ch.name, ch.type, ch.permissionOverwrites)
              .then(c => {
                const parent = message.guild.channels
                  .filter(c => c.type === "category")
                  .find(c => c.name === ch.parent);
                ch.parent ? c.setParent(parent) : "";
              });
          });
        message.guild.setName(backups[message.author.id][code].name);
        message.guild.setIcon(backups[message.author.id][code].icon);
      }

      if (args[0] === "bilgi") {
        let id = args[1];
        let MissingbackupinfoEmbed = new RichEmbed()
          .setTitle(`${error} Hata`)
          .setDescription(
            `<:kenshin_carpi:726170425779814413> Lütfen bir yedeklenen sunucunun yedek **ID**'si giriniz.   
                    [Destek için Tıkla!](https://discord.gg/EFSN7u6)`
          )
          .setColor("BLACK");
        if (!id) return message.channel.send(MissingbackupinfoEmbed);

        let cantfindEmbed = new RichEmbed()
          .setTitle(`${error} Hata!`)
          .setDescription(
            `<:kenshin_carpi:726170425779814413> Bu **ID**'ye sahip bir yedeğin yok!'\`${id}\`.
                "[Destek için Tıkla!](https://discord.gg/EFSN7u6)`
          )
          .setColor("BLACK");
        if (!backups[message.author.id][id])
          return message.channel.send(cantfindEmbed);

        try {
          let infoEmbed = new RichEmbed()
            .setTitle(backups[message.author.id][id].name)
            .setThumbnail(backups[message.author.id][id].icon)
            .addField(
              "Oluşturan",
              `<@${backups[message.author.id][id].owner}>`,
              true
            )
            .addField(
              "Kullanıcılar",
              backups[message.author.id][id].members,
              true
            )
            .addField(
              "Oluşturulma Tarihi",
              backups[message.author.id][id].createdAt
            )
            .addField(
              "Kanallar",
              `\`\`\`${backups[message.author.id][id].channels
                .map(channel => channel.name)
                .join("\n")}\`\`\``,
              true
            )
            .addField(
              "Roller",
              `\`\`\`${backups[message.author.id][id].roles
                .map(role => role.name)
                .join("\n")}\`\`\``,
              true
            );
          message.channel.send(infoEmbed);
        } catch (e) {
          hastebins(
            backups[message.author.id][id].channels
              .map(channel => channel.name)
              .join("\n"),
            "txt"
          ).then(ch => {
            hastebins(
              backups[message.author.id][id].roles
                .map(role => role.name)
                .join("\n"),
              "txt"
            ).then(ro => {
              let infoEmbed = new RichEmbed()
                .setTitle(backups[message.author.id][id].name)
                .setThumbnail(backups[message.author.id][id].icon)
                .addField(
                  "Oluşturan",
                  `<@${backups[message.author.id][id].owner}>`,
                  true
                )
                .addField(
                  "Kullanıcılar",
                  backups[message.author.id][id].members,
                  true
                )
                .addField(
                  "Oluşturulma Tarihi",
                  backups[message.author.id][id].createdAt
                )
                .addField("Kanallar", ch, true)
                .addField("Roller", ro, true);
              message.channel.send(infoEmbed);
            });
          });
        }
      }

      if (args[0] === "temizle") {
        let errorEmbed = new RichEmbed()
          .setTitle(`${error}  Error`)
          .setDescription(
            `<:kenshin_carpi:726170425779814413> Maalesef yedekte bir sunucun bulunmuyor.
[Destek için Tıkla!](https://discord.gg/EFSN7u6)`
          )
          .setColor("BLACK");
        if (!backups[message.author.id])
          return message.channel.send(errorEmbed);

        let warningEmbed = new RichEmbed().setTitle(`${warning} UYARI`)
          .setDescription(`<a:uyari_ver:726172121935511603> Tüm yedeklerini silmeye emin misin?
___Bu işlem geri alınamaz!__`);
        message.channel.sendEmbed(warningEmbed).then(msg => {
          msg.react("✅").then(() => msg.react("❌"));

          let yesFilter = (reaction, user) =>
            reaction.emoji.name === "✅" && user.id === message.author.id;
          let noFilter = (reaction, user) =>
            reaction.emoji.name === "❌" && user.id === message.author.id;

          let yes = msg.createReactionCollector(yesFilter, { time: 0 });
          let no = msg.createReactionCollector(noFilter, { time: 0 });

          yes.on("collect", r => {
            delete backups[message.author.id];

            let deletedsuc = new RichEmbed()
              .setTitle(`${green} Başarılı!`)
              .setDescription(`<:kenshin_tik:726170369379139675> Tüm yedekler silindi!`)
              .setColor("BLACK");
            message.channel.send(deletedsuc);
            msg.delete();
          });

          no.on("collect", r => {
            msg.delete();
          });
        });
      }

      if (!args[0]) {
        const embed = new RichEmbed()
          .setTitle(
            `**Kenshin - Tüm Hakları Saklıdır.**

İstediğin Sunucunun Yedeğini Al ve Kullan

__**Komutlar**__
`
          )
          .setDescription(
            `
                k!yedek al = Sunucunuzu yedek alırsınız.
                k!yedek sil = Sunucu yedeğinizi silersiniz.
                k!yedek bilgi = Sunucu yedeğiniz hakkında bilgi alırsınız.
                k!yedek yükle = Sunucu yedeğinizi yüklersiniz.
                k!yedek temizle = Tüm yedeklerinizi silersiniz.
`
          )
          .addBlankField()
          .setColor("RANDOM");
        message.channel.send(embed);
        return;
      }

      function makeid(length) {
        var result = "";
        var characters =
          "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        var charactersLength = characters.length;
        for (var i = 0; i < length; i++) {
          result += characters.charAt(
            Math.floor(Math.random() * charactersLength)
          );
        }
        return result;
      }

      function save() {
        fs.writeFile("./Data/backups.json", JSON.stringify(backups), err => {
          if (err) message.channel.send("Bir hata var!");
        });
      }
    } catch (e) {
      throw e;
    }
  
  
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["yedek"],
  permLevel: 3
};

exports.help = {
  name: "backup",
  description: "backup",
  usage: "backup"
};
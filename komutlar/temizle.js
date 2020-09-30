const Discord = require("discord.js");
const errors = require("../utils/errors.js");

module.exports.run = async (bot, message, args) => {
//

  if(!message.member.hasPermission("MANAGE_MESSAGES")) return errors.noPerms(message, "MANAGE_MESSAGES");
  if(!args[0]) return message.reply("**En Az \`1 - 5000\` Arasında Bir Tam Sayı Değeri Girmelisiniz!**");
  message.channel.bulkDelete(args[0]).then(() => {
    message.reply(`<:kenshin_tik:726170369379139675> **Başarıyla** **__${args[0]}__** **Adet Mesaj Silindi!**`).then(msg => msg.delete(5000));
  });
}

module.exports.help = {
  name: "sil"
}
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['sil'],
  permLevel: 3,
};

exports.help = {
  name: 'temizle',
  description: '',
  usage: '',
}
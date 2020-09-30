const
    rps = [
        'makas',
        'taş',
        'kağıt'
    ],
    rpsF = (userAns, botAns) => {
        let choice = userAns,
            botChoice = botAns;
        if (choice === 'taş') {
            if (botChoice === 'makas') {
                return 'won';
            } else if (botChoice === 'kağıt') {
                return 'Kaybetin';
            }

            return 'draw';
        } else if (choice === 'kağıt') {
            if (botChoice === 'taş') {
                return 'lost';
            } else if (botChoice === 'makas') {
                return 'Kazandın';
            }

            return 'draw';
        } else if (choice === 'makas') {
            if (botChoice === 'taş') {
                return 'lost';
            } else if (botChoice === 'kağıt') {
                return 'Kazandın';
            }

            return 'draw';
        }
    };

exports.run = async (client, msg, args) => {
    if (!args[0]) {
        return msg.channel.send('<a:uyari_ver:726172121935511603> **Lütfen seçimini yap taş, kağıt yada makas & tkm <taş,kağıt,makas>**');
    }
    let choice = args[0].toLowerCase();
    choice = choice === 't' ? 'taş' : choice;
    choice = choice === 'k' ? 'kağıt' : choice;
    choice = choice === 'm' ? 'makas' : choice;
    if (!rps.includes(choice)) {
        return msg.channel.send('<a:uyari_ver:726172121935511603> **Lütfen seçimini yap taş, kağıt yada makas & tkm <t,k,m>**');
    }
    let rand = Math.floor(Math.random() * 3);
    let botChoice = rps[rand];
    let result = rpsF(choice, botChoice);
    let answer = '';

    if (result === 'won') {
        answer = ':trophy: Tebrikler! Oyunu Sen **Kazandın** :trophy: \nSenin Seçtiği: `' + choice + '` | Botun Seçtiği: `' + botChoice + '`';
    } else if (result === 'lost') {
        answer = '<:kenshin_carpi:726170425779814413> Bidakine **Kaybetin Dostum** <:kenshin_carpi:726170425779814413> \nSenin Seçtiğin: `' + choice + '` | Botun Seçtiği: `' + botChoice + '`';
    } else if (result === 'draw') {
        answer = '<a:kenshin_raptiye:726397959532707851> Sonuç **Berabere** <:kenshin_tik:726170369379139675>\nSenin Seçimin: `' + choice + '` | Botun Seçimi: `' + botChoice + '`';
    }

    msg.channel.send(answer);
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
 };
 
 exports.help = {
 name: 'tkm',
 description: 'Taş kağıt makas oyununu oynar.',
 usage: 'tkm'
 }
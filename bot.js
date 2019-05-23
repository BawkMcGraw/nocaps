const https = require('https');
console.log('loaded');
var groupid;

class Function {
    static rng() {
        var array = []
        function RNG(max) {
            return Math.floor(Math.random()*Math.floor(max));
        }
        var RNG = RNG(4);
        array = ['SHUT THE FUCK UP, NO ALL CAPS', 'I\'M TRYING TO SLEEP AND YOU\'RE SHOUTING', 'MY EARS ARE LITERALLY BLEEDING', 'OH I\'M SORRY, IS THIS A BWW ON GAME NIGHT?'];
        return array[RNG];        
    }
}

class Bot {
    static checkMessage(message) {
        const mText = message.text;
        const mName = message.name;
        groupid = message.group_id;

        // TEST EXPRESSION
        const lowercase=/[a-z]/;
        const botname=/nocaps/i;
        const number=/[1-9]/;

        if (mText) {
            if (botname.test(mName)) {
                console.log('bot triggered bot');
                return null;
            }
            else {
                if (lowercase.test(mText)) {
                    console.log('lowercase detected');
                    return null;
                }
                if (number.test(mText)) {
                    console.log('number detected');
                    return null;
                }
                else {
                    return Function.rng();
                }
            }
        }
    };

    static sendMessage(mText) {

        const botId = "0263e95543e9cbb8beda5a4f72";

        if (/41279538/.test(groupid)) {
            botId = '64ad92e919d1eee75af038dac6';
        }

        const options = {
            hostname: 'api.groupme.com',
            path: '/v3/bots/post',
            method :'POST'
        };
        const body = {
            bot_id: botId,
            text: mText
        };
        const botReq = https.request(options, function(response) {
            if (response.statusCode !== 202) {
                console.log('Bad status '+response.statusCode);
            }
        });

        botReq.on('error', function(err) {
            console.log('Error '+JSON.stringify(err));
        });

        botReq.on('timeout', function(err) {
            console.log('Timeout '+JSON.stringify(err));
        });
        botReq.end(JSON.stringify(body));
    };
};
module.exports = Bot;
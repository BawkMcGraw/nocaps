const https = require('https');
console.log('loaded');

class Functions {
    function rng() {
        var array = []
        function RNG(max) {
            return Math.floor(Math.random()*Math.floor(max));
        }
        var RNG = RNG(3);
        array = ['SHUT THE FUCK UP, NO ALL CAPS', 'I\'M TRYING TO SLEEP AND YOU\'RE SHOUTING', 'MY EARS A LITERALLY BLEEDING', 'OH I\'M SORRY, IS THIS A BWW ON GAME NIGHT?'];
        return array[RNG];        
}

class Bot {
    static checkMessage(message) {
        const mText = message.text;
        const mName = message.name;
        const groupid = message.group_id;

        // TEST EXPRESSION
        const testex=/\/test/i;
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
                    return rng();
                }
            }
        }
    };

    static sendMessage(mText) {
        const botId = "1513f91a7df5bc32fe58717fd8";

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
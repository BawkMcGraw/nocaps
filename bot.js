const https = require('https');
console.log('loaded');
console.log(botId);

class Bot {
    static checkMessage(message) {
        const mText = message.text;
        const mName = message.name;
        const groupid = message.group_id;

        // TEST EXPRESSION
        const testex = /\/test/i;

        if (mText) {
            if (testex.test(mText)) {
                return "test";
            }
            else {
                return null;
            }
        }
        else {
            return null;
        }
    };

    static sendMessage(mText) {
        const botId = "";
        console.log('groupid');

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
const https = require('https');

module.exports = {
    name: 'inspire',
    customTrigger: {flag: false},
    description: 'Ping!',
    execute(message, args) {
        const options = new URL('https://inspirobot.me/api?generate=true');
        let request = https.get((options), (res) =>{
            res.on('data', (d) => {
                message.channel.send(d.toString());
            });
        });
    },
};
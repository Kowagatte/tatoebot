const https = require('https');

module.exports = {
    name: 'nhentai',
    customTrigger: {flag: true, prefix: '[', suffix: ']'},
    description: 'Returns an nhentai link',
    execute(message, args) {
        if(args === "random"){
            const options = new URL("https://nhentai.net/random/");
            let request = https.get((options), (res) => {
                message.channel.send(`https://nhentai.net${res.headers.location}`);
            });
        }else{
            const options = new URL(`https://nhentai.net/g/${args}/`);
            let request = https.get((options), (res) =>{
               if(res.statusCode !== 404){
                   message.channel.send(`https://nhentai.net/g/${args}/`);
               }else{
                   message.channel.send("That Hentai doesn't exist.")
               }
            });
        }
    },
};
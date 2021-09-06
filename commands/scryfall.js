const https = require('https');

module.exports = {
    name: 'scryfall',
    customTrigger: {flag: true, prefix: '{', suffix: '}'},
    description: 'Shows a referenced MTG card from Scryfall',
    async execute(message, args) {
        if (args.length === 2) {
            const options = new URL(`https://api.scryfall.com/cards/${args[0]}/${args[1]}`);
            let req = https.get((options), (res) => {
                let data = '';
                res.on('data', d => {
                    data += d;
                });
                res.on('end', () => {
                    data = JSON.parse(data)
                    if (res.statusCode === 200) {
                        const embed = {
                            "color": 16053504,
                            "image": {
                                "url": data.image_uris.png
                            },
                            "author": {
                                "name": data.name,
                                "url": data.scryfall_uri
                            },
                            "fields": [
                                {
                                    "name": "Cost",
                                    "value": data.mana_cost
                                },
                                {
                                    "name": "Description",
                                    "value": data.oracle_text
                                },
                                {
                                    "name": "Price",
                                    "value": `Regular: $${data.prices.usd}\nFoil: $${data.prices.usd_foil}`
                                }
                            ]
                        };
                        message.channel.send(" ", { embed });
                    } else {
                        message.channel.send(`Status Code: ${res.statusCode}`)
                        message.channel.send("No such mtg card exists.")
                    }
                })
            });
            req.end();
        }
    },
};
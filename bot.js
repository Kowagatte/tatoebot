const fs = require('fs');
const values = require("./values.json");
const discord = require("discord.js");

//-----------------------------------------------//

const client = new discord.Client();
client.commands = new discord.Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

//-----------------------------------------------//

for (const file of commandFiles){
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}

//-----------------------------------------------//

client.on('ready', () => {
   client.user.setActivity('Out here getting paper.');
   console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', message =>{
    if(message.author.bot) return;
    const args = message.content.split(' ');
    const command = args.shift().toLowerCase();

    if(message.content.startsWith('[') && message.content.endsWith(']') && message.content.length == 8){
        client.commands.get('nhentai').execute(message, command.replace("[", "").replace("]", ""));
        return;
    }

    if (!client.commands.has(command)) return;

    try {
        client.commands.get(command).execute(message, args);
    } catch (error) {
        console.error(error);
    }

});

client.login(values.token);
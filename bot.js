const values = require("./values.json")
const fs = require('fs');
const discord = require("discord.js");

//-----------------------------------------------//

const client = new discord.Client();
client.commands = new discord.Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
const customTriggerCommands = []

//-----------------------------------------------//

for (const file of commandFiles){
    const command = require(`./commands/${file}`);
    if(command.customTrigger.flag){
        customTriggerCommands.push({
            name: command.name,
            prefix: command.customTrigger.prefix,
            suffix: command.customTrigger.suffix
        });
    }
    client.commands.set(command.name, command);
}

//-----------------------------------------------//

client.on('ready', () => {
   client.user.setActivity('Out here getting paper.');
   console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', message =>{
    if(message.author.bot) return;
    let args = message.content.split(' ');
    const command = args.shift().toLowerCase();

    customTriggerCommands.forEach((trigger)=>{
        if(message.content.startsWith(trigger.prefix) && message.content.endsWith(trigger.suffix)){
            args = message.content.replace(trigger.prefix, "").replace(trigger.suffix, "").split(' ')
            client.commands.get(trigger.name).execute(message, args)
        }
    });

    if (!client.commands.has(command)) return;

    try {
        client.commands.get(command).execute(message, args);
    } catch (error) {
        console.error(error);
    }

});

client.login(values.token).then(r => {
    console.log(r)
});
module.exports = {
    name: 'help',
    description: 'Displays all commands and their descriptions!',
    execute(message, args) {
        if(args.length == 0){
            let s = "\n```";
            message.client.commands.forEach(command =>{
                if(command.name != "help") s += command.name + ": " +command.description + '\n';
            });
            s += '```';
            message.reply(s);
        }
        //if(args.length == 1){ } TODO Request usage example for specific commands.
    },
};
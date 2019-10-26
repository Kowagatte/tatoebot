module.exports = {
    name: 'lmddgtfy',
    description: 'Let me duck duck go that for you.',
    execute(message, args) {
        if(args.length > 0){
            let searchQuery = "https://lmddgtfy.net/?q=";
            for(let i =0; i < args.length;i++){
                searchQuery += args[i] + '%20';
            }
            message.channel.send(searchQuery);
        }
    },
};
module.exports = {
    name: 'nun',
    customTrigger: {flag: false},
    description: 'Nuns, omegalul',
    execute(message, args) {
        if(!args.length){
            message.channel.send('https://storage.googleapis.com/tatoebot_resources/Nun.png');
        }
    },
};
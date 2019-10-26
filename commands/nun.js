module.exports = {
    name: 'nun',
    description: 'Nuns, omegalul',
    execute(message, args) {
        if(!args.length){
            message.channel.send('https://storage.googleapis.com/tatoebot_resources/Nun.png');
        }
    },
};
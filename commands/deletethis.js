module.exports = {
    name: 'delete',
    description: 'please delete the last post.',
    execute(message, args) {
        if(args.length == 1 && args[0] == "this"){
            message.channel.send('https://storage.googleapis.com/tatoebot_resources/deleteit.jpg');
        }
    },
};
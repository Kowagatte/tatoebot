module.exports = {
    name: 'dab',
    description: 'Dab on the haters with this brand new state of the art robot!',
    execute(message, args) {
        if(!args.length){
            message.channel.send('https://storage.googleapis.com/tatoebot_resources/ClearcutDisastrousFieldmouse.webm');
        }
    },
};
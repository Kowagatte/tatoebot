module.exports = {
    name: 'kys',
    customTrigger: {flag: false},
    description: 'Just fucking do it pussy.',
    execute(message, args) {
        if(!args.length){
            message.channel.send('https://www.youtube.com/watch?v=4gO7uemm6Yo');
        }
    },
};
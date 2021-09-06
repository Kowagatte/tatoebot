module.exports = {
    name: 'ping',
    customTrigger: {flag: false},
    description: 'Ping!',
    execute(message, args) {
        message.channel.send('Pong.');
    },
};
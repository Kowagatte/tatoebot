module.exports = {
    name: 'clear',
    description: 'clears arg0 amount of lines. (Max: 13)',
    execute(message, args) {
        if(args.length == 1){
            if((parseInt(args[0]) > 0) && (parseInt(args[0]) < 14)){
                message.channel.bulkDelete(parseInt(args[0])+1);
            }
        }
    },
};
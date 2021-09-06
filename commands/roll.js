module.exports = {
    name: 'roll',
    customTrigger: {flag: false},
    description: 'Rolls a dice, with arg0 sides, arg1 times.',
    execute(message, args) {

        for(const str of args) if (str == "0") return;

        let s = "\n";

        if(args.length == 1){

            s = Math.floor((Math.random() * parseInt(args[0])) + 1);

        }else if (args.length == 2){

            for (let i = 0; i < parseInt(args[0]); i++){
                s += Math.floor((Math.random() * parseInt(args[1])) + 1)+"\n";
            }

        }else{
            message.channel.send('Invalid usage.');
        }
        message.reply(s);
    },
};
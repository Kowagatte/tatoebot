let role = [
    {name: "terraria", rank: "538179738926317591", channel: "538179272674770944"},
    {name: "minecraft", rank: "486408223310610442", channel: "484985595764932618"},
    {name: "arma", rank: "534081427399114772", channel: "534094309381898285"},
    {name: "lol", rank: "634195754398777364", channel: "638234734505230346"},
    {name: "hots", rank: "638234858078076930", channel: "638234773499805706"}
];

module.exports = {
    name: 'role',
    description: 'Subscribe and Unsubscribe to game channels.',
    execute(message, args) {
        if(args.length == 1){

            if(args[0] == "list"){
                let s = "\n";
                role.forEach(item => {
                    s += item.name +", ";
                });
                message.reply(s);
                return;
            }

            let target = role.find(item => item.name == args[0]);
            if(target != undefined) {
                if (message.member.roles.find(item => item.id == target.rank) == undefined) {
                    message.member.addRole(target.rank);
                    message.reply(`${message.guild.roles.find(item => item.id == target.rank).name} has been added!`);
                } else {
                    message.member.removeRole(target.rank);
                    message.reply(`${message.guild.roles.find(item => item.id == target.rank).name} has been removed!`);
                }
            }else{
                message.channel.send("That role doesn't exist.");
            }
        }
    },
};
module.exports = {
    name: 'screenshare',
    description: 'Shares your screen!',
    execute(message, args) {
        if(message.member.voiceChannel != null){
            message.channel.send(`https://discordapp.com/channels/${message.guild.id}/${message.member.voiceChannelID}`);
        }else{
            message.channel.send("Please join a voice channel and try again.");
        }
    },
};
const Discord = require('discord.js');
const {Storage} = require('@google-cloud/storage');
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
const storage = new Storage();
const client = new Discord.Client();
const bucket = storage.bucket('damocles_tatoebot');

function UrlExists(url){
  var http = new XMLHttpRequest();
  http.open('HEAD', url, false);
  http.send();
  return http.status!=404;
}

async function getNhentaiNumbersAsync(channel) {
  while(true){
    var cursedNumber = "";
    for(var i = 0; i < 6; i++){
      cursedNumber = cursedNumber + "" + Math.floor(Math.random()*9);
    }
    var url = "https://nhentai.net/g/"+cursedNumber+"/";
    if(UrlExists(url)){
      channel.send(url);
      break;
    }
  }
  return;
}

client.on('ready', () => {
  client.user.setActivity('Out here getting paper.');
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
  if (msg.author.bot) return;

  const args = msg.content.split(' ');
  const command = args.shift().toLowerCase();

  if (command === 'roll') {
    if (!args.length) {
      return;
    }
    if (args.length == 1){
      var number = parseInt(args[0]);
      msg.reply(Math.floor((Math.random() * number) + 1));
      return;
    }else if(args.length == 2){

      var message = "\n";

      if((parseInt(args[0]) == -1) || (parseInt(args[1]) == -1) || (parseInt(args[0]) > 13) || (parseInt(args[1]) == 0)){
        return;
      }

      for (var i = 0; i < parseInt(args[0]); i++){
        message = message + Math.floor((Math.random() * parseInt(args[1])) + 1)+"\n";
      }

      if(message != ""){
        msg.reply(message);
      }

    }else{
      return;
    }
  }

  if (command === 'spank'){
    if(!args.length){
      bucket.getFiles(function(err, files) {
        if (!err) {
          files[Math.floor(Math.random()*files.length)].getSignedUrl({
            action: 'read',
            expires: '03-09-2491'
          }).then(signedUrls => {
            const url = signedUrls[0];
            var built = url.split('?');
            msg.channel.send(built[0]);
          });
        }
      });
    }
    return;
  }

  if(command === 'bammer'){
    if(!args.length){
      msg.channel.send('https://storage.googleapis.com/tatoebot_resources/HomerHammer.gif');
    }
    return;
  }

  if(command === "kys"){
    if(!args.length){
      msg.channel.send('https://www.youtube.com/watch?v=4gO7uemm6Yo');
    }
    return;
  }

  if(command === 'nun'){
    if(!args.length){
      msg.channel.send('https://storage.googleapis.com/tatoebot_resources/Nun.png');
    }
    return;
  }

  if(command === 'dab'){
    if(!args.length){
      msg.channel.send('https://storage.googleapis.com/tatoebot_resources/ClearcutDisastrousFieldmouse.webm');
    }
  }

  if(command === 'clear'){
    if(!args.length){
      return;
    }else if (args.length == 1){
      if((parseInt(args[0]) == -1) || (parseInt(args[1]) == -1) || (parseInt(args[0]) > 40) || (parseInt(args[1]) == 0)){
        return;
      }
      msg.channel.bulkDelete(parseInt(args[0])+1);

    }else{
      return;
    }
  }

  if(command === 'help'){
    if(!args.length){
      var message = " - Roll\n ( Roll [number of sides] ) or ( Roll [number of dice] [number of sides] ) \n \n - Spank \n Generates a random entry from the spankbank. \n \n - bammer \n Showcases the ban hammer. \n \n - kys \n Do it, it's painless. \n \n - nun \n Say the line bart. \n \n - dab \n hit the hard dab. \n \n - clear \n ( clear [amount of lines] : does not count the clear message line.)";
      msg.channel.send(message);
    }
  }

  if(command.startsWith("[") && command.endsWith("]")){
    var numbers = command.replace("[", "");
    numbers = numbers.replace("]", "");
    if(numbers === "random"){
      getNhentaiNumbersAsync(msg.channel);
      return;
    }
    if(numbers.length == 6){
      if(parseInt(numbers) != -1){
        msg.channel.send('https://nhentai.net/g/'+ parseInt(numbers) + '/');
        return;
      }
    }
  }

});

client.login('token');

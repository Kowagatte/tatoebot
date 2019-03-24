const token = require("./token.json");
const Discord = require('discord.js');
const {Storage} = require('@google-cloud/storage');
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

const storage = new Storage();
const client = new Discord.Client();

function doesUrlExists(url){
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
    if(doesUrlExists(url)){
      channel.send(url);
      break;
    }
  }
  return;
}

function spank(msg, args){
  if(!args.length){
    storage.bucket('damocles_tatoebot').getFiles(function(err, files) {
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

function roll(msg, args){
  if (args.length == 1){
    if(parseInt(args[0]) > 0){
      msg.reply(Math.floor((Math.random() * parseInt(args[0])) + 1));
      return;
    }
  }else if(args.length == 2){
    if((parseInt(args[0]) > 0) && (parseInt(args[0]) < 13)){
      if(parseInt(args[1]) > 0){
        var message = "\n";
        for (var i = 0; i < parseInt(args[0]); i++){
          message = message + Math.floor((Math.random() * parseInt(args[1])) + 1)+"\n";
        }
        if(message != ""){
          msg.reply(message);
          return;
        }
      }
    }
  }
  return;
}

function clear(msg, args){
  if (args.length == 1){
    if((parseInt(args[0]) > 0) && (parseInt(args[0]) < 40)){
      msg.channel.bulkDelete(parseInt(args[0])+1);
    }
  }
  return;
}

function shitpost(msg, args){
  if(!args.length){
    storage.bucket('tatoebot_shitpost').getFiles(function(err, files) {
      if (!err) {
        files[Math.floor(Math.random()*files.length)].getSignedUrl({
          action: 'read',
          expires: '03-09-2491'
        }).then(signedUrls => {
          const url = signedUrls[0];
          var built = url.split('?');
          msg.channel.send(built[0]);
          return;
        });
      }
    });
  }
  return;
}

function deletethis(msg, args){
  if(args.length == 1){
    if(args[0] === 'this'){
      msg.channel.send('https://storage.googleapis.com/tatoebot_resources/deleteit.jpg');
    }
  }
  return;
}

function help(msg, args){
  if(!args.length){
    msg.channel.send(" - Roll\n ( Roll [number of sides] ) or ( Roll [number of dice] [number of sides] ) \n \n - Spank \n Generates a random entry from the spankbank. \n \n - bammer \n Showcases the ban hammer. \n \n - kys \n Do it, it's painless. \n \n - nun \n Say the line bart. \n \n - dab \n hit the hard dab. \n \n - clear \n ( clear [amount of lines] : does not count the clear message line.)");
  }
  return;
}

function bammer(msg, args){
  if(!args.length){
    msg.channel.send('https://storage.googleapis.com/tatoebot_resources/HomerHammer.gif');
  }
  return;
}

function kys(msg, args){
  if(!args.length){
    msg.channel.send('https://www.youtube.com/watch?v=4gO7uemm6Yo');
  }
  return;
}

function nun(msg, args){
  if(!args.length){
    msg.channel.send('https://storage.googleapis.com/tatoebot_resources/Nun.png');
  }
  return;
}

function dab(msg, args){
  if(!args.length){
    msg.channel.send('https://storage.googleapis.com/tatoebot_resources/ClearcutDisastrousFieldmouse.webm');
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

  if(command.startsWith("[") && command.endsWith("]")){
    var numbers = command.replace("[", "").replace("]", "");
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
    return;
  }

  switch(command){
    case 'roll':
      roll(msg, args);
      break;
    case 'spank':
      spank(msg, args);
      break;
    case 'clear':
      clear(msg, args);
      break;
    case 'shitpost':
      shitpost(msg, args);
      break;
    case 'delete':
      deletethis(msg, args);
      break;
    case 'help':
      help(msg, args);
      break;
    case 'bammer':
      bammer(msg, args);
      break;
    case 'kys':
      kys(msg, args);
      break;
    case 'nun':
      nun(msg, args);
      break;
    case 'dab':
      dab(msg, args);
      break;
  }
  return;
});

client.login(token.token);

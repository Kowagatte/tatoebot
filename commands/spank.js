const google_cloud = require("@google-cloud/storage");
const {Storage} = require('@google-cloud/storage');
const storage = new Storage();

module.exports = {
    name: 'spank',
    description: 'So you can go Shake hands with Dr. Winky!',
    execute(message, args) {
        if(!args.length){
            storage.bucket('damocles_tatoebot').getFiles(function(err, files) {
                if (!err) {
                    files[Math.floor(Math.random()*files.length)].getSignedUrl({
                        action: 'read',
                        expires: '03-09-2491'
                    }).then(signedUrls => {
                        const url = signedUrls[0];
                        let built = url.split('?');
                        message.channel.send(built[0]);
                    });
                }
            });
        }
    },
};
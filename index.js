let fs = require('fs'),
    path = require('path'),
    Twit = require('twit'),
    config = require(path.join(__dirname, 'config.js'));

    var T = new Twit(config);
    
    /* 
    T.post('statuses/update', { status: 'yung snowflakke greatest rapper alive'}, function(err, data, response) {
        console.log(data)
        console.log(err);
    });
    */

    var stream = T.stream('user');
    stream.on('tweet', tweetEvent)

    function tweetEvent(eventMsg)
    {
        var replyTo = eventMsg.in_reply_to_screen_name;
        var text = eventMsg.text;
        var from = eventMsg.user.screen_name;
        console.log('tweet received from another account: ', text);

        replyTweet(newTweet);
    }

    function replyTweet(tweetText) 
    {
        var post_params = {
            status: tweetText
        };

        T.post('statuses/update', post_params, logTweet);
        function logTweet(err, data, response) 
        {
            if (err) 
            {
                return err;
            } 
            else 
            {
                console.log('\n tweet sent from replier bot: ', post_params.status);
            }
        }
    }
/* 
    function random_from_array(images)
    {
       return images[Math.floor(Math.random() * images.length)];
    }

    function upload_random_image(images)
    {
        console.log('Opening an image...');
        var image_path = path.join(__dirname, '/images/' + random_from_array(images)),
            b64content = fs.readFileSync(image_path, { encoding: 'base64'});

        console.log('Uploading an image...');

        T.post('media/upload', { media_data: b64content}, function(err, data, response)
        {
            if (err)
            {
                console.log('ERROR: ');
                console.log(err);
            }
            else
            {
                console.log('Image uploaded!');
                console.log('Now tweeting it...');

                T.post('statuses/update', {
                    media_ids: new Array(data.media_id_string)
                },
                function(err, data, response)
                {
                    if (err)
                    {
                        console.log("ERROR: ");
                        console.log(err);
                    }
                    else
                    {
                        console.log('Posted an image!');
                    }
                }
            )
            }
        });

        fs.readdir(__dirname + '/images', function(err, files)
        {
           if (err)
           {
               console.log(err);
           } 
           else
           {
               var images = [];
               files.forEach(function(f)
                {
                    images.push(f);
                });

                setInterval(function()
                            {
                                upload_random_image(images);
                            }, 3600000); // 1 hour interval
           }
        });
    }

 */
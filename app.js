// Include the cluster module
var cluster = require('cluster');

// Code to run if we're in the master process
if (cluster.isMaster) 
{

    // Count the machine's CPUs
    var cpuCount = require('os').cpus().length;

    // Create a worker for each CPU
    for (var i = 0; i < cpuCount; i += 1) {
        cluster.fork();
    }

    // Listen for terminating workers
    cluster.on('exit', function (worker) {

        // Replace the terminated workers
        console.log('Worker ' + worker.id + ' died :(');
        cluster.fork();

    });

// Code to run if we're in a worker process
}
else
{
    var AWS = require('aws-sdk');
    var express = require('express');
    var bodyParser = require('body-parser');
    var hbjs = require('handbrake-js');
    var find = require('find');
    var videoStitch = require('video-stitch');
    var videoConcat = videoStitch.concat;

    AWS.config.region = process.env.REGION
    
    var app = express();

    app.set('view engine', 'ejs');
    app.set('views', __dirname + '/views');
    app.use(bodyParser.urlencoded({extended:false}));

    app.get('/', function(req, res) {
        res.render('index', {
            static_path: 'static',
            theme: process.env.THEME || 'flatly',
            flask_debug: process.env.FLASK_DEBUG || 'false'
        });
    });   


    app.post('/mergevideo', function(req, res) {
        console.log('mergedvideo called');        
        res.status(201).end();

        // videoConcat.concat({
        //     silent: true // optional. if set to false, gives detailed output on console 
        // })
        // .clips([
        //     {
        //     "fileName": "Vid1.mp4"
        //     },
        //     {
        //     "fileName": "Vid2.mp4"
        //     }
        // ])
        // .output("mergedVideo.mp4") //optional absolute file name for output file 
        // .concat()
        // .then((outputFileName) => {
        //     res.status(201).end();
        // });   
    
    
    });

    app.post('/convertvideo', function(req, res) {
            // console.log('convertvideo called');
        // find.file(__dirname+'/VideosToConvert', function(files) {
        //     console.log('number of files in VideosToConvert');
        //     console.log(files.length);
        // });
        // res.status(201).end();



        // res.status(200).json({
        //     message: 'Welcome to the project-name api'
        // });        
        // res.end('convertvideo Called!');

    //    hbjs.exec({ input: 'VideosToConvert/vid2.MOV', output: 'ConvertedToMP4/vid2.mp4', rate: '30' }, function(err, stdout, stderr){
    //     if (err) {
    //         res.status(500).end();
    //         console.log(err);
    //     }
    //     else{
    //         res.status(201).end();
    //         console.log("COMPLETED!");
    //     }
    //     });




        hbjs.spawn({ input: 'VideosToConvert/vid2.MOV', output: 'ConvertedToMP4/vid2.mp4', rate: '30' })
        .on('error', function(err){
            res.status(500).end();
            console.log(err);

            // invalid user input, no video found etc
        })
        .on('progress', function(progress){
            console.log(
            'Percent complete: %s, ETA: %s',
            progress.percentComplete,
            progress.eta
            );
        })
        .on('complete', function(progress){
            res.status(201).end();
            console.log("COMPLETED!");

        });        


    });    

    var port = process.env.PORT || 3000;

    var server = app.listen(port, function () {
        console.log('Server running at http://127.0.0.1:' + port + '/');
    });


} 
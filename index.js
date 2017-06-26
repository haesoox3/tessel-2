var tessel = require('tessel');
var ambient = require('ambient-attx4').use(tessel.port['B']);

const av = require('tessel-av');
const camera = new av.Camera();
const capture = camera.capture();
// Clap --> pick up object -->  Doesn't take photo 
// No clap --? pick up object --> trigger camera

ambient.on('ready', function () {
 // Get points of light and sound data.
 var soundArr = [];
 var soundBool;
 var soundThresh = 0.04;
 var lightThresh = 0.03;
 setInterval( function () {
 	ambient.getSoundLevel( function(err, soundData) {
 		if (err) throw err;
 		soundArr.push(soundData);
 		if (soundArr.length > 10){
 			soundArr.shift();
 		}
 		soundBool = soundArr.reduce(function(prev, cur){
 			return prev || (cur > soundThresh);
 		}, false);
 		ambient.getLightLevel( function(err, lightData) {
 			if (err) throw err;
 			if (lightData.toFixed(8) > lightThresh){
 				if (!soundBool){
 					capture.on('data', function(data) {
 						fs.writeFile(path.join(__dirname, 'captures/captured-via-data-event.jpg'), data);
 					});
 					// Trigger the camera
 				}
 				console.log("BRIGHT", lightData.toFixed(8), "Sound info: Bool: ", soundBool, "Actual sound data: ", soundArr);
 			}
 			else {
 				console.log("IT's too dark", lightData.toFixed(8), "Sound info: Bool: ", soundBool, "Actual sound data: ", soundArr);
 			}
 		});
 	})}, 500); 
});

ambient.on('error', function (err) {
	console.log(err)
});

/* ambient-camera.js example */
// this example records video from a camera
// when a certain sound level is reached
var tessel = require(‘tessel’);
var http = require(‘http’);
// set up camera
var cameralib = require(‘camera-usb’);
// set up ambient sensor on port A
var ambient = require(‘ambient-attx4’).use(tessel.port[‘A’]);
// set a sound trigger
ambient.setSoundTrigger(0.6);
cameralib.find(function(camera) {
  // stream some video when sound is sensed
  ambient.on(‘sound-trigger’, function(){
  	var req = http.request({
  		hostname: ‘example.com’,
  		path: ‘/upload’,
  		method: ‘POST’
  	},
  	function (res) {
  		res.pipe(process.stdout)
  	});
  	camera.captureStream(2000, ‘mjpg’).pipe(req);
  });
});
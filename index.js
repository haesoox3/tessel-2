var tessel = require('tessel');
var ambient = require('ambient-attx4').use(tessel.port['B']);
var servo = require('servo-pca9685').use(tessel.port['A']);

var servo1 = 1; // port that the servo is plugged in on
var servo2 = 5;



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
 				if (soundBool){
 					console.log("You stole our food!");
 					console.log("BRIGHT", lightData.toFixed(8), "Sound info: Bool: ", soundBool, "Actual sound data: ", soundArr);
 				}
 				// servo.on('ready', function(){
 				// 	var pos = 0; 
 				// 	servo.configure(servo1, 0.05, 0.12, function(){
 				// 		servo.move(servo1, pos);
 				// 		pos += 0.1;
 				// 		if (pos > 1){
 				// 			pos = 0;
 				// 		}
 				// 	})
 				// })
 			}
 			else {
 				console.log("IT's too dark", lightData.toFixed(8), "Sound info: Bool: ", soundBool, "Actual sound data: ", soundArr);
 			}

 		});
 	})

 },500);
});

// servo.on('ready', function () {
// 	var position = 0;  
// 	servo.configure(servo1, 0.05, 0.12, function () {
// 		setInterval(function () {
// 			console.log('Position (in range 0-1):', position);

// 			servo.move(servo1, position);
// 			servo.move(servo2, position);

// 			position += 0.1;
// 			if (position > 1) {
//         		position = 0; // Reset servo position
//         	}
//     		}, 100); // Every 500 milliseconds

// 	});
// });


// var base64String = new Buffer(dataToEx, 'hex').toString('base64')
// modules.export = base64String;

// ambient.on('error', function (err) {
// 	console.log(err)
// });
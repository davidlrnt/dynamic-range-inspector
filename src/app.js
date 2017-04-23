import {drawLine} from './drawLine.js';

if (! window.AudioContext) {
  if (! window.webkitAudioContext) {
     alert('no audiocontext found');
  }
  window.AudioContext = window.webkitAudioContext;
}
const WIDTH = window.innerWidth;
const HEIGHT = 500;
const audio_elem = document.getElementById('audio');//document.createElement("audio");
const input = document.getElementById('input');
const submit = document.getElementById('submit');

const canvas = document.createElement('canvas');
canvas.width = WIDTH;
canvas.height = HEIGHT;
document.body.appendChild(canvas);
const canvasCtx = canvas.getContext('2d');


// const fetchAudio = (url) => {
// 	return new Promise((resolve, reject) => {
// 		var audio = new Audio();
// 		// audio.crossOrigin = "anonymous";
// 		audio.src = url;
// 		console.log("here");
// 	  audio.addEventListener('canplaythrough', function() { 
// 	  	resolve(audio);
// 	  	this.play();
// 		}, false);
// 	});

// }


// const init = () => {
// 	fetchAudio(input.value)
// 		.then((val) => {console.log("audio loaded", val)
// 			console.log(val);
// 			// debugger;
// 			var audioCtx = new AudioContext();
// 			var source = audioCtx.createMediaElementSource(val);

// 			source.connect(audioCtx.destination);
// 						val.play()

// 		})
// }

// submit.addEventListener('click', evt => {init()});


input.onchange = function(){
    const files = this.files;
    const file = URL.createObjectURL(files[0]); 
    audio_elem.src = file;
    audio_elem.load()

		const audioCtx = new AudioContext();

  	let audioSrc = audioCtx.createMediaElementSource(audio_elem);
		let analyser = audioCtx.createAnalyser();
	
  	audioSrc.connect(analyser);
    audioSrc.connect(audioCtx.destination);

  	analyser.smoothingTimeConstant = 1;
    analyser.fftSize = 32;//256;//1024;
      // analyser.minDecibels = -500;
			// analyser.maxDecibels = -20;
		analyser.smoothingTimeConstant = 0.85;

    	// let javascriptNode = audioCtx.createScriptProcessor(2048, 1, 1);

    	// javascriptNode.onaudioprocess = function() {
 				// console.log("here");
     //    // get the average, bincount is fftsize / 2
     //    var array =  new Uint8Array(analyser.frequencyBinCount);
     //    analyser.getByteFrequencyData(array);
     //    // var average = getAverageVolume(array)
 
     //    // clear the current state
     //    ctx.clearRect(0, 0, 60, 130);
 
     //    // set the fill style
     //    ctx.fillStyle=gradient;
 
     //    // create the meters
     //    ctx.fillRect(0,130-average,25,130);
    	// }
    	var bufferLength = analyser.frequencyBinCount;
			var dataArray = new Uint8Array(bufferLength);


    	function renderFrame() {
	      requestAnimationFrame(renderFrame);
	      // analyser.getByteFrequencyData(dataArray);
	      
	      // // console.log("Dat",dataArray);
	      // for(var i = 0; i < analyser.frequencyBinCount; i++) {
	      // 	// if(i < 800) console.log("here", i);
	      	
	      //   var barScale = dataArray[i]/255;
	      //   // console.log(barScale);
	      //   if (barScale != 0) console.log(barScale);
	      //   // $bars[i].css('transform', 'scale(' + (barScale) + ')');
	      // }


	      // analyser.getByteFrequencyData(dataArray);
  						analyser.getByteFrequencyData(dataArray);

						  canvasCtx.fillStyle = 'rgb(0, 0, 0)';
						  canvasCtx.fillRect(0, 0, WIDTH, HEIGHT);

						  var barWidth = (WIDTH / bufferLength) * 2.5;
						  var barHeight;
						  var x = 0;

						  for(var i = 0; i < bufferLength; i++) {
						    barHeight = dataArray[i];

						    canvasCtx.fillStyle = 'rgb(' + (barHeight+100) + ',50,50)';
						    canvasCtx.fillRect(x,HEIGHT-barHeight/2,barWidth,barHeight/2);

						    x += barWidth + 1;
						  }



		  }
		  // renderFrame();

		audio_elem.addEventListener('durationchange', function(){
			const duration = this.duration;

			function processItems(duration) {
				return new Promise((resolve, reject) => {
		    	var i = 0,
		    	arr = [],
	        fn = function() {
						if(i < duration) {
						  audio_elem.currentTime = i;
						  audio_elem.play().then(() => {
						  	i++;
						  	analyser.getByteFrequencyData(dataArray);
						  	// console.log(dataArray.slice(0));
								arr.push(Math.max(...dataArray));
						  	fn()
						  }) 
						} 
						else {
							resolve(arr); 
						}
	        };
		    fn();
		    });
			}

			processItems(duration).then((arr) => {
				drawLine(arr)
			})
			// debugger;
			// console.log(maxRangesPerSecond);


			// for (var i = 0; i < duration; i++) {
			// 	// duration[i]
			// 	// analyser.getByteFrequencyData(dataArray);

			// 	analyser.getByteFrequencyData(dataArray);

			// 			  canvasCtx.fillStyle = 'rgb(0, 0, 0)';
			// 			  canvasCtx.fillRect(0, 0, WIDTH, HEIGHT);

			// 			  var barWidth = (WIDTH / bufferLength) * 2.5;
			// 			  var barHeight;
			// 			  var x = 0;

			// 			  // for(var i = 0; i < bufferLength; i++) {
			// 			  //   barHeight = dataArray[i];

			// 			  //   canvasCtx.fillStyle = 'rgb(' + (barHeight+100) + ',50,50)';
			// 			  //   canvasCtx.fillRect(x,HEIGHT-barHeight/2,barWidth,barHeight/2);

			// 			  //   x += barWidth + 1;
			// 			  // }

			// 	console.log(dataArray);
			// 	// this.pause();
			// 	console.log("second", i)
			// }


		}, false);

   
};

console.log(drawLine);

// const drawLine = (values) => {
// 	values.forEach((x) => {console.log(x)})
// }
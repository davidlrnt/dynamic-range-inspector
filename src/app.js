if (! window.AudioContext) {
  if (! window.webkitAudioContext) {
     alert('no audiocontext found');
  }
  window.AudioContext = window.webkitAudioContext;
}
const audio_elem = document.createElement("audio");
const input = document.getElementById('input');
const submit = document.getElementById('submit');



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

const createAudioContext = (audioSrc) => {
	return new Promise((resolve, reject) => {
		const audioCtx = new AudioContext();
		resolve(audioCtx)
	})
}

input.onchange = function(){
    const files = this.files;
    const file = URL.createObjectURL(files[0]); 
    audio_elem.src = file;
		audio_elem.play();

    createAudioContext(file).then((audioCtx) => {

    	let audioSrc = audioCtx.createMediaElementSource(audio_elem);
			let analyzer = audioCtx.createAnalyser();
  		audioSrc.connect(analyzer);
    	// create vis node
    	// conect vis node to dest
    	audioSrc.connect(audioCtx.destination);
    })
};
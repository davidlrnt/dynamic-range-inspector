const input = document.getElementById('input');
const submit = document.getElementById('submit');

const fetchAudio = (url) => {
	return new Promise((resolve, reject) => {
		var audio = new Audio(url);
	  audio.addEventListener('canplaythrough', function() { 
	  	resolve(audio);
		}, false);
	});

}

const init = () => {
	fetchAudio(input.value)
		.then((val) => {console.log("audio loaded", val)})
}

submit.addEventListener('click', evt => {init()});
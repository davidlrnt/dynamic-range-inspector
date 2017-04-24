window.AudioContext = window.AudioContext || window.webkitAudioContext ;

export class AudioHelper {
	constructor(audioFile){
		this.audioFile = audioFile;
		this.context = new AudioContext();
	}

	decodeData(){
		return new Promise((resolve, reject) => {
			this.context.decodeAudioData(this.audioFile, (buffer) => {
				resolve(buffer)
			})
		});
	}
}


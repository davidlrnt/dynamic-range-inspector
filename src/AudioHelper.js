window.AudioContext = window.AudioContext || window.webkitAudioContext ;

export class AudioHelper {
	constructor(audioFile){
		this.audioFile = audioFile;
		this.context = new AudioContext();
	}

	decodeData(){
		return new Promise((resolve, reject) => {
			this.context.decodeAudioData(this.audioFile, (buffer) => {
				this.buffer = buffer;
				resolve(buffer)
			})
		});
	}

	getAverageCompression(){
		return new Promise((resolve, reject) => {
			const leftChannel = this.buffer.getChannelData(0);

			// var start = new Date();
			const average = leftChannel.reduce( ( p, c ) => p + c, 0 ) / leftChannel.length;
			// var time = new Date() - start;
			resolve(average);
			// reduce performs faster
			// var start2 = new Date();
			// let total = 0;
			// leftChannel.forEach((val) => {
			// 	total += val;
			// })
			// const saverage = total/leftChannel.length;
			// var time2 = new Date() - start;
			// console.log("T2",time2);
		});
	}
}


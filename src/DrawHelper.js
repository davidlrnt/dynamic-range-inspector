export class DrawHelper {
	constructor(data){
		this.data = data;
	}
	createCanvas (width,height) {
    const newCanvas = document.createElement('canvas');
    newCanvas.width  = width;     
    newCanvas.height = height;
    this.width = width;
    this.height = height;
    this.canvas = newCanvas;
    this.context = newCanvas.getContext('2d')
    document.body.appendChild(newCanvas);
	}
	drawData(numLines = 2000){
		// Audio data will come in range from [-1.0; 1.0]
		// reference: https://developer.mozilla.org/en-US/docs/Web/API/AudioBuffer/getChannelData
		const lineOpacity = this.width / this.data.length  ;      
		this.context.save();
		this.context.fillStyle = '#080808' ;
		this.context.fillRect(0,0,this.width,this.height );
		this.context.strokeStyle = '#74CDFF';
		this.context.globalCompositeOperation = 'lighter';
		this.context.translate(0,this.height / 2);
		this.context.globalAlpha = 0.6 ; // lineOpacity ;
		this.context.lineWidth=1;
		const totalLength = this.data.length;
		const eachBlock = Math.floor(totalLength / numLines);
		const lineGap = (this.width/numLines);
		this.context.beginPath();
		for(let i=0; i<=numLines; i++){
		  const dataKey = Math.floor(eachBlock * i);
		  const x = i*lineGap;
		  const y = this.data[dataKey] * this.height / 2;
		  this.context.moveTo( x, y );
		  this.context.lineTo( x, (y*-1) );
		}
		this.context.stroke();
		this.context.restore();
	}
}


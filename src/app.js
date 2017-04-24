import {AudioHelper} from './AudioHelper.js';
import {DrawHelper} from './DrawHelper.js';

const input = document.getElementById('afile');

function loadMusic(url) {   
  // fetch(url).then(function(response) {
  //   debugger;
  //   return response.data();
  // }).then(function(response) {
  //   debugger;
  // });
  var req = new XMLHttpRequest();
  req.open( "GET", url, true );
  req.responseType = "arraybuffer"; 
  req.onreadystatechange = function (e) {
    if (req.readyState == 4) {
      if(req.status == 200) {
        var audio = new AudioHelper(req.response);
        audio.decodeData()
          .then((buffer) => {
            // buffer.getChannelData(0) get data from left channel ("0"), ideally combine data from both channels
            var draw = new DrawHelper(buffer.getChannelData(0));
            draw.createCanvas(window.innerWidth,300)
            draw.drawData(1000)
          })
          .catch((err) => {console.log("Error",err);})
      } else {
        alert('error loading file');
      }
    }
  } ;
  req.send();
}

input.onchange = function(){
  const files = this.files;
  const file = URL.createObjectURL(files[0]); 
  loadMusic(file)
  this.value = "";
}

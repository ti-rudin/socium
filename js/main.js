window.onload=function(){
i=7;
var sex = ["М","Ж"];
var man = new Array();
    man[0]
for (index = 1; index <= i; index++) {
  var obj = new Object();
  obj.name = 'й' + index;
  obj['age'] = 26 + index;

  var canvas = document.getElementById('circle');
    var obCanvas = canvas.getContext('2d');
    obCanvas.beginPath();
    obCanvas.arc(101+(index*20), 75-index*5, 5+index*0.5, 0, 2*Math.PI, false);
    obCanvas.fillStyle = 'rgba(214, 31, 31, 1)';
    obCanvas.fill();
    obCanvas.lineWidth = 1;
    obCanvas.strokeStyle = 'red';
    obCanvas.stroke();
    obCanvas.fillText(i, 150+index*10, 100);

}
}

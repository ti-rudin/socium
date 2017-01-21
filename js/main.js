
window.requestAnimFrame = (function(callback) {
        return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame ||
        function(callback) {
          window.setTimeout(callback, 1000 / 60);
        };
      })();
window.onload=function(){

var arr = new Array();
for(i=0;i<5;i++){
arr[i]= new Array();
for(j=0;j<10;j++){
    s=(i+1)*10+j-10;
    arr[i][j]= s;
}
}


var WidthSpace=500;
var HeightSpace=500;
var step=50;
var stepx=WidthSpace/step;
var stepy=HeightSpace/step;

var space = new Array();
var sum=1;
for (i = 0; i <= (stepx-1); i++) {
    space[i]=new Array();
    for (j = 0; j <= (stepy-1); j++) {
        space[i][j]=sum;//заполнили массив
        sum++;
        }
    }
console.log(space);
    
var canvas = document.getElementById('myCanvas');
var context = canvas.getContext('2d');
function rand (min, max)
{
  min = parseInt(min);
  max = parseInt(max);
  return Math.floor( Math.random() * (max - min + 1) ) + min;
}
var obj = new Object();    
for (i = 0; i <= stepx-1; i++) {
    for (j = 0; j <= stepy-1; j++) {

        
      obj.name = space[i][j];   
      obj.x=i; 
      obj.y=j;


      context.font = '10pt Calibri';
      context.fillStyle = 'blue';
      //context.textAlign = 'center';
      context.fillText(obj.name, (j+1)*step-5, (i+1)*step+5);

      var radius = 20;
      context.beginPath();
      context.arc((obj.x+1)*step, (obj.y+1)*step, radius, 0, 2 * Math.PI, false);
      context.lineWidth = 1;

      // line color
      context.strokeStyle = 'red';
      context.stroke();
//console.log(obj);


        }

    }



}


window.onload = function () {
function rand(min, max) {
  min = parseInt(min);
  max = parseInt(max);
  return Math.floor( Math.random() * (max - min + 1) ) + min;
}
    var space = [];
    var lud = [];
    var pop = 40;
    var WidthSpace = 500;
    var HeightSpace = 500;
    var step = 30;
    var stepx = WidthSpace / step;
    var stepy = HeightSpace / step;



    for (i = 0; i <= (stepx - 1); i++) {
        space[i] = [];
        for (j = 0; j <= (stepy - 1); j++) {
        space[i][j] = 0;//обнулили массив
        }
    }

console.log(space);
    
space[2][2] = 4;
space[4][5] = 7;
space[1][3] = 13;
space[7][2] = 5; //вручную разместили первых 4


var canvas = document.getElementById('myCanvas');
var context = canvas.getContext('2d');

var s=1;
function render (){
for (i = 0; i <= stepx - 1; i++) {
    for (j = 0; j <= stepy - 1; j++) {

if (space[i][j]>0) {
        

      context.font = '10pt Calibri';
      context.fillStyle = 'blue';
      //context.textAlign = 'center';
      context.fillText(space[i][j], (i+1)*step-5, (j+1)*step+5);

      var radius = 25;
      context.beginPath();
      context.arc((i+1)*step, (j+1)*step, radius, 0, 2 * Math.PI, false);
      context.lineWidth = 1;

      // line color
      context.strokeStyle = 'red';
      context.stroke();
      }
//console.log(obj);
      }
    }
}
function calculate (){
  for (i = 0; i <= stepx - 1; i++) {
    for (j = 0; j <= stepy - 1; j++) {
      if (space[i][j]>0) {
          a=i+1;
          space[a][j]=space[i][j];
          space[i][j]=0;

      }

    }
  }
}
    render();
calculate ();
        render();
calculate ();    render();
calculate ();    render();
calculate ();



}

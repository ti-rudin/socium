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
var step=100;
stepx=WidthSpace/step;
stepy=HeightSpace/step;

var space = new Array();
for (i = 0; i <= (stepx-1); i++) {
    space[i]=new Array();
    for (j = 0; j <= (stepy-1); j++) {

        sum=(i+1)*10+j-9;
        space[i][j]=sum;//заполнили массив

        }

    }
console.log(space);
var canvas = document.getElementById('myCanvas');
var context = canvas.getContext('2d');

for (i = 0; i <= stepx-1; i++) {
    for (j = 0; j <= stepy-1; j++) {

        var obj = new Object();
        obj.name = space[i][j];


      context.font = '10pt Calibri';
      context.fillStyle = 'blue';
      context.fillText(obj.name, j*step, i*step);

      var radius = 55;
      context.beginPath();
      context.arc(i*step, j*step, radius, 0, 2 * Math.PI, false);
      context.lineWidth = 1;

      // line color
      context.strokeStyle = 'red';
      context.stroke();


        }

    }



}

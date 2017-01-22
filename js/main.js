
window.onload = function () {

/**
 *  * Provides requestAnimationFrame in a cross browser way.
 *  * http://paulirish.com/2011/requestanimationframe-for-smart-animating/
 *  */

if ( !window.requestAnimationFrame ) {

        window.requestAnimationFrame = ( function() {

                return window.webkitRequestAnimationFrame ||
                window.mozRequestAnimationFrame || // comment out if FF4 is slow (it caps framerate at ~30fps: https://bugzilla.mozilla.org/show_bug.cgi?id=630127)
                window.oRequestAnimationFrame ||
                window.msRequestAnimationFrame ||
                function( /* function FrameRequestCallback */ callback, /* DOMElement Element */ element ) {

                        window.setTimeout( callback, 1000 / 60 );

                };

        } )();

}
function rand(min, max) {
  min = parseInt(min);
  max = parseInt(max);
  return Math.floor( Math.random() * (max - min + 1) ) + min;
}

    var lud = [];
    var pop = 40;
    var WidthSpace = 500;
    var HeightSpace = 400;
    var step = 3;
    var stepx = WidthSpace / step;
    var stepy = HeightSpace / step;
    var radius = 19;

space = [];
space2 = [];
    for (i = 0; i <= (stepx - 1); i++) {
        space[i] = [];
        for (j = 0; j <= (stepy - 1); j++) {
        space[i][j] = 0;//обнулили массив
        }
    }
    for (i = 0; i <= (stepx - 1); i++) {
        space2[i] = [];
        for (j = 0; j <= (stepy - 1); j++) {
        space2[i][j] = 0;//обнулили массив
        }
    }


//console.log(space);
//console.log(space2);    
    
space[2][2] = 4;
space[46][155] = 7;
space[19][31] = 13;
space[22][44] = 4;
space[153][5] = 7;
space[13][61] = 13;
space[5][8] = 5; //вручную разместили первых 4


var canvas = document.getElementById('myCanvas');
var context = canvas.getContext('2d');

var s=1;
function render (){
context.clearRect(0,0,WidthSpace+100,HeightSpace);
for (i = 0; i <= stepx - 1; i++) {
    for (j = 0; j <= stepy - 1; j++) {

if (space[i][j]>0) {
        

      context.font = '10pt Calibri';
      context.fillStyle = 'blue';
      //context.textAlign = 'center';
      context.fillText(space[i][j], (i+1)*step-5, (j+1)*step+5);

      
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
    var a=1;
    
function calculate (){
for (i = 0; i <= (stepx - 1); i++) {
        space2[i] = [];
        for (j = 0; j <= (stepy - 1); j++) {
        space2[i][j] = 0;
            //обнулили массив 2
        }
    } 
    
for (i = 0; i <= stepx - 1; i++) {
    for (j = 0; j <= stepy - 1; j++) {
      if (space[i][j]>0) { 

        if ((i+1)>(stepx-1)) {s=0;} else {s=i+1;}
    
         space2[s][j]=space[i][j];
         space2[i][j]=0; 
    
      }

    }
  } 
    

 for (i = 0; i <= stepx - 1; i++) {
    for (j = 0; j <= stepy - 1; j++) {
     
        space[i][j]=space2[i][j]; 
    }
}
 
}


//render();
//calculate();
setInterval(function() {render();calculate();}, 100);

}

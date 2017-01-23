window.onload = function () {
//сервисные функции
    function rand(min, max) {
        min = parseInt(min, 10);
        max = parseInt(max, 10);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    window.requestAnimFrame = (function (callback) {
        return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame ||
            function (callback) {
                window.setTimeout(callback, 1000 / 60);
            };
    }
                              )();
//переменные
    'use strict';
    var WidthSpace = 500,
        HeightSpace = 500,
        step = 30,
        stepx = WidthSpace / step,
        stepy = HeightSpace / step,
        canvas = document.getElementById('myCanvas'),
        context = canvas.getContext('2d');

//ядровые функции

    function drawMan(man) {
        var x = man[0],
            y = man[1],
            color = man[6],
            radius = man[5];
        //console.log(man);
        context.beginPath();
        context.arc(x, y, 25, 0, 2 * Math.PI, false);
        context.fillStyle = color;
        context.fill();
        context.lineWidth = radius;
        context.strokeStyle = 'black';
        context.stroke();
    }

    function calculate() {

    }
    function animate(myWorld, canvas, context, startTime) {
        // update
        var time = (new Date()).getTime() - startTime,
            linearSpeed = 100,// pixels / second
            newX = Math.round(linearSpeed * time / 1000),
            newY = Math.round(linearSpeed * time / 1000);

        if (newX <= step*300) {

        // clear
            context.clearRect(0, 0, canvas.width, canvas.height);

    //смотрим направление и пересчитываем координаты
        for (var key in lud) {
            man=lud[key];
            
            var a = 2+2
switch (man[4]) {
  case 1:{
            man[0] = lud[key][0];
            man[1] = lud[key][1]-1;
                if ((man[1]) == 0) {
                    lud[key][4] = 5; 
                    lud[key][1] = 1;
                    lud[key][0] = man[0];}}
                     
    break
  case 5:{
            man[0] = lud[key][0];
            man[1] = lud[key][1]+1;
                if ((man[1]) == 300) {
                    lud[key][4] = 1; 
                    lud[key][1] = 300;
                    lud[key][0] = man[0];}}
    break
  
  default:
    alert('Я таких значений не знаю')
}

            
            

           





        }
    //рендерим
        for (var key in lud) {
            man=lud[key];
            drawMan(man);

        }
        }
        // request new frame
        requestAnimFrame(function () {
            animate(myWorld, canvas, context, startTime);

        });


    }


//конец ядра

    var myWorld = {
        x: 30,
        y: 30,
        width: 100,
        height: 50,
        borderWidth: 5
    };


    var lud = [
        [100,250,100,150,1,1,'red'],
        [300,350,100,150,1,1,'red'],
        [50,1,100,150,5,1,'red'],
        [63,1,100,150,5,1,'red'],
        
    ]
    for (var key in lud) {
    //console.log(key+':'+lud[key][1])
    }

    for (var key in lud) {
        drawMan(lud[key]);}

      // wait one second before starting animation
    setTimeout(function () {
        var startTime = (new Date()).getTime();
        animate(lud, canvas, context, startTime);
    }, 10);
};

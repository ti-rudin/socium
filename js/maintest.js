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
                window.setTimeout(callback, 1000/60);
            };
    }
                              )();
//переменные
    'use strict';
    var W = 500,
        H = 500,
        step = 720,
        v = 2; //скорость пикселей/сек
        stepx = W / step,
        stepy = H / step,
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
        context.arc(x, y, radius, 0, 2 * Math.PI, false);
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
            linearSpeed = 1000,// pixels / second
            newX = (linearSpeed * time / 1000),
            newY = (linearSpeed * time / 1000);

        if (newX <= step) {

        // clear
            context.clearRect(0, 0, canvas.width, canvas.height);

//смотрим направление и пересчитываем координаты
        for (var key in myWorld) {
            var man=myWorld[key];
           
            switch (man[4]) {
                case 1:{
                    man[0] = myWorld[key][0];
                    man[1] = myWorld[key][1]-v;
                    }
                break
                case 2:{
                    man[0] = myWorld[key][0]+v;
                    man[1] = myWorld[key][1]-v;
                    }
                break
                case 3:{
                    man[0] = myWorld[key][0]+v;
                    man[1] = myWorld[key][1];
                    }
                break
                case 4:{
                    man[0] = myWorld[key][0]+v;
                    man[1] = myWorld[key][1]+v;
                    }
                break
                case 5:{
                    man[0] = myWorld[key][0];
                    man[1] = myWorld[key][1]+v;
                    }
                    break
                case 6:{
                    man[0] = myWorld[key][0]-v;
                    man[1] = myWorld[key][1]+v;
                    }
                break
                case 7:{
                    man[0] = myWorld[key][0]-v;
                    man[1] = myWorld[key][1];
                    }
                break
                case 8:{
                    man[0] = myWorld[key][0]-v;
                    man[1] = myWorld[key][1]-v;
                    }
                break
                case 0:{
                    man[0] = myWorld[key][0];
                    man[1] = myWorld[key][1];
                    }
                break
                default:
            alert('')
            }

        }

//рендерим
        for (var key in myWorld) {
            man=myWorld[key];
            drawMan(man);
            }


//пересчитываем направления
        for (var key in myWorld) {
            var man=myWorld[key];
            switch (man[4]) {
                case 1:{//вверх
                    if ((man[1]) < 0) {myWorld[key][4] = 5; }
                    }
                break
                case 2:{//вверх-вправо
                    if ((man[1]) < 0) {myWorld[key][4] = 4; }
                    if ((man[0]) > W) {myWorld[key][4] = 8; }
                    }
                break
                case 3:{//вправо
                    if ((man[0]) > W) {myWorld[key][4] = 7; }
                    }
                break
                case 4:{//вправо-вниз
                    if ((man[0]) > W) {myWorld[key][4] = 6; }
                    if ((man[1]) > H) {myWorld[key][4] = 2; }
                    }
                break
                case 5:{//вниз
                    if (man[1] > H){myWorld[key][4] = 1;}
                    }
                break
                case 6:{//влево-вниз
                    if ((man[0]) < 0) {myWorld[key][4] = 4; }
                    if ((man[1]) > H) {myWorld[key][4] = 8; }
                    }
                break
                case 7:{//влево
                    if ((man[0]) < 0) {myWorld[key][4] = 3; }
                    }
                break
                case 8:{//влево-вверх
                    if ((man[0]) < 0) {myWorld[key][4] = 2; }
                    if ((man[1]) < 0) {myWorld[key][4] = 6; }
                }
                break

                case 0:{
                    //если ноль
                }
                break


            }

        }

        }
        // request new frame
        //console.log(step);
        requestAnimFrame(function () {
            animate(myWorld, canvas, context, startTime);

        });


    }
//конец ядра

 

    var lud = [
        [100,250,0,0,4,10,'gray'],
        [10,350,100,150,3,7,'red'],
        [50,150,0,0,1,4,'blue'],
        [200,50,0,0,3,1,'black'],
        [300,350,0,0,5,5,'green'],
         [130,120,0,0,4,3,'gray'],
        [130,320,100,150,2,7,'red'],
        [430,350,0,0,1,3,'blue'],
        [400,230,0,0,3,1,'black'],
        [320,120,0,0,1,9,'green'],  
          [150,370,0,0,4,4,'gray'],
        [140,250,100,150,1,7,'red'],
        [120,460,0,0,1,16,'blue'],
        [230,240,0,0,2,11,'black'],
        [340,330,0,0,3,5,'green'],  
        [240,450,0,0,4,19,'gray'],
        [310,150,100,150,2,2,'red'],
        [130,120,0,0,1,1,'blue'],
        [350,120,0,0,3,7,'black'],
        [150,330,0,0,1,5,'green'],  
    ]

    //начинаем
     var startTime = (new Date()).getTime();
        animate(lud, canvas, context, startTime);




};

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
            linearSpeed = 10,// pixels / second
            newX = Math.round(linearSpeed * time / 100),
            newY = Math.round(linearSpeed * time / 100);

        if (newX <= step*20) {

        // clear
            context.clearRect(0, 0, canvas.width, canvas.height);

    //смотрим направление и пересчитываем координаты
        for (var key in lud) {
            man=lud[key];

            if ((man[4])==1) {
            man[0] = lud[key][2];
            man[1] = lud[key][3]-newY;


            }
            if ((man[4])==2) {
            man[0] = lud[key][2]+newY;
            man[1] = lud[key][3]-newY;

            }
            if ((man[4])==3) {
            man[0] = lud[key][2]+newY;
            man[1] = lud[key][3];

            }
            if ((man[4])==4) {
            man[0] = lud[key][2]+newY;
            man[1] = lud[key][3]+newY;

            }
            if ((man[4])==5) {
            man[0] = lud[key][2];
            man[1] = lud[key][3]+newY;

            }
            if ((man[4])==6) {
            man[0] = lud[key][2]-newX;
            man[1] = lud[key][3]+newY;

            }
            if ((man[4])==7) {
            man[0] = lud[key][2]-newX;
            man[1] = lud[key][3];

            }
            if ((man[4])==7) {
            man[0] = lud[key][2]-newX;
            man[1] = lud[key][3]-newY;

            }

//смотрим координаты и пересчитываем направление
            if ((man[0]) <= 0) {
            lud[key][4] = 3;
            lud[key][2] = 1
            }
            if ((man[1])<=0) {
            lud[key][4] = 5;
            lud[key][3] = 1
            }
            if ((man[0]) >= 500) {
            lud[key][4] = 7;
            lud[key][2]= 499;
            }
            if ((man[1]) >= 500) {
            lud[key][4] = 1;
            lud[key][3] = 499;
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
        [10,50,10,50,7,3,'red'],
        [70,70,70,70,1,3,'red'],
        [155,155,155,155,7,6,'red'],
        [197,197,197,197,6,5,'red']
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

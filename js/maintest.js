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
    var W = 500,
        H = 500,
        step = 50,
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
            linearSpeed = 1,// pixels / second
            newX = Math.round(linearSpeed * time / 1000),
            newY = Math.round(linearSpeed * time / 1000);

        if (newX <= step) {

        // clear
            context.clearRect(0, 0, canvas.width, canvas.height);

    //смотрим направление и пересчитываем координаты
        for (var key in lud) {
            var man=lud[key];
           
            switch (man[4]) {
                case 1:{
                    man[0] = lud[key][0];
                    man[1] = lud[key][1]-1;
                    }
                break
                case 2:{
                    man[0] = lud[key][0]+1;
                    man[1] = lud[key][1]-1;
                    }
                break
                case 3:{
                    man[0] = lud[key][0]+1;
                    man[1] = lud[key][1];
                    }
                break
                case 4:{
                    man[0] = lud[key][0]+1;
                    man[1] = lud[key][1]+1;
                    }
                break
                case 5:{
                    man[0] = lud[key][0];
                    man[1] = lud[key][1]+1;
                    }
                    break
                case 6:{
                    man[0] = lud[key][0]-1;
                    man[1] = lud[key][1]+1;
                    }
                break
                case 7:{
                    man[0] = lud[key][0]-1;
                    man[1] = lud[key][1];
                    }
                break
                case 8:{
                    man[0] = lud[key][0]-1;
                    man[1] = lud[key][1]-1;
                    }
                break
                case 0:{
                    man[0] = lud[key][0];
                    man[1] = lud[key][1];
                    }
                break
                default:
            alert('')
            }

        }

            //рендерим
        for (var key in lud) {
            man=lud[key];
            drawMan(man);


        }


//пересчитываем направления
for (var key in lud) {
            var man=lud[key];
            switch (man[4]) {
                case 1:{//вверх
                    if ((man[1]) < 0) {lud[key][4] = 5; }
                    }
                break
                case 2:{//вверх-вправо
                    if (((man[1]) < 0)||(man[0] > W)) {lud[key][4] = 8; }
                    }
                break
                case 3:{//вправо
                    if ((man[0]) > W) {lud[key][4] = 7; }
                    }
                break
                case 4:{//вправо-вниз
                    if (((man[1]) > H)||(man[0] > W)) {lud[key][4] = 2; }
                    }
                break
                case 5:{//вниз
                    if (man[1] > H){lud[key][4] = 1;}
                    }
                break
                case 6:{//влево-вниз
                    if (((man[1]) > H)||(man[0] < 0)) {lud[key][4] = 4; }
                    }
                break
                case 7:{//влево
                    if ((man[0]) < 0) {lud[key][4] = 3; }
                    }
                break
                case 8:{//влево-вверх
                    if (((man[1]) < 0)||(man[0] < 0)) {lud[key][4] = 6; }
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
        [100,250,0,0,4,1,'blue'],
        [10,350,100,150,6,1,'red'],
    //    [50,50,100,150,1,1,'red'],
        
    ]
 //   for (var key in lud) {
    //console.log(key+':'+lud[key][1])
//    }

   // for (var key in lud) {
//        drawMan(lud[key]);}






      // wait one second before starting animation
   // console.log(i);
    //пересчитываемпараметры
     var startTime = (new Date()).getTime();
        animate(lud, canvas, context, startTime);




};

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
                window.setTimeout(callback, 1000/30);
            };
    }
                              )();
//переменные
    'use strict';
    var v = 2; //скорость пикселей/сек
  //      canvas = document.getElementById('myCanvas'),
//        context = canvas.getContext('2d');

//ядровые функции 
    function filt(value) {
        if (value == this)
        return false;
    }
    function find(arr, value) {
	   var last = arr[arr.length - 1];
			
	   arr[arr.length - 1] = value;
			
	   var i = 0;
			
	   while(arr[i] !== value) {
           i++;
	   }
			
	   arr[arr.length - 1] = last;
			
	   if(i < arr.length - 1 || arr[arr.length - 1] === value)
           return i;
	   else
           return -1;
    }
    
    function watch(xop,yop){
        var idopx = [];
        var idopy = [];

        if ((xop > 0)&(xop < world.W)) {
            idopx = world.planeX[xop];
        }
        if ((yop > 0)&(yop < world.H)) {
            idopy = world.planeY[yop];
        }

        var idop = [];
         for (var key in idopx)   {
             var stek = idop[key];

             for (var key in idopy){
                 if (idopy[key]=stek) {idop.push(stek)}
             }



         }
        return idop
    }
    
    function drawMan(man) {
        var x = man[0],
            y = man[1],
            radius = man[2],
            id =  man[5],
            color = man[4];
//console.log(man);
            //    console.log(id);
if (id > 0) {
        var 
        d = document.getElementById(id);
        
        d.style.left = x*11;
        d.style.top = y*11;
        d.style.width='10px';
        d.style.height='10px';
        d.style.background=color;
        d.style.position='absolute';
        document.body.appendChild(d);
}


        
        
        //context.beginPath();
        //context.arc(x, y, radius, 0, 2 * Math.PI, false);
        //context.fillStyle = color;
        //context.fill();
        //context.lineWidth = radius;
        //context.strokeStyle = 'black';
        //context.stroke();
    }
    
    
///////  
    
world = {
    H: 40,
    W: 40,
    Day: 3,
    v: 1,
    population : 100,
    lud: {x : 0,
          y : 0,
          r : 0,
          d : 0,
          c : 0,
         id : 0},
    plane : [],
    plane2: [],
    planeX : {},
    planeY : {},
    calculate: function() {
    //перебираем всех по очереди
        


        
for (var keyC = 0; keyC <= world.population-1; keyC++) {

        var man = this.lud[keyC];
        xmy = man[0];
        ymy = man[1];
        idmy = this.plane[xmy][ymy]; //получаем массив своей ячейки в plane
        
        id = man[5];
       // console.log(id,xmy,ymy,idmy,man[3]);
    //смотрим направление и калькулируем
        switch (man[3]) {
                case 1:{
                    //смотрим свои координаты с учетом шага и проверяем не уперлись ли мы в стенку
                    if ((ymy-1) <= 0) {
                        //если уперлись, то просто меняем направление
                        man[3] = 5; 
                    } else {
                        //иначе
                            var idop = this.plane[xmy][ymy-1]; //получаем массив с оппонентами
                            if (idop>0) { 
                                    //если массив с оппонентами не пустой, то просто меняем направление
                                    man[3] = 2; } else {
                                    //записываем в следующую ячейку plane свой id
                                    world.plane[xmy][ymy-1].push(id);
                                    //выписываем свой id из текущей ячейки plant (ща пока зачищаем просто)
                                    world.plane[xmy][ymy]=[];
                                   //пересчитываем коодинаты
                                    man[0] = this.lud[keyC][0];
                                    man[1] = this.lud[keyC][1]-1;
                                }
                        }
                   
                    }
                break
                case 2:{
                    //смотрим свои координаты с учетом шага и проверяем не уперлись ли мы в стенку
                    if ((ymy-1) <= 0) {
                        man[3] = 4; }//если уперлись, то просто меняем направление
                    else if ((xmy+1) >= world.W){
                        man[3] = 8;}//если уперлись, то просто меняем направление
                    else {
                        //иначе
                            var idop = this.plane[xmy+1][ymy-1]; //получаем массив с оппонентами
                            if (idop>0) { 
                                    //если массив с оппонентами не пустой, то просто меняем направление
                                    man[3] = 3; } else {
                                    //записываем в следующую ячейку plane свой id
                                    world.plane[xmy+1][ymy-1].push(id);
                                    world.plane[xmy][ymy]=[];//фильтр
                                    //пересчитываем коодинаты
                                    man[0] = this.lud[keyC][0]+1;
                                    man[1] = this.lud[keyC][1]-1;
                                }
                        }
                    }
                break
                case 3:{
                   //смотрим свои координаты с учетом шага и проверяем не уперлись ли мы в стенку
                    if ((xmy+1) >= world.W){
                        man[3] = 7;}//если уперлись, то просто меняем направление
                    else {
                        //иначе
                            var idop = this.plane[xmy+1][ymy]; //получаем массив с оппонентами
                            if (idop>0) {
                                    //если массив с оппонентами не пустой, то просто меняем направление
                                    man[3] = 4; } else {
                                    //записываем в следующую ячейку plane свой id
                                    world.plane[xmy+1][ymy].push(id);
                                    world.plane[xmy][ymy]=[];//фильтр
                                    //пересчитываем коодинаты
                                    man[0] = this.lud[keyC][0]+1;
                                    man[1] = this.lud[keyC][1];
                                }
                        }
                }
                break
                case 4:{
                    //смотрим свои координаты с учетом шага и проверяем не уперлись ли мы в стенку
                    if ((ymy+1) >= world.H) {
                        man[3] = 2; }//если уперлись, то просто меняем направление
                    else if ((xmy+1) >= world.W){
                        man[3] = 6;}//если уперлись, то просто меняем направление
                    else {
                        //иначе
                            var idop = this.plane[xmy+1][ymy+1]; //получаем массив с оппонентами
                            if (idop>0) {
                                    //если массив с оппонентами не пустой, то просто меняем направление
                                    man[3] = 5; } else {
                                    //записываем в следующую ячейку plane свой id
                                    world.plane[xmy+1][ymy+1].push(id);
                                    world.plane[xmy][ymy]=[];//фильтр
                                    //пересчитываем коодинаты
                                    man[0] = this.lud[keyC][0]+1;
                                    man[1] = this.lud[keyC][1]+1;
                                }
                        }
                    }
                break
                case 5:{
                    //смотрим свои координаты с учетом шага и проверяем не уперлись ли мы в стенку
                    if ((ymy+1) >= world.H) {
                        man[3] = 1; }//если уперлись, то просто меняем направление
                    else {
                        //иначе
                            var idop = this.plane[xmy][ymy+1]; //получаем массив с оппонентами
                            if (idop>0) {
                                    //если массив с оппонентами не пустой, то просто меняем направление
                                    man[3] = 6; } else {
                                    //записываем в следующую ячейку plane свой id
                                    world.plane[xmy][ymy+1].push(id);
                                    world.plane[xmy][ymy]=[];//фильтр
                                    //пересчитываем коодинаты
                                    man[0] = this.lud[keyC][0];
                                    man[1] = this.lud[keyC][1]+1;
                                }
                        }
                    }
                    break
                case 6:{
                    //смотрим свои координаты с учетом шага и проверяем не уперлись ли мы в стенку
                    if ((ymy+1) >= world.H) {
                        man[3] = 8; }//если уперлись, то просто меняем направление
                    else if ((xmy-1) >= 0){
                        man[3] = 4;}//если уперлись, то просто меняем направление
                    else {
                        //иначе
                            var idop = this.plane[xmy-1][ymy+1]; //получаем массив с оппонентами
                            if (idop>0) {
                                    //если массив с оппонентами не пустой, то просто меняем направление
                                    man[3] = 7; } else {
                                    //записываем в следующую ячейку plane свой id
                                    world.plane[xmy-1][ymy+1].push(id);
                                    world.plane[xmy][ymy]=[];//фильтр
                                    //пересчитываем коодинаты
                                    man[0] = this.lud[keyC][0]-1;
                                    man[1] = this.lud[keyC][1]+1;
                                }
                        }
                    }
                break
                case 7:{
                    //смотрим свои координаты с учетом шага и проверяем не уперлись ли мы в стенку
                    if ((xmy-1) <= 0){
                        man[3] = 3;}//если уперлись, то просто меняем направление
                    else {
                        //иначе
                            var idop = this.plane[xmy+1][ymy]; //получаем массив с оппонентами
                            if (idop>0) {
                                    //если массив с оппонентами не пустой, то просто меняем направление
                                    man[3] = 8; } else {
                                    //записываем в следующую ячейку plane свой id
                                    world.plane[xmy+1][ymy].push(id);
                                    world.plane[xmy][ymy]=[];//фильтр
                                    //пересчитываем коодинаты
                                    man[0] = this.lud[keyC][0]-1;
                                    man[1] = this.lud[keyC][1];
                                }
                        }
                    }
                break
                case 8:{
                    //смотрим свои координаты с учетом шага и проверяем не уперлись ли мы в стенку
                    if ((ymy-1) <= 0) {
                        man[3] = 6; }//если уперлись, то просто меняем направление
                    else if ((xmy-1) <= 0){
                        man[3] = 2;}//если уперлись, то просто меняем направление
                    else {
                        //иначе
                            var idop = this.plane[xmy-1][ymy-1]; //получаем массив с оппонентами
                            if (idop>0) {
                                    //если массив с оппонентами не пустой, то просто меняем направление
                                    man[3] = 1; } else {
                                    //записываем в следующую ячейку plane свой id
                                    world.plane[xmy-1][ymy-1].push(id);
                                    world.plane[xmy][ymy]=[];//фильтр
                                    //пересчитываем коодинаты
                                    man[0] = this.lud[keyC][0]-1;
                                    man[1] = this.lud[keyC][1]-1;
                                }
                        }
                    }
                break
                case 0:{
                    man[0] = man[0];
                    man[1] = man[1];
                    }
                break
                default:
            alert('1')
            }
      

    }
        
    //alert(this.Day + ', ' + this.lud[user][user]); 
    },
    render: function(){
  //      context.clearRect(0, 0, canvas.width, canvas.height); //очищаем
  
    for (var key in this.lud)   {
        man = this.lud[key];
       // console.log(key);
       drawMan(man);

    }
    },
    createworld : function(){
    //создаем пустое пространство
        for (var i = 0; i <= this.W+1; i++) {
            world.plane[i]=[];
         for (var j = 0; j <= this.H+1; j++) {
            world.plane[i][j] = [];
        }
        }

    //создаем популяцию на основе случайных величин
        for (var i = 0; i < (this.population); i++) {
            world.lud[i]=[
                (rand(20,world.W-20)),
                (rand(20,world.H-20)),
                (rand(1,2)),
                (rand(1,8)),
                'black',
                i+1];
            
            l = document.createElement('div');
            l.id = i+1;
            document.body.appendChild(l);
            px = world.lud[i][0];
            py = world.lud[i][1];
            world.plane[px][py].push(i+1);
            //console.log(i,px,py,world.lud[i]);
            //console.log();
            
    
        }
        world.lud[0][4]='red'; //метим первого красным цветом
        world.lud[0][3]=1;
       // console.log(world.lud);
       //console.log(world.plane);

    }
}    
 


    function animate(myWorld, startTime) {

        var step = ((new Date()).getTime() - startTime)/1000+1;
           
        world.render();

        world.calculate();

        requestAnimFrame(function () {
            animate(myWorld, startTime);

        });


    }
//конец ядра
    
    

world.createworld();

    
startTime = (new Date()).getTime();
   setTimeout((animate(world,startTime)),1000);

};

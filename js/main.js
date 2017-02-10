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
<<<<<<< HEAD
                window.setTimeout(callback, 1000 / 60);
=======
                window.setTimeout(callback, 1000/30);
>>>>>>> origin/letaetnadivah
            };
    }
                              )();
//переменные
    'use strict';
<<<<<<< HEAD
        canvas = document.getElementById('myCanvas'),
        context = canvas.getContext('2d');

//ядровые функции 

    function find(arr, value) {
	    var last = arr[arr.length - 1];
			
	    arr[arr.length - 1] = value;
			
	    var i = 0;
			
	    while (arr[i] !== value) {
           i++;
	    }
			
	    arr[arr.length - 1] = last;
			
	    if(i < arr.length - 1 || arr[arr.length - 1] === value)
           return i;
	    else
           return -1;
    }
    

=======
    var v = 2; //скорость пикселей/сек
  //      canvas = document.getElementById('myCanvas'),
//        context = canvas.getContext('2d');

//ядровые функции    
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
>>>>>>> origin/letaetnadivah
    
    function drawMan(man) {
        var y = man[1],
            x = man[0],
            radius = man[2],
            id =  man[5],
            color = man[4];
<<<<<<< HEAD


       // d = document.getElementById(id);
        
    //    d.style.left = y*15;
      //  d.style.top = x*15;
    //    d.style.width='14px';
    //    d.style.height='14px';
    //    d.style.background=color;
    //    d.style.position='absolute';
    //    //d.innerHTML=x+' '+y;
    //    d.innerHTML=man[6];
    //    d.style.fontSize='9px';
    //    d.style.color='white';
    //    d.style.border='solid 1';
    //    d.style.borderColor='green';
    //    document.body.appendChild(d);



        
        
        context.beginPath();
        context.arc(x*18, y*18, 9, 0, 2 * Math.PI, false);
        context.fillStyle = color;
      
        context.fill();
        context.lineWidth = radius;
        context.strokeStyle = 'black';
          context.fillText(man[6], x*18, y*18);
        context.stroke();
    }
    function animate(myWorld, canvas, context, startTime) {
        var step = ((new Date()).getTime() - startTime)/1000+1;
            world.render();
            world.calculate();
            setTimeout((function () {animate(myWorld, canvas, context, startTime); }),world.v);
    }
    
///////
    
world = {
    H: 30,
    W: 30,
    Tick: 1,
    v: 100,
    population : 20,
    lud: {x : 1,
          y : 1,
          r : 1,
          d : 1,
          c : 1,
         id : 1,
         colis: 0,
         capital: 0,
         borndate: 0},
    rip : {
        id: 0,
        borndate: 0,
        diedate: 0,
        r : 0,
        c : 0,
        colis: 0,
        capital: 0 //в первой итерации капитал теряется, как будто перед смертью чувак все где-то зарыл

    },
    plane : [],
    calculate: function() {
    //перебираем всех по очереди
    world.Tick=world.Tick+1;
    for (var keyC = 0; keyC < world.population; keyC++) {

        var man = this.lud[keyC];
        xmy = man[0];
        ymy = man[1];
        id = man[5];
        colis = man[6];
    //смотрим направление и калькулируем

    switch (man[3]) {
                case 1:{
                    //смотрим свои координаты с учетом шага и проверяем не уперлись ли мы в стенку
                    if ((ymy-1) < 0) {
                        //если уперлись, то просто меняем направление
                        man[3] = 5; 
                    } else {
                        //иначе
                            var idop = this.plane[xmy][ymy-1]; //получаем массив с оппонентами
                            if (idop>0) { 
                                    //если массив с оппонентами не пустой, то просто меняем направление
                                    man[3] = rand(1,8);
                                    man[6] = man[6]+1;//счетчик столкновений +1

                                    } else {
                                   //пересчитываем коодинаты
                                    world.plane[xmy][ymy-1]=id;//метим себя в plane
                                    man[0] = this.lud[keyC][0];
                                    man[1] = this.lud[keyC][1]-1;
                                    }
                        }
                }
                break
                case 2:{
                    //смотрим свои координаты с учетом шага и проверяем не уперлись ли мы в стенку
                    if ((ymy-1) < 0) {
                        man[3] = 4; }//если уперлись, то просто меняем направление
                    else if ((xmy+1) >= world.W){
                        man[3] = 8;}//если уперлись, то просто меняем направление
                    else {
                        //иначе
                            var idop = this.plane[xmy+1][ymy-1]; //получаем массив с оппонентами
                            if (idop>0) { 
                                    //если массив с оппонентами не пустой, то просто меняем направление
                                    man[3] = rand(1,8);
                                    man[6] = man[6]+1;
                                    } else {
                                    //пересчитываем коодинаты
                                    world.plane[xmy+1][ymy-1]=id;
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
                                    man[3] = rand(1,8);
                                    man[6] = man[6]+1;
                            } else {
                                    //пересчитываем коодинаты
                                    world.plane[xmy+1][ymy]=id;
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
                                    man[3] = rand(1,8);
                                    man[6] = man[6]+1;
                            } else {
                                    //пересчитываем коодинаты
                                    world.plane[xmy+1][ymy+1]=id;
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
                                    man[3] = rand(1,8);
                                    man[6] = man[6]+1;
                            } else {

                                    //пересчитываем коодинаты
                                    world.plane[xmy][ymy+1]=id;
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
                    else if ((xmy-1) < 0){
                        man[3] = 4;}//если уперлись, то просто меняем направление
                    else {
                        //иначе
                            var idop = this.plane[xmy-1][ymy+1]; //получаем массив с оппонентами
                            if (idop>0) {
                                    //если массив с оппонентами не пустой, то просто меняем направление
                                    man[3] = rand(1,8);
                                    man[6] = man[6]+1;
                                    } else {
                                    //пересчитываем коодинаты
                                    world.plane[xmy-1][ymy+1]=id;
                                    man[0] = this.lud[keyC][0]-1;
                                    man[1] = this.lud[keyC][1]+1;

                                }
                        }
                    }
                break
                case 7:{
                    //смотрим свои координаты с учетом шага и проверяем не уперлись ли мы в стенку
                    if ((xmy-1) < 0){
                        man[3] = 3;}//если уперлись, то просто меняем направление
                    else {
                        //иначе
                            var idop = this.plane[xmy-1][ymy]; //получаем массив с оппонентами
                            if (idop>0) {
                                    //если массив с оппонентами не пустой, то просто меняем направление
                                    man[3] = rand(1,8);
                            man[6] = man[6]+1;
                            } else {
                                        //пересчитываем коодинаты
                                    world.plane[xmy-1][ymy]=id;
                                    man[0] = this.lud[keyC][0]-1;
                                    man[1] = this.lud[keyC][1];

                                }
                        }
                    }
                break
                case 8:{
                    //смотрим свои координаты с учетом шага и проверяем не уперлись ли мы в стенку
                    if ((ymy-1) < 0) {
                        man[3] = 6; }//если уперлись, то просто меняем направление
                    else if ((xmy-1) < 0){
                        man[3] = 2;}//если уперлись, то просто меняем направление
                    else {
                        //иначе
                            var idop = this.plane[xmy-1][ymy-1]; //получаем массив с оппонентами
                            if (idop>0) {
                                    //если массив с оппонентами не пустой, то просто меняем направление
                                    man[3] = rand(1,8);
                            man[6] = man[6]+1;
                            } else {
                                    //пересчитываем коодинаты
                                    world.plane[xmy-1][ymy-1]=id;
                                    man[0] = this.lud[keyC][0]-1;
                                    man[1] = this.lud[keyC][1]-1;

                                }
                        }
=======
//console.log(man);
            //    console.log(id);
if (id > 0) {
        var 
        d = document.getElementById(id);
        
        d.style.left = x;
        d.style.top = y;
        d.style.width='3px';
        d.style.height='3px';
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
    H: 400,
    W: 400,
    Day: 3,
    v: 1,
    population : 120,
    lud: {x : 0,
          y : 0,
          r : 0,
          d : 0,
          c : 0,
         id : 0},
    plane : [],
    planeX : {},
    planeY : {},
    calculate: function(step) {
//смотрим направление и пересчитываем координаты
    for (var key in this.lud)   {
        man = this.lud[key];




        id = man [5];
        if (id > 0) {
        switch (man[3]) {
                case 1:{
                    man[0] = this.lud[key][0];
                    man[1] = this.lud[key][1]-step;
                    if ((man[1]) <= 0) {man[3] = 5; } //пересчитываем направление, если стенка
                    //пересчитываем направление, если столкновение
//смотрим кто прямо по направлению, получаем массив ид
                    //смотрим координаты оппонентов
                    var xop = this.lud[key][0];
                    var yop = this.lud[key][1];
                    //смотрим id оппонента
                    //console.log(xop,yop);
                    var idop = this.plane[xop][yop];
                    //console.log(idop);
                    if (idop>0) { man[3] = 2;};

                    }
                break
                case 2:{
                    man[0] = man[0]+step;
                    man[1] = man[1]-step;
                    if ((man[1]) <= 0) {man[3] = 4; }
                    if ((man[0]) >= world.W) {man[3] = 8; }

                    var xop = this.lud[key][0];
                    var yop = this.lud[key][1];
                    //смотрим id оппонента
                    var idop = world.plane[xop][yop];
                    if (idop>0) { man[3] = 3;};

                    }
                break
                case 3:{
                    man[0] = man[0]+step;
                    man[1] = man[1];
                    if ((man[0]) >= world.W) {man[3] = 7; }

                    var xop = this.lud[key][0];
                    var yop = this.lud[key][1];
                    //смотрим id оппонента
                    var idop = world.plane[xop][yop];
                    if (idop>0) { man[3] = 4;};
                    }
                break
                case 4:{
                    man[0] = man[0]+step;
                    man[1] = man[1]+step;
                    if ((man[0]) >= world.W) {man[3] = 6; }
                    if ((man[1]) >= world.H) {man[3] = 2; }

                    var xop = this.lud[key][0];
                    var yop = this.lud[key][1];
                    //смотрим id оппонента
                    var idop = world.plane[xop][yop];
                    if (idop>0) { man[3] = 5;};
                    }
                break
                case 5:{
                    man[0] = man[0];
                    man[1] = man[1]+step;
                    if (man[1] >= world.H){man[3] = 1;}

                    var xop = this.lud[key][0];
                    var yop = this.lud[key][1];
                    //смотрим id оппонента
                    var idop = world.plane[xop][yop];
                    if (idop>0) { man[3] = 6;};

                    }
                    break
                case 6:{
                    man[0] = man[0]-step;
                    man[1] = man[1]+step;
                    if ((man[0]) <= 0) {man[3] = 4; }
                    if ((man[1]) >= world.H) {man[3] = 8; }

                    var xop = this.lud[key][0];
                    var yop = this.lud[key][1];
                    //смотрим id оппонента
                    var idop = world.plane[xop][yop];
                    if (idop>0) { man[3] = 7;};
                    }
                break
                case 7:{
                    man[0] = man[0]-step;
                    man[1] = man[1];
                    if ((man[0]) <= 0) {man[3] = 3; }

                    var xop = this.lud[key][0];
                    var yop = this.lud[key][1];
                    //смотрим id оппонента
                    var idop = world.plane[xop][yop];
                    if (idop>0) { man[3] = 8;};
                    }
                break
                case 8:{
                    man[0] = man[0]-step;
                    man[1] = man[1]-step;
                    if ((man[0]) <= 0) {man[3] = 2; }
                    if ((man[1]) <= 0) {man[3] = 6; }

                    var xop = this.lud[key][0];
                    var yop = this.lud[key][1];
                    //смотрим id оппонента
                    var idop = world.plane[xop][yop];
                    if (idop>0) { man[3] = 1;};
>>>>>>> origin/letaetnadivah
                    }
                break
                case 0:{
                    man[0] = man[0];
                    man[1] = man[1];
                    }
                break
                default:
            alert('1')
<<<<<<< HEAD
            }
=======
            }}
      
>>>>>>> origin/letaetnadivah

    }
        
   // очищаем пространство
        for (var i = 0; i < this.W+1; i++) {
            world.plane[i]=[];
         for (var j = 0; j < this.H+1; j++) {
            world.plane[i][j] = [0];
        }
        }
        //перебираем всех по очереди
    for (var i = 0; i < world.population; i++) {
            var px = world.lud[i][0];
            var py = world.lud[i][1];
            world.plane[px][py]=i+1;

    }


    },
    render: function(){
<<<<<<< HEAD
        context.clearRect(0, 0, canvas.width, canvas.height); //очищаем
  q3 = document.getElementById('mon_Tick');
        q3.innerHTML=world.Tick;

        document.body.appendChild(q3);


    for (var key in this.lud)   {
        man = this.lud[key];
       // console.log(key);
       drawMan(man);


    }
    },
    monitorman: function(idmon){

        var
        q = document.getElementById('mon_id');
        q.innerHTML=idmon;

        document.body.appendChild(q);

=======
  //      context.clearRect(0, 0, canvas.width, canvas.height); //очищаем
  
    for (var key in this.lud)   {
        man = this.lud[key];
       // console.log(key);
       drawMan(man)}
    },
    createworld : function(){
    //создаем пустое пространство
        for (var i = 0; i <= this.W; i++) {
            world.plane[i]=[];
         for (var j = 0; j <= this.H; j++) {
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
                'red',
                i+1];
            l = document.createElement('div');
            l.id = i+1;
            document.body.appendChild(l);
            px = world.lud[i][0];
            py = world.lud[i][1];
            world.plane[px][py].push(i);
            //console.log(i,px,py,world.lud[i]);
            //console.log();
            
    
        }
       // console.log(world.lud);
       //console.log(world.plane);

    }
}    
 


    function animate(myWorld, startTime) {

        var step = ((new Date()).getTime() - startTime)/1000+1;
           
        world.render();
        world.calculate(1);
  
        requestAnimFrame(function () {
            animate(myWorld, startTime);
>>>>>>> origin/letaetnadivah

        q2 = document.getElementById('mon_idop');
        q.innerHTML=world.lud[idmon][6];
        document.body.appendChild(q2);

        /////////////////////
        var container = document.getElementById('container');

        container.innerHTML='';

        var table = document.createElement('table');
    var tbody = document.createElement('tbody');

    for (i = 0; i < world.H; i++) {

        var row = document.createElement('tr');

        for (var b = 0; b < world.W; b++) {

            var cell = document.createElement('td');

            cell.style.border='solid 1';
            var temp = world.lud[(world.plane[b][i])-1];
            if (temp>0) {
            cell.textContent = world.plane[b][i]+' '+ temp;}
            else {cell.textContent = world.plane[b][i]};

            row.appendChild(cell);
        }

        tbody.appendChild(row);
    }


    table.appendChild(tbody);

    container.appendChild(table);

        /////////////////////


    },
    createworld : function(){
    //создаем пустое пространство
        for (var i = 0; i < this.W+1; i++) {
            world.plane[i]=[];
         for (var j = 0; j < this.H+1; j++) {
            world.plane[i][j] = [];
        }
        }

    //создаем популяцию на основе случайных величин
        for (var i = 0; i < (this.population); i++) {
            world.lud[i]=[
                (rand(1,world.W-1)),
                (rand(1,world.H-1)),
                (rand(1,2)),
                (rand(1,8)),
                'rgba(0, 0, 255, 0.26)',
                i+1,
                0];
            
            l = document.createElement('div');
            l.id = i+1;
            document.body.appendChild(l);
            px = world.lud[i][0];
            py = world.lud[i][1];
            world.plane[px][py]=l.id;

        }
        world.lud[0][4]='red'; //метим первого красным цветом
        world.lud[1][4]='green';
        world.lud[2][4]='blue';
        world.lud[0][3]=1;

    }
}    
 
 var maxV = 1500,
    slider = $("#slider").slider({
    animate:1000,
    min:0,
    value:100,
    max:maxV,
    step:10,
    slide:function(event,ui){
        $("#rad").val(ui.value);
        $radbutton = $("#rad").val();
        $("#create_button").css("border-radius", $radbutton+"px");
        world.v = maxV - ui.value;
    }
});
$('#rad').on('input',function() {
    world.v = parseInt($(this).val(), 10);
    if(!isNaN(v) && v <= maxV && v >= 0) {slider.slider('value', world.v)}
    else $(this).val('');
});

//конец ядра
    
    

world.createworld();
<<<<<<< HEAD
world.render();
   // world.monitorman(1);
    
startTime = (new Date()).getTime();
animate(world,canvas, context,startTime);
=======
 //   console.log(world.lud);
   //     console.log(world.planeX,world.planeY);
   // console.log(idop);
 //   console.log(world);
    //    world.render();
  //   world.calculate(1);
   // console.log(world);
  //console.log(world.lud);
  //      console.log(world.planeX,world.planeY);
    
startTime = (new Date()).getTime();
   setTimeout((animate(world,startTime)),1000);
>>>>>>> origin/letaetnadivah

};

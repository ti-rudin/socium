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
        
        d.style.left = y*2;
        d.style.top = x*2;
        d.style.width='10px';
        d.style.height='10px';
        d.style.background=color;
        d.style.position='absolute';
       // d.innerHTML=id;
        d.style.fontSize='5px';
        d.style.color='white';
        d.style.border=1;
        d.style.borderColor='green';
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
    H: 270,
    W: 230,
    Day: 3,
    v: 1,
    population : 500,
    lud: {x : 1,
          y : 1,
          r : 1,
          d : 1,
          c : 1,
         id : 1},
    plane : [],
    plane2: [],
    calculate: function() {
    //перебираем всех по очереди

    for (var keyC = 0; keyC < world.population; keyC++) {

        var man = this.lud[keyC];
        xmy = man[0];
        ymy = man[1];
        idmy = world.plane[xmy][ymy]; //получаем массив своей ячейки в plane
        
        id = man[5];
       // console.log(id,xmy,ymy,idmy,man[3]);
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
                                    man[3] = rand(1,8); } else {
                                    //записываем в следующую ячейку plane свой id
                                    world.plane[xmy][ymy-1]=idmy;
                                    //выписываем свой id из текущей ячейки plant (ща пока зачищаем просто)
                                    world.plane[xmy][ymy]=[0];
                                   //пересчитываем коодинаты
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
                                    man[3] = rand(1,8); } else {
                                    //записываем в следующую ячейку plane свой id
                                    world.plane[xmy+1][ymy-1]=idmy;
                                    world.plane[xmy][ymy]=[0];//фильтр
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
                                    man[3] = rand(1,8); } else {
                                    //записываем в следующую ячейку plane свой id
                                    world.plane[xmy+1][ymy]=idmy;
                                    world.plane[xmy][ymy]=[0];//фильтр
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
                                    man[3] = rand(1,8); } else {
                                    //записываем в следующую ячейку plane свой id
                                    world.plane[xmy+1][ymy+1]=idmy;
                                    world.plane[xmy][ymy]=[0];//фильтр
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
                                    man[3] = rand(1,8); } else {
                                    //записываем в следующую ячейку plane свой id
                                    world.plane[xmy][ymy+1]=idmy;
                                    world.plane[xmy][ymy]=[0];//фильтр
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
                    else if ((xmy-1) < 0){
                        man[3] = 4;}//если уперлись, то просто меняем направление
                    else {
                        //иначе
                            var idop = this.plane[xmy-1][ymy+1]; //получаем массив с оппонентами
                            if (idop>0) {
                                    //если массив с оппонентами не пустой, то просто меняем направление
                                    man[3] = rand(1,8); } else {
                                    //записываем в следующую ячейку plane свой id
                                    world.plane[xmy-1][ymy+1]=idmy;
                                    world.plane[xmy][ymy]=[0];//фильтр
                                    //пересчитываем коодинаты
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
                            var idop = this.plane[xmy+1][ymy]; //получаем массив с оппонентами
                            if (idop>0) {
                                    //если массив с оппонентами не пустой, то просто меняем направление
                                    man[3] = 8; } else {
                                    //записываем в следующую ячейку plane свой id
                                    world.plane[xmy-1][ymy]=idmy;
                                    world.plane[xmy][ymy]=[0];//фильтр
                                    //пересчитываем коодинаты
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
                                    man[3] = 1; } else {
                                    //записываем в следующую ячейку plane свой id
                                    world.plane[xmy-1][ymy-1]=idmy;
                                    world.plane[xmy][ymy]=[0];//фильтр
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
    monitorman: function(idmon){

        var
        q = document.getElementById('mon_id');
        q.innerHTML=idmon;

        document.body.appendChild(q);
        q2 = document.getElementById('mon_idop');
        var x,y;
        x=world.lud[(idmon-1)][0];
        y=world.lud[(idmon-1)][1];
        q2.innerHTML=world.plane[x][y];
        //q2.style.position=relative;
        document.body.appendChild(q2);

        /////////////////////
        var container = document.getElementById('container');

        container.innerHTML='';

        var table = document.createElement('table');
    var tbody = document.createElement('tbody');
        //tbody.style.border=1;
    // loop array
    for (i = 0; i < world.W; i++) {
        // get inner array
        var vals = world.plane[i];
        // create tr element
        var row = document.createElement('tr');
        // loop inner array
        for (var b = 0; b < world.H; b++) {
            // create td element
            var cell = document.createElement('td');
            // set text
            cell.style.border='1';
            cell.textContent = vals[b];
            // append td to tr
            row.appendChild(cell);
        }
        //append tr to tbody
        tbody.appendChild(row);
    }

    // append tbody to table
    table.appendChild(tbody);
    // append table to container
    container.appendChild(table);

        /////////////////////

    },
    createworld : function(){
    //создаем пустое пространство
        for (var i = 0; i < this.W+1; i++) {
            world.plane[i]=[];
         for (var j = 0; j < this.H+1; j++) {
            world.plane[i][j] = [0];
        }
        }

    //создаем популяцию на основе случайных величин
        for (var i = 0; i < (this.population); i++) {
            world.lud[i]=[
                (rand(1,world.W-1)),
                (rand(1,world.H-1)),
                (rand(1,2)),
                (rand(1,8)),
                'gray',
                i+1];
            
            l = document.createElement('div');
            l.id = i+1;
            document.body.appendChild(l);
            px = world.lud[i][0];
            py = world.lud[i][1];
            world.plane[px][py]=l.id;
            //console.log(i,px,py,world.lud[i]);
            //console.log();
            
    
        }
        world.lud[0][4]='red'; //метим первого красным цветом
        world.lud[1][4]='green';
        world.lud[2][4]='blue';
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

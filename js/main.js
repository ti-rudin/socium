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
        var y = man[0],
            x = man[1],
            radius = man[2],
            id =  man[5],
            color = man[4];
//console.log(man);
            //    console.log(id);
if (id > 0) {
        var 
        d = document.getElementById(id);
        
        d.style.left = y*8;
        d.style.top = x*8;
        d.style.width='7px';
        d.style.height='7px';
        d.style.background=color;
        d.style.position='absolute';
        //d.innerHTML=x+' '+y;
        d.innerHTML=man[3];
        d.style.fontSize='9px';
        d.style.color='white';
        d.style.border='solid 1';
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
    function animate(myWorld, startTime) {
        var step = ((new Date()).getTime() - startTime)/1000+1;
            world.render();
            world.calculate();
            setTimeout((function () {animate(myWorld, startTime); }),world.v);
    }
    
///////
    
world = {
    H: 40,
    W: 40,
    Day: 3,
    v: 1000,
    population : 100,
    lud: {x : 1,
          y : 1,
          r : 1,
          d : 1,
          c : 1,
         id : 1},
    plane : [],
    calculate: function() {
    //перебираем всех по очереди

    for (var keyC = 0; keyC < world.population; keyC++) {

        var man = this.lud[keyC];
        xmy = man[0];
        ymy = man[1];
       // idmy = world.plane[xmy][ymy]; //получаем массив своей ячейки в plane
       // idmy = 0;
        world.plane[xmy][ymy]=0;
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

                                   //пересчитываем коодинаты
                                    idmy = [];

                                    man[0] = this.lud[keyC][0];
                                    man[1] = this.lud[keyC][1]-1;
                                    idop = (id);

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
                                    //пересчитываем коодинаты
                                    idmy = [];
                                    man[0] = this.lud[keyC][0]+1;
                                    man[1] = this.lud[keyC][1]-1;
                                    idop = (id);

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
                                    //пересчитываем коодинаты
                                    idmy = [];
                                    man[0] = this.lud[keyC][0]+1;
                                    man[1] = this.lud[keyC][1];
                                    idop = (id);

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
                                    //пересчитываем коодинаты
                                    idmy = [];
                                    man[0] = this.lud[keyC][0]+1;
                                    man[1] = this.lud[keyC][1]+1;
                                    idop = (id);

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

                                    //пересчитываем коодинаты
                                        idmy = [];
                                    man[0] = this.lud[keyC][0];
                                    man[1] = this.lud[keyC][1]+1;
                                    idop = (id);

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
                                    //пересчитываем коодинаты
                                        idmy = [];
                                    man[0] = this.lud[keyC][0]-1;
                                    man[1] = this.lud[keyC][1]+1;
                                    idop = (id);

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
                                        //пересчитываем коодинаты
                                        idmy = [];
                                    man[0] = this.lud[keyC][0]-1;
                                    man[1] = this.lud[keyC][1];
                                    idop = (id);

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
                                    //пересчитываем коодинаты
                                        idmy = [];
                                    man[0] = this.lud[keyC][0]-1;
                                    man[1] = this.lud[keyC][1]-1;
                                    idop = (id);

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
        
    //создаем пустое пространство
    //    for (var i = 0; i < this.W+1; i++) {
     //       world.plane[i]=[];
     //    for (var j = 0; j < this.H+1; j++) {
     //       world.plane[i][j] = [0];
     //   }
      //  }
    //перебираем всех по очереди
    for (var i = 0; i < world.population; i++) {
            var px = world.lud[i][0];
            var py = world.lud[i][1];
            world.plane[px][py]=i+1;

    }

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
        //var x,y;
        //x=world.lud[(idmon-1)][0];
        //y=world.lud[(idmon-1)][1];
        //q2.innerHTML=world.plane[x][y];
        //q2.style.position=relative;
        document.body.appendChild(q2);

        /////////////////////
        var container = document.getElementById('container');

        container.innerHTML='';

        var table = document.createElement('table');
    var tbody = document.createElement('tbody');
        //tbody.style.border=1;
    // loop array
    for (i = 0; i < world.H; i++) {
        // get inner array
        //var vals = world.plane[i];
        // create tr element
        var row = document.createElement('tr');
        // loop inner array
        for (var b = 0; b < world.W; b++) {
            // create td element
            var cell = document.createElement('td');
            // set text
            cell.style.border='solid 1';
            var temp = world.lud[(world.plane[b][i])-1];
            if (temp>0) {
            cell.textContent = world.plane[b][i]+' '+ temp;}
            else {cell.textContent = world.plane[b][i]};
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
               console.log(world.plane);


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
       console.log(world.plane);

    }
}    
 
 var maxV = 300,
    slider = $("#slider").slider({
    animate:1000,
    min:0,
    value:100,
    max:maxV,
    step:1,
    slide:function(event,ui){
        $("#rad").val(ui.value);
        $radbutton = $("#rad").val();
        $("#create_button").css("border-radius", $radbutton+"px");
        world.v = 300 - ui.value;
    }
});
$('#rad').on('input',function() {
    world.v = parseInt($(this).val(), 10);
    if(!isNaN(v) && v <= maxV && v >= 0) {slider.slider('value', world.v)}
    else $(this).val('');
});

//конец ядра
    
    

world.createworld();
world.render();
    world.monitorman(1);
    
startTime = (new Date()).getTime();
animate(world,startTime);

};

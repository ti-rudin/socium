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
    H: 100,
    W: 100,
    Day: 3,
    v: 1,
    population : 10,
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
                    if ((man[1]) < 0) {man[3] = 5; } //пересчитываем направление, если стенка
                    //пересчитываем направление, если столкновение
//смотрим кто прямо по направлению, получаем массив ид
                    //смотрим координаты оппонентов
                    var xop = this.lud[key][0];
                    var yop = this.lud[key][1]-step*2;
                    //смотрим id оппонента
                    //console.log(xop,yop);
                    var idop = world.plane[xop][yop];
                    //console.log(idop);
                    if (idop>0) { man[3] = 3;
                    };

                    }
                break
                case 2:{
                    man[0] = man[0]+step;
                    man[1] = man[1]-step;
                    if ((man[1]) < 0) {man[3] = 4; }
                    if ((man[0]) > world.W) {man[3] = 8; }
                    }
                break
                case 3:{
                    man[0] = man[0]+step;
                    man[1] = man[1];
                    if ((man[0]) > world.W) {man[3] = 7; }
                    }
                break
                case 4:{
                    man[0] = man[0]+step;
                    man[1] = man[1]+step;
                    if ((man[0]) > world.W) {man[3] = 6; }
                    if ((man[1]) > world.H) {man[3] = 2; }
                    }
                break
                case 5:{
                    man[0] = man[0];
                    man[1] = man[1]+step;
                    if (man[1] > world.H){man[3] = 1;}
                    }
                    break
                case 6:{
                    man[0] = man[0]-step;
                    man[1] = man[1]+step;
                    if ((man[0]) < 0) {man[3] = 4; }
                    if ((man[1]) > world.H) {man[3] = 8; }
                    }
                break
                case 7:{
                    man[0] = man[0]-step;
                    man[1] = man[1];
                    if ((man[0]) < 0) {man[3] = 3; }
                    }
                break
                case 8:{
                    man[0] = man[0]-step;
                    man[1] = man[1]-step;
                    if ((man[0]) < 0) {man[3] = 2; }
                    if ((man[1]) < 0) {man[3] = 6; }
                    }
                break
                case 0:{
                    man[0] = man[0];
                    man[1] = man[1];
                    }
                break
                default:
            alert('1')
            }}
      

    }
        
    //alert(this.Day + ', ' + this.lud[user][user]); 
    },
    render: function(){
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
        for (var i = 0; i < (this.population-1); i++) {
            world.lud[i]=[
                (rand(1,world.W)),
                (rand(1,world.H)),
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
        
    },
    transpon : function(){
        //////////////
    arr = this.lud;
var ArrX = [];
var ArrY = [];

for(var i = 0; i < arr.length; i++){


  for(var j = 0; j < arr[i].length; j++){
    if(newArr.length <= j){
      newArr.push([]);
    }
    newArr[j][i] = arr[i][j];
  }
}
arr.splice(0, arr.length);
for(var i = 0; i < newArr.length; i++){
  arr.push(newArr[i])
}
        ///////////
        
        
    }
}    
 


    function animate(myWorld, startTime) {

        var step = ((new Date()).getTime() - startTime)/1000+1;
           
        world.render();
        world.calculate(1);
  
        requestAnimFrame(function () {
            animate(myWorld, startTime);

        });


    }
//конец ядра
    
    

world.createworld();
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

};

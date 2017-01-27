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
    H: 500, 
    W: 500,
    Day: 3,
    v: 1,
    lud: {x : 0,
          y : 0,
          r : 0,
          d : 0,
          c : 0,
         id : 0}, 
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
                    if ((man[1]) < 0) {man[3] = 5; } //пересчитываем направление 
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

        for (var i = 0; i < 1000; i++) {
            world.lud[i]=[
                (rand(1,world.W)),
                (rand(1,world.H)),
                (rand(1,2)),(rand(1,8)),
                'red',i+1,];
            l = document.createElement('div');
            l.id = i+1;
            document.body.appendChild(l);

            
    
        }
        
        
        
    }
}    
 


    function animate(myWorld, startTime) {

        var step = ((new Date()).getTime() - startTime)/1000+1;
           
        world.render();
        world.calculate(3);
  
        requestAnimFrame(function () {
            animate(myWorld, startTime);

        });


    }
//конец ядра
    
    

world.createworld();
    console.log(world);
        world.render();
     world.calculate(2);
    console.log(world);
 
    
startTime = (new Date()).getTime();
//   setTimeout((animate(world,startTime)),1000);

};

<!DOCTYPE html>
<html>
<head>
    <title>Laboratory work of Canvas</title>
    <style>
    #canvas {
        display: block;
        margin: 0;
        border: 1px solid #000;
    }
    </style>
</head>
<body onload="init()">
    <canvas id="canvas"></canvas>
    <script>
        var  W, H, ctx;

        var Circle = function(x,y,radius, color, vx, vy){
            this.x = x;
            this.y = y;
            this.r = radius;
            this.color = color;

            this.vx = vx; //velocity of x axis
            this.vy = vy; //velocity of y axis
        };

        var c;

        var circles = []; // array of circles

        function init(){
            var canvas = document.getElementById("canvas");
            canvas.width = window.screen.width-20;
            canvas.height = window.screen.height-85;
            ctx        = canvas.getContext('2d');

            W = canvas.width;
            H = canvas.height;

            for (var i=0;i<150;i++)
            {
                var randomRadius = Math.random()*300;
                var randomColor = "rgb("+(Math.round(Math.random()*255))+","+(Math.round(Math.random()*255))+","+(Math.round(Math.random()*255))+")";

                var newCircle = new Circle(W/2-randomRadius,
                    H/2-randomRadius,
                    22,
                    randomColor,
                    Math.random()*3, // vx
                    Math.random()*2 // vy
                );
                circles.push(newCircle);
            }

            setInterval("draw()", 1000/66);
        }
            var newCircle = new Circle(W/2-randomRadius,
                    H/2-randomRadius,
                    22,
                    randomColor,
                    Math.random()*3, // vx
                    Math.random()*2 // vy
                );
                circles.push(newCircle);


        function draw(){ // START draw()

            ctx.clearRect(0,0,W,H);

            for (var i=0;i<150;i++) // START FOR
            {
                var tempCircle = circles[i];

                tempCircle.x += tempCircle.vx;
                tempCircle.y += tempCircle.vy;


                if ((tempCircle.y+tempCircle.r) > H || (tempCircle.y-tempCircle.r) < 0)
                {
                    tempCircle.vy = -tempCircle.vy;
                }

                if ((tempCircle.x+tempCircle.r) > W || (tempCircle.x-tempCircle.r) < 0)
                {
                    tempCircle.vx = -tempCircle.vx;
                }

                ctx.beginPath();
                ctx.arc(tempCircle.x, tempCircle.y, tempCircle.r, 0, 2*Math.PI, false);
                ctx.fillStyle = tempCircle.color;
                ctx.fill();

            } // END FOR

        } // END draw()
    </script>
</body>
</html>

window.onload=function(){i=7;
for (index = 1; index <= i; index++) {
  //Создадим объект obj
  var obj = new Object();
  //Добавим объекту obj свойство name со значением 'Дмитрий'
  obj.name = 'Дмитрий' + index;
  //Добавим объекту obj свойство age со значением 26
  obj['age'] = 26 + index;
  //Обратимся к свойствам объекта для вывода их значений
  var canvas = document.getElementById('circle');
    var obCanvas = canvas.getContext('2d');
    obCanvas.beginPath();
    obCanvas.arc(140+(index*20), 75, 10, 0, 2*Math.PI, false);
    obCanvas.fillStyle = 'red';
    obCanvas.fill();
    obCanvas.lineWidth = 1;
    obCanvas.strokeStyle = 'red';
    obCanvas.stroke();

}
}

//start button 
var startBtn = document.getElementById('start');

//function to call canvasElements when the start button is pressed
(function () {

  startBtn.addEventListener("click", function(){
    canvasElements.init();
    mycanvas.focus();
  });
}(canvasElements));
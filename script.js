var can;
var ctx;
var bug;
var bugX = 0;
var bugY = 0;
var score = 0;
var time = 5000;
var intervalVal;
function draw(){
  can = document.getElementById('canvas');
  ctx = can.getContext('2d');
  var img = new Image();
  img.onload = function(){
    can.width = img.width;
    can.height = img.height;
    ctx.drawImage(img, 0, 0, img.width, img.height);
  }
  img.src = 'images/leaf.jpg';
  bug = new Image();
  bug.onload = function(){
    ctx.drawImage(bug, bugX, bugY, bug.width / 2, bug.height / 2);
  }
  bug.src = 'images/bug.png';
}
window.addEventListener("load", function(){
  draw();
  intervalVal = setInterval(function(){
    bugX = genRandomX(can.width);
    bugY = genRandomY(can.height);
    draw();
  }, time);
  document.getElementById("canvas").addEventListener("click", handleClick);
});

function genRandomX(width){
  var val = Math.floor(Math.random() * (width + 1));
  if(width == val){
    return val - 128;
  }
  return val;
}

function genRandomY(height){
  var val = Math.floor(Math.random() * (height + 1));
  if(val == height){
    return val - 128;
  }
  return val;
}

function handleClick(event){
  var rect = canvas.getBoundingClientRect();
	var x = Math.floor(event.clientX - rect.left);
	var y = Math.floor(event.clientY - rect.top);
  if(Math.abs(x - bugX) <= 128 && Math.abs(y - bugY) <= 128){
    document.getElementById("score").innerHTML = ++score;
    ctx.clearRect(0, 0, can.width, can.height);
    bugX = genRandomX(can.width);
    bugY = genRandomY(can.height);
    draw();
    clearInterval(intervalVal);
    if(time == 500){
      intervalVal = setInterval(function(){
        bugX = genRandomX(can.width);
        bugY = genRandomY(can.height);
        draw();
      }, time);
    }
    else{
      time = time - 500;
      intervalVal = setInterval(function(){
        bugX = genRandomX(can.width);
        bugY = genRandomY(can.height);
        draw();
      }, time);
    }
  }
}

function resetScore(){
  window.location.reload();
}

function resetSpeed(){
  clearInterval(intervalVal);
  time = 5000;
  setInterval(function(){
    bugX = genRandomX(can.width);
    bugY = genRandomY(can.height);
    draw();
  },time);
}

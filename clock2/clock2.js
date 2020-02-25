var currentSec;
var currentMillisec;
var each;

var hourVal;
var minuteVal;
var secondVal;
var millisVal;

const numRotations = 3;
const checkPointWidth = 3;
const numCheckPoints = 12;
const alphaConstant = 40;
var maxRadius;


function setup() {
  createCanvas(400, 400);
  textAlign(CENTER, CENTER);
  currentSec = second();
  currentMillisec = millis();
  each = numRotations*TAU/60;
  maxRadius = height/2 - 2;
}

function draw() {
  hourVal = hour()%12;
  minuteVal = minute();
  secondVal = second();
  let millisec = millis();
  
  if (currentSec != secondVal) {
     currentSec = secondVal;
     currentMillisec = millisec;
  }
  
  millisVal = int(millisec - currentMillisec);
  
  clear();
  //text(formatTime(),30,20);
  translate(width/2,height/2);
  
  //spirals 
  push();
  noFill();
  drawHour();
  drawMinute();
  drawSecond(); 
  pop();
  
  //points
  drawCheckPoints();
  pop();
  
}

 // DRAW HOUR SPIRAL
 function drawHour() {
  beginShape();
  stroke(0,alphaConstant);
  strokeWeight(30);
  //curveVertex(0,0);
  
  // all spirals need ~60 control points to be smooth,
  // so for each 5th of an hour I add a control point
  for (let i = -1 ; i < hourVal; i++) { 
    let hourEach = each*5;
    // starts at -1 to make sure value for beginning of spiral is always <= 0
    let i_ = i + minuteVal/60 + secondVal/60/60;
    if (i_ < 0) {i_ = 0;}
    
    for (let j = 1; j<= 5; j++ ) {
      let j_ = i_ + j/5;
      curveVertex(
        j_*(maxRadius/12)*cos(j_*hourEach),
        j_*(maxRadius/12)*sin(j_*hourEach)
      );
    }
  }
  endShape(); 
 }
 
 //DRAW MINUTES SPIRAL
 function drawMinute() {
  beginShape();
  stroke(0,2*alphaConstant);
  strokeWeight(12);
  //curveVertex(0,0);
  for (let i = -1 ; i <= minuteVal; i++) {    
    // starts at -1 to make sure value for beginning of spiral is always <= 0
    let i_ = i + secondVal/60 + millisVal/1000/60;
    if (i_ < 0) {i_ = 0;}
    curveVertex(
      i_*(maxRadius/60)*cos(i_*each),
      i_*(maxRadius/60)*sin(i_*each)
    );
  }
  endShape();
 }
 
 //DRAW SECONDS SPIRAL
 function drawSecond() {
  beginShape();
  stroke(0,3*alphaConstant);
  strokeWeight(2);
  //curveVertex(0,0);
  for (let i = -1 ; i <= secondVal; i++) {    
    // starts at -1 to make sure value for beginning of spiral is always <= 0
    let i_ = i + millisVal/1000; 
    if (i_ < 0) {i_ = 0;}
    curveVertex(
      i_*(maxRadius/60)*cos(i_*each),
      i_*(maxRadius/60)*sin(i_*each)
    );
  }
  endShape(); 
 }

function drawCheckPoints() {
  push();
  fill(0);
  circle(0,0,checkPointWidth*3);
  
  for (let i = 1; i <= numCheckPoints; i ++) {
    let i_ = i*60/numCheckPoints - 1;
    push();
    rotate(i_*each);
    translate(i_*(maxRadius/60),0);
    circle(0,0,checkPointWidth);
    pop();
  }
  pop();
}

function formatTime() {
  return nf(hour()%12, 2) + ':' + nf(minute(), 2) + ':' + nf(second(), 2);
}

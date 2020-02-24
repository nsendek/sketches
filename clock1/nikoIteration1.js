const secLength = 140;
const minLength = 110;
const hourLength = 90;

var currentSec;
var currentSecMillis;

const tickDistance = 150;
const tickLength = 5;

const dialWidth = 15;
const dialHeight = 70;
var points;

function setup() {
  createCanvas(420, 420);
  textAlign(CENTER, CENTER);
  currentSec = second();
  currentSecMillis = millis();
  
  points = [
              createVector(-dialWidth/2,-dialHeight/2), 
              createVector(dialWidth/2,-dialHeight/2),
              createVector(-dialWidth/2,dialHeight/2), 
              createVector(dialWidth/2,dialHeight/2)
           ];
}


function draw() { 
  var hourVal = hour()%12;
  var minuteVal = minute();
  var secondVal = second();
  var millisec = millis();
 
  if (currentSec != secondVal) {
     currentSec = secondVal;
     currentSecMillis = millisec;
  }
  
  var millisVal = int(millisec - currentSecMillis);
  
  var startAngle = radians(-90);
  var endAngle = radians(270);
  
  background(255);
  translate(width/2, height/2);
  
  var hourAngle = map(hourVal + minuteVal/60,  0, 12,  startAngle, endAngle);
  var minAngle = map(minuteVal + secondVal/60,  0, 60,  startAngle, endAngle);
  var secAngle = map(secondVal + millisVal/1000,  0, 60,  startAngle, endAngle);
  
  //draw Suns
  push();
  noFill();
  stroke(0);
  strokeWeight(1);
  circle(-160*cos(hourAngle), -160*sin(hourAngle), 10);
  circle(-175*cos(minAngle), -175*sin(minAngle), 10);
  circle(-190*cos(secAngle), -190*sin(secAngle), 10);
  pop();
  
  //draw Shadows
  strokeWeight(0);
  fill(0,90);
  drawShadow(hourLength*cos(hourAngle),hourLength*sin(hourAngle));
  fill(0,60);
  drawShadow(minLength*cos(minAngle),minLength*sin(minAngle));
  fill(0,30);
  drawShadow(secLength*cos(secAngle),secLength*sin(secAngle));
  
  //draw Sun Dial
  fill(0);
  rect(-dialWidth/2,-dialHeight/2,dialWidth,dialHeight);
  
  //draw ticks
  push();
  strokeWeight(1);
  for (var i = 0; i < 12; i ++) {
    rotate(radians(30));
    line(tickDistance - tickLength/2, 0, tickDistance + tickLength/2, 0);
  }
  pop();
}

function drawShadow(x,y) {
  var corners = [];
  var p0 = createVector(x,y);
  var maxAngle = 0;
  
  for (let i = 0 ; i < points.length; i++) {
    for (let j = i + 1; j < points.length; j++) {
      let p1 = points[i];
      let p2 = points[j];
      
      let v1 = p5.Vector.sub(p1, p0);
      v1.normalize();
      let v2 = p5.Vector.sub(p2, p0);
      v2.normalize();
      
      let angle = acos(v1.dot(v2));
      if (angle > maxAngle) {
        maxAngle = angle;
        corners = [p1,p2];
      }
    }
  }
  triangle(corners[0].x,corners[0].y,corners[1].x,corners[1].y,p0.x, p0.y);
}

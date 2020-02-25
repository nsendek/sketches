var currentSec;
var currentSecMillis;
var continuous;

function setup() {
  createCanvas(400, 400);
  textAlign(CENTER, CENTER);
  rectMode(CENTER);
  currentSec = second();
  currentSecMillis = millis();
  continuous = true;
}

function draw() {
    var hourVal  = hour()%12;
    var minuteVal = minute();
    var secondVal = second();
    var millisec = millis();
   
    if (currentSec != secondVal) {
       currentSec = secondVal;
       currentSecMillis = millisec;
    }
    
   var millisVal = int(millisec - currentSecMillis);
   var diameter = height/3 - 3;
   
   var hourDist; var minDist; var secDist;
   if (continuous) {
     hourDist = map(hourVal + minuteVal/60,  0, 12,  -diameter, 0);
     minDist = map(minuteVal + secondVal/60,  0, 60,  -diameter, 0);
     secDist = map(secondVal + millisVal/1000,  0, 60,  -diameter, 0);
   } else {
     hourDist = map(hourVal,  0, 12,  -diameter, 0);
     minDist = map(minuteVal,  0, 60,  -diameter, 0);
     secDist = map(secondVal,  0, 60,  -diameter, 0);
   }
   
   clear();
   noStroke();
   translate(width/2,0);
   
   fill(0);
   translate(0, height/6);
   circle(0,0,diameter);
   text(nf(hourVal, 2),diameter,0);
   push();
   fill(255);
   translate(hourDist, 0);
   circle(0,0,diameter);
   pop();
   push();
   translate(diameter, 0);
   pop();
     
   translate(0, height/3);
   circle(0,0,diameter);
   text(nf(minuteVal, 2),diameter,0);
   push();
   fill(255);
   translate(minDist, 0);
   circle(0,0,diameter);
   pop();
   
   translate(0, height/3);
   circle(0,0,diameter);
   text(nf(secondVal, 2),diameter,0);
   push();
   fill(255);
   translate(secDist, 0);
   circle(0,0,diameter);
   pop();
   push();
   translate(diameter, 0);
   pop();
}

function keyPressed() { 
  if (key == 'c') {
   continuous = !continuous; 
   console.log(continuous);
  }
  
}

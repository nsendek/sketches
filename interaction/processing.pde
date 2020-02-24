//import processing.pdf.*;

float RING_BOUNDARY;
float BUFFER;
int[] VIEW_BOUNDARIES = new int[2]; 
int MAX_CHAIN_LINKS = 50;
int MAX_GROUP_SIZE = 500;
float STROKE_WEIGHT = 0.5;
float GROWTH_CONSTANT = 1;
float SPAWN_CONSTANT = 10;
float RING_ATTRACTION_CONSTANT = 2;
float MAX_SPEED = 20;

boolean stopState = false;
boolean showBoundary = false;
boolean showNegative = false;

RingChain root;

void setup() {
  //fullScreen();
  size(900,750);
  RING_BOUNDARY = height*0.4;
  BUFFER = 0.02*height;
  VIEW_BOUNDARIES[0] = width;
  VIEW_BOUNDARIES[1] = height;
  root = new RingChain();
  root.initialize(100);
  frameRate(30);
}

void draw() { 
  if (stopState) { 
    saveFrame("pixel-######.png");
    beginRecord(PDF, "vector-####.pdf"); 
  }
  
  if (showNegative) {
    background(0);
  } else {
    background(255);
  }
 
  int chainLength = root.length();
  if (chainLength > MAX_CHAIN_LINKS) {
    int diff = chainLength - MAX_CHAIN_LINKS;
    for ( int i = 0; i <= diff; i ++) {
      root = root.next;
    }
    chainLength = MAX_CHAIN_LINKS;
  }
  
  if (showBoundary) {
    stroke(0);
    fill(10);
    circle(VIEW_BOUNDARIES[0]/2.,VIEW_BOUNDARIES[1]/2.,2*RING_BOUNDARY);
  }
  
  root.update();
  root.draw();
  
  println(root.size());
  println(root.length());
  println("");
  
  if (stopState) {
    saveFrame("pixel-######.png");
      endRecord();
  }
  
}

void keyPressed() {
  if (key == ' ') {
    stopState = !stopState;
    if (stopState) {
       noLoop(); 
       draw();
    } else {
       loop();
    }
  } else if (key == 'b') {
    showBoundary = !showBoundary;
  } else if (key == 'n') {
    showNegative = !showNegative;
  }
}

void keyReleased() {
  if (key == CODED) {
    if (key == RETURN) {
      root = new RingChain();
      root.initialize(750); 
    }
    
    if (keyCode == DOWN) {
      if (root.prev != null) {
        root = root.prev; 
      }
    } else if (keyCode == UP) {
      if (root.next != null) {
        root = root.next; 
      }
    } else if (keyCode == LEFT){
       root.log();
       println("");
    } else if (keyCode == RIGHT){
      println(root.length());
    }
  }
}

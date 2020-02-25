//import processing.pdf.*;

float RING_BOUNDARY;
float BUFFER;
int[] VIEW_BOUNDARIES = new int[2]; 
int MAX_CHAIN_LINKS = 20;
int MAX_GROUP_SIZE = 250;
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
  size(750,750);
  RING_BOUNDARY = height*0.4;
  BUFFER = 0.02*height;
  VIEW_BOUNDARIES[0] = width;
  VIEW_BOUNDARIES[1] = height;
  root = new RingChain();
  root.initialize(4);
  frameRate(60);
}

void draw() { 
  //println(root.height());

  background(255);
 
  int chainLength = root.height();
  if (chainLength > MAX_CHAIN_LINKS) {
    int diff = chainLength - MAX_CHAIN_LINKS;
    for ( int i = 0; i <= diff; i ++) {
      root = root.getNext();
    }
    chainLength = MAX_CHAIN_LINKS;
  }
  
  stroke(0);
  fill(10);
  ellipse(VIEW_BOUNDARIES[0]/2.,VIEW_BOUNDARIES[1]/2.,2*RING_BOUNDARY,2*RING_BOUNDARY);
 
  root.update();
  root.draw();

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
       //println("");
    } else if (keyCode == RIGHT){
      //println(root.length());
    }
  }
}

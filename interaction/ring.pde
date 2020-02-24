class Ring {
  float x, y;
  float velX = 0;
  float velY = 0;
  float terminalV = MAX_SPEED;
  float growthFactor = height*random(1,GROWTH_CONSTANT)/100.;
  color col;
  float radius = 0;
  float charge = 1;
  float acceleration = RING_ATTRACTION_CONSTANT;
  boolean active = true;
  
  Ring (float x, float y, color col) {
    this.col = col;
    this.x = x;
    this.y = y;
  }
  
  void changePos(float x, float y) {
    this.x = x;
    this.y = y;
  }
  
  boolean intersects(Ring r) {
       float distance = sqrt(sq(r.x - this.x) + sq(r.y - this.y));
       float bigRadius = this.radius + r.radius;
       return distance < bigRadius;
  }
  
  boolean outOfBounds(float x, float y) {
    float midX =  VIEW_BOUNDARIES[0]/2.;
    float midY =  VIEW_BOUNDARIES[1]/2.;
    float distance = sqrt(sq(x - midX) + sq(y - midY));
    
    return distance > RING_BOUNDARY;
  }
  
  void mouseInteraction() {
     float possX = this.x;
     float possY = this.y;
      if (!(mouseX <= 1) && !(mouseY <= 1))  {
        if (this.x < mouseX) {
          velX = min(terminalV,velX + charge*acceleration);
          
          possX += velX;
        } else if (this.x > mouseX) {
          velX = max(-1*terminalV,velX - charge*acceleration);
          possX += velX;
        }
        
       if (this.y < mouseY) {
          velY = min(terminalV,velY + charge*acceleration);
          possY += velY;
        } else if (this.y > mouseY){
          velY = max(-1*terminalV,velY - charge*acceleration);
          possY += velY;
        }
      }
      
      if(!outOfBounds(possX,possY)){
        this.x = possX;
        this.y = possY;
      }
  }
  
  void grow() {
      if (this.x - radius - BUFFER <= 0) {
        this.x += (radius + BUFFER - this.x);
      } else if (this.x + radius + BUFFER >= VIEW_BOUNDARIES[0]) {
        this.x -= (this.x + radius + BUFFER - VIEW_BOUNDARIES[0]);
      }
      if (this.y - radius - BUFFER <= 0) {
        this.y += (BUFFER + radius - this.y);
      } else if (this.y + radius + BUFFER  >= VIEW_BOUNDARIES[1]) {
        this.y -= (this.y + radius + BUFFER - VIEW_BOUNDARIES[1]);
      }
      this.radius += this.growthFactor;  
  }
  
  void update() {
   if(radius*2.0 >= (VIEW_BOUNDARIES[0]- BUFFER)
    || radius*2.0 >= (VIEW_BOUNDARIES[1]- BUFFER)) {
       this.active = false;
    }
    if (active) {
     if (!this.outOfBounds(mouseX,mouseY)) {
        this.mouseInteraction();      
      }

      this.grow();
    } 
  }
  
  void draw() { 
    stroke(this.col);
    strokeWeight(1);
    noFill();
    circle(this.x,this.y,this.radius*2.0);
  }
}

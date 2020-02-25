class RingChain {
  RingChain prev;
  RingChain next;
  float strokWeight = STROKE_WEIGHT;
  float maxSize = MAX_GROUP_SIZE;
  final ArrayList<Ring> rings = new ArrayList();
  int size = 0;
  
  RingChain () {}
  
  RingChain (RingChain prev) {
    this.prev = prev;
  }
  
  void initialize(int n) {
    for (int i = 0; i < n; i ++) {
      this.addRandom();
    }
  }
  
  void add(float x, float y) {
     color randomColor = color(random(255),random(255),random(255));
     this.rings.add(new Ring(x,y, randomColor));
     this.size++;
     if (this.rings.size() >= this.maxSize) {
       this.rings.remove(0);
       this.size--;
     }
  }
  
  void addRandom() {
     color randomColor = color(random(255),random(255),random(255));
     float r = random(RING_BOUNDARY);
     float theta = random(6.28);
     float midX =  VIEW_BOUNDARIES[0]/2.;
     float midY =  VIEW_BOUNDARIES[1]/2.; 

     this.rings.add(new Ring(midX + r*cos(theta), 
     midY + r*sin(theta),
     randomColor));
     
     this.size++;

     if (this.rings.size() >= this.maxSize) { 
       this.rings.remove(0);
       this.size--;
     }
  }

  RingChain getPrev() {
    return this.prev;
  }
  
  RingChain getNext() {
    return this.next;
  }
  
  void update() {
   for(Ring r : this.rings) {
      r.update();
   }
   collisions();
   if (this.next != null) {
      this.next.update();
   }
  }
  
  void draw() {
    strokeWeight(this.strokWeight);
    for(Ring r : this.rings) {
      r.draw();
    }
    
    if (this.next != null) {
      this.next.draw();
    }
  }
  
  int height() {
    if (this.getNext() != null) {
      return 1 + this.next.height();
    }
   return 1;
  }
  
  void collisions() {
    for(int i = 0 ; i < rings.size(); i ++) {
      for (int j = i + 1; j < rings.size(); j++) {
          Ring ring1 = rings.get(i);
          Ring ring2 = rings.get(j);
          
          boolean spawn = false;
          if(ring1.intersects(ring2)){
            if (ring2.active) {
              ring2.active = false;
              spawn = true;
            }
            if (ring1.active) {
              ring1.active = false;
              spawn = true;
            }
          }
          if (spawn) {
            float midX = ring1.x + (ring2.x - ring1.x)/2;
            float midY = ring1.y + (ring2.y - ring1.y)/2;
            
            if (this.next == null) {
              this.next = new RingChain(this);
            } 
            this.next.add(midX,midY);
            float coin = random(SPAWN_CONSTANT)/this.size;
            
            if (coin > .5) {
              this.next.addRandom();
              if (coin > 0.85) {
                this.next.addRandom();
              }
          }}
      }
    }
  } 
}

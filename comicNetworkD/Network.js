const NODE_RADIUS = 2.5;
const FLOOR = 3;
const CEILING = 15;

class Node extends Object {
 constructor(id, n, thumb, x, y) {
   super();
   this.id = id;
   this.name = n;
   this.thumbnail = thumb;
   this.pos = createVector((0.05*height + 0.9*height*x)/heroes.aspect, (0.05*height + 0.9*height*y));
   this.degree = 0;
 }
 
 addDegree() {
   this.degree += 1;
 }
 
 getRadius() {
   let rad; 
   rad = map(this.degree, 1, 500, 1, 10);
   rad = max(rad, FLOOR);
   rad = min(rad, CEILING);
   return rad;
 }
}

class Link {
 constructor(_nodes, _comics) {
   this.source = _nodes[0];
   this.target = _nodes[1];
   this.comics = _comics;
   this.comics.forEach(comic => {
     comic.links.add(this);
   });
 }
 
 comicsInRange() {
   let intersection = new Set(
    [...this.comics].filter(x => tree.comicSet.has(x)));
    return intersection.size;
 }

 draw() {
   let weight = this.comicsInRange(); 
   let red = map(weight, 0, 50, 255, 0);
   let blue = map(weight, 0, 50, 0, 255);
   if (this == interact.selectedLink) {
     stroke(255,255,255);
   } else {
     stroke(0,0,0,80);
   }
   let strokeW = map(weight,1,75,0.05,0.5);
   
   let zoomStroke = interact.transform ? strokeW*interact.transform.k : strokeW;
   
   strokeWeight(strokeW);
   line(
   this.source.pos.x, this.source.pos.y,
   this.target.pos.x, this.target.pos.y
   );  
 }
}

class Interval {
  constructor(low,high) {
    this.low = low;
    this.high = high;
    this.left = null;
    this.right = null;
    this.max = high;
  }
  
  toArray() {
    return [this.low, this.high];
  }
  
  intersect(other) {
    return this.low <= other.high &&
    this.high >= other.low;
  }
  
  setMax() {
   this.max =  this.left ? max(this.max, this.left.setMax()) : this.max;
   this.max =  this.right ? max(this.max, this.right.setMax()) : this.max;
   return this.max;
  }
  
  depth() {
    if (!this.left && !this.right) {
      return 1;
    }
    let maxim = 0;
    maxim = this.left ? this.left.depth() : 0;
    maxim = this.right ? max(maxim, this.right.depth()) : maxim;
    return maxim + 1;
  }
  
  compare(interval) {
   if (interval.low < this.low) {
     return -1;
   } else if (interval.low == this.low) {
     return (
     interval.high < this.high
     ) ? -1 : 1;
   } else {
     return 1;
   }
 }
}

class ComicInterval extends Interval {
  constructor(comicId,title,low,high) {
    super(low,high);
    this.title = title;
    this.comicId = comicId;
    this.links = new Set();
    this.heroes = new Set();
  }
}

class Interact {
  constructor() {
  this.selectedHero = null;
  this.needUpdate = true;
  this.closeness = 1;
  this.linkSetFiltered =new Set();
  }

  update() {
    this.needUpdate = false;
  }
  
  updateInterval(low,high) {
    this.needUpdate = true;
    this.currentInterval = new Interval(low,high);
    tree.setInterval(this.currentInterval);
    this.updateCloseness();
    D3();
  }
  
  updateCloseness() {
    this.linkSetFiltered.clear();
    tree.linkSet.forEach( link => {
      if (link.comicsInRange() >= this.closeness) {
        this.linkSetFiltered.add(link);
      }
    });
  }
  
  select(hero) {
    this.selectedHero = hero;
    this.needUpdate = true;
  }
}

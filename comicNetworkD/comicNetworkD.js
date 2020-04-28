const GOLDEN_AGE = new Interval(UNIX(1938,0,1), UNIX(1956,0,1));
const SILVER_AGE = new Interval(UNIX(1956,0,1), UNIX(1970,0,1));
const BRONZE_AGE = new Interval(UNIX(1970,0,1), UNIX(1985,0,1));
const MODERN_AGE = new Interval(UNIX(1985,0,1), UNIX(2021,0,1));
const tree = new AugmentedIntervalTree();
const interact = new Interact();

let comics;
let heroes;
let links;
let button1;let button2;
let button3;let button4;

function preload() {
  comics = loadJSON("./data/comics.min.json");
  heroes = loadJSON("./data/heroes.min.json");
  links = loadJSON("./data/edges.min.json");
}

function setup() {
  createCanvas(windowWidth,windowHeight);
  setupData();
  delete heroes.count;
  delete heroes.aspect;
  init(Object.values(heroes));
  tree.setInterval(GOLDEN_AGE);
  interact.updateCloseness();
  D3();
  initAxes();
  setupSearch();
  comics = null; links = null; heroes = null;
}

function draw() {
 if(interact.needUpdate) {
      console.log("redraw");
      interact.update();
      push();
      if (interact.transform) {
        translate(interact.transform.x, interact.transform.y);
        scale(interact.transform.k);
    }
    background(125);
    //drawNetwork();
    pop();
  }

  if (interact.selectedHero) {
    push();
    rectMode(CENTER);
    noStroke();
    fill(125);
    rect(0.75*width , 100, 0.2*width, 20 );
    pop();
    text(`${interact.selectedHero.name}`, 0.75*width , 100);
  }
}

function drawNetwork() {
  interact.linkSetFiltered.forEach( link => {
      link.draw();
  });
}

function setupData() {
  Object.keys(comics).forEach( _key => {
      let comic = comics[_key];
      comics[_key] = new ComicInterval(_key, comic.title, comic.interval[0], comic.interval[1]);
  });  
  
  Object.keys(heroes).forEach( _key => {
    let hero = heroes[_key];
    if (hero.hasOwnProperty('name')) {
      heroes[_key] = new Node(_key,hero.name, hero.thumbnail, hero.x, hero.y);
    }
  });
  
  Object.keys(links).forEach( _key => {
      let comicIds = links[_key];
      let ids = _key.split("_");
      let nodes = [heroes[ids[0]],heroes[ids[1]]];
      let temp = [];
      links[_key] = new Link(nodes, comicIds.map(id => comics[id]));
      heroes[ids[0]].addDegree();
      heroes[ids[1]].addDegree();
  });
  
  Object.keys(comics).forEach( _key => {
    tree.insert(comics[_key]);
  });
  tree.balance();
}

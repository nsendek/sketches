const GOLDEN_AGE = new Interval(UNIX(1938,0,1), UNIX(1956,0,1));
const SILVER_AGE = new Interval(UNIX(1956,0,1), UNIX(1970,0,1));
const BRONZE_AGE = new Interval(UNIX(1970,0,1), UNIX(1985,0,1));
const MODERN_AGE = new Interval(UNIX(1985,0,1), UNIX(2021,0,1));
const tree = new AugmentedIntervalTree();
const interact = new Interact();


let canvas;
let comics;
let heroes;
let links;

const months = ['Jan','Feb','Mar','Apr','May','June','July','Aug','Sept','Oct','Nov','Dec'];

function preload() {
  comics = loadJSON("./data/comics.min.json");
  heroes = loadJSON("./data/heroes.min.json");
  links = loadJSON("./data/edges.min.json");
}

function setup() {
  canvas = createCanvas(windowWidth,windowHeight);
  createComics();
  createNodes();
  createLinks();
  createIntervalTree();
  delete heroes.count;
  delete heroes.aspect;
  heroes = Object.values(heroes);
  init(heroes);
  countComics();
  tree.setInterval(GOLDEN_AGE);
  interact.updateCloseness();
  D3();
  comics = null; links = null;
  initAxis();
  //interact.updateInterval(GOLDEN_AGE.low,GOLDEN_AGE.high);
}

function draw() {
   let start = new Date(interact.currentInterval.low*1000);
   let end = new Date(interact.currentInterval.high*1000); 

   
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
  
  
    textSize(24);
    textAlign(CENTER,CENTER);
    text(`${months[start.getMonth()]} ${1900 + start.getYear()} -  ${months[end.getMonth()]} ${1900 + end.getYear()}`, 0.75*width, 150);
    textSize(14);
  //text(`CLOSENESS: ${interact.v.value()}`, 0.75*width , 50);
  

  

  
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

function createComics() {
  Object.keys(comics).forEach( _key => {
      let comic = comics[_key];
      comics[_key] = new ComicInterval(_key, comic.title, comic.interval[0], comic.interval[1]);
  });
}

function createNodes() {
  Object.keys(heroes).forEach( _key => {
    let hero = heroes[_key];
    if (hero.hasOwnProperty('name')) {
      heroes[_key] = new Node(_key,hero.name, hero.thumbnail, hero.x, hero.y);
    }
  });
}

function createLinks() {
  Object.keys(links).forEach( _key => {
      let comicIds = links[_key];
      let ids = _key.split("_");
      let nodes = [heroes[ids[0]],heroes[ids[1]]];
      let temp = [];
      links[_key] = new Link(nodes, comicIds.map(id => comics[id]));
      heroes[ids[0]].addDegree();
      heroes[ids[1]].addDegree();
  });
}

function createIntervalTree() {
  Object.keys(comics).forEach( _key => {
    tree.insert(comics[_key]);
  });
  tree.balance();
}

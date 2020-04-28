function init(heroes) {    
  d3.select("svg")
    .append('g').attr('id', 'nodes')
    .selectAll('circle')
    .data(heroes)
    .enter()
    .append('circle')
    .attr('id', d =>  `h${d.id}`)
    .attr('cx', d => d.pos.x)
    .attr('cy', d => d.pos.y)
    .attr('r', d => d.getRadius())
    .attr('fill','#c8c8c8b4')
    .on('mouseover', handleMouseOver)
    .on('mouseout', (d, i) => {  
      d3.event.preventDefault();
          d3.select(`#h${d.id}`)
          .transition()
          .attr( 'fill', '#c8c8c8b4')
          .attr( 'r', d => d.getRadius());
          interact.select(null);
          
    d3.select('#nodes').selectAll('circle').filter( o => {
     return  o != d && o.pos.dist(d.pos) < 100; 
    }).transition()
    .attr( 'fill', '#c8c8c8b4')
    .attr( 'r', d => d.getRadius())
    .attr('cx', o => o.pos.x)
    .attr('cy', o => o.pos.y);
    });
    
   d3.select("svg").call(d3.zoom()
    .translateExtent([[0,0],[width,height]])
    .scaleExtent([1, 7])
    .on("zoom", zoomSVG));
}

function handleMouseOver(d) {
    d3.event.preventDefault();
    interact.select(d);
    d3.select(`#h${d.id}`)
      .transition()
      .attr( 'fill', "#ff0000b4")
      .attr( 'r', 2*d.getRadius());
    interact.selectedHero = d;
    d3.select('#nodes').selectAll('circle')
    .filter( o => {
     return  o != d && o.pos.dist(d.pos) < 100;
    }).transition()
    .attr( 'fill', '#c8c8c8b4')
    .attr( 'r', d => d.getRadius())
    .attr('cx', o =>  {
      let v = p5.Vector.sub(o.pos,d.pos);
      let mag = 50/pow(v.mag(),2);
      v.mult(mag);
      return p5.Vector.add(o.pos,v).x;
    })
    .attr('cy', o => {
      let v = p5.Vector.sub(o.pos,d.pos);
      let mag = 50/pow(v.mag(),2);
      v.mult(mag);
      return p5.Vector.add(o.pos,v).y;
    });
}

function D3() {
    d3.select('#nodes').selectAll('circle')
    .attr('visibility', d => tree.heroSet.has(d) ? 'visible' : 'hidden');
}
 
function zoomSVG() {
    let transform = d3.event.transform;
    d3.select("#nodes").selectAll('circle').attr("transform", transform);
    zoomCanvas(transform);
}

function zoomCanvas(transform) {
  if (interact.transform != transform) {
   interact.transform = transform;
   interact.needUpdate = true;
  }
}

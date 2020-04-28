const intervalWidth = 600;
const intervalHeight = 60;
const step = 5;
const monthYear = d3.timeFormat("%b %Y");
const margin = {top: 10, right: 20, bottom: 20, left: 20};
const x = d3.scaleLinear([UNIXMillis(1938,0,1), UNIXMillis(2021,0,1)], [margin.left, intervalWidth - margin.right]);
const comicCount = [];
const linkCount = [];
var y;
var brush;
var brushEl;
var intervalAxis;
var linkAxis;

function initAxes() {
  countComics();
  makeIntervalAxis();
}

function makeIntervalAxis() {
  intervalAxis = d3.select('svg').append("g").attr('id','intervalAxis')
      .attr("viewBox", [0, 0, intervalWidth, intervalHeight])
      .attr('width', intervalWidth)
      .attr('height', intervalHeight)
      .attr('transform',`translate(${0.5*width} ${500})`); //position
      
  var xAxis = g => g
    .attr("transform", `translate(0,${intervalHeight - margin.bottom})`)
    .call(
      d3.axisBottom(x)
        .ticks(12)
        .tickFormat(d3.timeFormat("%Y")) 
    );
 
  intervalAxis.append("g").attr("id", "intervalPlot")
    .append("path")
      .datum(comicCount)
      .attr("fill", "none")
      .attr("stroke", "#aa0000")
      .attr("stroke-width", 2)
      .attr("d", d3.line()
        .x((d,i) => x(UNIXMillis(1940 + step*i,0,1)))
        .y(d => (intervalHeight - y(d))));
 
  brush = d3.brushX()
      .extent([[margin.left, margin.top], [intervalWidth - margin.right, intervalHeight - margin.bottom]])
      .on("start brush end", brushed);
      //.on("end", () => {interact.needUpdate = true;});

  intervalAxis.append("g").attr('id', 'intervalBottomAxis')
      .call(xAxis);
  
  intervalAxis.append('text')
      .attr('id', 'axisDate')
      .attr("x", intervalWidth)
      .attr("y", intervalHeight + margin.bottom + 5)
      .attr('text-anchor','end')
      .attr("font-family", "sans-serif")
      .attr("font-size", "20px");
   
   intervalAxis.append('g').attr('id','buttons');
   makeButtons();

  brushEl = intervalAxis.append("g").attr('id','intervalBrush')
      .call(brush)
      .call(brush.move, [UNIXMillis(1938,0,1), UNIXMillis(1938,0,1)].map(x));  
  
  intervalTransition(GOLDEN_AGE);
}

function makeButtons() {
  let defs = intervalAxis.append('defs');
  let m1 = defs.append('mask').attr('id','goldenAge');
  let m2 = defs.append('mask').attr('id','silverAge');
  let m3 = defs.append('mask').attr('id','bronzeAge');
  let m4 = defs.append('mask').attr('id','modernAge');
  makeButton(m1,'I','#goldenAge',GOLDEN_AGE);
  makeButton(m2,'II','#silverAge',SILVER_AGE);
  makeButton(m3,'III','#bronzeAge',BRONZE_AGE);
  makeButton(m4,'IV','#modernAge',MODERN_AGE);
  d3.select("#buttons").selectAll("*").attr('transform', (b,i) => `translate(${i*60 + 15} ${intervalHeight + 5})`);
}

function makeButton(mask,label,id,interval) {
  mask.append('rect')
  .attr('width',30)
  .attr('height',30)
  .attr('fill','white');
  
  mask.append('text')
  .attr('alignment-baseline','central')
  .attr('text-anchor','middle')
  .attr('x',15).attr('y',15)
  .attr("font-family", "serif")
  .attr("font-size", "20px")
  .attr('fill','black')
  .text(label);
  
  return d3.select('#buttons')
     .append('circle')
     .attr('mask',`url(${id})`)
     .attr("cx", 15).attr("cy", 15).attr('r' , 15)
     .attr('fill','#444')
     .on('click', () => {intervalTransition(interval);});
}

function intervalTransition(interval) {
  brushEl.transition().duration(1500).call(brush.move, interval.toArray().map(x=> x*1000).map(x));  
}

function brushed() {
    let selection = d3.event.selection;
    if (selection) {
      let sx = selection.map(x.invert);      
      interact.updateInterval(sx[0]/1000,sx[1]/1000);
      intervalAxis.select('#axisDate').text(`${monthYear(sx[0])} - ${monthYear(sx[1])}`);
    }
}

/**
returns unix time of a date in seconds. 
*/
function UNIX(year,month,day) {
  return Math.round(new Date(year,month,day).getTime()/1000);
}
/**
returns unix time of a date in milliseconds. 
*/
function UNIXMillis(year,month,day) {
  return Math.round(new Date(year,month,day).getTime());
}

/**
call in on init. quickly finds the number of comics in each year 
and saves that data to comicCount.
*/
function countComics() {
  let maxTime = new Date().getTime();
  for (let i = 1940; i <= 2020; i+= step) {
    let year = new Interval(UNIX(i-step-1,11,31),UNIX(i,0,1));
    tree.setInterval(year);
    comicCount.push(tree.comicSet.size);
  }
  y = d3.scaleLinear([0, max(comicCount)], [margin.bottom, intervalHeight- margin.top]);
}

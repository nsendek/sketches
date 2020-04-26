var axisWidth = 600;
var axisHeight = 60;
var brush;
var brushEl;
var svgAxis;

const margin = {top: 10, right: 20, bottom: 20, left: 20};
const x = d3.scaleLinear([UNIXMillis(1938,0,1), UNIXMillis(2021,0,1)], [margin.left, axisWidth - margin.right]);
var y;
const step = 5;

function initAxis() {
  var xAxis = g => g
    .attr("transform", `translate(0,${axisHeight - margin.bottom})`)
    .call(
      d3.axisBottom(x)
        .ticks(12)
        .tickFormat(d3.timeFormat("%Y")) 
    );


  svgAxis = d3.select('svg').append("g").attr('id','axis')
      .attr("viewBox", [0, 0, axisWidth, axisHeight])
      .attr('width', axisWidth)
      .attr('height', axisHeight)
      .attr('transform',`translate(${0.5*width} ${500})`);
 
  svgAxis.append("g")
    .append("path")
      .datum(comicCount)
      .attr("fill", "none")
      .attr("stroke", "#aa0000")
      .attr("stroke-width", 2)
      .attr("d", d3.line()
        .x((d,i) => x(UNIXMillis(1940 + step*i,0,1)))
        .y(d => (axisHeight - y(d)))
        );
 
  brush = d3.brushX()
      .extent([[margin.left, margin.top], [axisWidth - margin.right, axisHeight - margin.bottom]])
      .on("start brush end", brushed);
      //.on("end", brushed);

  svgAxis.append("g")
      .call(xAxis);

  brushEl = svgAxis.append("g")
      .call(brush)
      .call(brush.move, [UNIXMillis(1938,0,1), UNIXMillis(1938,0,1)].map(x));  
  
  brushEl.transition().duration(2000).call(brush.move, GOLDEN_AGE.toArray().map(x=> x*1000).map(x));
}

function brushed() {
    let selection = d3.event.selection;
    if (selection === null) {
      
    } else {
      let sx = selection.map(x.invert);
      interact.updateInterval(sx[0]/1000,sx[1]/1000);
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

const comicCount = [];
/**
call in the console. quickly finds the number of comics in each year 
and returns the array of data. save that data to comicCount.
*/
function countComics() {
  let maxTime = new Date().getTime();
  for (let i = 1940; i <= 2020; i+= step) {
    let year = new Interval(UNIX(i-step-1,11,31),UNIX(i,0,1));
    tree.setInterval(year);
    comicCount.push(tree.comicSet.size);
  }
  y = d3.scaleLinear([0, max(comicCount)], [margin.bottom, axisHeight- margin.top]);
}

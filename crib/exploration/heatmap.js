
// set the dimensions and margins of the graph
var margin = {top: 80, right: 25, bottom: 30, left: 40},
  width = 450 - margin.left - margin.right,
  height = 600 - margin.top - margin.bottom;

// append the svg object to the body of the page
var svg = d3.select("#heatmap")
.append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
.append("g")
  .attr("transform",
        "translate(" + margin.left + "," + margin.top + ")");

//Read the data
d3.csv("data/roundWinnerLoser.csv", function(data) {

  // Labels of row and columns -> unique identifier of the column called 'group' and 'variable'
  var myGroups = d3.map(data, function(d){return d.round;}).keys()
  var myVars = d3.map(data, function(d){return d.game;}).keys()

  // Build X scales and axis:
  var x = d3.scaleBand()
    .range([ 0, width ])
    .domain(myGroups)
    .padding(0.05);
  svg.append("g")
    .style("font-size", 15)
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x).tickSize(0))
    .select(".domain").remove()

  // Build Y scales and axis:
  var y = d3.scaleBand()
    .range([ height, 0 ])
    .domain(myVars)
    .padding(0.05);
  svg.append("g")
    .style("font-size", 15)
    .call(d3.axisLeft(y).tickSize(0))
    .select(".domain").remove()

  // Build color scale
  const hueScale = d3.scaleOrdinal()
  .domain(["Caitlin","Sarah","James","Colban","Darren"])
  .range(["#009E73", "#CC79A7", "#3FA7D6","#FAC05E","#EE6352"]);

  const vibrancyScale = d3.scaleLinear()
  .domain([0, d3.max(data, d => d.diff)])
  .range([0,1]);

  function colorScale(category, value) {
    const baseColor = hueScale(category);
    const t = vibrancyScale(value);

    // interpolate from grey → base color
    return d3.interpolateRgb("#f0f0f0", baseColor)(t);
  }

  // create textures to overlay
  const defs = svg.append("defs");

defs.append("pattern")
  .attr("id", "pattern-Caitlin")
  .attr("patternUnits", "userSpaceOnUse")
  .attr("width", 6)
  .attr("height", 6)
  .append("path")
  .attr("d", "M0,0 L0,6")
  .attr("stroke", "#000")
  .attr("stroke-width", 1);

defs.append("pattern")
  .attr("id", "pattern-Sarah")
  .attr("patternUnits", "userSpaceOnUse")
  .attr("width", 6)
  .attr("height", 6)
  .append("path")
  .attr("d", "M0,6 L6,0")
  .attr("stroke", "#000")
  .attr("stroke-width", 1);

const p3 = defs.append("pattern")
  .attr("id", "pattern-James")
  .attr("patternUnits", "userSpaceOnUse")
  .attr("width", 8)
  .attr("height", 8);

   p3.append("circle")
  .attr("cx", 4)
  .attr("cy", 4)
  .attr("r", 1.5)
  .attr("fill", "#000");

  const p4 = defs.append("pattern")
  .attr("id", "pattern-Colban")
  .attr("patternUnits", "userSpaceOnUse")
  .attr("width", 6)
  .attr("height", 6);

  p4.append("path")
  .attr("d", "M0,0 L6,6 M6,0 L0,6")
  .attr("stroke", "#000")
  .attr("stroke-width", 1);

defs.append("pattern")
  .attr("id", "pattern-Darren")
  .attr("patternUnits", "userSpaceOnUse")
  .attr("width", 6)
  .attr("height", 6)
  .append("path")
  .attr("d", "M0,0 L6,0")
  .attr("stroke", "#000")
  .attr("stroke-width", 1);

  // create a tooltip
  var tooltip = d3.select("#heatmap")
    .append("div")
    .style("opacity", 0)
    .attr("class", "tooltip")
    .style("background-color", "white")
    .style("border", "solid")
    .style("border-width", "2px")
    .style("border-radius", "5px")
    .style("padding", "5px")

  // Three function that change the tooltip when user hover / move / leave a cell
  var mouseover = function(d) {
    tooltip
      .style("opacity", 1)
    d3.select(this)
      .style("stroke", "black")
      .style("opacity", 1)
  }
  var mousemove = function(d) {
    tooltip
      .html(d.winner + " is " + d.diff + " points ahead of " + d.loser)
      .style("left", (d3.mouse(this)[0]+70) + "px")
      .style("top", (d3.mouse(this)[1]) + "px")
  }
  var mouseleave = function(d) {
    tooltip
      .style("opacity", 0)
    d3.select(this)
      .style("stroke", "none")
      .style("opacity", 0.8)
  }

  // add the squares
  svg.selectAll()
    .data(data, function(d) {return d.round+':'+d.game;})
    .enter()
    .append("rect")
      .attr("x", function(d) { return x(d.round) })
      .attr("y", function(d) { return y(d.game) })
      .attr("rx", 4)
      .attr("ry", 4)
      .attr("width", x.bandwidth() )
      .attr("height", y.bandwidth() )
      .style("fill", function(d) { return colorScale(d.winner,d.diff)} )
      .style("stroke-width", 4)
      .style("stroke", "none")
      .style("opacity", 0.8)
    .append("rect")
        .attr("width", x.bandwidth())
        .attr("height", y.bandwidth())
        .attr("fill", `url(#pattern-${d.winner})`)
        .attr("opacity", 0.6)
    .on("mouseover", mouseover)
    .on("mousemove", mousemove)
    .on("mouseleave", mouseleave)
})

// Add title to graph
svg.append("text")
        .attr("x", 0)
        .attr("y", -50)
        .attr("text-anchor", "left")
        .style("font-size", "22px")
        .text("Winners and Losers");

// Add subtitle to graph
svg.append("text")
        .attr("x", 0)
        .attr("y", -20)
        .attr("text-anchor", "left")
        .style("font-size", "14px")
        .style("fill", "grey")
        .style("max-width", 400)
        .text("wow,so cool");

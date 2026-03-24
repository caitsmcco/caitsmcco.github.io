const svg = d3.select("svg");
const categories = ["p1","p2","p3","p4","p5"];
const hueScale = d3.scaleOrdinal()
  .domain(categories)
  .range(["#009E73","#E69F00","#56B4E9","#CC79A7","#D55E00"]);

const data = categories.map((cat,i) => ({category:cat,value:i+1}));

// Create bars with color + texture
svg.selectAll("g")
  .data(data)
  .enter()
  .append("g")
  .attr("transform",(d,i)=>`translate(${i*100 + 50},100)`)
  .each(function(d){
    const g = d3.select(this);
    g.append("rect")
      .attr("width",50)
      .attr("height", d.value*50)
      .attr("fill", hueScale(d.category));
    g.append("rect")
      .attr("width",50)
      .attr("height", d.value*50)
      .attr("fill", `url(#pattern-${d.category})`)
      .attr("opacity",0.6);
  });

// Legend
const legend = svg.append("g").attr("transform","translate(50,10)");
const items = legend.selectAll(".item")
  .data(categories)
  .enter()
  .append("g")
  .attr("transform",(d,i)=>`translate(${i*100},0)`);

items.append("rect").attr("width",18).attr("height",18).attr("fill",d=>hueScale(d));
items.append("rect").attr("width",18).attr("height",18).attr("fill",d=>`url(#pattern-${d})`).attr("opacity",0.6);
items.append("text").attr("x",22).attr("y",9).attr("dy","0.35em").text(d=>d);
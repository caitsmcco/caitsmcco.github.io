const defs = d3.select("svg").append("defs");

// Category textures
const categories = ["p1","p2","p3","p4","p5"];

const patterns = {
  p1: defs.append("pattern").attr("id","pattern-p1").attr("patternUnits","userSpaceOnUse").attr("width",6).attr("height",6),
  p2: defs.append("pattern").attr("id","pattern-p2").attr("patternUnits","userSpaceOnUse").attr("width",6).attr("height",6),
  p3: defs.append("pattern").attr("id","pattern-p3").attr("patternUnits","userSpaceOnUse").attr("width",8).attr("height",8),
  p4: defs.append("pattern").attr("id","pattern-p4").attr("patternUnits","userSpaceOnUse").attr("width",6).attr("height",6),
  p5: defs.append("pattern").attr("id","pattern-p5").attr("patternUnits","userSpaceOnUse").attr("width",6).attr("height",6)
};

// Draw shapes in patterns
patterns.p1.append("path").attr("d","M0,0 L0,6").attr("stroke","#000").attr("stroke-width",1); // vertical lines
patterns.p2.append("path").attr("d","M0,6 L6,0").attr("stroke","#000").attr("stroke-width",1); // diagonal
patterns.p3.append("circle").attr("cx",4).attr("cy",4).attr("r",1.5).attr("fill","#000"); // dots
patterns.p4.append("path").attr("d","M0,0 L6,6 M6,0 L0,6").attr("stroke","#000").attr("stroke-width",1); // crosshatch
patterns.p5.append("path").attr("d","M0,0 L6,0").attr("stroke","#000").attr("stroke-width",1); // horizontal
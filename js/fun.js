function fun() {
  const svg = document.getElementById('fun-svg');
  const button = document.getElementById('fun-btn');
  
  if (svg) {
    // SVG exists, remove it
    d3.select("#fun-svg").remove();
    document.getElementById('basic-container').style.display = 'block';
    document.getElementById('arrange-btn').style.display = 'none';
    button.textContent = 'Click me?';
  } else {
    // SVG doesn't exist, create it
    createProjectTopology();
    document.getElementById('basic-container').style.display = 'none';
    document.getElementById('arrange-btn').style.display = 'inline-block';
    button.textContent = 'Reduce fun';
  }
}

function getColorByLetter(name) {
  const colors = {
    'A': '#FF69B4', 'B': '#0000FF', 'C': '#00FFFF', 'D': '#8B008B', 'E': '#32CD32',
    'F': '#FF1493', 'G': '#008000', 'H': '#FF69B4', 'I': '#4B0082', 'J': '#32CD32',
    'K': '#F0E68C', 'L': '#32CD32', 'M': '#800000', 'N': '#000080', 'O': '#FFA500',
    'P': '#800080', 'Q': '#DDA0DD', 'R': '#FF0000', 'S': '#C0C0C0', 'T': '#008080',
    'U': '#9932CC', 'V': '#EE82EE', 'W': '#FFFFFF', 'X': '#FFFF00', 'Y': '#FFFF00',
    'Z': '#808080'
  };
  const firstLetter = name.charAt(0).toUpperCase();
  return colors[firstLetter] || '#69b3a2';
}

function createProjectTopology() {
  const projectsData = document.getElementById('projects-data');
  const projects = projectsData ? JSON.parse(projectsData.textContent) : [];
  
  if (projects.length === 0) return;

  const svg = d3.select("#fun-canvas-container")
    .append("svg")
    .attr("id", "fun-svg")
    .attr("width", "100%")
    .attr("height", "70vh")
    .style("background", "transparent")
    .style("border", "2px solid #666");

  const width = parseInt(svg.style("width"));
  const height = parseInt(svg.style("height"));
  
  // Create nodes with random positions
  const nodes = projects.map((d, i) => ({
    ...d,
    x: Math.random() * (width - 100) + 50,
    y: Math.random() * (height - 100) + 50
  }));

  // Create links between nodes
  const links = [];
  for(let i = 0; i < nodes.length - 1; i++) {
    links.push({ source: i, target: i + 1 });
  }
  if (nodes.length > 2) {
    links.push({ source: nodes.length - 1, target: 0 }); // Close the loop
  }

  // Draw links
  const linkElements = svg.selectAll(".link")
    .data(links)
    .enter().append("line")
    .attr("class", "link")
    .attr("x1", d => nodes[d.source].x)
    .attr("y1", d => nodes[d.source].y)
    .attr("x2", d => nodes[d.target].x)
    .attr("y2", d => nodes[d.target].y)
    .style("stroke", "#666")
    .style("stroke-width", 2);

  // Drag behavior
  let isDragging = false;
  const drag = d3.behavior.drag()
    .on("dragstart", () => { isDragging = false; })
    .on("drag", function(d) {
      isDragging = true;
      // Constrain to SVG boundaries
      d.x = Math.max(20, Math.min(width - 20, d3.event.x));
      d.y = Math.max(20, Math.min(height - 20, d3.event.y));
      d3.select(this).select("circle").attr("cx", d.x).attr("cy", d.y);
      d3.select(this).select("text").attr("x", d.x).attr("y", d.y + 35);
      
      // Update connected links
      linkElements.attr("x1", d => nodes[d.source].x)
        .attr("y1", d => nodes[d.source].y)
        .attr("x2", d => nodes[d.target].x)
        .attr("y2", d => nodes[d.target].y);
    });

  // Create node groups
  const nodeGroups = svg.selectAll(".node")
    .data(nodes)
    .enter().append("g")
    .attr("class", "node")
    .style("cursor", "move")
    .call(drag)
    .on("click", d => {
      if (!isDragging) {
        if(d.url.startsWith("http")) {
          window.open(d.url, "_blank");
        } else {
          window.location.href = d.url;
        }
      }
      isDragging = false;
    });

  // Add circles
  nodeGroups.append("circle")
    .attr("cx", d => d.x)
    .attr("cy", d => d.y)
    .attr("r", 20)
    .style("fill", d => getColorByLetter(d.name))
    .style("stroke", "#fff")
    .style("stroke-width", 2);

  // Add labels
  nodeGroups.append("text")
    .attr("x", d => d.x)
    .attr("y", d => d.y + 35)
    .attr("text-anchor", "middle")
    .style("fill", "black")
    .style("font-size", "12px")
    .text(d => d.name);
}

function arrangeNodes() {
  const svg = d3.select("#fun-svg");
  if (svg.empty()) return;
  
  const width = parseInt(svg.style("width"));
  const height = parseInt(svg.style("height"));
  const nodes = svg.selectAll(".node").data();
  
  // Calculate circle positions
  const centerX = width / 2;
  const centerY = height / 2;
  const radius = Math.min(width, height) * 0.3;
  
  nodes.forEach((d, i) => {
    const angle = (2 * Math.PI * i) / nodes.length;
    d.x = centerX + radius * Math.cos(angle);
    d.y = centerY + radius * Math.sin(angle);
  });
  
  // Store original positions for interpolation
  const originalNodes = nodes.map(d => ({ x: d.x, y: d.y }));
  
  // Animate nodes and links together
  svg.selectAll(".node")
    .transition()
    .duration(500)
    .tween("position", function(d, i) {
      const startX = originalNodes[i].x;
      const startY = originalNodes[i].y;
      const interpolateX = d3.interpolate(startX, d.x);
      const interpolateY = d3.interpolate(startY, d.y);
      
      return function(t) {
        // Update node position
        const currentX = interpolateX(t);
        const currentY = interpolateY(t);
        nodes[i].x = currentX;
        nodes[i].y = currentY;
        
        // Update visual elements
        d3.select(this).select("circle")
          .attr("cx", currentX)
          .attr("cy", currentY);
        d3.select(this).select("text")
          .attr("x", currentX)
          .attr("y", currentY + 35);
        
        // Update all links on each frame
        svg.selectAll(".link")
          .attr("x1", d => nodes[d.source].x)
          .attr("y1", d => nodes[d.source].y)
          .attr("x2", d => nodes[d.target].x)
          .attr("y2", d => nodes[d.target].y);
      };
    });
}

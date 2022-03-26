// import * as d3 from 'd3';

function loadKeywords(canID) {
  $("#kw-relationship").html("")
  let svg = d3.select('svg'),
    width = +svg.attr('width'),
    height = +svg.attr('height');

  const color = d3.scaleOrdinal(d3.schemeCategory20);

  const simulation = d3.forceSimulation()
    .force('link', d3.forceLink().id((d) => d.id))
    .force('charge', d3.forceManyBody().strength(20))
    .force('center', d3.forceCenter(width / 2, height / 2))
    .force('collisionForce', d3.forceCollide(22).strength(1).iterations(100).radius(40));

  var circle;

  d3.json('./data.json', function (error, graph) {
    if (error) throw error;

    let link = svg.append('g')
      .attr('class', 'links')
      .selectAll('line')
      .data(graph.links)
      .enter()
      .append('line')
      .attr('stroke-width', (d) => { return Math.sqrt(d.value); });

    let node = svg.append('g')
      .attr('class', 'nodes')
      .selectAll('g')
      .data(graph.nodes)
      .enter()
      .append('g');

    let weight = svg.append('g')
      .attr('class', 'weights')
      .selectAll('text')
      .data(graph.links)
      .enter()
      .append('text')
      .text(d => d.value)
      .attr('fill', 'red');

    circle = node.append('circle')
      .attr('r', d => {
        if (d.value < 10) return 5;
        if (d.value < 20) return 8;
        if (d.value < 30) return 12;
        if (d.value < 40) return 15;
        return 20;
      })
      .attr('fill', (d) => { return color(d.group); })
      .call(d3.drag()
        .on('start', dragstarted)
        .on('drag', dragged)
        .on('end', dragended));

    node.append('text')
      .text((d) => {
        return d.id + "(" + d.value + ")";
      })
      .attr('x', 6)
      .attr('y', 3);

    node.append('title')
      .text((d) => { return d.id; });

    simulation
      .nodes(graph.nodes)
      .on('tick', ticked);

    simulation.force('link')
      .links(graph.links);

    function ticked() {
      link
        .attr('x1', (d) => { return d.source.x; })
        .attr('y1', (d) => { return d.source.y; })
        .attr('x2', (d) => { return d.target.x; })
        .attr('y2', (d) => { return d.target.y; });

      node
        .attr('transform', (d) => {
          return "translate(" + d.x + "," + d.y + ")";
        });

      weight
        .attr('x', d => (d.source.x + d.target.x) / 2)
        .attr('y', d => (d.source.y + d.target.y) / 2);
    }
  });

  svg.call(d3.zoom()
    .extent([[0, 0], [width, height]])
    .scaleExtent([1, 8])
    .on("zoom", zoomed));

  function zoomed() {
    // const {transform} = d3.event;
    d = d3.event;
    // circle.attr("transform", (d) => { return "translate(" + d.x + "," + d.y + ")";});
  }


  function dragstarted(d) {
    if (!d3.event.active) simulation.alphaTarget(0.3).restart();
    d.fx = d.x;
    d.fy = d.y;
  }

  function dragged(d) {
    d.fx = d3.event.x;
    d.fy = d3.event.y;
  }

  function dragended(d) {
    if (!d3.event.active) simulation.alphaTarget(0);
    d.fx = null;
    d.fy = null;
  }
}

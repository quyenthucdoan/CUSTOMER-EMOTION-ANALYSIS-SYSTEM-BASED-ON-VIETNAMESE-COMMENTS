/* eslint-disable*/
import define1 from "./977b3955ade01e43@243.js";

export default function define(runtime, observer) {
  const main = runtime.module();
  let width = $("#divDashboardContainer").width();
  main.variable(observer("vizContainer")).define("vizContainer", ["d3v5", "DOM", "width", "data", "LDAvis"], function* (d3v5, DOM, width, data, LDAvis) {
    width = $("#divDashboardContainer").width() - 10;
    yield d3v5.select(DOM.element('div', { style: `width:${width}px;height:${750 * data.R / 30}px` }))
      .attr('id', 'ldavis_container1')
      .classed('ldavis_container', true)
      .node();
    new LDAvis('#ldavis_container1', data); 
  }
  );
  main.variable(observer("data")).define("data", ["d3v5"], function (d3v5) {
    return (
      d3v5.json(window.topicData)
    )
  });
  main.variable(observer("d3v5")).define("d3v5", ["require"], function (require) {
    return (
      require('d3@5')
    )
  });
  main.variable(observer("jq")).define("jq", ["require"], function (require) {
    return (
      require('jquery')
    )
  });
  const child1 = runtime.module(define1);
  main.import("LDAvis", child1);
  const child2 = runtime.module(define1);
  main.import("css", child2);
  // main.variable(observer()).define(["html", "css"], function (html, css) {
  //   return (
  //     html`<p>Styles</p>${css}`
  //   )
  // });
  // main.variable(observer("twId")).define("twId", function () {
  //   return (
  //     '984357313963274240'
  //   )
  // });
  // main.variable(observer("tweed")).define("tweed", ["fetchTweed", "twId"], function (fetchTweed, twId) {
  //   return (
  //     fetchTweed(twId, { cards: 'xhidden', dnt: true, conversation: 'xnone' })
  //   )
  // });
  return main;
}

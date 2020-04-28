var searchTool;
function setupSearch() {
  searchTool = new autoComplete({
  data: {
    src: () => Array.from(tree.heroSet),
    key: ["name", "id"],
    cache: false
  },
  sort: (a, b) => {
    if (a.name < b.name) {return -1;}
    if (a.name > b.name) {return 1;}
    return 0;
  },
  placeHolder: "Find Hero",
  selector: "#autoComplete",
  threshold: 0,
  debounce: 0,
  searchEngine: "loose",
  maxResults: 7,
  resultsList: {
        render: true,
        container: source => {
            source.setAttribute("id", "hero_list");
        },
        destination: document.querySelector("#inputContainer"),
        position: "afterend",
        element: "ul"
    },
    onSelection: feedback => {             // Action script onSelection event | (Optional)
        let hero = feedback.selection.value;
        interact.select(hero);
        let heroNode = d3.select(`#h${hero.id}`).attr('fill','red');
        d3.select("#autoComplete").node().value = "";
    }
}); 
}

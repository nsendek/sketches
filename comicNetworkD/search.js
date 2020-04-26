function setupAutoComplete() {
  const autoCompletejs = new autoComplete({
  data: {
    src: heroes,
    key: ["name", "id"],
    cache: true
  },
  sort: (a, b) => {
    if (a.name < b.name) {return -1;}
    if (a.name > b.name) {return 1;}
    return 0;
  },
  placeHolder: "Hero Search",
  selector: "#autoComplete",
  threshold: 0,
  debounce: 0,
  searchEngine: "loose",
  resultsList: {  
        render: true,
        container: source => {
            source.setAttribute("id", "food_list");
        },
        destination: document.querySelector("#autoComplete"),
        position: "afterend",
        element: "ul"
    },
    
    onSelection: feedback => {             // Action script onSelection event | (Optional)
        console.log(feedback.selection);
    }
});
  
}

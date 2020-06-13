$(document).ready(() => {
  const url = "https://en.wikipedia.org/w/api.php";

  // eslint-disable-next-line no-unused-vars
  $(".GIVEMERANDOMPAGEBUTTON").on("click", catFromDb => {
    const catParams = {
      action: "query",
      list: "categorymembers",
      cmtitle: "Category:Programming",
      cmlimit: "20",
      format: "json"
    };

    let catUrl = url + "?origin=*";
    Object.keys(catParams).forEach(
      key => (catUrl += "&" + key + "=" + catParams[key])
    );
    const randomPage = Math.floor(Math.random() * 20);

    $.ajax({
      url: catUrl,
      method: "GET"
    }).then(response => {
      const pickedPage = response.query.categorymembers[randomPage].title;
      renderKnowledge(pickedPage);
    });
  });

  function renderKnowledge(pickedPage) {
    const pageParams = {
      action: "query",
      titles: pickedPage,
      prop: "extracts",
      exintro: "",
      format: "json",
      explaintext: ""
    };

    let pageUrl = url + "?origin=*";
    Object.keys(pageParams).forEach(key => {
      pageUrl += "&" + key + "=" + pageParams[key];
    });

    $.ajax({
      url: pageUrl,
      method: "GET"
    }).then(response => {
      const pageId = Object.keys(response.query.pages)[0];
      const knowledgeToRender = response.query.pages[pageId].extract.replace(
        /\n/g,
        "<br>"
      );
      $(".renderhere").html(knowledgeToRender);
    });
  }

  $("#addSubject").on("click", () => {
    
    // $.ajax("/api/burgers", {
    //   type: "POST",
    //   data: newBurger
    // }).then(function() {
    //   location.reload();
    // });
  });
  
});

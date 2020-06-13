$(document).ready(() => {
  const url = "https://en.wikipedia.org/w/api.php";

  // eslint-disable-next-line no-unused-vars
  $("#randomPageFromWiki").on("click", () => {
    $.get("/api/categories").then(data => {
      const passedCat = data.category;
      findAPage(passedCat);
    });
  });

  function findAPage(passedCat) {
    const cmtitleInput = "Category:" + passedCat;
    const catParams = {
      action: "query",
      list: "categorymembers",
      cmtitle: cmtitleInput,
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
      retrieveAndRenderKnowledge(pickedPage);
    });
  }

  function retrieveAndRenderKnowledge(pickedPage) {
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
      const wikiPageA = `<p>Learn more at <a href="https://en.wikipedia.org/wiki/${pickedPage}">${pickedPage}</a></p>`;
      const pageId = Object.keys(response.query.pages)[0];
      const knowledgeToRender = response.query.pages[pageId].extract.replace(
        /\n/g,
        "<br>"
      );
      $(".randomPageTitle").text(pickedPage);
      $(".renderhere").html(knowledgeToRender);
      $(".randomPage").append(wikiPageA);
    });
    postPickedPage(pickedPage);
  }

  function postPickedPage(pickedPage) {
    $.post("api/page", {
      name: pickedPage
    });
  }

  $("#addSubject").on("click", () => {
    const categoryToPost = $("#subjectName").val();
    const cmtitleInput = "Category:" + categoryToPost;
    const validateParams = {
      action: "query",
      list: "categorymembers",
      cmtitle: cmtitleInput,
      cmlimit: "20",
      format: "json"
    };

    let validateUrl = url + "?origin=*";
    Object.keys(validateParams).forEach(key => {
      validateUrl += "&" + key + "=" + validateParams[key];
    });

    $.ajax({
      url: validateUrl,
      method: "GET"
    }).then(response => {
      const possibleError = response.query.categorymembers[0];
      // eslint-disable-next-line eqeqeq
      if (possibleError == null) {
        $(".addSubjectResponse").text(
          `We're sorry, but ${categoryToPost} isn't a valid category name.`
        );
        return;
        // eslint-disable-next-line no-else-return
      } else {
        $(".addSubjectResponse").text(`${categoryToPost} added to database.`);
        postCat(categoryToPost);
      }
    });
  });

  function postCat(categoryToPost) {
    $.post("api/category", {
      name: categoryToPost
    });
  }
  
});

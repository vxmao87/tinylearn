$(document).ready(() => {
  const url = "https://en.wikipedia.org/w/api.php";

  // eslint-disable-next-line no-unused-vars
  $("#randomPageFromWiki").on("click", () => {
    $(".randomPageTitle").text("");
    $(".renderHere").empty();
    $(".randomPageLink").empty();
    $.get("/api/category").then(data => {
      const passedCat = data.name;
      findAPage(passedCat);
    });
  });

  function findAPage(passedCat) {
    const cmtitleInput = "Category:" + passedCat;
    const catParams = {
      action: "query",
      list: "categorymembers",
      cmtitle: cmtitleInput,
      cmlimit: "75",
      format: "json"
    };

    let catUrl = url + "?origin=*";
    Object.keys(catParams).forEach(
      key => (catUrl += "&" + key + "=" + catParams[key])
    );

    $.ajax({
      url: catUrl,
      method: "GET"
    }).then(response => {
      let randomPage = Math.floor(
        Math.random() * response.query.categorymembers.length
      );
      let pickedPage = response.query.categorymembers[randomPage].title;
      while (
        pickedPage.startsWith("Portal:") ||
        pickedPage.startsWith("Category:")
      ) {
        randomPage = Math.floor(
          Math.random() * response.query.categorymembers.length
        );
        pickedPage = response.query.categorymembers[randomPage].title;
      }
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
      const wikiPageA = `Learn more at <a href="https://en.wikipedia.org/wiki/${pickedPage}">${pickedPage}</a>`;
      const pageId = Object.keys(response.query.pages)[0];
      const knowledgeToRender = response.query.pages[pageId].extract.replace(
        /\n/g,
        "<br>"
      );
      $(".randomPageTitle").text(pickedPage);
      $(".renderHere").html(knowledgeToRender);
      $(".randomPageLink").html(wikiPageA);
    });
    postPickedPage(pickedPage);
  }

  function postPickedPage(pickedPage) {
    $.post("api/page", {
      name: pickedPage
    });
  }

  $("#addSubject").on("click", () => {
    $(".addSubjectResponse").text("");
    const categoryToPost = $("#subjectName").val();
    $("#subjectName").val("");
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
    const rewrittenCategoryToPost = categoryToPost.replace(/ /g, "_");
    $.post("/api/category/add", {
      name: rewrittenCategoryToPost
    });
  }

  $(".col-sm-3").on("click", () => {
    $(".clickedPageTitle").text("");
    $(".renderClickedPageHere").empty();
    $(".clickedPageLink").empty();
    const clickedPage = $(this).attr("id");
    const pageParams = {
      action: "query",
      titles: clickedPage,
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
      const wikiPageA = `Learn more at <a href="https://en.wikipedia.org/wiki/${clickedPage}">${clickedPage}</a>`;
      const pageId = Object.keys(response.query.pages)[0];
      const knowledgeToRender = response.query.pages[pageId].extract.replace(
        /\n/g,
        "<br>"
      );
      $(".clickedPageTitle").text(clickedPage);
      $(".renderClickedPageHere").html(knowledgeToRender);
      $(".clickedPageLink").html(wikiPageA);
    });
  });
});

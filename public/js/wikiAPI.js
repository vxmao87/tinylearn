$(document).ready(() => {
    var url = "https://en.wikipedia.org/w/api.php"; 

    $(".GIVEMERANDOMPAGEBUTTON").on("click", function(catFromDb) {
        var catParams = {
            action: "query",
            list: "categorymembers",
            cmtitle: "Category:Programming",
            cmlimit: "20",
            format: "json"
        };

        var catUrl = url + "?origin=*";
        Object.keys(catParams).forEach(function(key){catUrl += "&" + key + "=" + catParams[key];});
        var randomPage = Math.floor(Math.random() * 20);

        $.ajax({
            url: catUrl,
            method: "GET"
        }).then(function (response) {
            var pickedPage = response.query.categorymembers[randomPage].title;
            renderKnowledge(pickedPage);
        });
    });
    
    function renderKnowledge(pickedPage) {
        var pageParams = {
            action: "query",
            titles: pickedPage,
            prop: "extracts",
            exintro: "",
            format: "json",
            explaintext: ""
        };

        var pageUrl = url + "?origin=*";
        Object.keys(pageParams).forEach(function(key){pageUrl += "&" + key + "=" + pageParams[key];});

        $.ajax({
            url: pageUrl,
            method: "GET"
        }).then(function (response) {
            var pageId = Object.keys(response.query.pages)[0];
            var knowledgeToRender = response.query.pages[pageId].extract.replace(/\n/g, '<br>');
            $(".renderhere").html(knowledgeToRender);
        });
    }
});
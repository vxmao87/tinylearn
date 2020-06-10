$(document).ready(() => {
    var url = "https://en.wikipedia.org/w/api.php"; 

    var params = {
        action: "query",
        list: "categorymembers",
        cmtitle: "Category:Physics",
        cmlimit: "20",
        format: "json"
    };

    url = url + "?origin=*";
    Object.keys(params).forEach(function(key){url += "&" + key + "=" + params[key];});

    fetch(url)
        .then(function (response) {
            return response.json();
        })
        .then(function(response) {
            console.log(response);
            var pages = response.query.categorymembers;
            for (var page in pages) {
                console.log(pages[page].title);
            }
    }).catch(function (error) {
        console.log(error);
    });
});
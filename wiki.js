$(document).ready(function () {
    $("#submit").click(function () {
        var searchInput = $("#searchInput").val();
        var url = generateUrl(searchInput);
        wikiSearch(url);
        
    });

    $("#searchInput").keypress(function (e) {
        if (e.which == 13) {
            $("#submit").click();
        }
    });
    /*
    Program Flow:
    1. User clicks on "Submit" button
    2. Previous results(if any) are cleared
    3. API url generated
    4. Make API call to server and return with JSON object
    5. Display JSON content on webpage
    */
    function deleteResults() {
        $(".resultsBox").removeClass('resultsBox-active');
        $(".resultsBox").empty();
    }

    function wikiSearch(url) {
        deleteResults();
        getJSON(url);
    }

    function generateUrl(input) {
        return "https://en.wikipedia.org/w/api.php?action=opensearch&limit=10&namespace=0&format=json&search=" + input + "&callback=?";
    }

    function displayResults(results) {
        $(".resultsBox").toggleClass("resultsBox-active");
        for (i = 0; i < results[1].length; i++) {
            $(".resultsBox").append("<h3>" + results[1][i] + "</h3>");
            $(".resultsBox").append("<p>" + results[2][i] + "</p>");
            $(".resultsBox").append("<a target='#' href='" + results[3][i] + "'>Read More</a>");
        }
    }

    function getJSON(url) {
        $.getJSON(url, function (object) {
            displayResults(object);
        });
    }
});



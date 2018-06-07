
var toys = {
    "categories": ["Drones", "Motorcycles", "Cars", "Trucks", "Trains", "Guns", "Knives"],
    "addToToys": function (adder) {
        if (this.categories.indexOf(adder))
            this.categories.push(adder);
    }
}

$(document).ready(function () {

    let giphyKey = "QFC1NvPVBDrnQ8nYEEE7d4i9u8zaBAz3";

    function setupHtml() {
        $("#arrayButtonsId").empty();
        for (let i = 0; i < toys.categories.length; i++) {
            let newButton = $("<button>");
            newButton.text(toys.categories[i]);
            newButton.addClass("toyButton");
            $("#arrayButtonsId").append(newButton).end();
        }
    }

    function giphyRequest(subject) {
        $("#imgContainer").empty();
        let query = "https://api.giphy.com/v1/gifs/search?q=" + subject.toLowerCase() + "&api_key=" + giphyKey;
        // "http://api.giphy.com/v1/gifs/search?q=ryan+gosling&api_key=YOUR_API_KEY&limit=5"
        let imgRow = $("<div>");
        imgRow.attr("id", "gifRow1");
        imgRow.addClass("row");
        $("#imgContainer").append(imgRow).end();
        let rowCount = 1;
        $.ajax({
            url: query,
            method: "GET"
        }).then(function (response) {
            for (let i = 0; i < response.data.length; i++) {
                let newImgDiv = $("<div>");
                newImgDiv.addClass("col-lg-4 col-md-8 col-sm-10 col-xs-12 newImgDiv");
                let newSpan = $("<span>");
                newSpan.text("Rating: " + response.data[i].rating);
                newSpan.addClass("newSpan");
                newImgDiv.append(newSpan);
                let newImg = $("<img>");
                newImg.addClass("newImg");
                newImg.attr("src", response.data[i].images.fixed_width_still.url);
                newImg.attr("data-still", response.data[i].images.fixed_width_small_still.url); // still image
                newImg.attr("data-animate", response.data[i].images.fixed_width_small.url); // animated image
                newImg.attr("data-state", "still"); // set the image state
                newImg.attr("state", "image");                
                newImgDiv.append(newImg);
                $(imgRow).append(newImgDiv);
            }
        });
    }

    $(document).on("click", ".toyButton", function () {
        giphyRequest($(this).text());
    });

    $(document).on("click", "#toy-submit", function () {
        toys.addToToys($("#toy-input").val().trim());
        setupHtml();
        $("#toy-input").val("");
    })

    $(document).on("click", ".newImg", function () {
        if ($(this).attr("state") == "image") {
            $(this).attr("src", $(this).data("animate"));
            $(this).attr("state", "movie");
            return;
        }
        if ($(this).attr("state") == "movie") {
            $(this).attr("src", $(this).data("still"));
            $(this).attr("state", "image");
            return;
        }
    })

    setupHtml();
});
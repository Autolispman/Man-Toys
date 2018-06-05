
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
        console.log(query);
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
                //newImg.attr("image", response.data[i].images.fixed_height_still.url)
                //newImg.attr("movie", response.data[i].images.looping.mp4)
                //newImg.attr("movie", response.data[i].images.fixed_height.url)
                newImgDiv.append(newImg);
                $(imgRow).append(newImgDiv);
                //console.log(response.data[i].images.looping.mp4);
                //console.log(newImg);

            }
            console.log(response.data);
            //console.log(response.Runtime);
        });
    }



    $(document).on("click", ".toyButton", function () {
        giphyRequest($(this).text());
    });

    $(document).on("click", "#toy-submit", function () {
        toys.addToToys($("#toy-input").val().trim());
        //console.log(toys);
        setupHtml();
        $("#toy-input").val("");
    })

    $(document).on("click", ".newImg", function () {
        if ($(this).attr("state") == "image") {
            // let newIframe = $("<iframe>");
            // newIframe.attr("src", $(this).attr("movie"));
            // newIframe.attr("state", "movie")
            // newIframe.attr("image", $(this).attr("image"))
            // newIframe.attr("movie", $(this).attr("movie"))
            // newIframe.addClass(".newImg");
            // let parent = $(this).parent();
            // parent.empty();
            // parent.append(newIframe);
            $(this).attr("src", $(this).data("animate"));
            $(this).attr("state", "movie");
            return;
        }
        if ($(this).attr("state") == "movie") {
            // let newImg = $("<img>");
            // newImg.attr("src", $(this).attr("image"));
            // newImg.attr("state", "image")
            // newImg.attr("image", $(this).attr("image"))
            // newImg.attr("movie", $(this).attr("movie"))
            // newImg.addClass(".newImg");
            // let parent = $(this).parent();
            // parent.empty();
            // parent.append(newImg);
            $(this).attr("src", $(this).data("still"));
            $(this).attr("state", "image");
            return;
        }
    })

    setupHtml();
});

var toys = {
    "categories": ["Drones", "Motorcycles", "Cars", "Trucks", "Trains", "Guns", "Knives"],
    "addToToys": function(adder) {
        if(this.categories.indexOf(adder))
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
                // if (i > 0) {
                //     if (i % 4 === 0) {
                //         rowCount++;
                //         imgRow = $("<div>");
                //         imgRow.attr("id", "gifRow" + rowCount);
                //         imgRow.addClass("row");
                //         $("#imgContainer").append(imgRow);
                //     }
                // }
                let newImgDiv = $("<div>");
                newImgDiv.addClass("col-lg-4 col-md-8 col-sm-10 col-xs-12 newImgDiv");
                let newImg = $("<img>");
                newImg.addClass("newImg");
                newImg.attr("src", response.data[i].images.fixed_width_still.url);
                newImgDiv.append(newImg);
                $(imgRow).append(newImgDiv);
                //console.log(response.data);

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

    setupHtml();
});
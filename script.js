var clientId = "PCMP0XHAOEUBTKFSWSR4OZV3LWVOP15TUL5QLBPNG1G5HLFA";
var clientSecret = "C55FJGIOUSMMTTSRCANFNRSQBINF4A5OH0T1BEVYMURQGG2U";
var key = "XtQUs6317Ym4md9xenfZbTNgBR3u6Vjt";

var categoryType = "4d4b7105d754a06374d81259";

var foodSearch = "";
var locationSearch = "";
var priceChoice = "";
var theLat = "";
var theLng = "";


$(".dropdown-item").click(function (event) {
    categoryType = $(this).attr("value");
    $("#dropdownMenuLink").text($(this).attr("id"));
});


$("#submit").click(function (event) {
    $("#filterOutput").html("");
    event.preventDefault();

    locationSearch = $("#zipcode").val().trim();

    var urlLink = "https://api.foursquare.com/v2/venues/search?near=" + locationSearch + "&categoryId=" + categoryType + "&client_id=" + clientId + "&client_secret=" + clientSecret + "&v=20182107";

    $.ajax({
        url: urlLink,
        method: "GET"
    })
        .then(function (response) {
            var theCall = response.data;
            for (x = 0; x < response.response.venues.length; x++) {
                var theList = $("<button>");
                theList.addClass("userchoices");
                theList.attr("value", response.response.venues[x].id);
                $(theList).text(response.response.venues[x].name);
                $("#filterOutput").append(theList);
            };


$(".userchoices").click(function (event) {
    event.preventDefault();
    var urlTwo = "https://api.foursquare.com/v2/venues/" + this.value + "?&client_id=" + clientId + "&client_secret=" + clientSecret + "&v=20182107";
    console.log(event);
    $.ajax({
        url: urlTwo,
        method: "GET"
    })
        .then(function (response) {
            console.log(response);
            var resultsTwo = response.data;

            $("#info").html("");

            var cardDiv = $("<div>");
            var bestImg = $("<img>");
            var hoursInf = $("<p>");

            var name = $("<p>").text("Restaraunt Name: " + response.response.venue.name);
            var location = $("<p>").text("Location: " + response.response.venue.location.formattedAddress);

            theLat = response.response.venue.location.lat;
            theLng = response.response.venue.location.lng;

            $("#info").append(cardDiv);
            cardDiv.append(name);
            cardDiv.append(location);

            if (response.response.venue.hours) {
                if (response.response.venue.hours.isOpen === true) {
                    hoursInf.text("Its open! " + response.response.venue.hours.status);
                    cardDiv.append(hoursInf);
                }
                else if (response.response.venue.hours.isOpen === false) {
                    hoursInf.text("Its Closed. " + response.response.venue.hours.status);
                    cardDiv.append(hoursInf);
                }
            }

            else {
                hoursInf.text("No Hours Information Available.");
                cardDiv.append(hoursInf);
            }

            if (response.response.venue.bestPhoto) {
                bestImg.attr("src", response.response.venue.bestPhoto.prefix + "450" + "x" + "400" + response.response.venue.bestPhoto.suffix);
                cardDiv.append(bestImg);
            }

            else {
                bestImg = $("<p>");
                bestImg.text("NO IMAGE AVAILABLE");
                cardDiv.append(bestImg);
            }

            if (response.response.venue.menu) {
                var menu = $("<a>");
                menu.text("View Menu")
                menu.attr("href", response.response.venue.menu.url);
                menu.attr("target", "_blank");
                cardDiv.append(menu);
            }

            else {
                var menu = $("<p>");
                menu.text("NO MENU AVAILABLE");
                cardDiv.append(menu);
            }

            if (response.response.venue.url) {
                var venueUrl = $("<a>");
                venueUrl.attr("href", response.response.venue.url);
                venueUrl.attr("target", "_blank");
                venueUrl.text(response.response.venue.url);
                cardDiv.append(venueUrl);
            }
            secondAjax();
            });
        });
    })
});

function secondAjax() {
    $('#map').html("");
    var mapQuestLink = "https://www.mapquestapi.com/geocoding/v1/reverse?key=" + key + "&location=" + theLat + "," + theLng + "&outFormat=json&thumbMaps=true";
    console.log(mapQuestLink);

    $.ajax({
        url: mapQuestLink,
        method: "GET"
    })
        .then(function (response) {

            var thirdResponse = response.data;
            console.log(response);

            var theMap = $('<img>');
            theMap.addClass('userChoice-map');
            $(theMap).attr("src", response.results[0].locations[0].mapUrl); //check
            $(theMap).text(response.results[0].locations[0].street); //check
            $("#map").append(theMap);
        });
};
  
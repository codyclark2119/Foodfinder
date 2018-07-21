            var clientId = "PCMP0XHAOEUBTKFSWSR4OZV3LWVOP15TUL5QLBPNG1G5HLFA";
            var clientSecret = "C55FJGIOUSMMTTSRCANFNRSQBINF4A5OH0T1BEVYMURQGG2U";
            var foodSearch = "";
            var locationSearch = "";
            var priceChoice = "";
            var categoryType = "4d4b7105d754a06374d81259";
            
           
            $("#submit").click(function(event) {
                $("#filterOutput").html("");
                event.preventDefault();
                //foodSearch = $("#food-type").val().trim();
                locationSearch = $("#zipcode").val().trim();
                

                var urlLink = "https://api.foursquare.com/v2/venues/search?near=" + locationSearch + "&categoryId=" + categoryType + "&client_id=" + clientId + "&client_secret=" + clientSecret + "&v=20182107";

                console.log(locationSearch);


                $.ajax({
                    url: urlLink,
                    method: "GET"
                })
                    .then(function(response) {
                        
                        var results = response.data;
                        console.log(response);
                        for (x = 0; x < response.response.venues.length; x++) {
                            var theList = $("<div>");
                            theList.addClass("user-choices");
                            $(theList).text(response.response.venues[x].name);
                            $("#filterOutput").append(theList);
                        };
                });


            });
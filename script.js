<<<<<<< HEAD
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
                            var theList = $("<button>");
                            theList.attr("id", "userchoices");
                            theList.attr("value", response.response.venues[x].id);
                            $(theList).text(response.response.venues[x].name);
                            $("#filterOutput").append(theList);
                        };

                        $("#userchoices").click(function(event) {
                            event.preventDefault();
                            console.log(this.value);
            
                            var urlTwo = "https://api.foursquare.com/v2/venues/" + this.value + "?&client_id=" + clientId + "&client_secret=" + clientSecret + "&v=20182107";
            
                            $.ajax({
                                url: urlTwo,
                                method: "GET"
                            })
                                .then(function(response) {
                                console.log(response);
                                var resultsTwo = response.data;
                                for (x = 0; x < response.response.venues.length; x++) {
                
                                    var cardDiv = $("<div>");
                                    var name = $("<p>").text("Name: " + response.response.venues[x].name);
                                    var location = $("<p>").text("Location: " + response.response.venues[x].location);
                                    cardDiv.addClass("card");
                                    cardDiv.append(card);
                                    cardDiv.append(name);
                                    cardDiv.append(location);
            
                                $("#card").prepend(cardDiv);
                                }
                            })
                }); 
            });
        });
=======
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
>>>>>>> 5572d397ce8ef23e4f235256003321d5d553e6d1

'use strict';

$(document).ready(() => {

    let topics = ['geckos',
                'turtles',
                'sloths',
                'frogs'];

    function makeBtns() {
        $.map(topics, topic => {
            const animalBtns = $("<button>");
                animalBtns.addClass("animal-btn");
                animalBtns.attr("anml-name", topic);
                animalBtns.text(topic);
                animalBtns.val(topic);
                $("#animalButtons").append(animalBtns);
        });     
    }
    makeBtns();

    $("#addAnimal").on("click", e => {
        e.preventDefault();
        $("#animalButtons").empty();
        let topic = $("#animalInput").val().trim();
            topics.push(topic);
            makeBtns();
        });

    //POWERED BY GIPHY

    $(document).on("click", '.animal-btn', function(e) {
        e.preventDefault()
        $("#animals").empty();

        let data = ($(this).attr("anml-name"));
        let topic = data;
        let queryURL = "https://api.giphy.com/v1/gifs/search?q=" + topic + "&api_key=kt3AVxl1bzJdKflIKnVDdxqLJZS6gVAQ";
            $.ajax({
                url: queryURL,
                method: "GET"
            }).then(response => {
                //console.log(response);
                $("#animals").empty();
                $.map(response.data, gif => {
                    const animalTemplate = `<div class="grid-item">
                    <div id="singleGif">
                        <p class="rating"> Rating: ${(gif.rating).toUpperCase()}</p>
                        <img class="jpeg" data-jpeg_src="${gif.images.downsized_medium.url}" src="${gif.images.downsized_still.url}" alt="gif">
                    </div>
                        <div class="button-container">
                            <a href="${gif.source}" download><button id="download" class="download-button">Download</Button></a>
                            <button id="favorite" class="favorite-button">Favorite</Button>
                        </div>
                    </div>`;           
                    $("#animals").append(animalTemplate);
                });

                // $(document).on('click', '#favorite', () => {
                //     const faveGifs = JSON.parse(localStorage.getItem('faveGifs')) || [];
                    
                //         const favoriteAnimalTemplate = `<div class="grid-item">
                //         <p class="rating"> Rating: </p>
                //         <img class="jpeg" data-jpeg_src="" src="" alt="gif">
                //                     <div class="button-container">
                //                     <button id="remove" class="remove-button">Remove</Button>
                //                     </div>
                //         </div>`;
                //         $(favoriteAnimalTemplate).clone().append('#favorite-gifs');
                //         localStorage.setItem('faveGifs', JSON.stringify(faveGifs))
                // });

                $(document).on('click', '#favorite', () => {
                    $('.grid-item').clone()
                        .append(`<div class="removal-button-container">
                        <button id="remove" class="remove-button">Remove</Button>
                        </div>`)
                        .appendTo('#favorite-gifs');
                    $('div').remove('.button-container');
                });

            });
    });

    $(document).on('mouseenter', '.jpeg', function() {
        $(this).data('img_src', $(this).attr('src'));
        $(this).attr('src', $(this).data('jpeg_src'));
    });

    $(document).on('mouseleave', '.jpeg', function() {
        $(this).attr('src', $(this).data('img_src'));
    });

});
    
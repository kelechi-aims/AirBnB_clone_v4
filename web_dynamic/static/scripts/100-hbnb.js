$(document).ready(function() {
    var selectedAmenities = {};
    var selectedStates = {};
    var selectedCities = {};

    $(document).on('change', "input[type='checkbox']", function() {
        var amenityID = $(this).data('id');
        var amenityName = $(this).data('name');
        if ($(this).prop('checked')) {
            selectedAmenities[amenityID] = amenityName;
        } else {
            delete selectedAmenities[amenityID];
        }
        var amenitiesList = Object.values(selectedAmenities).join(', ');
        $('.amenities h4').text('Selected Amenities: ' + amenitiesList);
    });

    // Listen for changes on state checkboxes
    $('.state-checkbox').change(function() {
        var stateID = $(this).data('id');
        var stateName = $(this).data('name');

        if ($(this).prop('checked')) {
            selectedStates[stateID] = stateName;
	} else {
            delete selectedStates[stateID];
	}

        // Update the <h4> tag with the list of selected states
	updateLocations();
    });

    // Listen for changes on city checkboxes
    $('.city-checkbox').change(function() {
        var cityID = $(this).data('id');
        var cityName = $(this).data('name');

        if ($(this).prop('checked')) {
	    selectedCities[cityID] = cityName;
	} else {
            delete selectedCities[cityID];
	}

        // Update the <h4> tag with the list of selected states
        updateLocations();
    });

    // Function to update the Locations <h4> tag with selected states and cities
    function updateLocations() {
        var selectedLocations = Object.values(selectedStates).concat(Object.values(selectedCities)).join(', ');
        $('.locations h4').text('Selected Locations: ' + selectedLocations);
    }

    // Listen for click event on the Apply Filter button
    $('#button').click(function() {
        var checkedAmenities = [];
        $('.amenity-checkbox:checked').each(function() {
            checkedAmenities.push($(this).data('id'));
        });

        $.ajax({
            url: 'http://0.0.0.0:5001/api/v1/places_search/',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({
		'amenities': checkedAmenities,
	        'states': Object.keys(selectedStates),
	        'cities': Object.keys(selectedCities)
	    }),
            success: function(data) {
        // Loop through the response and create article tags for each place
                data.forEach(function(place) {
                var article = $('<article>');
                    article.append('<h2>' + place.name + '</h2><div class="price_by_night"><p>$' + place.price_by_night + '</p></div><div class="information"><div class="max_guest"><div class="guest_image"></div><p>' + place.max_guest + '</p></div><div class="number_rooms"><div class="bed_image"></div><p>' + place.number_rooms + '</p></div><div class="number_bathrooms"><div class="bath_image"></div><p>' + place.number_bathrooms + '</p></div></div><div class="description"><p>' + place.description + '</p></div></article>');

                $('.places').append(article);
		});
	    }
	});
    });

    $.get('http://0.0.0.0:5001/api/v1/status/', function(data) {
        if (data.status === 'OK') {
            $('#api_status').addClass('available');
        } else {
            $('#api_status').removeClass('available');
        }
    });
});

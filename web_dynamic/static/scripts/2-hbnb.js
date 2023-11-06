$(document).ready(function() {
    var selectedAmenities = {};

    $('.amenity-checkbox').change(function() {
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
    $.get('http://0.0.0.0:5001/api/v1/status/', function(data) {
	if (data.status === 'OK') {
            $('#api_status').addClass('available');
	} else {
            $('#api_status').removeClass('available');
	}
    });
});

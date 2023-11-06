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
});

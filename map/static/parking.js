
let parking_markers = [];
let parking_locations = [];

$.get('/parking', data => {
    parking_locations = data['results'];
    add_parking_markers();
});

function add_parking_markers() {
    for (let i in parking_locations) {
        let l = parking_locations[i];
        let circle = new L.circleMarker([l[1], l[2]], {
            color: 'blue',
            opacity: 0.5,
            weight: 2,
            fillColor: '#03f',
            fillOpacity: 0.5,
            radius: Math.max(l[3] / 20, 5)
        }).bindPopup(l[0] + ' (' + l[3] + ')').addTo(mymap);
        circle.on('mouseover', ev => {
            ev.target.openPopup();
        });
        circle.on('mouseout', ev => {
            ev.target.closePopup();
        });
        parking_markers.push(circle);
        mymap.addLayer(parking_markers[i]);
    }
}

$('#parkingCheck').change(() => {
    if ($('#parkingCheck').is(":checked")) {
        add_parking_markers();
    }
    else {
        remove_markers(parking_markers);
    }
});

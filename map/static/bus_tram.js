let bus_tram_markers = [];
let bus_tram_locations = [];

$.get('/bus_tram', data => {
    bus_tram_locations = data['results'];
    add_bus_tram_markers();
});

function add_bus_tram_markers() {
    for (let i in bus_tram_locations) {
        let l = bus_tram_locations[i];
        let circle = new L.circleMarker([l[1], l[2]], {
            color: 'purple',
            opacity: 0.5,
            weight: 2,
            fillColor: '#800080',
            fillOpacity: 0.5,
            radius: 15
        }).bindPopup(l[0]).addTo(mymap);
        circle.on('mouseover', ev => {
            ev.target.openPopup();
        });
        circle.on('mouseout', ev => {
            ev.target.closePopup();
        });
        bus_tram_markers.push(circle);
        mymap.addLayer(bus_tram_markers[i]);
    }
}


$('#bus_tramCheck').change(() => {
    if ($('#bus_tramCheck').is(":checked")) {
        add_bus_tram_markers();
    }
    else {
        remove_markers(bus_tram_markers);
    }
});
let decheterie_markers = [];
let decheterie_locations = [];

$.get('/decheterie', data => {
    decheterie_locations = data['results'];
    add_decheterie_markers();
});

function add_decheterie_markers() {
    for (let i in decheterie_locations) {
        let l = decheterie_locations[i];
        let circle = new L.circleMarker([l[1], l[2]], {
            color: 'green',
            opacity: 0.5,
            weight: 2,
            fillColor: '#7cfc00',
            fillOpacity: 0.5,
            radius:10
        }).bindPopup(l[0]).addTo(mymap);
        circle.on('mouseover', ev => {
            ev.target.openPopup();
        });
        circle.on('mouseout', ev => {
            ev.target.closePopup();
        });
        decheterie_markers.push(circle);
        mymap.addLayer(decheterie_markers[i]);
    }
}


$('#decheterieCheck').change(() => {
    if ($('#decheterieCheck').is(":checked")) {
        add_decheterie_markers();
    }
    else {
        remove_markers(decheterie_markers);
    }
});
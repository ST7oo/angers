let sanitaire_markers = [];
let sanitaire_locations = [];

$.get('/sanitaire', data => {
    sanitaire_locations = data['results'];
    add_sanitaire_markers();
});

function add_sanitaire_markers() {
    for (let i in sanitaire_locations) {
        let l = sanitaire_locations[i];
        let circle = new L.circleMarker([l[1], l[2]], {
            color: 'deep pink',
            opacity: 0.5,
            weight: 2,
            fillColor: '#fc007c',
            fillOpacity: 0.5,
            radius: 15
        }).bindPopup(l[0]).addTo(mymap);
        circle.on('mouseover', ev => {
            ev.target.openPopup();
        });
        circle.on('mouseout', ev => {
            ev.target.closePopup();
        });
        sanitaire_markers.push(circle);
        mymap.addLayer(sanitaire_markers[i]);
    }
}


$('#sanitaireCheck').change(() => {
    if ($('#sanitaireCheck').is(":checked")) {
        add_sanitaire_markers();
    }
    else {
        remove_markers(sanitaire_markers);
    }
});
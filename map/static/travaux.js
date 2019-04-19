let travaux_markers = [];
let travaux_locations = [];

$.get('/travaux', data => {
    travaux_locations = data['results'];
    add_travaux_markers();
});

function add_travaux_markers() {
    for (let i in travaux_locations) {
        let l = travaux_locations[i];
        let circle = new L.circleMarker([l[1], l[2]], {
            color: 'orange',
            opacity: 0.5,
            weight: 2,
            fillColor: '#ffa500',
            fillOpacity: 0.5,
            radius:10
        }).bindPopup(l[0]).addTo(mymap);
        circle.on('mouseover', ev => {
            ev.target.openPopup();
        });
        circle.on('mouseout', ev => {
            ev.target.closePopup();
        });
        travaux_markers.push(circle);
        mymap.addLayer(travaux_markers[i]);
    }
}


$('#travauxCheck').change(() => {
    if ($('#travauxCheck').is(":checked")) {
        add_travaux_markers();
    }
    else {
        remove_markers(travaux_markers);
    }
});
let incendie_markers = [];
let incendie_locations = [];

$.get('/borne_incendie', data => {
    incendie_locations = data['results'];
    add_incendie_markers();
});

function add_incendie_markers() {
    for (let i in incendie_locations) {
        let l = incendie_locations[i];
        let circle = new L.circleMarker([l[1], l[2]], {
            color: 'red',
            opacity: 0.5,
            weight: 2,
            fillColor: '#f03',
            fillOpacity: 0.5,
            radius: Math.max(l[3] / 30, 2)
        }).bindPopup(l[0] + ' (' + l[3] + ')').addTo(mymap);
        circle.on('mouseover', ev => {
            ev.target.openPopup();
        });
        circle.on('mouseout', ev => {
            ev.target.closePopup();
        });
        incendie_markers.push(circle);
        mymap.addLayer(incendie_markers[i]);
    }
}


$('#incendieCheck').change(() => {
    if ($('#incendieCheck').is(":checked")) {
        add_incendie_markers();
    }
    else {
        remove_markers(incendie_markers);
    }
});
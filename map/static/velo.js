
let velo_markers = [];
let velo_locations = [];

$.get('/stations_velo', data => {
    velo_locations = data['results'];
    add_velo_markers();
});

function add_velo_markers() {
    for (let i in velo_locations) {
        let l = velo_locations[i];
        let circle = new L.circleMarker([l[1], l[2]], {
            color: 'violet',
            opacity: 0.5,
            weight: 2,
            fillColor: '#b500fc',
            fillOpacity: 0.5,
            radius: Math.max(l[3] / 10, 5)
        }).bindPopup(l[0] + ' (' + l[3] + ')').addTo(mymap);
        circle.on('mouseover', ev => {
            ev.target.openPopup();
        });
        circle.on('mouseout', ev => {
            ev.target.closePopup();
        });
        velo_markers.push(circle);
        mymap.addLayer(velo_markers[i]);
    }
}

$('#veloCheck').change(() => {
    if ($('#veloCheck').is(":checked")) {
        add_velo_markers();
    }
    else {
        remove_markers(velo_markers);
    }
});

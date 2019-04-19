console.log('start');

var mymap = L.map('mapid').setView([47.472895, -0.551205], 14);

L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox.streets',
    accessToken: 'pk.eyJ1Ijoic3Q3IiwiYSI6ImNqdW1naHp4cDI5cDAzeXFqNnZpODFtYjQifQ.B0h543NPmKC5wyTROAf2rQ'
}).addTo(mymap);


function remove_markers(markers) {
    for (let i in markers) {
        mymap.removeLayer(markers[i]);
    }
}

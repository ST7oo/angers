/*var locations = [
    ['Berges De Maine',	47.4791055266, -0.549642004596,	305.0],
	['Larrey',	47.4806370511, -0.554951239998,	28.0],
	['Moliere',	47.4746632156, -0.554276891798,	416.0],
	['Poissonnerie',	47.4732815436, -0.555937486434,	null],
	['Leclerc',	47.47144192, -0.54605608257,	235.0],
	['Mitterrand Rennes',	47.476608392, -0.550574131243,	133.0],
    ['Mitterrand Maine',	47.4772420234, -0.552025911935,	151.0],
    ['Republique',	47.4725623676, -0.554958380401,	383.0]
];
*/

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


const ui = new UI();
const map = L.map('map').setView([51.5072, -99.3739778], 1);
const markers = new L.layerGroup();
const userPosition = [];
const enlaceMapa = '<a href="http://openstreetmap.org">OpenStreetMap</a>';
L.tileLayer(
    'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; ' + enlaceMapa + ' Contributors',
    maxZoom: 18,
}).addTo(map);

getLocation();




function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        alert('Geolocation is not supported by this browser.');
    }
}

function showPosition(position) {
    if(userPosition.length === 0){
        userPosition.push(position.coords.latitude, position.coords.longitude);
    }
    const marker = L.marker([userPosition[0], userPosition[1]]).addTo(map);
    map.setView([userPosition[0],  userPosition[1]], 6);
    console.log(userPosition);
    callPlaces(userPosition[0], userPosition[1]);
}

function addMarkers(places){
    console.log(places)
    markers.clearLayers();
}


function callPlaces(lat, long){
    ui.places(lat,long)
        .then((response)=>{
            addMarkers(response.results.items);
        })
}
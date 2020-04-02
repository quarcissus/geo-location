
const ui = new UI();
const map = L.map('map').setView([51.5072, -99.3739778], 1);
var markers = new L.layerGroup();
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
    const popUptions = L.popup().setContent(`
            <p><b>Aqui estas tú</b></p>
    `);

    const pegMan = L.icon({
        iconUrl: '../icons/pegman.png',
        iconSize:     [20, 45], // size of the icon
        iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
        popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
    });

    const marker = L.marker([userPosition[0], userPosition[1]], {icon: pegMan}).addTo(map);
    marker.bindPopup(popUptions);
    map.setView([userPosition[0],  userPosition[1]],16);
    callPlaces(userPosition[0], userPosition[1]);
}

function addMarkers(places){
    markers.clearLayers();

    places.forEach((place)=>{
        // const opcionesPopUp = L.popup().setContent(`
        //         <p>Calle: ${calle}</p>
        //         <p><b>Regular: $${regular}</b></p>
        //         <p><b>Premium: $${premium}</b></p>
        //     `)
        const popUptions = L.popup().setContent(`
            <p><b>Lugar:</b> ${place.title}</p>
            <p><b>Distancia:</b> ${place.distance}</p>
        `);
        // const marker = new L.marker([
        //     parseFloat(latitude),
        //     parseFloat(longitude)

        const marker = new L.marker([
            parseFloat(place.position[0]),
            parseFloat(place.position[1])
        ]).bindPopup(popUptions);
        // ]).bindPopup(opcionesPopUp);
        markers.addLayer(marker);
    });

    markers.addTo(map);
}


function callPlaces(lat, long){
    ui.places(lat,long)
        .then((response)=>{
            addMarkers(response.results.items);
        })
}

function creatIcon(){
    
}
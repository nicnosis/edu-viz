var map = L.map('map').setView([38.61687, -98.58032], 7);
var Esri_WorldTopoMap = L.tileLayer('http://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}', {
    maxZoom: 19,
    attribution: 'Tiles &copy; Esri;'
}).addTo(map);

// Globals
var lats  = [],
    longs = [];

// Initial viz
$(document).ready(function() {

    d3.csv ("MERGED2013_PP.csv", function(error, data) {

        data = data.filter(function(d) {return d.STABBR == "KS"}); //Filter on state

        data.forEach(function(d) {
            d.LATITUDE = +d.LATITUDE;
            d.LONGITUDE = +d.LONGITUDE;

            if (!isNaN(d.LATITUDE) && !isNaN(d.LONGITUDE)) {
                lats.push(d.LATITUDE);
                longs.push(d.LONGITUDE);
            }
        });

        console.log(lats + ", " + longs);
    });
});


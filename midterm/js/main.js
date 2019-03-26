/* =====================
Leaflet Configuration
===================== */

var map = L.map('map', {
  center: [39.99, -75.20],
  zoom: 12
});

// Try some differnet basemaps:
basemapURL = "http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png";
//basemapURL = "http://tile.stamen.com/watercolor/{z}/{x}/{y}.jpg"
//basemapURL = "http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//basemapURL = "http://stamen-tiles-{s}.a.ssl.fastly.net/toner-lite/{z}/{x}/{y}.{ext}"
//basemapURL = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//basemapURL ="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png";


var Stamen_TonerLite = L.tileLayer(basemapURL, {
// if you change the basemap, and publish it on the web, you should attribute accurately
  attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  subdomains: 'abcd',
  minZoom: 0,
  maxZoom: 20,
  ext: 'png'
}).addTo(map);

$(".select").hide();
$(".slidecontainer").hide();
$(".slide4").hide();
$(".slide3").hide();
$(".slide2").hide();
function polystyle(feature) {
    return {
        color: "black",
        weight: 0.5,  //Outline color
        opacity: 0.5
    };
}
policelayer = L.geoJSON(policedistrict,{style:polystyle}).addTo(map);

//slider1 select shooitng year 2015,2016,2017
var shootings2015 = [];
var shootings2016 = [];
var shootings2017 = [];
for (i = 0; i < shootingsGeoJson.features.length; i++) {
    if (shootingsGeoJson.features[i]['properties']['year'] == 2015)  {
      shootings2015.push(shootingsGeoJson.features[i]);
    }};

for (i = 0; i < shootingsGeoJson.features.length; i++) {
    if (shootingsGeoJson.features[i]['properties']['year'] == 2016)  {
      shootings2016.push(shootingsGeoJson.features[i]);
        }};

for (i = 0; i < shootingsGeoJson.features.length; i++) {
    if (shootingsGeoJson.features[i]['properties']['year'] == 2017)  {
       shootings2017.push(shootingsGeoJson.features[i]);
            }};

var shooting2015 = L.geoJson(shootings2015, {
   pointToLayer: function (feature, latlng) {
     return L.circleMarker(latlng,{
    radius:4, //expressed in pixels
    color: "yellow", //black outline
    weight: 0.2, //outline width
    opacity: 0.2, //line opacity
    });
  },
  onEachFeature: function (feature, layer) {
          layer.bindPopup("<strong>wound positon :</strong>"+feature.properties.wound);}
  }).addTo(map);

map.removeLayer(shooting2015)

function doalert(myCheck1) {
    if (myCheck1.checked) {
      shooting2015.addTo(map);
    } else {
     map.removeLayer(shooting2015);
   }};

var shooting2016 = L.geoJson(shootings2016, {
     pointToLayer: function (feature, latlng) {
       return L.circleMarker(latlng,{
      radius:4, //expressed in pixels
      color: "green", //black outline
      weight: 0.2, //outline width
      opacity: 0.2, //line opacity
      });
    },
    onEachFeature: function (feature, layer) {
            layer.bindPopup("<strong>wound positon :</strong>"+feature.properties.wound);}
    }).addTo(map);
map.removeLayer(shooting2016)
function doalert2(myCheck2) {
  if (myCheck2.checked) {
      shooting2016.addTo(map);
      } else {
         map.removeLayer(shooting2016);
        }
      }

var shooting2017 = L.geoJson(shootings2017, {
    pointToLayer: function (feature, latlng) {
      return L.circleMarker(latlng,{
      radius:4, //expressed in pixels
      color: "red", //black outline
      weight: 0.2, //outline width
      opacity: 0.2, //line opacity
          });
        },
     onEachFeature: function (feature, layer) {
           layer.bindPopup("<strong>wound positon :</strong>"+feature.properties.wound);}
        }).addTo(map);

map.removeLayer(shooting2017)

function doalert3(myCheck3) {
if (myCheck3.checked) {
      shooting2017.addTo(map);
    } else {
      map.removeLayer(shooting2017);
      }}

$("#next1").click(function() {
  $(".slide1").hide();
  $(".slide2").show();
  map.removeLayer(shooting2017);
  map.removeLayer(shooting2016);
  map.removeLayer(shooting2015);
});

// slide2: fatal/no-fatal shooting in 2017
$("#previous1").click(function() {
  $(".slide1").show();
  $(".slide2").hide();
})

function getColor(f) {
 return f == 1 ? 'red' :
 f  == 0 ? "#0000ff" : //blue
 "#FFFFFF"; }//white}

var onlyfatal = [];
var nonfatal = [];
for (i = 0; i < shootings2017.length; i++) {
    if (shootings2017[i]['properties']['fatal'] == 1)  {
      onlyfatal.push(shootings2017[i]);}};
for (i = 0; i < shootings2017.length; i++) {
    if (shootings2017[i]['properties']['fatal'] == 0)  {
        nonfatal.push(shootings2017[i]);}};

var onlyfatalmap = L.geoJson(onlyfatal, {
    pointToLayer: function (feature, latlng) {
    return L.circleMarker(latlng,{
      radius:5, //expressed in pixels
      color: "red", //black outline
              weight: 0.2, //outline width
              opacity: 1, //line opacity
               });
              },
              onEachFeature: function (feature, layer) {
                layer.bindPopup(feature.properties.location);
                 }
                }).addTo(map);
map.removeLayer(onlyfatalmap);

function doalert4(myCheck4) {
if (myCheck4.checked) {
      onlyfatalmap.addTo(map);
    } else {
      map.removeLayer(onlyfatalmap);
      }}

var nonfatalmap = L.geoJson(nonfatal, {
          pointToLayer: function (feature, latlng) {
          return L.circleMarker(latlng,{
            radius:4, //expressed in pixels
            color: "blue", //black outline
            weight: 0.2, //outline width
          opacity: 0.8, //line opacity
    });},
      onEachFeature: function (feature, layer) {
          layer.bindPopup(feature.properties.location); }
            }).addTo(map);

map.removeLayer(nonfatalmap);
  function doalert5(myCheck5) {
      if (myCheck5.checked) {nonfatalmap.addTo(map);
          } else {
        map.removeLayer(nonfatalmap);}}

// slide3
$("#next2").click(function() {
  $(".slide2").hide();
  $(".slide3").show();
  $(".slidecontainer").hide();
  map.removeLayer(nonfatalmap);
  map.removeLayer(onlyfatalmap);
  map.setView([39.97, -75.19], 14)
});
$("#previous2").click(function() {
  $(".slide2").show();
  $(".slide3").hide();
    map.setView([39.99, -75.20], 12);
})

var slide3Filter = function(feature) {
  if (feature.properties.sex ==  $('#sel2').val()
&& feature.properties.race == $('#sel1').val())
  return true;
};
var featureGroup;
var shootingicon = L.icon({
    iconUrl: 'redicon.png',
    iconSize: [20, 20]// size of the icon// point from which the popup should open relative to the iconAnchor
});
var plotData = function() {
   featureGroup =  L.geoJSON(shootings2017,{
     filter : slide3Filter,
     pointToLayer: function (feature, latlng) {
            return L.marker(latlng, {icon: shootingicon});
     }}).addTo(map);
 };

var resetMap = function() {
  if (typeof featureGroup !== 'undefined'){
map.removeLayer(featureGroup)
    };
  };
var onsexChange = function() {
      resetMap();
      plotData();
    };

  var onSelectChange = function() {
      resetMap();
      plotData();
    };

var bindEvents = function() {
$('#sel2').keyup(onsexChange);
$('#sel1').change(onSelectChange);};

$(document).ready(function() {bindEvents()});

$("#next3").click(function() {
  $(".slide3").hide();
  $(".slide4").show();
  $(".slidecontainer").show();
resetMap();
  map.setView([39.99, -75.20], 12)
});

$("#previous2").click(function() {
  $(".slide3").hide();
  $(".slide2").show();
  resetMap();
    map.setView([39.99, -75.20], 12)
});

// change the age column to umber field
for (i = 0; i < shootings2017.length; i++) {
  shootings2017[i]['properties']['age']  =
   parseInt(shootings2017[i]['properties']['age'], 10);}

 var slider = document.getElementById("myRange");
 var output = document.getElementById("demo");
 output.innerHTML = slider.value;
 slider.oninput = function() {
   output.innerHTML = this.value;}

// filter the age with slider value

var yearFilter = function(feature) {
  if (feature.properties.age == slider.value)
  return true;
};
var featureGroup2;
var plotslider = function() {
       featureGroup2 =  L.geoJSON(shootings2017,{filter : yearFilter}).addTo(map);
     };
var resetMap2 = function() {
      if (typeof featureGroup2 !== 'undefined'){
    map.removeLayer(featureGroup2)
        };
      };
function doalert7(myRange) {
      resetMap2();
      plotslider();}
$("#previous3").click(function() {
        $(".slide4").hide();
        $(".slide3").show();
        $(".slidecontainer").hide();
        resetMap2();
        map.setView([39.97, -75.19], 14)
      });

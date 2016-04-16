function initMap() {
    var my_lat_lng={lat:0,lng:0};
    var map = new google.maps.Map(document.getElementById('map'), {
        center: my_lat_lng,
        zoom: 4,
        streetViewControl: false,
        //scaleControl:true,
        zoomControl:false,
        mapTypeControl:false,
        //scaleControl:true,
        mapTypeControlOptions: {
            mapTypeIds: ['archaevas']
        }
    });
    google.maps.event.addListener(map,"click",function(event){
        var clickLat = event.latLng.lat();
        var clickLon = event.latLng.lng();
        document.getElementById("lat_display").value=clickLat.toFixed(5);
        document.getElementById("lng_display").value=clickLon.toFixed(5);
    });
    var archaevasMapType=new google.maps.ImageMapType({
        getTileUrl: function(coord,zoom){
            var normalizedCoord= getNormalizedCoord(coord,zoom);
            if (!normalizedCoord){
                return null
            }
            var bound=Math.pow(2,zoom);

            return '/maptiles/archaevas_'+normalizedCoord.y+"-"+normalizedCoord.x+".jpeg";
        },
        tileSize:
            new google.maps.Size(538,433),
        maxZoom:4,
        minZoom:4,
        radius:5362944,
        name:'archaevas'
    });
    map.mapTypes.set('archaevas',archaevasMapType);
    map.setMapTypeId('archaevas');
}
function initMiniMap() {
    var lat=parseFloat(document.getElementById('lat_insert').innerHTML);
    var lng=parseFloat(document.getElementById('lng_insert').innerHTML);
    var my_mini_lat_lng={lat: lat,lng: lng}
    var mini_map = new google.maps.Map(document.getElementById('mini_map'), {
        center: my_mini_lat_lng,
        zoom: 4,
        streetViewControl: false,
        mapTypeControlOptions: {
            mapTypeIds: ['archaevas']
        }
    });
    //a single marker for the city.  Not so useful now, but later when I make a better world map w/o city titles on the images it will be.
    var city_marker=new google.maps.Marker({
        position:my_mini_lat_lng,
        map:mini_map,
        title:document.getElementById('city_name').innerHTML
    });

    mini_map.addListener('center_changed',function() {
        //Since the minimap is for the single city only, it always returns to the city.
        window.setTimeout(function(){
            mini_map.panTo(city_marker.getPosition());
        },5000);
    });
    var archaevasMapType=new google.maps.ImageMapType({
        getTileUrl: function(coord,zoom){
            var normalizedCoord= getNormalizedCoord(coord,zoom);
            if (!normalizedCoord){
                return null
            }
            var bound=Math.pow(2,zoom);
            return '/maptiles/archaevas_'+normalizedCoord.y+"-"+normalizedCoord.x+".jpeg";
        },
        tileSize:
            new google.maps.Size(538,433),
        maxZoom:4,
        minZoom:4,
        radius:5362944,
        name:'archaevas'
    })
    mini_map.mapTypes.set('archaevas',archaevasMapType);
    mini_map.setMapTypeId('archaevas');
}

// Normalizes the coords that tiles repeat across the x axis (horizontally)
// like the standard Google map tiles.
function getNormalizedCoord(coord, zoom) {
    //I found out that my filng naming convention was
    var y = coord.y;
    var x = coord.x;

    // tile range in one direction range is dependent on zoom level
    // 0 = 1 tile, 1 = 2 tiles, 2 = 4 tiles, 3 = 8 tiles, etc
    var tileRange = 1 << zoom;

    // don't repeat across y-axis (vertically)
    if (y < 0 || y >= tileRange) {
        return null;
    }

    // repeat across x-axis
    if (x < 0 || x >= tileRange) {
        x = (x % tileRange + tileRange) % tileRange;
    }

    return {x: x, y: y};
}

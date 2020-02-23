
const geolocQueryURL = "https://geocoder.ls.hereapi.com/6.2/geocode.json?apiKey=9wo4oIHk2RzJkQNEHEiGyvip9eBaZfyncovmOlXglE8&searchtext=";

function getGeoLocation(location) {
    let geoloc = fetch(geolocQueryURL + location)
        .then((res) => { return res.json(); })
        .then((loc)=>{return loc.Response.View[0].Result[0].Location.NavigationPosition[0]})
    return geoloc
}

function calcDistance(loc1, loc2) {
    let lat1 = loc1.Latitude, lon1 = loc1.Longitude;
    let lat2 = loc2.Latitude, lon2 = loc2.Longitude;
    if ((lat1 == lat2) && (lon1 == lon2)) {
        return 0;
    }
    else {
        var radlat1 = Math.PI * lat1/180;
        var radlat2 = Math.PI * lat2/180;
        var theta = lon1-lon2;
        var radtheta = Math.PI * theta/180;
        var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
        if (dist > 1) {
            dist = 1;
        }
        dist = Math.acos(dist);
        dist = dist * 180/Math.PI;
        dist = dist * 60 * 1.1515 * 1609.344; // in Meters
        return Math.round(dist);
    }
}

export {getGeoLocation, calcDistance};
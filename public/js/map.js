mapboxgl.accessToken = maptoken;
const map = new mapboxgl.Map({
    container: 'map',
    center: cordinates,
    zoom: 1,
});
const marker = new mapboxgl.Marker({ color: 'red', rotation: 0 })
    .setLngLat(cordinates)
    .addTo(map)
    .setPopup(new mapboxgl.Popup({offset: 25})
    .setHTML(locations)
    .addTo(map))

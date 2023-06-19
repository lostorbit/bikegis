// React
import { useEffect, useState } from 'react';

// Leaflet
import { MapContainer, TileLayer, useMap, Marker, Popup, GeoJSON } from 'react-leaflet'
import { LatLngTuple } from 'leaflet';
import 'leaflet/dist/leaflet.css';

export default async function MapTest() {

    const [cdMap, setCdMap] = useState<GeoJSON.FeatureCollection>();

    //
    // Dynamically load a map from somewhere (beacuse I can't get the direct file import to work lol)
    const cd_location = "/src/assets/cd.geojson";
    // const cd_map_remote = await fetch(cd_location)
    // .then(function(response) {
    //   return response.json();
    // }) as GeoJSON.FeatureCollection;

    // Dump what we got
    // console.log("cd_map", cd_map_remote)

    // Set the map
    useEffect(() => {
        async function getMapData(loc: string) {
            const cd_map_remote = await fetch(loc)
                .then(function(response) {
                    return response.json();
                }) as GeoJSON.FeatureCollection;
            setCdMap(cd_map_remote);
        }

        getMapData(cd_location);
        
    }, [cd_location]);

    // Set a default center location
    const mapCenter = [34.0982107,-118.2658979] as LatLngTuple;

    return (
        <>            
            <MapContainer center={mapCenter} zoom={13} scrollWheelZoom={false}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
                <GeoJSON data={cdMap} />
            </MapContainer>
        </>
    )
};
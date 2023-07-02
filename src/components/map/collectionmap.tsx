// React
import { useEffect, useState } from 'react';

// Leaflet
import { MapContainer, TileLayer, GeoJSON, LayerGroup, LayersControl, Marker, Popup, Circle, Rectangle, FeatureGroup} from 'react-leaflet'
import * as geojson from 'geojson';
import { LatLngTuple } from 'leaflet';
import 'leaflet/dist/leaflet.css';

import hash from 'object-hash';

interface MapProps {
    mapurl?: string;
}

const nullIsland = {type: "Point", coordinates: [0,0]} as geojson.GeoJsonObject;

export default function CollectionMap(props: MapProps) {

    const [collectionObject, setCollectionObject] = useState<geojson.FeatureCollection>();
    const [mapObjectBasic, setMapObjectBasic] = useState<geojson.GeoJsonObject>(nullIsland);

    //
    // Dynamically load a map from somewhere
    const cd_location = `/src/assets/${props.mapurl}.geojson`

    // Set the map
    useEffect(() => {

        const getMapData = async(loc: string) => {
            const cd_map_remote = await fetch(loc)
                .then(function(response) {
                    return response.json();
                }) as geojson.FeatureCollection;
            
            if (cd_map_remote.type !== "FeatureCollection") {
                console.log("Not a FeatureCollection, fallback to showing GeoJSON");
                setMapObjectBasic(cd_map_remote);
            }
            
            // set the map
            setCollectionObject(cd_map_remote);
            console.log("cd_map", cd_map_remote)
        }

        getMapData(cd_location).catch(console.error);

    }, []);

    // Set a default center location
    const mapCenter = [34.0982107,-118.2658979] as LatLngTuple;

    return (       
        <MapContainer center={mapCenter} zoom={13} scrollWheelZoom={false}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />


        <LayersControl position="topright">
            {collectionObject?.features.map(layer => {
                return(
                <LayersControl.Overlay name={layer.properties?.name}>
                    <GeoJSON key={hash(layer)} data={layer} />
                </LayersControl.Overlay>)
            })}
            </LayersControl>

            <LayerGroup>
                {mapObjectBasic === nullIsland && <GeoJSON key={hash(mapObjectBasic)} data={mapObjectBasic} />}
            </LayerGroup>
        </MapContainer>
    )
};
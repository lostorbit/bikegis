import { MapContainer, TileLayer, useMap, Marker, Popup } from 'react-leaflet'
import { LatLngTuple } from 'leaflet';

import 'leaflet/dist/leaflet.css';


export default function MapTest() {

    const position = [51.505, -0.09] as LatLngTuple;

    return(
        <MapContainer center={position} zoom={13} scrollWheelZoom={false}>
        <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <Marker position={position}>
            <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
            </Popup>
        </Marker>
        </MapContainer>
    )
};
// React
import { useEffect, useState } from "react";

// Leaflet
import {
  MapContainer,
  TileLayer,
  GeoJSON,
  LayerGroup,
  LayersControl,
  useMapEvents,
  Marker,
  Popup,
} from "react-leaflet";
import * as geojson from "geojson";
import { LatLngTuple, LatLng } from "leaflet";
import "leaflet/dist/leaflet.css";

import hash from "object-hash";

interface MapProps {
  mapurl?: string;
}

const nullIsland = {
  type: "Point",
  coordinates: [0, 0],
} as geojson.GeoJsonObject;

export default function CollectionMap(props: MapProps) {
  const [collectionObject, setCollectionObject] =
    useState<geojson.FeatureCollection>();

  const [mapObjectBasic, setMapObjectBasic] =
    useState<geojson.GeoJsonObject>(nullIsland);

  const [mapCenter, setMapCenter] = useState<LatLng>({
    lat: 34.0982107,
    lng: -118.2658979,
  } as LatLng);

  //
  // Grab the layer location from the URL
  const cd_location = `/src/assets/${props.mapurl}.geojson`;

  // Dynamically load the layer definitions from somewhere
  useEffect(() => {
    const getMapData = async (loc: string) => {
      const cd_map_remote = (await fetch(loc).then(function (response) {
        return response.json();
      })) as geojson.FeatureCollection;

      if (cd_map_remote.type !== "FeatureCollection") {
        console.log("Not a FeatureCollection, fallback to showing GeoJSON");
        setMapObjectBasic(cd_map_remote);
      }

      // set the map
      setCollectionObject(cd_map_remote);
      console.log("cd_map", cd_map_remote);
    };

    getMapData(cd_location).catch(console.error);
  }, []);

  function LocationMarker() {
    // Set a default center location
    const map = useMapEvents({
      click() {
        map.locate();
      },
      locationfound(e) {
        setMapCenter(e.latlng);
        map.flyTo(e.latlng, map.getZoom());
      },
    });

    return mapCenter === null ? null : (
      <Marker position={mapCenter}>
        <Popup>You are here</Popup>
      </Marker>
    );
  }

  return (
    <MapContainer center={mapCenter} zoom={13} scrollWheelZoom={true}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <LayersControl position="topright">
        {collectionObject?.features.map((layer) => {
          return (
            <LayersControl.Overlay name={layer.properties?.display_name}>
              <GeoJSON key={hash(layer)} data={layer} />
            </LayersControl.Overlay>
          );
        })}
      </LayersControl>

      <LayerGroup>
        {mapObjectBasic === nullIsland && (
          <GeoJSON key={hash(mapObjectBasic)} data={mapObjectBasic} />
        )}
      </LayerGroup>
      <LocationMarker />
    </MapContainer>
  );
}

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

import { createClient } from "@supabase/supabase-js";

import hash from "object-hash";

interface MapProps {
  mapurl?: string;
}

const nullIsland = {
  type: "Point",
  coordinates: [0, 0],
} as geojson.GeoJsonObject;

const supabase = createClient(
  "https://yakzxovozmconjttabsy.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inlha3p4b3Zvem1jb25qdHRhYnN5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTc5MDk1ODAsImV4cCI6MjAxMzQ4NTU4MH0.rOjV6xncSwa1d6pMO66jOTo618oavheOEu-IXc8BD9E"
);

export default function DynamicMap(props: MapProps) {
  //
  // Collection object of what the map displays
  const [collectionObject, setCollectionObject] =
    useState<geojson.FeatureCollection>();

  // Set a default center location, somewhere relevant to the users of this map
  const [mapCenter, setMapCenter] = useState<LatLng>({
    lat: 34.0982107,
    lng: -118.2658979,
  } as LatLng);

  // Get the geojson features from the database
  async function getGeoFeatures() {
    // Query supabase for the features, filtering on the mapurl
    const { data, error } = await supabase
      .from("regions")
      .select("title, geojson, category, region_categories!inner(name)")
      .eq("region_categories.name", props.mapurl);

    if (error) console.log("error", error);
    console.log("data:", data);

    // Build the featureCollection object
    const featureCollection = {
      type: "FeatureCollection",
      name: "Neighborhood_Councils_(Certified)",
      crs: {
        type: "name",
        properties: { name: "urn:ogc:def:crs:OGC:1.3:CRS84" },
      },
      features: [],
    } as geojson.FeatureCollection;

    // Assigne features from database to featureCollection object
    featureCollection.features = data?.map(
      (d) => d.geojson
    ) as geojson.Feature[];

    // Set the collection object for use
    setCollectionObject(featureCollection);
  }

  // Get the geojson features from the database
  useEffect(() => {
    getGeoFeatures().catch(console.error);
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
      <LocationMarker />
    </MapContainer>
  );
}

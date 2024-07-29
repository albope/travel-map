// src/components/MapComponent.jsx
import React, { useEffect } from 'react';
import { MapContainer, TileLayer, GeoJSON, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import countryData from '../data/countries.json';
import L from 'leaflet';

const SetBounds = ({ data }) => {
  const map = useMap();

  useEffect(() => {
    if (data) {
      const bounds = L.geoJSON(data).getBounds();
      map.fitBounds(bounds);
    }
  }, [map, data]);

  return null;
};

const MapComponent = () => {
  const onEachCountry = (country, layer) => {
    const countryName = country.properties.ADMIN;
    layer.bindPopup(countryName);
    layer.on({
      click: () => {
        layer.setStyle({
          fillColor: '#00ff00',
          fillOpacity: 0.5,
        });
      },
    });
  };

  return (
    <div className="h-full w-full">
      <MapContainer
        center={[20, 0]}
        zoom={2}
        style={{ height: '100%', width: '100%' }}
        className="leaflet-container"
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          noWrap={true}
        />
        <GeoJSON data={countryData.features} onEachFeature={onEachCountry} />
        <SetBounds data={countryData.features} />
      </MapContainer>
    </div>
  );
};

export default MapComponent;
// src/components/MapComponent.jsx
import React from 'react';
import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import countryData from '../data/countries.json';

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
    <div className="map-wrapper">
      <MapContainer
        center={[20, 0]}
        zoom={3}
        style={{ height: '500px', width: '100%' }}
        className="leaflet-container"
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <GeoJSON data={countryData.features} onEachFeature={onEachCountry} />
      </MapContainer>
    </div>
  );
};

export default MapComponent;
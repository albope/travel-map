// src/components/MapComponent.jsx
import React, { useEffect } from 'react';
import { MapContainer, TileLayer, GeoJSON, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import countryData from '../data/countries.json';
import L from 'leaflet';

const SetInitialView = ({ center, zoom }) => {
  const map = useMap();
  useEffect(() => {
    map.setView(center, zoom);
  }, [map, center, zoom]);
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

  const center = [30, 10]; // Ajusta las coordenadas del centro aquí
  const zoom = 3.5; // Ajusta el nivel de zoom aquí

  return (
    <div className="h-screen w-full">
      <MapContainer
        center={center}
        zoom={zoom}
        style={{ height: '200%', width: '100%' }}
        className="leaflet-container"
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <GeoJSON data={countryData.features} onEachFeature={onEachCountry} />
        <SetInitialView center={center} zoom={zoom} />
      </MapContainer>
    </div>
  );
};

export default MapComponent;
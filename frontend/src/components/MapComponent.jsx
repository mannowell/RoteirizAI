import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { useEffect } from 'react';

// Fix for default marker icons in Leaflet + React
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: markerIcon,
    shadowUrl: markerShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});
L.Marker.prototype.options.icon = DefaultIcon;

// Helper to recenter map when coords change
const RecenterMap = ({ coords }) => {
    const map = useMap();
    useEffect(() => {
        if (coords) map.setView([coords.lat, coords.lon], 13);
    }, [coords]);
    return null;
};

const MapComponent = ({ coords, destination }) => {
    if (!coords) return (
        <div className="h-[300px] w-full bg-white/5 rounded-2xl flex items-center justify-center border border-white/10 text-white/20 italic">
            Mapa não disponível para este destino
        </div>
    );

    return (
        <div className="h-[300px] w-full rounded-2xl overflow-hidden border border-white/10 z-0">
            <MapContainer 
                center={[coords.lat, coords.lon]} 
                zoom={13} 
                scrollWheelZoom={false}
                style={{ height: '100%', width: '100%' }}
            >
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                <Marker position={[coords.lat, coords.lon]}>
                    <Popup>
                        {destination}
                    </Popup>
                </Marker>
                <RecenterMap coords={coords} />
            </MapContainer>
        </div>
    );
};

export default MapComponent;

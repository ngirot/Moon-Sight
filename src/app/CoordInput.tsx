import "leaflet/dist/leaflet.css"
import {useEffect, useState} from "react";
import {jsx} from "@emotion/react";
import {useMapEvents} from "react-leaflet";
import {Position} from "@/app/Position";
import JSX = jsx.JSX;

interface CoordInputProps {
    position: Position
    updatePosition: (p: Position) => void
}

interface LocationMarkerProps {
    position: Position,
    updatePosition: (p: Position) => void,
    lib: any
}

function LocationMarker({position, lib, updatePosition}: LocationMarkerProps) {
    const map = useMapEvents({
        click(e: any) {
            const newPosition = new Position(e.latlng.lat, e.latlng.lng, e.latlng.alt);
            updatePosition(newPosition);
        }
    })

    const markerPosition = {
        lat: position.x,
        lng: position.y,
        alt: position.altitude
    };
    return <lib.Marker position={markerPosition}>
        <lib.Popup>Observer position</lib.Popup>
    </lib.Marker>
}

export function CoordInput({position, updatePosition}: CoordInputProps) {
    let [axc, setAxc] = useState<JSX.Element | null>(null);

    useEffect(() => {
        import('react-leaflet').then(xxx => {
            import('leaflet').then(L => {
                const DefaultIcon = L.icon({
                    iconUrl: 'img/marker-icon.png',
                    shadowUrl: 'img/marker-shadow.png',
                    iconAnchor: [12, 41],
                    shadowAnchor: [12, 41]
                });

                L.Marker.prototype.options.icon = DefaultIcon;

                setAxc(<xxx.MapContainer attributionControl={false} style={{width: 450, height: 300}}
                                         center={[position.x, position.y, position.altitude]} zoom={1}
                                         scrollWheelZoom={false}>
                    <xxx.TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <LocationMarker position={position} lib={xxx} updatePosition={updatePosition}/>
                </xxx.MapContainer>);
            });
        });
    }, [position, updatePosition]);


    return <div>
        {axc !== null ? axc : <div></div>}
    </div>;
}
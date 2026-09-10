// import { MapContainer, TileLayer, Marker, Popup, GeoJSON } from "react-leaflet";
// import "leaflet/dist/leaflet.css";

// const Map = ({ latitude, longitude, className, route }) => {
//     return (
//         <MapContainer
//             center={[latitude, longitude]}
//             zoom={15}
//             style={{ height: "100%", width: "100%" }}
//             className={className}
//         >
//             <TileLayer
//                 attribution='&copy; OpenStreetMap contributors'
//                 url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//             />

//             <Marker position={[latitude, longitude]}>
//                 <Popup>Your location</Popup>
//             </Marker>
//             {route && (
//                 <GeoJSON data={route} style={{ color: "blue", weight: 5 }} />
//             )}
//         </MapContainer>
//     );
// };

// export default Map;

// import { useEffect } from "react";
// import {
//     MapContainer,
//     TileLayer,
//     Marker,
//     Popup,
//     GeoJSON,
//     useMap
// } from "react-leaflet";
// import "leaflet/dist/leaflet.css";

// const MapCenter = ({ latitude, longitude }) => {
//     const map = useMap();

//     useEffect(() => {
//         if (latitude && longitude) {
//             map.setView([latitude, longitude]);
//         }
//     }, [latitude, longitude, map]);

//     return null;
// };

// const Map = ({ latitude, longitude, className, route }) => {
//     if (!latitude || !longitude) {
//         return null;
//     }

//     return (
//         <MapContainer
//             center={[latitude, longitude]}
//             zoom={15}
//             style={{ height: "100%", width: "100%" }}
//             className={className}
//         >
//             <TileLayer
//                 attribution='&copy; OpenStreetMap contributors'
//                 url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//             />

//             <MapCenter
//                 latitude={latitude}
//                 longitude={longitude}
//             />

//             <Marker position={[latitude, longitude]}>
//                 <Popup>current location</Popup>
//             </Marker>

//             {route && (
//                 <GeoJSON
//                     data={route}
//                     style={{
//                         color: "blue",
//                         weight: 5,
//                         opacity: 0.8
//                     }}
//                 />
//             )}
//         </MapContainer>
//     );
// };

// export default Map;


// import { useEffect, useRef } from "react";
// import {
//     MapContainer,
//     TileLayer,
//     Marker,
//     Popup,
//     GeoJSON,
//     useMap
// } from "react-leaflet";
// import L from "leaflet";
// import "leaflet/dist/leaflet.css";

// const RouteFocus = ({ route }) => {
//     const map = useMap();
//     const firstRouteLoad = useRef(true);

//     useEffect(() => {
//         if (!route) return;

//         const geoJsonLayer = L.geoJSON(route);
//         const bounds = geoJsonLayer.getBounds();

//         if (!bounds.isValid()) return;

//         if (firstRouteLoad.current) {
//             map.fitBounds(bounds, {
//                 padding: [50, 50]
//             });

//             firstRouteLoad.current = false;
//         }
//     }, [route, map]);

//     return null;
// };

// const Map = ({ latitude, longitude, className, route }) => {
//     if (!latitude || !longitude) {
//         return null;
//     }

//     return (
//         <MapContainer
//             center={[latitude, longitude]}
//             zoom={15}
//             style={{
//                 height: "100%",
//                 width: "100%"
//             }}
//             className={className}
//         >
//             <TileLayer
//                 attribution='&copy; OpenStreetMap contributors'
//                 url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//             />

//             <RouteFocus route={route} />

//             <Marker position={[latitude, longitude]}>
//                 <Popup>
//                     Current location
//                 </Popup>
//             </Marker>

//             {route && (
//                 <GeoJSON
//                     data={route}
//                     style={{
//                         color: "blue",
//                         weight: 5,
//                         opacity: 0.8
//                     }}
//                 />
//             )}
//         </MapContainer>
//     );
// };

// export default Map;


import { useEffect, useRef } from "react";
import {
    MapContainer,
    TileLayer,
    Marker,
    Popup,
    GeoJSON,
    useMap
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-rotate";

const RouteFocus = ({ route }) => {
    const map = useMap();
    const firstRouteLoad = useRef(true);

    useEffect(() => {
        if (!route) return;

        const geoJsonLayer = L.geoJSON(route);
        const bounds = geoJsonLayer.getBounds();

        if (!bounds.isValid()) return;

        if (firstRouteLoad.current) {
            map.fitBounds(bounds, {
                padding: [50, 50]
            });

            firstRouteLoad.current = false;
        }
    }, [route, map]);

    return null;
};

const NavigationCamera = ({ latitude, longitude, heading }) => {
    const map = useMap();

    useEffect(() => {
        if (
            typeof latitude !== "number" ||
            typeof longitude !== "number"
        ) {
            return;
        }

        /*
         * Keep captain near the lower part of the screen
         * instead of exactly in the center.
         */
        const mapSize = map.getSize();

        const point = map.project(
            [latitude, longitude],
            map.getZoom()
        );

        const offsetPoint = L.point(
            point.x,
            point.y + mapSize.y * 0.20
        );

        const newCenter = map.unproject(
            offsetPoint,
            map.getZoom()
        );

        map.panTo(newCenter, {
            animate: true,
            duration: 0.5
        });

        /*
         * Rotate map according to vehicle heading.
         *
         * GPS heading:
         * 0   = North
         * 90  = East
         * 180 = South
         * 270 = West
         */
        if (
            typeof heading === "number" &&
            !Number.isNaN(heading)
        ) {
            map.setBearing(heading);
        }
    }, [latitude, longitude, heading, map]);

    return null;
};

const Map = ({
    latitude,
    longitude,
    heading,
    className,
    route
}) => {
    if (
        typeof latitude !== "number" ||
        typeof longitude !== "number"
    ) {
        return null;
    }

    return (
        <MapContainer
            center={[latitude, longitude]}
            zoom={15}
            rotate={true}
            touchRotate={true}
            style={{
                height: "100%",
                width: "100%"
            }}
            className={className}
        >
            <TileLayer
                attribution='&copy; OpenStreetMap contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            <RouteFocus route={route} />

            <NavigationCamera
                latitude={latitude}
                longitude={longitude}
                heading={heading}
            />

            <Marker position={[latitude, longitude]}>
                <Popup>
                    Captain's current location
                </Popup>
            </Marker>

            {route && (
                <GeoJSON
                    data={route}
                    style={{
                        color: "blue",
                        weight: 5,
                        opacity: 0.8
                    }}
                />
            )}
        </MapContainer>
    );
};

export default Map;
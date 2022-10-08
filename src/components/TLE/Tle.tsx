import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadTle } from "../../store/slices/reducer";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import {
  twoline2satrec,
  propagate,
  gstime,
  eciToGeodetic,
  degreesLong,
  degreesLat,
} from "satellite.js";

const Tle = () => {
  const dispatch: any = useDispatch();
  const tle = useSelector((state: any) => {
    console.log(state.list);
    return state.list;
  });
  const [selectedSatellite, setSelectedSatellite] = useState(25544);
  const [position, setPosition] = useState<any>([51.505, -0.09]);

  useEffect(() => {
    dispatch(loadTle());
    const data = tle.find(
      (s: { satelliteId: number }) => s.satelliteId === selectedSatellite
    );
    console.log(data);
    setPosition(getPosition(data.line1, data.line2));
  }, [dispatch, selectedSatellite]);

  return (
    <div>
      <select
        name="satellite"
        id="satellite"
        onChange={(e) => setSelectedSatellite(parseInt(e.target.value))}
      >
        {tle.map((value: any) => (
          <option key={value.satelliteId} value={value.satelliteId}>
            {value.name}
          </option>
        ))}
      </select>
      <MapContainer
        center={position}
        zoom={1}
        scrollWheelZoom={false}
        style={{
          height: "400px",
          backgroundColor: "white",
        }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <Marker position={position}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

const getPosition = (tleLine1: string, tleLine2: string) => {
  console.log(tleLine1);
  console.log(tleLine2);
  // Initialize a satellite record
  const satrec = twoline2satrec(tleLine1, tleLine2);

  //  Or you can use a JavaScript Date
  const positionAndVelocity = propagate(satrec, new Date());

  // The position_velocity result is a key-value pair of ECI coordinates.
  // These are the base results from which all other coordinates are derived.
  const positionEci: any = positionAndVelocity.position;

  // You will need GMST for some of the coordinate transforms.
  // http://en.wikipedia.org/wiki/Sidereal_time#Definition
  const gmst = gstime(new Date());

  // You can get ECF, Geodetic, Look Angles, and Doppler Factor.
  const positionGd = eciToGeodetic(positionEci, gmst);

  // Geodetic coords are accessed via `longitude`, `latitude`, `height`.
  const longitude = positionGd.longitude,
    latitude = positionGd.latitude,
    height = positionGd.height;

  //  Convert the RADIANS to DEGREES.
  const longitudeDeg = degreesLong(longitude),
    latitudeDeg = degreesLat(latitude);

  console.log(longitude, latitude);
  return [longitudeDeg, latitudeDeg];
};

export default Tle;

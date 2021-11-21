import { Outlet } from 'react-router-dom';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';

const HomePage = (props) => {
  const username = process.env.REACT_APP_MAPBOX_USERNAME;
  const styleId = process.env.REACT_APP_MAPBOX_STYLEID;
  const accessToken = process.env.REACT_APP_MAPBOX_ACCESSTOKEN;
  const position = [25.047675, 121.517055];

  console.log(props);

  return (
    <div className="home-container">
      <MapContainer id="map" center={position} zoom={13} zoomControl={false}>
        <TileLayer
          attribution={`Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>`}
          url={`https://api.mapbox.com/styles/v1/${username}/${styleId}/tiles/256/{z}/{x}/{y}@2x?access_token=${accessToken}`}
        />
        <Marker position={position} />
      </MapContainer>
      <Outlet />
    </div>
  );
};

export default HomePage;

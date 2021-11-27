import { useContext, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import { Icon, divIcon } from 'leaflet';
import { renderToString } from 'react-dom/server';

import { mapBox } from '../constants';
import { Context as DataContext } from '../context/DataContext';

const userMarkerIcon = new Icon({
  iconUrl: 'user-position.png',
  iconSize: [40, 40],
});

const numberIcon = (number) =>
  renderToString(
    <div className="number-icon-container">
      <img
        className="number-icon-img"
        src="bike-position.png"
        alt="bike station"
      />
      <div className="number-icon-number">{number}</div>
    </div>
  );

const stationMarkerIcon = (number) =>
  new divIcon({
    html: numberIcon(number),
    className: 'station-marker-icon',
  });

const HomePage = () => {
  const { username, styleId, accessToken } = mapBox;
  const position = [25.047675, 121.517055];
  const {
    state: { nearStations },
    getNearStationsAndAvailability,
  } = useContext(DataContext);

  useEffect(() => {
    getNearStationsAndAvailability(position);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="home-container">
      <MapContainer id="map" center={position} zoom={13} zoomControl={false}>
        <TileLayer
          attribution={`Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>`}
          url={`https://api.mapbox.com/styles/v1/${username}/${styleId}/tiles/256/{z}/{x}/{y}@2x?access_token=${accessToken}`}
        />
        <Marker position={position} icon={userMarkerIcon} />
        {!!nearStations &&
          nearStations.length &&
          nearStations.map((station) => {
            const { StationUID, PositionLon, PositionLat, AvailableRentBikes } =
              station;

            return (
              <Marker
                key={StationUID}
                position={[PositionLat, PositionLon]}
                icon={stationMarkerIcon(AvailableRentBikes)}
              />
            );
          })}
      </MapContainer>
      <Outlet />
    </div>
  );
};

export default HomePage;

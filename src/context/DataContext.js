import axios from 'axios';
import jsSHA from 'jssha';

import createDataContext from './createDataContext';
import { API_URL, tdxAPI } from '../constants';

const dataReducer = (state, action) => {
  switch (action.type) {
    case 'GET_NEAR_STATIONS_AVAILABILITY':
      return { ...state, nearStations: action.payload };
    default:
      return state;
  }
};

const getAuthorizationHeader = () => {
  const { appId, appKey } = tdxAPI;
  const GMTString = new Date().toGMTString();
  const ShaObj = new jsSHA('SHA-1', 'TEXT');
  ShaObj.setHMACKey(appKey, 'TEXT');
  ShaObj.update('x-date: ' + GMTString);
  const HMAC = ShaObj.getHMAC('B64');
  const Authorization = `hmac username="${appId}", algorithm="hmac-sha1", headers="x-date", signature="${HMAC}"`;

  return {
    Authorization,
    'X-Date': GMTString,
  };
};

const getNearStationsAndAvailability =
  (dispatch) => async (position, callback) => {
    const stations = await axios.get(
      `${API_URL}/Station/NearBy?$format=JSON&$spatialFilter=nearby(${position[0]},${position[1]},1000)`,
      {
        headers: getAuthorizationHeader(),
      }
    );
    const availabilities = await axios.get(
      `${API_URL}/Availability/NearBy?$format=JSON&$spatialFilter=nearby(${position[0]},${position[1]},1000)`,
      {
        headers: getAuthorizationHeader(),
      }
    );
    const nearStations = stations.data.map((station) => {
      const {
        StationUID,
        StationPosition: { PositionLon, PositionLat },
        StationName: { Zh_tw },
      } = station;
      const { AvailableRentBikes, AvailableReturnBikes, ServiceStatus } =
        availabilities.data.find(
          (availability) => StationUID === availability.StationUID
        );

      return {
        StationUID,
        ServiceStatus,
        StationName: Zh_tw,
        PositionLat,
        PositionLon,
        AvailableRentBikes,
        AvailableReturnBikes,
      };
    });

    dispatch({ type: 'GET_NEAR_STATIONS_AVAILABILITY', payload: nearStations });
  };

export const { Context, Provider } = createDataContext(
  dataReducer,
  {
    getNearStationsAndAvailability,
  },
  {}
);

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBicycle,
  faRoute,
  faUmbrellaBeach,
} from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();
  return (
    <header className="header-container">
      <div className="logo-container" onClick={() => navigate('/')}>
        <img alt="bike-land-logo" src="logo.png" />
      </div>
      <div className="btn-container">
        <div className="btn" onClick={() => navigate('/')}>
          <FontAwesomeIcon icon={faBicycle} fixedWidth />
          找單車
        </div>
        <div className="btn" onClick={() => navigate('/bike-routes')}>
          <FontAwesomeIcon icon={faRoute} fixedWidth />
          找路線
        </div>
        <div className="btn" onClick={() => navigate('/scenic-spots')}>
          <FontAwesomeIcon icon={faUmbrellaBeach} fixedWidth />
          找景點
        </div>
      </div>
    </header>
  );
};

export default Header;

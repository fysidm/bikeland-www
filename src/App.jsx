import { Route, Routes } from 'react-router';

import Header from './components/Header';
import HomePage from './pages/HomePage';
import BikesPage from './pages/BikesPage';
import BikeRoutesPage from './pages/BikeRoutesPage';
import ScenicSpotsPage from './pages/ScenicSpotsPage';

function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />}>
          <Route index element={<BikesPage />} />
          <Route path="bike-routes" element={<BikeRoutesPage />} />
          <Route path="scenic-spots" element={<ScenicSpotsPage />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;

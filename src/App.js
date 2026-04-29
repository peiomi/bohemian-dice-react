import React, { useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './AppRoutes';

import './css/variables.css';
import './css/globals.css';

function App() {
  const [player, setPlayer] = useState(null);
  const [selectedLevel, setSelectedLevel] = useState(null);
  const [loading, setLoading] = useState(true);

  return (
    <div className='App'>
      <BrowserRouter>
        <AppRoutes
          player={player}
          setPlayer={setPlayer}
          selectedLevel={selectedLevel}
          setSelectedLevel={setSelectedLevel}
          loading={loading}
          setLoading={setLoading}
        />
      </BrowserRouter>
    </div>
  );
}

export default App;

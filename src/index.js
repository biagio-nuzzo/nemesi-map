import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import Core from './App';
import './index.css';
import 'leaflet/dist/leaflet.css'
import 'bootstrap/dist/css/bootstrap.min.css';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(

  <React.StrictMode>
    <div className='generalContainer'>
      <Core />
    </div>

  </React.StrictMode>
);

reportWebVitals();

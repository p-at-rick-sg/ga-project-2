import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter} from 'react-router-dom';
import App from './App.jsx';
// MUI Imports
import './index.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

//context imports
import {UserProvider} from './context/UserContext.jsx';
import {RecruiterProvider} from './context/RecruiterContext.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <UserProvider>
      <RecruiterProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </RecruiterProvider>
    </UserProvider>
  </React.StrictMode>
);

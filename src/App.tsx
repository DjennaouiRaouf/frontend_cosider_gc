import React from 'react';
import logo from './logo.svg';
import './App.css';
import {AuthProvider} from "./components/Context/AuthContext/AuthContext";
import {PermissionProvider} from "./components/Context/PermissionContext/PermissionContext";
import {BrowserRouter} from "react-router-dom";
import Routes from "./components/Context/Routes/Routes";
import 'primereact/resources/themes/lara-light-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeflex/primeflex.css';

function App() {
  return (
    <AuthProvider>
          <PermissionProvider>
              <BrowserRouter>
                        <Routes />
              </BrowserRouter>
          </PermissionProvider>
      </AuthProvider>
  );
}

export default App;

import React from 'react';
import logo from './logo.svg';
import './App.css';
import { PrimeReactProvider } from 'primereact/api';

import "primereact/resources/themes/lara-light-cyan/theme.css";
import LoginForm from "./components/LoginForm/LoginForm";

function App() {
  return (

    <div className="App">
       <PrimeReactProvider>
            <LoginForm/>
        </PrimeReactProvider>
    </div>
  );
}

export default App;

import React from 'react';
import { useState } from 'react'
import logo from './logo.svg';
import './App.css';
import Rut from 'react-rut'

function App() {
	
  const [rut,setRut] = useState("")
  const [rutValido,setRutValido] = useState(false)
	
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
		<Rut value={rut} onChange={(e)=>setRut(e.target.value)} onValid={setRutValido} >
			<input type="text" name="rut" placeholder="Rut" required></input>
		</Rut>
		<h1>{rutValido?"Valido":"NO Valido"}</h1>
      </header>
    </div>
  );
}

export default App;

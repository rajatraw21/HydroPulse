import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Components/Login'; // Your login component
import Signup from './Components/Signup'; // Your signup component

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/Login"  element={<Login />} />
        <Route path="/Signup" element={<Signup />} />
      </Routes>
    </Router>
  );
}
export default App;
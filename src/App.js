import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Routes
} from "react-router-dom";
import './App.css';
import 'antd/dist/antd.css';
import Register from './Pages/Account/Register.js'
import Main from './Pages/Mainmenu/Main.js'
import Signin from "./Pages/Account/Signin";
import { useNavigate } from 'react-router-dom';


function App() {
  let navigate = useNavigate();
  return (

    <Routes>
      <Route path="/" element={<Signin navigate={navigate} />} />
      <Route path="/signup" element={<Register />} />
      <Route path="/main" element={<Main />} />
    </Routes>
  );
}

export default App;
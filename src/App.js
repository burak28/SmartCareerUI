import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Routes,
  useParams
} from "react-router-dom";
import './App.css';
import 'antd/dist/antd.css';
import { CookiesProvider } from 'react-cookie';
import Register from './Pages/Account/Register.js'
import Main from './Pages/Mainmenu/Main.js'
import Signin from "./Pages/Account/Signin";
import { useNavigate } from 'react-router-dom';
import MainComponent from "./Pages/Mainmenu/MainComponent";
import Profile from "./Pages/Mainmenu/Profile";
import Create from "./Pages/Mainmenu/Create";
import Status from "./Pages/Mainmenu/Status";
import JobDetail from "./Pages/Mainmenu/JobDetail";
import Trending from "./Pages/Mainmenu/Trending";
import Live from "./Pages/Mainmenu/Live";
import Find from "./Pages/Mainmenu/Find";
import { useCookies } from 'react-cookie';

function App() {
  let navigate = useNavigate();
  const [cookies, setCookie] = useCookies(['userId']);
  const params = useParams();
  return (
    <CookiesProvider>
      <Routes>
        <Route path="/" element={<Signin navigate={navigate} cookies={cookies} setCookie={setCookie} />} />
        <Route path="/signup" element={<Register />} />
        <Route path="/registercomplete" element={<Main navigate={navigate} cookies={cookies} />} />
        <Route path="/main" element={<MainComponent />}>
          <Route path="profile" element={<Profile cookies={cookies} />} />
          <Route path="create" element={<Create cookies={cookies} navigate={navigate} />} />
          <Route path="status" element={<Status cookies={cookies} navigate={navigate} />} />
          <Route path="status/:id" element={<JobDetail cookies={cookies} navigate={navigate} params={params} />} />
          <Route path="trending" element={<Trending cookies={cookies} />} />
          <Route path="main" element={<Live cookies={cookies} />} />
          <Route path="find" element={<Find cookies={cookies} />} />
        </Route>
      </Routes>
    </CookiesProvider>
  );
}

export default App;
import { useEffect, useState } from 'react';
import './App.css';
import {Routes, Route, NavLink} from 'react-router-dom';
import logo from './assets/icons8-yarn-80.png';
import Home from './components/Home';
import Yarn from './components/Yarn';
import MatchPatterns from './components/MatchPatterns';
import Patterns from './components/Patterns';
import MatchYarn from './components/MatchYarn';
import Page404 from './components/Page404';

function App() {

  return (
    <>
    {/* Nav Bar using React Router NavLink and Bootstrap styling*/}
    <nav id="mainnav" className="navbar navbar-expand-sm bg-dark navbar-dark">
      <div className="container-fluid">
        <ul className="navbar-nav">
          <li className="nav-item pe-1">
            <img src={logo} alt="yarn icon" className="logo" />
          </li>

          <li className="nav-item pe-4">
            <h1 className="text-light">Use Your Stash</h1>
          </li>

          <li className="nav-item pe-3 align-self-center">
            <NavLink
              to="/"
              className={({ isActive, isPending }) =>
              isPending? "pending" : isActive ? "active" : ""
              }
            >
            home
            </NavLink>
          </li>

          <li className="nav-item pe-3 align-self-center">
            <NavLink
              to="/yarn"
              className={({ isActive, isPending }) =>
              isPending? "pending" : isActive ? "active" : ""
              }
            >
            yarn
            </NavLink>
          </li>

          <li className="nav-item align-self-center">
            <NavLink
              to="/patterns"
              className={({ isActive, isPending }) =>
              isPending? "pending" : isActive ? "active" : ""
              }
            >
            patterns
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>

    {/* Routes */}
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/yarn" element={<Yarn />}>
        <Route path=":id" element={<MatchPatterns />} />
      </Route>
      <Route path="/patterns" element={<Patterns />}>
        <Route path=":id" element={<MatchYarn />} />
      </Route>
      <Route path="*" element={<Page404 />} />
    </Routes>
    </>
  )
}

export default App
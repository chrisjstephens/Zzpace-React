import React from 'react';
import { NavLink } from 'react-router-dom';

export default function HeaderView(props) {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <a className="navbar-brand" href="/">Zzpace</a>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav" >
        <ul className="navbar-nav">
        <li className="nav-item">
          <NavLink className="nav-link"  to='/'>Home<span className="sr-only">(current)</span></NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" activeClassName='active' to='/flights'>Flights</NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to='/hotels'>Hotels</NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to='/teleportation'>Teleportation</NavLink>
        </li>
        </ul>
      </div>
    </nav>
  );
}

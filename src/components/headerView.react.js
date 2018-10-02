import React from 'react';
import { Link } from 'react-router';

export default function Hero(props) {
  return (
    <nav classNameName="navbar navbar-expand-lg navbar-light bg-light">
      <a className="navbar-brand" href="/">Zzpace</a>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav" >
        <ul className="navbar-nav">
          <li className="nav-item" >
            <Link className="nav-link" to="/">Home<span className="sr-only">(current)</span></Link>
          </li>
          <li className="nav-item" >
            <Link className="nav-link" to="/flights">Flights</Link>
          </li>
          <li className="nav-item" >
            <Link className="nav-link" to="/hotels">Hotels</Link>
          </li>
          <li className="nav-item" >
            <Link className="nav-link" to="/teleportation">Teleportation</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

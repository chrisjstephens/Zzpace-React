import React from 'react';
import { Link } from 'react-router-dom';

export default function HeaderView(props) {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <a className="navbar-brand" href="/">Zzpace</a>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav" >
        <ul className="navbar-nav">
        <li class="nav-item" >
          <Link class="nav-link"  to='/'>Home<span class="sr-only">(current)</span></Link>
        </li>
        <li class="nav-item">
          <Link class="nav-link" to='/flights'>Flights</Link>
        </li>
        <li class="nav-item">
          <Link class="nav-link" to='/hotels'>Hotels</Link>
        </li>
        <li class="nav-item">
          <Link class="nav-link" to='/teleportation'>Teleportation</Link>
        </li>
        </ul>
      </div>
    </nav>
  );
}

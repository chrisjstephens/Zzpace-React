import React from 'react';
import { Link } from 'react-router-dom';

export default function Hero(props) {
  return (
      <div>
        <h1 className="display-4">Welcome to Zzpace</h1>
        <p className="lead">We are your #1 source for intergalactic travel!</p>
        <hr className="my-4"/>
        <p>We help you with flights, teleportation and hotels with the best prices available!</p>
        <p className="lead">
          <Link className="btn btn-primary btn-lg" to="#" role="button">Learn more</Link>
        </p>
      </div>
  );
}

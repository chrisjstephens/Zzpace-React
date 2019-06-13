import React from 'react';
import PlanetCards from './PlanetCards.react.js'

export default function Hero(props) {
  return (
      <div>
        <h1 className="display-4">Welcome to Zzpace</h1>
        <p className="lead">We are your #1 source for intergalactic travel!</p>
        <p>We help you with flights, teleportation and hotels with the best prices available!</p>
        <hr className="my-4"/>
        <PlanetCards />
      </div>
  );
}

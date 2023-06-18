import React, { useState, useEffect } from 'react';

export default function PlanetCards () {
  const [data, setData] = useState([]);
  const [planetCardsError, setPlanetCardsError] = useState(false);

  useEffect(() => {
    fetch(process.env.REACT_APP_BACKEND_ADDRESS + "/api/showLocations")
      .then(res => res.json())
      .then(
        (result) => setData(result),
      ).catch((error) => {
        setPlanetCardsError(true)
      });
  }, []);
  //TODO ENSURE OBJECT HAS DATA, FEED HAS CRASHED WHEN MONGO DOWN< IT RETURNED EMPTY OBJECT

    return (
      <div>
        {!planetCardsError && data.length > 1 ?
          <div className="planet-cards row no-gutters">
            <h2>At Zzpace you can travel to many places including:</h2>
            { 
            data
            .sort(() => Math.random() - 0.5)
            .slice(0, 3)
            .map((res, index) =>
                <div className="card col-md-4" key={res._id}>
                  <img className="card-img-top planet-picture" src={res.image} alt="Planet Card"/>
                  <div className="card-body">
                    <h5 className="card-title">{res.name}</h5>
                    <p className="card-text">{res.info}</p>
                  </div>
                </div>
              )
            }
          </div>
        : null}
      </div>
    );

}

import React from 'react';

export default class Hotels extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      planetCardsError: false
    }

    this.initData();
  }

  initData() {
    fetch(process.env.REACT_APP_BACKEND_ADDRESS + "/api/showLocations")
      .then(res => res.json())
      .then(
        (result) => this.setState({ data: result }),
      ).catch((error) => {
        this.setState({planetCardsError : true})
      });
  }

  render() {
    return (
      <div>
      {!this.state.planetCardsError ?
        <div className="planet-cards row no-gutters">
          <h2>At Zzpace you can travel to many places including:</h2>
          {
            this.state.data
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

}

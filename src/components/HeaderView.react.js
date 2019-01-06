import React from 'react';
import { NavLink } from 'react-router-dom';


export default class HeaderView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      navCollapsed: true
    };
  }

  onNavToggle = () => {
    this.setState({ navCollapsed: !this.state.navCollapsed })
  }

  render() {
    const navCollapsed = this.state.navCollapsed;


    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <a className="navbar-brand" href="/">Zzpace</a>
        <button className="navbar-toggler" type="button" onClick={this.onNavToggle} data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className={(navCollapsed ? 'collapse navbar-collapse' : 'navbar-collapse')} id="navbarNav">
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
}

import React from 'react';
import { NavLink } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import * as actions from '../actions';

class HeaderView extends React.Component {
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
              <NavLink className="nav-link" activeClassName='active' to='/' exact={true}>Home<span className="sr-only">(current)</span></NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" activeClassName='active' to='/flights'>Flights</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" activeClassName='active' to='/hotels'>Hotels</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" activeClassName='active' to='/teleportation'>Teleportation</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link d-block d-sm-block d-lg-none" activeClassName='active' to='/login' onClick={this.props.username ? this.props.signout : null}>{this.props.username ? <>Logout</> : <>Login</> }</NavLink>
            </li>
          </ul>
          <Button variant="outlined" className="login-button d-none d-lg-block d-xl-block" type="submit" onClick={this.props.username ? this.props.signout : null}>
            <NavLink to='/login'> {this.props.username ? <>Logout</> : <>Login</> }</NavLink>
          </Button>
        </div>
      </nav>
    );
  }
}

const mapStateToProps = state => ({
  username: state.login.username,
})

export default connect(mapStateToProps, actions)(HeaderView);

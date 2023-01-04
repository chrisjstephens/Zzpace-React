import React from 'react';
import { NavLink } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { Redirect } from "react-router-dom";
import { connect } from 'react-redux';
import * as actions from '../actions';

class Login extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
      loginError: false
    }
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value, //TODO: Change this to only use props, set to redux
    });
  };

  submitForm(e) {
    e.preventDefault();

    const formData = {
      username: this.state.username,
      password: this.state.password
    }

    this.props.signin(formData);
  }

  render() {
    const loggedIn = this.props.username;

    const signedIn = this.props.username && this.props.token;
    if (signedIn && this.state.username) { this.setState({username: ''}); }

    return (
    <div>
      { !loggedIn ?
        <div>
          <h1>Login into your account</h1>
          <p>Please enter your credentials to access your Zzpace account!</p>
          <form noValidate onSubmit={this.submitForm.bind(this)} autoComplete="off">
            <div className="form-row">
              <div className="form-group col-md-4">
                <TextField
                    id="standard-username"
                    label="Username"
                    // className={classes.textField}
                    value={this.state.username}
                    onChange={this.handleChange('username')}
                    margin="normal"
                  />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group col-md-4">
                <TextField
                    id="standard-password-input"
                    label="Password"
                    // className={classes.textField}
                    type="password"
                    autoComplete="current-password"
                    onChange={this.handleChange('password')}
                    margin="normal"
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group col-md-4">
                  <Button variant="outlined" type="submit">
                    LOGIN
                  </Button>
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  {this.props.errorMessage ?
                    <p className="text-danger px-1"> {this.props.errorMessage} </p>
                    : null}
                  </div>

               </div>
            </form>
          <p>New to Zzpace? Please <NavLink to='/register'>register</NavLink> with us!</p>
        </div>
        :
          <Redirect to="/user" />
      }
      </div>
    );
  }
  //TODO: Create logic for expiration date in token
}

const mapStateToProps = state => ({
  username: state.login.username,
  errorMessage: state.login.error,
  token: state.login.token
})

//TODO ISSUES WITH STATE AND REDUX STORING DATA

export default connect(mapStateToProps, actions)(Login);

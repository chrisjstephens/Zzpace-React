import React from 'react';
import { NavLink } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Alert from '@mui/material/Alert';
import { Redirect } from "react-router-dom";
import { connect } from 'react-redux';
import * as actions from '../actions';
import { TextField, InputAdornment, IconButton } from "@material-ui/core";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";

class Login extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
      loginError: false,
      showPassword: false
    }

    this.flipStateValue = this.flipStateValue.bind(this)
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

  flipStateValue() {
    this.setState({showPassword: !this.state.showPassword});
  }
 
  render() {
    const loggedIn = this.props.username;    

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
                    type={this.state.showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    onChange={this.handleChange('password')}
                    margin="normal"
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={this.flipStateValue}
                          >
                            {this.state.showPassword ? <Visibility /> : <VisibilityOff />}
                          </IconButton>
                        </InputAdornment>
                      )
                    }}
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
                    <div>
                      <Alert severity="error"> {this.props.errorMessage} </Alert>
                    </div>
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

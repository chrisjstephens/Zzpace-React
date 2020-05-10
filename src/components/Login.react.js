import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
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
      [name]: event.target.value,
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
          </div>
        :
          <div className="form-row">
            <div className="form-group">
            <p> Currently logged in as - <strong>{this.props.username}</strong> </p>
              <Button variant="outlined" type="submit" onClick={this.props.signout}>
                LOGOUT
              </Button>
            </div>
          </div>
      }
      </div>
    );
  }

}

const mapStateToProps = state => ({
  username: state.login.username,
  errorMessage: state.login.error,
  token: state.login.token
})

export default connect(mapStateToProps, actions)(Login);

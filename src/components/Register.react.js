import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

export default class Register extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
        username: '',
        password: '',
        newUserError: '',
        newUserCreated: false
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

    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
    };

    fetch(process.env.REACT_APP_BACKEND_ADDRESS + "/api/addUser", requestOptions)
    .then(response => {
      if (!response.ok) {
        return response.text().then(text => {
          ////Error, perhaps duplicate entry
          this.setState({newUserError : text});
          this.setState({newUserCreated : false});
        })
      } else {
        return response.text().then(text => {
          //User created
          this.setState({newUserError : ''});
          this.setState({newUserCreated : true});
        })
      }
      }).catch(err => {
        //Error, perhaps server side
        this.setState({newUserError : err});
        this.setState({newUserCreated : false});
      });
  }

  render() {
    const validForm = this.state.username.length >= 8 && this.state.password.length >= 8;
    
    return (
    <div>
        <form noValidate onSubmit={this.submitForm.bind(this)} autoComplete="off">
            <div>
                <h1>New User Registration</h1>
                <p>Please register with a username and password!</p>
            </div>
            <div className="form-row">
                <div className="form-group col-md-4">
                    <TextField
                        id="standard-username"
                        label="Username"
                        value={this.state.username}
                        onChange={this.handleChange('username')}
                        margin="normal"
                        error={this.state.username !== '' && this.state.username.length < 8 ? true : false }
                        helperText={this.state.username !== '' && this.state.username.length < 8 ? 'The username must be at least 8 characters!' : ''}
                    />
                </div>
            </div>
            <div className="form-row">
                <div className="form-group col-md-4">
                    <TextField
                        id="standard-password-input"
                        label="Password"
                        type="password"
                        autoComplete="current-password"
                        onChange={this.handleChange('password')}
                        value={this.state.password}
                        margin="normal"
                        error={this.state.password !== '' && this.state.password.length < 8 ? true : false }
                        helperText={this.state.password !== '' && this.state.password.length < 8 ? 'The password must be at least 8 characters!' : ''}
                    />
                </div>
            </div>
            <div className="form-row">
                <div className="form-group col-md-4">
                  <Button variant="outlined" disabled={!validForm} type="submit">
                    REGISTER
                  </Button>
                </div>
            </div>
            <div className="form-row">
               <div className="form-group col-md-4">
                   {this.state.newUserCreated ? 
                       <p className="text-success">Congrats, a new user has been created! - {this.state.username} </p>
                    : null 
                   }
                   {this.state.newUserError ?
                       <p className="text-danger">{this.state.newUserError}</p>
                    : null
                   }
               </div>
           </div>
        </form>
    </div>
    );
  }
}

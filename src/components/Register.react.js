import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

export default class Register extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
        username: '',
        password: ''
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
    console.log(formData);

    //this.props.signin(formData);
  }

  render() {
    const validForm = (this.state.username != '' && this.state.username.length <= 8) && (this.state.password != '' && this.state.password.length <= 8);

    return (
    <div>
        <form noValidate onSubmit={this.submitForm.bind(this)} autoComplete="off">
            <div className="form-row">
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
                        error={this.state.username != '' && this.state.username.length <= 8 ? true : false }
                        helperText={this.state.username != '' && this.state.username.length <= 8 ? 'The username must be at least 8 characters!' : ''}
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
                        error={this.state.password != '' && this.state.password.length <= 8 ? true : false }
                        helperText={this.state.password != '' && this.state.password.length <= 8 ? 'The password must be at least 8 characters!' : ''}
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
        </form>
    </div>
    );
  }
}

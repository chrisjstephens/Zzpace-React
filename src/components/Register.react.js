import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Alert from '@mui/material/Alert';
import TextField from '@material-ui/core/TextField';

export default function Register() {
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [newUserError, setNewUserError] = useState('');
  const [newUserCreated, setNewUserCreated] = useState(false);

  const validForm = username.length >= 8 && password.length >= 8;

  const submitForm = (e) => {
    e.preventDefault();

    const formData = {
      username: username,
      password: password
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
              setNewUserError(text);
              setNewUserCreated(false);
            })
          } else {
            return response.text().then(text => {
              //User created
              setNewUserError('');
              setNewUserCreated(true);
            })
          }
          }).catch(err => {
            setNewUserError(err);
            setNewUserCreated(false);
          });
    
  };
    
    return (
    <div>
        <form noValidate onSubmit={submitForm} autoComplete="off">
            <div>
                <h1>New User Registration</h1>
                <p>Please register with a username and password!</p>
            </div>
            <div className="form-row">
                <div className="form-group col-md-4">
                    <TextField
                        id="standard-username"
                        label="Username"
                        value={username}
                        onChange={(event) => setUserName(event.target.value)}
                        margin="normal"
                        error={username !== '' && username.length < 8 ? true : false }
                        helperText={username !== '' && username.length < 8 ? 'The username must be at least 8 characters!' : ''}
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
                        onChange={(event) => setPassword(event.target.value)}
                        value={password}
                        margin="normal"
                        error={password !== '' && password.length < 8 ? true : false }
                        helperText={password !== '' && password.length < 8 ? 'The password must be at least 8 characters!' : ''}
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
                   {newUserCreated ?
                        <Alert severity="success">
                        Congrats, a new user has been created! - {username}
                        </Alert>
                    : null 
                   }
                   {newUserError ?
                        <Alert severity="error">
                        {newUserError}
                        </Alert>
                    : null
                   }
               </div>
           </div>
        </form>
    </div>
    );
}

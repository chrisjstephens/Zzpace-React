import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';

import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
// import Alert from '@material-ui/lab/Alert';//TODO:Add once i update material ui



function TabPanel(props) {
  //Taken from Material UI
  //https://material-ui.com/components/tabs/#tabs
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography component="div">{children}</Typography>
        </Box>
      )}
    </div>
  );
}

class User extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: {},
      usersData: [],
      _id: '',
      username: '',
      type: '',
      firstName: '',
      lastName: '',
      gender: '',
      address: '',
      country: '',
      phoneNumber: '',
      dateOfBirth: '',
      token: '',
      userError: false,
      usersError: false,
      adminTabMessage: '',
      adminTabErrorMessage: '',
      updateError: '',
      updateSuccess: false,
      value: 0
    }
    this.initData();
  }

  initData() {
    if (this.props.username === 'admin') {
      this.getUsersData()
    }
      this.getUserData();  
  }

  getUserData() {
    fetch(process.env.REACT_APP_BACKEND_ADDRESS + "/api/admin/user/" + this.props.username, {
      headers:  { authorization: this.props.token}
    })
      .then(res => res.json())
      .then(
        (result) =>  this.setState({ 
          username: result.username,
          _id: result._id,
          type: result.type,
          firstName: result.info.firstName,
          lastName: result.info.lastName,
          gender: result.info.gender,
          address: result.info.address,
          country: result.info.country,
          phoneNumber: result.info.phoneNumber,
          dateOfBirth: result.info.dateOfBirth,
        }),
      ).catch((error) => {
        this.setState({userError : true})
      });
  }

  getUsersData() {
    fetch(process.env.REACT_APP_BACKEND_ADDRESS + "/api/admin/getUsers", {
      headers:  { authorization: this.props.token }
    })
      .then(res => res.json())
      .then(
        (result) => this.setState({ usersData: result }),
      ).catch((error) => {
        this.setState({usersError : true})
      });
  }


  deleteUser(username) {
    fetch(process.env.REACT_APP_BACKEND_ADDRESS + "/api/admin/deleteUser/" + username , {
      method: 'DELETE',
      headers:  { authorization: this.props.token}
    })
    .then(response => {
      if (!response.ok) {
        return response.text().then(text => {
          this.setState({ adminTabMessage: '' });
          this.setState({ adminTabErrorMessage: text }) 
        })
      } else {
        return response.text().then(text => {
          this.getUsersData();
          this.setState({ adminTabMessage: text });
          this.setState({ adminTabErrorMessage: '' });
        })
    }
    }).catch(err => {
      this.setState({ adminTabErrorMessage: 'An error has occured' });
    })

  }

  handleChange = name => event => {
    this.setState({ updateSuccess: false});
    this.setState({ updateError: ''});
    this.setState({
      [name]: event.target.value,
    });
  };

  updateInfo() {
    const bodyData = {
      info: {
          firstName: this.state.firstName,
          lastName: this.state.lastName,
          gender: this.state.gender,
          address: this.state.address,
          country: this.state.country,
          phoneNumber: this.state.phoneNumber,
          dateOfBirth: this.state.dateOfBirth
      }
    };

    const requestOptions = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', authorization: this.props.token },
      body: JSON.stringify(bodyData)
    };

    fetch(process.env.REACT_APP_BACKEND_ADDRESS + "/api/admin/updateUser/" + this.props.username, requestOptions)
      .then(response => {
        if (!response.ok) {
            return response.text().then(text => { 
              let newErr = JSON.parse(text);
              this.setState({ updateError: newErr.message }) 
              this.setState({ updateSuccess: false})
            })
          } else {
            response.json().then(
              this.setState({ updateError: '' }),
              this.setState({ updateSuccess: true}) 
            )
        }
      })
      .catch(err => {
        this.setState({ updateError: err }) 
      }) 

  }

  render() {
    //const data = this.state.data;
    //const classes = useStyles();

    const handleChange = (event, newValue) => {
      this.setState({value: newValue});
    };

    return (
      <div>
        {!this.state.userError ?
          <div>
            <h1>Welcome {this.state.username} !</h1>
            <Paper>
              <Tabs
                value={this.state.value}
                onChange={handleChange}
                indicatorColor="primary"
                textColor="primary"
              >
                <Tab label="User Information" />
                {this.props.username === 'admin' ?
                <Tab label="Admin Tab" />
                : null }
              </Tabs>
              <TabPanel value={this.state.value} index={0}>
                <form noValidate>
                  <div className="form-row">
                    <div className="form-group col-md-4">
                      <TextField 
                        id="standard-basic" 
                        label="Username"
                        margin="normal" 
                        onChange={this.handleChange('username')}
                        value={this.state.username} 
                        disabled={true} />
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-group col-md-4">
                      <TextField 
                        id="standard-basic" 
                        label="Type" 
                        margin="normal"
                        onChange={this.handleChange('type')}
                        value={this.state.type} 
                        disabled={true} />
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-group col-md-4">
                      <TextField id="standard-basic" 
                        label="First name"
                        margin="normal"
                        onChange={this.handleChange('firstName')}
                        value={this.state.firstName} />
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-group col-md-4">
                      <TextField id="standard-basic" 
                        label="Last name" 
                        margin="normal"
                        onChange={this.handleChange('lastName')}
                        value={this.state.lastName} />
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-group col-md-4">
                      <TextField 
                        id="standard-basic" 
                        label="Address"
                        margin="normal"
                        onChange={this.handleChange('address')}
                        value={this.state.address} />
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-group col-md-4">
                      <TextField 
                        id="standard-basic" 
                        label="Country"
                        margin="normal"
                        onChange={this.handleChange('country')}
                        value={this.state.country} />
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-group col-md-4">
                      <TextField 
                        id="standard-basic" 
                        label="Phone number"
                        margin="normal"
                        onChange={this.handleChange('phoneNumber')}
                        value={this.state.phoneNumber} />
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-group col-md-4">
                      <TextField id="standard-basic" 
                        label="Gender" 
                        onChange={this.handleChange('gender')}
                        value={this.state.gender} />
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-group col-md-4">
                      <TextField 
                        id="standard-basic" 
                        label="Date of birth"
                        margin="normal" 
                        onChange={this.handleChange('dateOfBirth')}
                        value={this.state.dateOfBirth} /> 
                     </div>
                    </div>
                    <div className="form-row">
                      <p className="text-danger">{this.state.updateError}</p>
                      {this.state.updateSuccess ? <p className="text-success">The update is successful!</p> : null} {/*TODO: Clear message once form is changed after clear*/}
                    </div>
                  <Button variant="contained" onClick={this.updateInfo.bind(this)}>Update</Button>
                </form>
              </TabPanel>
                {this.props.username === 'admin' && !this.state.usersError ? 
                <TabPanel value={this.state.value} component="div" index={1}>
                  <TableContainer component={Paper}>
                    <Table aria-label="simple table">
                      <TableHead>
                        <TableRow>
                          <TableCell>Username</TableCell>
                          <TableCell align="right">Type</TableCell>
                          <TableCell align="right">Delete</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {this.state.usersData.map((row) => (
                          <TableRow key={row.username}>
                            <TableCell component="th" scope="row">
                              {row.username}
                            </TableCell>
                            <TableCell align="right">{row.type}</TableCell>
                            {row.username !== 'customer' ?  
                            <TableCell align="right">
                              <Button variant="contained" color="secondary" onClick={this.deleteUser.bind(this, row.username)} >
                                Delete
                              </Button>
                            </TableCell>
                            : null }
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                  <p className="text-success">{this.state.adminTabMessage}</p>
                  <p className="text-danger">{this.state.adminTabErrorMessage}</p>
                </TabPanel>
                :
                null
                }
                {this.state.usersError ?
                <div>
                  <p className="text-danger"> An error has occured trying to grab Users Data
                  </p>
                </div> 
                : null}
            </Paper>
          </div>
        :
          <div>
            <p classname="text-danger">An error has occured trying to grab user data!</p>
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

export default connect(mapStateToProps, actions)(User);

import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';

import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

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
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

class User extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      username: '',
      password: '',
      userError: false,
      value: 0
    }
    this.initData();
  }

  initData() {
    fetch(process.env.REACT_APP_BACKEND_ADDRESS + "/api/user/customer")
      .then(res => res.json())
      .then(
        (result) => this.setState({ data: result }),
      ).catch((error) => {
        this.setState({userError : true})
      });
  }

  render() {
    const data = this.state.data;

    const handleChange = (event, newValue) => {
      this.setState({value: newValue});
    };

    return (
      <div>
        {!this.state.userError && data ?
          <div>
            <h1>Welcome {data.username} !</h1>
            <Paper>
              <Tabs
                value={this.state.value}
                onChange={handleChange}
                indicatorColor="primary"
                textColor="primary"
              >
                <Tab label="Customer Info" />
                <Tab label="Flight History" />
                <Tab label="Admin Tab" />
              </Tabs>
              <TabPanel value={this.state.value} index={0}>
                Customer info
              </TabPanel>
              <TabPanel value={this.state.value} index={1}>
                Flight History
              </TabPanel>
              <TabPanel value={this.state.value} index={2}>
                Admin Tab
              </TabPanel>
            </Paper>
          </div>
        :
          <div>
            <p>An error has occured!</p>
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

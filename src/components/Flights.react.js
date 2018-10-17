import React from 'react';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';


export default class Flights extends React.Component {
  constructor(props) {
    super(props);

    this.minDate = new Date().toISOString().slice(0,10);

    this.state = {
      toLocation: 'Default',
      fromLocation: 'Default',
      tickets: 1,
      returnFlightType: true,
      oneWayFlightType: false,
      departureDate: this.minDate,
      returnDate: this.minDate
    };


    this.locations = [
        {
          value: "Default",
          label: "Please pick a location"
        },
        {
          value: "Earth",
          label: "Earth"
        },
        {
          value: "Jupiter",
          label: "Jupiter"
        },
        {
          value: "Mars",
          label: "Mars"
        },
        {
          value: "Planet-X",
          label: "Planet-X"
        },
        {
          value: "Pluto",
          label: "Pluto"
        },
        {
          value: "Saturn",
          label: "Saturn"
        }
    ];

    this.ticketsNum = [
      {
        value: 1,
        label: "1"
      },
      {
        value: 2,
        label: "2"
      },
      {
        value: 3,
        label: "3"
      },
      {
        value: 4,
        label: "4"
      },
      {
        value: 5,
        label: "5"
      },
      {
        value: 6,
        label: "6"
      },
    ];
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  changeFlightTypeReturn() {
    this.setState({returnFlightType : true});
    this.setState({oneWayFlightType : false});
  }

  changeFlightTypeOneWay() {
    this.setState({returnFlightType : false});
    this.setState({oneWayFlightType : true});
  }

  validToLocationCheck() {
    return (this.state.toLocation === 'Default' ? true : false);
  }

  validFromLocationCheck() {
    return (this.state.fromLocation === 'Default' ? true : false);
  }

  validDepartureDate() {
    return (this.state.departureDate < this.minDate ? true : false);
  }

  validReturnDate() {
    return (this.state.returnDate < this.minDate ? true : false);
  }

  render() {
    // const minDate = new Date().toISOString().slice(0,10);
    // const minDepartureDate = minDate;
    // const minReturnDate = minDate;  //Add 24 hours to this

    const invalidDates = this.state.departureDate >= this.state.returnDate ? true : false;
    console.log('ivd',this.state.departureDate, this.state.returnDate);

    return (
      <div>
        <form> {/*onSubmit*/}
          <div>
            <h1>Flights</h1>
            <div className="btn-group pb-1" role="group" aria-label="Navigation buttons" >
              <button type="button" className="btn btn-secondary" aria-pressed="true" onClick={this.changeFlightTypeReturn.bind(this)}>Return</button>
              <button type="button" className="btn btn-secondary" aria-pressed="true" onClick={this.changeFlightTypeOneWay.bind(this)}>One-Way</button>
            </div>
            <div className="form-row">
              <div className="form-group col-md-4">
                <TextField
                  id="standard-select-currency"
                  select
                  label="From"
                  value={this.state.toLocation}
                  onChange={this.handleChange('toLocation')}
                  SelectProps={{
                    MenuProps: {
                      className: "test",
                    },
                  }}
                  margin="normal"
                  error={this.validToLocationCheck()}
                >
                  {this.locations.map(option => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </div>
              <div className="form-group col-md-4">
              <TextField
                id="standard-select-currency"
                select
                label="To"
                value={this.state.fromLocation}
                onChange={this.handleChange('fromLocation')}
                SelectProps={{
                  MenuProps: {
                    className: "test",
                  },
                }}
                placeholder="Please select a from location"
                margin="normal"
                error={this.validFromLocationCheck()}
                >
                {this.locations.map(option => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
              </div>
              <p className="text-danger px-1">The locations cant match, please ensure that they are different.</p>
            </div>
            <div className="form-row">
              <div className="form-group col-md-4">
                <TextField
                  id="departure-date"
                  label="Departure Date"
                  type="date"
                  defaultValue={this.minDate}
                  onChange={this.handleChange('departureDate')}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  error={this.validDepartureDate()}
                />
              </div>
              <div className="form-group col-md-4">
              {!this.state.oneWayFlightType ?
                <TextField
                  id="return-date"
                  label="Return Date"
                  type="date"
                  defaultValue={this.minDate}
                  onChange={this.handleChange('returnDate')}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  error={this.validReturnDate()}
                />
                : null}
              </div>
              {invalidDates ? <p className="text-danger px-1">The departure date must be before the return date.</p>
              : null}
            </div>
            <div className="form-row">
              <div className="form-group col-md-4">
                <TextField
                  id="standard-select-tickets"
                  select
                  label="Number of Tickets"
                  value={this.state.tickets}
                  onChange={this.handleChange('tickets')}
                  SelectProps={{
                    MenuProps: {
                      className: "test",
                    },
                  }}
                  margin="normal"
                  helperText="Please select an amount of tickets"
                >
                  {this.ticketsNum.map(option => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </div>
            </div>
            <div className="form-row">
              <div className="form-group col-md-4">
                <Button variant="outlined">
                  Search
                </Button>
              </div>
            </div>
          </div>
        </form>
      </div>
    );
  }

}

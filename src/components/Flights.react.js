import React from 'react';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';

const cssStyles = {
  minWidth: 180
}

export default class Flights extends React.Component {
  constructor(props) {
    super(props);

    this.minDate = new Date().toISOString().slice(0,10);
    this.minReturnDate = new Date();
    this.minReturnDate.setDate(this.minReturnDate.getDate() + 1);
    this.minReturnDate = this.minReturnDate.toISOString().slice(0,10);

    this.state = {
      toLocation: '',
      fromLocation: '',
      tickets: '',
      returnFlightType: true,
      oneWayFlightType: false,
      departureDate: this.minDate,
      returnDate: this.minReturnDate
    };


    this.locations = [
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

  submitForm(e) {
    e.preventDefault();
    console.log('submit da form');
  }

  render() {
    //Need getTime Equivalent variables for compraison/validation
    const departureDate = new Date(this.state.departureDate).getTime();
    const returnDate = new Date(this.state.returnDate).getTime();
    const minDate = new Date(this.minDate).getTime();
    const minReturnDate = new Date(this.minReturnDate).getTime();

    const defaultDates = ((departureDate === minDate) && (returnDate === minReturnDate));
    const invalidDateOrder = departureDate >= returnDate;
    const validDepartureDate = departureDate < minDate;
    const validReturnDate = returnDate < minReturnDate;
    const invalidDates = !defaultDates && (invalidDateOrder || validDepartureDate);

    const defaultLocations = (this.state.toLocation && this.state.fromLocation) ? true : false;
    const invalidLocations = defaultLocations && (this.state.toLocation === this.state.fromLocation) ? true : false;

    const validTickets = this.state.tickets >= 1;

    const formStatus = !(!invalidDates && !invalidLocations && validTickets);

    return (
      <div>
        <form onSubmit={this.submitForm}>
          <div>
            <h1>Flights</h1>
            <div className="btn-group pb-1" role="group" aria-label="Navigation buttons" >
              <button type="button" className={this.state.returnFlightType ? 'btn btn-secondary active' : 'btn btn-secondary'} aria-pressed="true" onClick={this.changeFlightTypeReturn.bind(this)}>Return</button>
              <button type="button" className={this.state.oneWayFlightType ? 'btn btn-secondary active' : 'btn btn-secondary'} aria-pressed="true" onClick={this.changeFlightTypeOneWay.bind(this)}>One-Way</button>
            </div>
            <div className="form-row">
              <div className="form-group col-md-4">
                <FormControl  style={cssStyles}>
                  <InputLabel htmlFor="from-simple">To</InputLabel>
                  <Select
                    value={this.state.toLocation}
                    onChange={this.handleChange('toLocation')}
                    inputProps={{
                      name: "to",
                      id: "to-simple"
                    }}
                  >
                  {this.locations.map(option => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                  </Select>
                </FormControl>
              </div>
              <div className="form-group col-md-4">
              <FormControl  style={cssStyles}>
                <InputLabel htmlFor="from-simple">From</InputLabel>
                <Select
                  value={this.state.fromLocation}
                  onChange={this.handleChange('fromLocation')}
                  inputProps={{
                    name: "from",
                    id: "from-simple"
                  }}
                >
                {this.locations.map(option => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
                </Select>
              </FormControl>
              </div>
              { invalidLocations ?
                <p className="text-danger px-1">The locations cant match, please ensure that they are different.</p>
              : null }
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
                  error={validDepartureDate}
                />
              </div>
              <div className="form-group col-md-4">
              {!this.state.oneWayFlightType ?
                <TextField
                  id="return-date"
                  label="Return Date"
                  type="date"
                  defaultValue={this.minReturnDate}
                  onChange={this.handleChange('returnDate')}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  error={validReturnDate}
                />
                : null}
              </div>
              {invalidDateOrder ? <p className="text-danger px-1">The departure date must be before the return date.</p>
              : null}
            </div>
            <div className="form-row">
              <div className="form-group col-md-4">
                <FormControl style={cssStyles}>
                  <InputLabel htmlFor="tickets-simple">Number of Tickets</InputLabel>
                  <Select
                    value={this.state.tickets}
                    onChange={this.handleChange('tickets')}
                    inputProps={{
                      name: "tickets",
                      id: "tickets-simple"
                    }}
                  >
                  {this.ticketsNum.map(option => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                  </Select>
                </FormControl>
              </div>
            </div>
            <div className="form-row">
              <div className="form-group col-md-4">
                <Button variant="outlined" disabled={formStatus} type="submit">
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

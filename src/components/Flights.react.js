import React from 'react';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import LinearProgress from '@material-ui/core/LinearProgress';
import DateFormat from 'dateformat';
import NumberFormat from 'react-number-format';

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
    this.flightLength = Math.floor(Math.random() * 41) + 40;

    this.state = {
      toLocation: '',
      fromLocation: '',
      ticketsAmt: '',
      returnFlightType: true,
      oneWayFlightType: false,
      departureDate: this.minDate,
      returnDate: this.minReturnDate,
      displayResults: false,
      displayArrivalResults: false,
      loadingScreen: false,
      displayDepartureResults: false,
      displayFlightPicked: false,
      flighData: []
    };

    this.totalFlightsSubtotal = 0;
    this.totalFlightsTaxtotal = 0;
    this.totalFlightsCost = 0;


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
    //Switch used to change the initial form from Return to One-Way
    this.setState({returnFlightType : true});
    this.setState({oneWayFlightType : false});
  }

  changeFlightTypeOneWay() {
    //Switch used to change the initial form from One-Way to Return
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

    this.departureflightResults = this.getDepartureFlightStatus();

    this.setState({displayResults : true});
    this.setState({loadingScreen : true});

    setTimeout(function(e) {
      this.setState({loadingScreen : false});
      this.setState({displayDepartureResults : true});
    }.bind(this), 3000);
  }

  pickDepartureFlight(res) {
      this.setState({displayDepartureResults : false});

      this.flightData = [ res ];

      if (this.state.returnFlightType) {
        this.setState({loadingScreen : true});
        setTimeout(function(e) {
          this.setState({loadingScreen : false});
          this.setState({displayArrivalResults : true});
        }.bind(this), 3000);

        this.returnFlightResults = this.getReturnFlightStatus();
      } else {
        this.calculateFlightCosts();
        this.setState({displayArrivalResults : false});
        this.setState({displayFlightPicked : true});
      }

    }

getDepartureFlightStatus() {
  const departureTimes = [6, 10, 14, 18, 22];

  const flightLength = this.flightLength;

  const departureDate = this.state.departureDate;

  const fromLocation = this.state.fromLocation;
  const toLocation = this.state.toLocation;

  const ticketsAmt = this.state.ticketsAmt;

  const flightTime6 = departureTimes[0];
  const departureTime6 = this.getDepartureTime(departureDate, flightTime6);

  const flightTime10 = departureTimes[1];
  const departureTime10 = this.getDepartureTime(departureDate, flightTime10);

  const flightTime14 = departureTimes[2];
  const departureTime14 = this.getDepartureTime(departureDate, flightTime14);

  const flightTime18 = departureTimes[3];
  const departureTime18 = this.getDepartureTime(departureDate, flightTime18);

  const flightTime22 = departureTimes[4];
  const departureTime22 = this.getDepartureTime(departureDate, flightTime22);

  const flightObj = [
    this.createFlightObj(this.getFlightId(fromLocation, 1, toLocation, departureDate),
      toLocation,
      fromLocation,
      this.getArrivalTime(departureTime6, flightTime6, flightLength),
      this.getDepartureTime(departureDate, flightTime6),
      flightLength,
      this.calculateFlightPrice(this.getDepartureTime(departureDate , flightTime6)),
      ticketsAmt
    ),
    this.createFlightObj(this.getFlightId(fromLocation, 2, toLocation, departureDate),
      toLocation,
      fromLocation,
      this.getArrivalTime(departureTime10, flightTime10, flightLength),
      this.getDepartureTime(departureDate, flightTime10),
      flightLength,
      this.calculateFlightPrice(this.getDepartureTime(departureDate , flightTime10)),
      ticketsAmt
    ),
    this.createFlightObj(this.getFlightId(fromLocation, 3, toLocation, departureDate),
      toLocation,
      fromLocation,
      this.getArrivalTime(departureTime14, flightTime14, flightLength),
      this.getDepartureTime(departureDate, flightTime14),
      flightLength,
      this.calculateFlightPrice(this.getDepartureTime(departureDate, flightTime14)),
      ticketsAmt
    ),
    this.createFlightObj(this.getFlightId(fromLocation, 4, toLocation, departureDate),
      toLocation,
      fromLocation,
      this.getArrivalTime(departureTime18, flightTime18, flightLength),
      this.getDepartureTime(departureDate, flightTime18),
      flightLength,
      this.calculateFlightPrice(this.getDepartureTime(departureDate, flightTime18)),
      ticketsAmt
    ),
    this.createFlightObj(this.getFlightId(fromLocation, 5, toLocation, departureDate),
      toLocation,
      fromLocation,
      this.getArrivalTime(departureTime22, flightTime22, flightLength),
      this.getDepartureTime(departureDate, flightTime22),
      flightLength,
      this.calculateFlightPrice(this.getDepartureTime(departureDate, flightTime22)),
      ticketsAmt
    ) ];

  return flightObj;
}

getReturnFlightStatus() {
  const returnTimes = [7, 11, 15, 19, 23];

  const flightLength = this.flightLength;

  const returnDate = this.state.returnDate;

  const fromLocation = this.state.toLocation;
  const toLocation = this.state.fromLocation;

  const ticketsAmt = this.state.ticketsAmt;

  const flightTime7 = returnTimes[0];
  const departureTime7 = this.getDepartureTime(returnDate, flightTime7);

  const flightTime11 = returnTimes[1];
  const departureTime11 = this.getDepartureTime(returnDate, flightTime11);

  const flightTime15 = returnTimes[2];
  const departureTime15 = this.getDepartureTime(returnDate, flightTime15);

  const flightTime19 = returnTimes[3];
  const departureTime19 = this.getDepartureTime(returnDate, flightTime19);

  const flightTime23 = returnTimes[4];
  const departureTime23 = this.getDepartureTime(returnDate, flightTime23);

  const flightObj = [
    this.createFlightObj(this.getFlightId(fromLocation, 1, toLocation, returnDate),
      toLocation,
      fromLocation,
      this.getArrivalTime(departureTime7, flightTime7, flightLength),
      this.getDepartureTime(returnDate, flightTime7),
      flightLength,
      this.calculateFlightPrice(this.getDepartureTime(returnDate, flightTime7)),
      ticketsAmt
    ),
    this.createFlightObj(this.getFlightId(fromLocation, 2, toLocation, returnDate),
      toLocation,
      fromLocation,
      this.getArrivalTime(departureTime11, flightTime11, flightLength),
      this.getDepartureTime(returnDate , flightTime11),
      flightLength,
      this.calculateFlightPrice(this.getDepartureTime(returnDate , flightTime11)),
      ticketsAmt
    ),
    this.createFlightObj(this.getFlightId(fromLocation, 3, toLocation, returnDate),
      toLocation,
      fromLocation,
      this.getArrivalTime(departureTime15, flightTime15, flightLength),
      this.getDepartureTime(returnDate, flightTime15),
      flightLength,
      this.calculateFlightPrice(this.getDepartureTime(returnDate, flightTime15)),
      ticketsAmt
    ),
    this.createFlightObj(this.getFlightId(fromLocation, 4, toLocation, returnDate),
      toLocation,
      fromLocation,
      this.getArrivalTime(departureTime19, flightTime19, flightLength),
      this.getDepartureTime(returnDate, flightTime19),
      flightLength,
      this.calculateFlightPrice(this.getDepartureTime(returnDate, flightTime19)),
      ticketsAmt
    ),
    this.createFlightObj(this.getFlightId(fromLocation, 5, toLocation, returnDate),
      toLocation,
      fromLocation,
      this.getArrivalTime(departureTime23, flightTime23, flightLength),
      this.getDepartureTime(returnDate, flightTime23),
      flightLength,
      this.calculateFlightPrice(this.getDepartureTime(returnDate, flightTime23)),
      ticketsAmt
    ) ];

  return flightObj;
}

createFlightObj(flightId, toLocation, fromLocation, arrivalTime,
  departureTime, flightTimeLength, flightPrice, ticketsAmt) {
    const flightObj = {
    'flightId' : flightId,
    'arrivalLocation' : toLocation,
    'departureLocation' : fromLocation,
    'arrivalTime' : arrivalTime,
    'departureTime' : departureTime,
    'flightTimeLength' : flightTimeLength,
    'flightPrice' : flightPrice,
    'ticketsAmt' : ticketsAmt
    };
  return flightObj;
}

getDepartureTime(date, hours) {
  let dateOut = new Date(date);
  dateOut.setHours(hours, 0, 0);
  return dateOut;
}

getArrivalTime(departureDate, departHour, flightLength) {
  if (!departureDate) { return; }

  const date = departureDate;
  date.setHours(date.getHours() + flightLength);
  return date;
}

getFlightId(fromLocation, flightNumber, toLocation, departureDate) {
  let departureDateNew = new Date(departureDate);
  const flightId = fromLocation.substring(0, 2).toUpperCase() + '-' + flightNumber + '-' + toLocation.substring(0, 2).toUpperCase()
  + '-' + departureDateNew.getMonth() + departureDateNew.getDate() + departureDateNew.getFullYear().toString().substring(2, 4);

  return flightId;
}

calculateFlightPrice(departureDate) {
  let price = 100;

  // Calculate price based on departure day of week
  if ( departureDate.getDay() <= 2 ) {
    price = price * 1.1;
  } else if ( departureDate.getDay() >= 3 && departureDate.getDay() >= 5 ) {
    price = price * 1.5;
  } else {
    price = price * 1.25;
  }

  // Calculate price based on departure arrivalTimes
  if ( departureDate.getHours() <= 8  ) {
    price = price * 0.8;
  } else if ( departureDate.getHours() <= 9 && departureDate.getHours() <= 14 ) {
    price = price * 1.4;
  } else if ( departureDate.getHours() <= 15 && departureDate.getHours() <= 23 ) {
    price = price * 1.15;
  }

  // round price to 2 decimals
  price = +price.toFixed(2);

  return price;
}

pickReturnFlight(flightReturnData) {
    this.setState({displayArrivalResults : false});
    this.setState({displayFlightPicked : true});

    this.flightData.push(flightReturnData);

    this.calculateFlightCosts();
  }

calculateFlightCosts() {
    const taxAmt = 0.15;
    const departureFlightCost = this.flightData[0].flightPrice ? this.flightData[0].flightPrice : 0;
    const returnFlightCost = this.flightData[1] ? this.flightData[1].flightPrice : 0;
    const ticketsAmt = this.state.ticketsAmt;

    this.totalFlightsSubtotal = (departureFlightCost + returnFlightCost) * ticketsAmt;
    this.totalFlightsTaxtotal = (+this.totalFlightsSubtotal) * taxAmt;
    this.totalFlightsCost = (Math.round(this.totalFlightsSubtotal * 100) / 100)  + (Math.round(this.totalFlightsTaxtotal * 100) / 100);
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

    const validTickets = this.state.ticketsAmt >= 1;

    const formStatus = !(!invalidDates && !invalidLocations && validTickets);

    return (
      <div>
        <form onSubmit={this.submitForm.bind(this)}>
          {!this.state.loadingScreen && !this.state.displayDepartureResults && !this.state.displayArrivalResults && !this.state.displayFlightPicked ?
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
                      value={this.state.ticketsAmt}
                      onChange={this.handleChange('ticketsAmt')}
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
          : null}
          {this.state.loadingScreen ?
            <div>
              <h1>Loading Flights...</h1>
               <LinearProgress />
            </div>
          : null}
          {this.state.displayDepartureResults ?
            <div>
              <h1> Please pick a departure flight! </h1>
              <ul className="list-group">
                {
                  this.departureflightResults.map(res =>
                  <li className="list-group-item" key={res.flightId}>
                    <p> <span className="font-weight-bold"> {res.flightId} </span> </p>
                    <p> <span className="font-weight-bold"> {res.departureLocation} </span> to <span className="font-weight-bold"> {res.arrivalLocation} </span> - <span className="font-weight-bold">Trip Length:</span> {res.flightTimeLength} Hours </p>
                    <p className="mb-1"><span className="font-weight-bold">Departure:</span> {DateFormat(res.departureTime, "mmm dd, yyyy, h:MM:ss TT")} </p>
                    <p className="mb-1"><span className="font-weight-bold">Arrival:</span> {DateFormat(res.arrivalTime, "mmm dd, yyyy, h:MM:ss TT")} </p>
                    <br/>
                    <span className="font-weight-bold">Price:</span> <NumberFormat value={res.flightPrice} displayType={'text'} thousandSeparator={true} prefix={'$'} decimalScale={2} fixedDecimalScale={true} />
                    <button type="button" className="btn btn-primary float-right" onClick={this.pickDepartureFlight.bind(this, res)}>Select</button>
                  </li>
                  )
                }
              </ul>
            </div>
          : null}
          {this.state.returnFlightType && this.state.displayArrivalResults ?
            <div>
              <h1> Please pick a return flight! </h1>
              <ul className="list-group">
                {
                  this.returnFlightResults.map(res =>
                  <li className="list-group-item" key={res.flightId}>
                    <p> <span className="font-weight-bold"> {res.flightId} </span> </p>
                    <p> <span className="font-weight-bold"> {res.departureLocation} </span> to <span className="font-weight-bold"> {res.arrivalLocation} </span> - <span className="font-weight-bold">Trip Length:</span> {res.flightTimeLength} Hours </p>
                    <p className="mb-1"><span className="font-weight-bold">Departure:</span> {DateFormat(res.departureTime, "mmm dd, yyyy, h:MM:ss TT")} </p>
                    <p className="mb-1"><span className="font-weight-bold">Arrival:</span> {DateFormat(res.arrivalTime, "mmm dd, yyyy, h:MM:ss TT")} </p>
                    <br/>
                    <span className="font-weight-bold">Price:</span> <NumberFormat value={res.flightPrice} displayType={'text'} thousandSeparator={true} prefix={'$'} decimalScale={2} fixedDecimalScale={true} />
                    <button type="button" className="btn btn-primary float-right" onClick={this.pickReturnFlight.bind(this, res)}>Select</button>
                  </li>
                  )
                }
              </ul>
            </div>
          : null }
          { this.state.displayFlightPicked ?
            <div>
              <h1>Congrats for your booking!</h1>
              <ul className="list-group">
              {
                this.flightData.map((res, index) =>
                  <li className="list-group-item" key={res.flightId}>
                    {index === 0 ? <h2>Departure Flight:</h2> : null }
                    {index === 1 ? <h2>Return Flight:</h2> : null }
                    <p> <span className="font-weight-bold">Flight Id: {res.flightId}</span></p>
                    <p> <span className="font-weight-bold">Number of Tickets: {res.ticketsAmt}</span></p>
                    <p> <span className="font-weight-bold">{res.departureLocation}res</span> to <span className="font-weight-bold">{res.arrivalLocation}</span> - <span className="font-weight-bold">Trip Length:</span> { res.flightTimeLength } Hours </p>
                    <p className="mb-1"><span className="font-weight-bold">Departure:</span> {DateFormat(res.departureTime, "mmm dd, yyyy, h:MM:ss TT")} </p>
                    <p className="mb-1"><span className="font-weight-bold">Arrival:</span> {DateFormat(res.arrivalTime, "mmm dd, yyyy, h:MM:ss TT")} </p>
                    <br/>
                    <span className="font-weight-bold">Price per ticket:</span> <NumberFormat value={res.flightPrice} displayType={'text'} thousandSeparator={true} prefix={'$'} decimalScale={2} fixedDecimalScale={true} />
                  </li>
                )
              }
              <li className="list-group-item">
              <p>Subtotal: <NumberFormat value={this.totalFlightsSubtotal} displayType={'text'} thousandSeparator={true} prefix={'$'} decimalScale={2} fixedDecimalScale={true} /></p>
              <p>Tax: <NumberFormat value={this.totalFlightsTaxtotal} displayType={'text'} thousandSeparator={true} prefix={'$'} decimalScale={2} fixedDecimalScale={true} /></p>
              <p>Total Price: <NumberFormat value={this.totalFlightsCost} displayType={'text'} thousandSeparator={true} prefix={'$'} decimalScale={2} fixedDecimalScale={true} /></p>
              <p>Thank you for flying with Zzpace!</p>
              </li>
              </ul>
            </div>
          : null}
        </form>
      </div>
    );
  }

}

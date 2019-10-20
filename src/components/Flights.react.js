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

import locationsData from '../data/locations.json';
import ticketsNumData from '../data/ticketsNum.json';

import dailyDealCalc from '../common/dailyDeal.js';

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
      flightData: [],
      returnFlightResults: [],
      departureFlightResults: [],
      flightsDataError: false,
      dailyDealData: [],
      dailyDealError: false,
      discountAmount: 0
    };

    this.totalFlightsSubtotal = 0;
    this.totalFlightsTaxtotal = 0;
    this.totalFlightsCost = 0;

    this.locations = locationsData;
    this.ticketsNum = ticketsNumData;
  }

  componentDidMount() {
    fetch(process.env.REACT_APP_BACKEND_ADDRESS + "/api/dailyDeals")
      .then(res => res.json())
      .then(
        (result) => this.setState({ dailyDealData: result }),
      ).catch((error) => {
        this.setState({dailyDealError : true})
      });
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

    const flightFormData = this.createFlightFormPostData("departure");

    fetch(process.env.REACT_APP_BACKEND_ADDRESS + "/api/processFlights" + flightFormData)
      .then(res => res.json())
      .then(
        (result) => this.setState({ departureFlightResults: result }),
      ).catch((error) => {
        this.setState({flightsDataError : true})
      });

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

        const flightFormData = this.createFlightFormPostData("return");

        fetch(process.env.REACT_APP_BACKEND_ADDRESS + "/api/processFlights" + flightFormData)
          .then(res => res.json())
          .then(
            (result) => this.setState({ returnFlightResults: result }),
          ).catch((error) => {
            this.setState({flightsDataError : true})
          });

      } else {
        this.calculateFlightCosts();
        this.setState({displayArrivalResults : false});
        this.setState({displayFlightPicked : true});
      }

    }

pickReturnFlight(flightReturnData) {
    this.setState({displayArrivalResults : false});
    this.setState({displayFlightPicked : true});

    this.flightData.push(flightReturnData);

    this.calculateFlightCosts();
  }

  createFlightFormPostData(travelType) {
    //TODO:CHECK IF RETURNDATE IS INVALID
    const flightParamString = '?type=' + travelType +
                       '&toLocation=' + this.state.fromLocation +
                       '&fromLocation=' + this.state.toLocation +
                       '&departureDate=' + this.state.departureDate +
                       '&returnDate=' + this.state.returnDate +
                       '&ticketsAmt=' + this.state.ticketsAmt;
    return flightParamString;
  }

calculateFlightCosts() {
    const taxAmt = 0.15;
    const departureFlightCost = this.flightData[0].flightPrice ? this.flightData[0].flightPrice : 0;
    const returnFlightCost = this.flightData[1] ? this.flightData[1].flightPrice : 0;
    const ticketsAmt = this.state.ticketsAmt;

    this.totalFlightsSubtotal = this.calculateDiscount((departureFlightCost + returnFlightCost) * ticketsAmt);
    this.totalFlightsTaxtotal = (+this.totalFlightsSubtotal) * taxAmt;
    this.totalFlightsCost = (Math.round(this.totalFlightsSubtotal * 100) / 100)  + (Math.round(this.totalFlightsTaxtotal * 100) / 100);
  }

  calculateDiscount(subTotal) {
    if (!this.state.dailyDealError) {
      const discountData = dailyDealCalc(this.state.dailyDealData, "Flights", subTotal);
      this.setState({discountAmount: discountData.discountAmount});
      return discountData.newTotal;
    } else {
      return subTotal;
    }
  }

  render() {
    //Need getTime Equivalent variables for compraison/validation
    const departureDate = new Date(this.state.departureDate).getTime();
    const returnDate = new Date(this.state.returnDate).getTime();
    const minDate = new Date(this.minDate).getTime();
    const minReturnDate = new Date(this.minReturnDate).getTime();

    const defaultDates = ((departureDate === minDate) && (returnDate === minReturnDate));
    const invalidDateOrder = this.state.returnFlightType && departureDate >= returnDate;
    const validDepartureDate = departureDate < minDate;
    const validReturnDate = returnDate < minReturnDate;
    const invalidDates = !defaultDates && (invalidDateOrder || validDepartureDate);

    const defaultLocations = (this.state.toLocation && this.state.fromLocation) ? true : false;
    const invalidLocations = defaultLocations && (this.state.toLocation === this.state.fromLocation) ? true : false;

    const validTickets = this.state.ticketsAmt >= 1;

    const formStatus = !(!invalidDates && !invalidLocations && validTickets);

    return (
      <div>
        {this.state.flightsDataError ?
          <div><h1>Sorry an error occured, please try again!</h1></div>
        :
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
                  this.state.departureFlightResults.map(res =>
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
                  this.state.returnFlightResults.map(res =>
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
                    <p> <span className="font-weight-bold">{res.departureLocation}</span> to <span className="font-weight-bold">{res.arrivalLocation}</span> - <span className="font-weight-bold">Trip Length:</span> { res.flightTimeLength } Hours </p>
                    <p className="mb-1"><span className="font-weight-bold">Departure:</span> {DateFormat(res.departureTime, "mmm dd, yyyy, h:MM:ss TT")} </p>
                    <p className="mb-1"><span className="font-weight-bold">Arrival:</span> {DateFormat(res.arrivalTime, "mmm dd, yyyy, h:MM:ss TT")} </p>
                    <br/>
                    <span className="font-weight-bold">Price per ticket:</span> <NumberFormat value={res.flightPrice} displayType={'text'} thousandSeparator={true} prefix={'$'} decimalScale={2} fixedDecimalScale={true} />
                  </li>
                )
              }
              <li className="list-group-item">
              <p> <span className="font-weight-bold">Subtotal:</span> <NumberFormat value={this.totalFlightsSubtotal} displayType={'text'} thousandSeparator={true} prefix={'$'} decimalScale={2} fixedDecimalScale={true} /></p>
              {  this.state.discountAmount > 0 ?
                <p> Congrats you have saved <NumberFormat value={this.state.discountAmount} displayType={'text'} thousandSeparator={true} prefix={'$'} decimalScale={2} fixedDecimalScale={true} /> on your subtotal because of today's deal - { this.state.dailyDealData.title } </p>
                : null }
              <p> <span className="font-weight-bold">Tax:</span> <NumberFormat value={this.totalFlightsTaxtotal} displayType={'text'} thousandSeparator={true} prefix={'$'} decimalScale={2} fixedDecimalScale={true} /></p>
              <p> <span className="font-weight-bold">Total Price:</span> <NumberFormat value={this.totalFlightsCost} displayType={'text'} thousandSeparator={true} prefix={'$'} decimalScale={2} fixedDecimalScale={true} /></p>
              <p>Thank you for flying with Zzpace!</p>
              </li>
              </ul>
            </div>
          : null}
        </form>
        }
      </div>
    );
  }

}

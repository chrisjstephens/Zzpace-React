import React from 'react';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import LinearProgress from '@material-ui/core/LinearProgress';
import NumberFormat from 'react-number-format';

import locationsData from '../data/locations.json';

const cssStyles = {
  minWidth: 180
}

export default class Hotels extends React.Component {
  constructor(props) {
    super(props);

    this.minDate = new Date().toISOString().slice(0,10);
    this.minCheckOutDate = new Date();
    this.minCheckOutDate.setDate(this.minCheckOutDate.getDate() + 1);
    this.minCheckOutDate = this.minCheckOutDate.toISOString().slice(0,10);

    this.state = {
      hotelLocation: '',
      checkInDate: this.minDate,
      checkOutDate: this.minCheckOutDate,
      hotelsDataError: false,
      displayResults: false,
      loadingScreen: false,
      displayHotelFirstResults: false,
      displayHotelSecondResults: false,
      displayFinalHotelResults: false,
      firstHotelResults: [],
      secondHotelResults: []
    }

    this.locations = locationsData;
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  submitForm(e) {
    e.preventDefault();

    const hotelsFormData = this.createHotelFormPostData('listHotels');

    fetch(process.env.REACT_APP_BACKEND_ADDRESS + "/api/processHotels" + hotelsFormData)
      .then(res => res.json())
      .then(
        (result) => this.setState({ firstHotelResults: result }),
      ).catch((error) => {
        this.setState({hotelsDataError : true})
      });

      this.setState({displayResults : true});
      this.setState({loadingScreen : true});

      setTimeout(function(e) {
        this.setState({loadingScreen : false});
        this.setState({displayHotelFirstResults : true});
      }.bind(this), 3000);
  }

  createHotelFormPostData() {
    const hotelParamString = '?type=listHotels'+
                        '&hotelLocation=' + this.state.hotelLocation +
                        '&checkInDate=' + this.state.checkInDate +
                        '&checkOutDate=' + this.state.checkOutDate;

    return hotelParamString;
  }

  createHotelRoomTypeData(travelData) {
    const hotelRoomTypeString = '?type=getRoomType' +
                          '&hotelLocation=' + travelData.hotelLocation +
                          '&checkInDate=' + travelData.checkInDate +
                          '&checKOutDate=' + travelData.checkOutDate +
                          '&hotelName=' + travelData.hotelName +
                          '&hotelPrice= ' + travelData.price;

    return hotelRoomTypeString;
  }

  pickHotel(hotelData) {
    this.setState({displayHotelFirstResults : false});
    this.setState({loadingScreen : true});

    const hotelsFormData = this.createHotelRoomTypeData(hotelData);

    fetch(process.env.REACT_APP_BACKEND_ADDRESS + "/api/processHotels" + hotelsFormData)
      .then(res => res.json())
      .then(
        (result) => this.setState({ secondHotelResults: result }),
      ).catch((error) => {
        this.setState({hotelsDataError : true})
      });

    setTimeout(function(e) {
      this.setState({loadingScreen: false});
      this.setState({displayHotelSecondResults: true});
    }.bind(this), 3000);
  }

  pickHotelRoomType(hotelRoomData) {
    this.hotelRoomData = hotelRoomData;
    
    this.setState({displayHotelSecondResults: false});
    this.setState({loadingScreen: true});

    setTimeout(function(e) {
      this.setState({loadingScreen: false});
      this.setState({displayFinalHotelResults: true});
    }.bind(this), 3000);

    this.calculateHotelCosts();
  }

  calculateHotelCosts() {
    const taxAmt = 0.15;
    const hotelRoomCost = this.hotelRoomData.price;
    const hotelRoomNights = Math.floor(( Date.parse(this.state.checkOutDate) - Date.parse(this.state.checkInDate) ) / 86400000)

    this.totalHotelsSubtotal = hotelRoomCost * hotelRoomNights;
    this.totalHotelsTaxtotal = (+this.totalHotelsSubtotal) * taxAmt;
    this.totalHotelsCost = (Math.round(this.totalHotelsSubtotal * 100) / 100)  + (Math.round(this.totalHotelsTaxtotal * 100) / 100);
  }

  render() {
    const checkInDate = new Date(this.state.checkInDate).getTime();
    const checkOutDate = new Date(this.state.checkOutDate).getTime();
    const minDate = new Date(this.minDate).getTime();
    const minCheckOutDate = new Date(this.minCheckOutDate).getTime();

    const defaultDates = ((checkInDate === minDate) && (checkOutDate === minCheckOutDate));
    const invalidDateOrder = checkInDate >= checkOutDate;
    const validCheckInDate = checkInDate < minDate;
    const validCheckOutDate = checkOutDate < minCheckOutDate;
    const invalidDates = !defaultDates && (invalidDateOrder || validCheckInDate);

    const defaultLocations = this.state.hotelLocation ? true : false;
    const formStatus = !(!invalidDates && defaultLocations);

    return (
      <div>
        {this.state.hotelsDataError ?
          <div><h1>Sorry an error occured, please try again!</h1></div>
        :
          <form onSubmit={this.submitForm.bind(this)}>
            {!this.state.loadingScreen && !this.state.displayHotelFirstResults && !this.state.displayHotelSecondResults && !this.state.displayFinalHotelResults ?
            <div>
              <h1>Hotels</h1>
              <div className="form-row">
                <div className="form-group col-md-4">
                  <FormControl  style={cssStyles}>
                    <InputLabel htmlFor="loc-simple">Hotel Location</InputLabel>
                    <Select
                      value={this.state.hotelLocation}
                      onChange={this.handleChange('hotelLocation')}
                      inputProps={{
                        name: "location",
                        id: "loc-simple"
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
              </div>
              <div className="form-row">
                <div className="form-group col-md-4">
                  <TextField
                    id="check-in-date"
                    label="Check-in"
                    type="date"
                    defaultValue={this.minDate}
                    onChange={this.handleChange('checkInDate')}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    error={validCheckInDate}
                  />
                </div>
                <div className="form-group col-md-4">
                  <TextField
                    id="check-out-date"
                    label="Check-out"
                    type="date"
                    defaultValue={this.minCheckOutDate}
                    onChange={this.handleChange('checkOutDate')}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    error={validCheckOutDate}
                  />
                </div>
                {invalidDateOrder ? <p className="text-danger px-1">The check-in date must be before the check-out date.</p>
                : null}
              </div>
              <div className="form-row">
                <div className="form-group col-md-4">
                  <Button variant="outlined" disabled={formStatus} type="submit">
                    Search
                  </Button>
                </div>
              </div>
            </div>
            : null }
            {this.state.loadingScreen ?
              <div>
                <h1>Loading Hotels...</h1>
                 <LinearProgress />
              </div>
            : null}
            {this.state.displayHotelFirstResults ?
            <div>
            <h1> Please pick your hotel! </h1>
              <ul className="list-group">
                {
                  this.state.firstHotelResults.map((res, index) =>
                    <li className="list-group-item" key={res.hotelName}>
                      <p> <span className="font-weight-bold"> {res.hotelName}-{res.hotelLocation} </span> - {res.rating} Stars </p>
                      <p> <span className="font-weight-bold">Price:</span> <NumberFormat value={res.price} displayType={'text'} thousandSeparator={true} prefix={'$'} decimalScale={2} fixedDecimalScale={true} /> per night </p>
                      <button type="button" className="btn btn-primary float-right" onClick={this.pickHotel.bind(this, this.state.firstHotelResults[index])}>Select</button>
                    </li>
                  )
                  }
              </ul>
            </div>
           : null}
           {this.state.displayHotelSecondResults ?
             <div>
               <h1>Please pick your hotel room type!</h1>
               <ul className="list-group">
               {
                 this.state.secondHotelResults.map((res, index) =>
                 <li className="list-group-item" key={res.roomType}>
                   <p> <span className="font-weight-bold">Room Type:</span> {res.roomType} </p>
                   <p> {res.description} </p>
                   <p> <span className="font-weight-bold">Price:</span> <NumberFormat value={res.price} displayType={'text'} thousandSeparator={true} prefix={'$'} decimalScale={2} fixedDecimalScale={true} /> per night </p>
                   <button type="button" className="btn btn-primary float-right" onClick={this.pickHotelRoomType.bind(this, res)}>Select</button>
                 </li>
               )
               }
               </ul>
             </div>
           : null}
           {this.state.displayFinalHotelResults ?
             <div>
                <h1>Congrats for your booking!</h1>
                <ul className="list-group">
                  <li className="list-group-item">
                    <h2>Hotel Booking:</h2>
                    <p> <span className="font-weight-bold">Hotel Name: </span>{this.hotelRoomData.hotelName}-{this.hotelRoomData.hotelLocation} - {this.hotelRoomData.roomType}</p>
                    <p> <span className="font-weight-bold">Check-in Date: </span>{this.state.checkInDate}</p>
                    <p> <span className="font-weight-bold">Check-out Date: </span>{this.state.checkOutDate}</p>
                    <p> <span className="font-weight-bold">Price: </span> <NumberFormat value={this.hotelRoomData.price} displayType={'text'} thousandSeparator={true} prefix={'$'} decimalScale={2} fixedDecimalScale={true} /> per night</p>
                  </li>
                  <li className="list-group-item">
                    <p> <span className="font-weight-bold">Subtotal: </span> <NumberFormat value={this.totalHotelsSubtotal} displayType={'text'} thousandSeparator={true} prefix={'$'} decimalScale={2} fixedDecimalScale={true} /></p>
                    <p> <span className="font-weight-bold">Tax: </span> <NumberFormat value={this.totalHotelsTaxtotal} displayType={'text'} thousandSeparator={true} prefix={'$'} decimalScale={2} fixedDecimalScale={true} /></p>
                    <p> <span className="font-weight-bold">Total Price: </span> <NumberFormat value={this.totalHotelsCost} displayType={'text'} thousandSeparator={true} prefix={'$'} decimalScale={2} fixedDecimalScale={true} /></p>
                    <p> Thank you for choosing your hotels with Zzpace!</p>
                  </li>
                </ul>
             </div>
           : null }
          </form>
        }
      </div>
    );
  };
}

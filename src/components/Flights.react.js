import React from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';

export default class Flights extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      toLocation: 'Earth',
      fromLocation: 'Earth'
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
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };


  render() {
    return (
      <div>
        <form>
          <div>
            <h1>Flights</h1>
            <div className="btn-group pb-1" role="group" aria-label="Navigation buttons" >
              <button type="button" className="btn btn-secondary"  aria-pressed="true">Return</button>
              <button type="button" className="btn btn-secondary"  aria-pressed="true">One-Way</button>
            </div>
            <div className="form-row">
              <div className="form-group col-md-4">
                <TextField
                  id="standard-select-currency"
                  select
                  label="From"
                  value={this.state.toLocation}
                  onChange={this.handleChange('toLication')}
                  SelectProps={{
                    MenuProps: {
                      className: "test",
                    },
                  }}
                  helperText="Please select a to location"
                  margin="normal"
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
                helperText="Please select a from location"
                margin="normal"
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
                  defaultValue="2017-05-24"
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </div>
              <div className="form-group col-md-4">
              <TextField
                id="return-date"
                label="Departure Date"
                type="date"
                defaultValue="2017-05-24"
                InputLabelProps={{
                  shrink: true,
                }}
              />
              </div>
              <p className="text-danger    -1">The departure date must be before the return date.</p>
            </div>
            <div className="form-row">
              <div className="form-group col-md-4">

              </div>
            </div>
            <div className="form-row">
              <div className="form-group col-md-4">

              </div>
            </div>
          </div>
        </form>
      </div>
    );
  }

}

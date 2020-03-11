import React from 'react';
import { shallow } from 'enzyme';

import Flights from '../Flights.react.js';
import locationsData from '../../data/locations.json';

let wrapped;

beforeEach(() => {
  wrapped = shallow(<Flights />);
});

describe('initial flights forms tests', () => {
  it('Form button is disabled by default ', () => {
    expect(wrapped.find('[type="submit"]').prop('disabled')).toEqual(true);
  });

  it('Ensure departure date is initliazed to today\'s date ', () => {
    const todaysDate = new Date().toISOString().slice(0,10);
    expect(wrapped.state('departureDate')).toEqual(todaysDate);
  });

  it('Ensure the form\'s submit button is enabled when it has valid values', () => {
    wrapped.setState({ fromLocation: 'Earth'});
    wrapped.setState({ toLocation: 'Jupiter'});
    wrapped.setState({ ticketsAmt: 1});
    expect(wrapped.find('[type="submit"]').prop('disabled')).toEqual(false);
  });

  it('Ensure that from and to dropdowns have the proper values', () => {
    const locationList = locationsData.map(location => location.value);
    expect(locationList).toContain("Earth");
    expect(locationList).toContain("Jupiter");
    expect(locationList).toContain("Mars");
    expect(locationList).toContain("Planet-X");
    expect(locationList).toContain("Pluto");
    expect(locationList).toContain("Saturn");
    //TODO:Probably a more efficient way exists
  });

  it('Ensure the form\'s submit button is enabled when it has valid values', () => {
    wrapped.setState({ fromLocation: 'Earth'});
    wrapped.setState({ toLocation: 'Mars'});
    let todaysDate = new Date().toISOString().slice(0,10);
    let tommorowsDate = new Date();
    tommorowsDate.setDate(tommorowsDate.getDate() + 1);
    tommorowsDate = tommorowsDate.toISOString().slice(0,10)
    wrapped.setState({ departureDate: todaysDate });
    wrapped.setState({ returnDate: tommorowsDate });
    wrapped.setState({ ticketsAmt: 1 });
    expect(wrapped.find('[type="submit"]').prop('disabled')).toEqual(false);
  });
});

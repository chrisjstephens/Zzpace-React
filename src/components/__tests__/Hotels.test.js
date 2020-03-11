import React from 'react';
import { shallow } from 'enzyme';

import Hotels from '../Hotels.react.js';

let wrapped;

beforeEach(() => {
  wrapped = shallow(<Hotels />);
});

describe('initial hotel forms tests', () => {
  it('Form button is disabled by default ', () => {
    expect(wrapped.find('[type="submit"]').prop('disabled')).toEqual(true);
  });

  it('Ensure check-in date is initliazed to today\'s date ', () => {
    const todaysDate = new Date().toISOString().slice(0,10);
    expect(wrapped.state('checkInDate')).toEqual(todaysDate);
  });

  it('Ensure the form\'s submit button is enabled when it has valid values', () => {
    wrapped.setState({ hotelLocation: 'Earth'});
    expect(wrapped.find('[type="submit"]').prop('disabled')).toEqual(false);
  });
});

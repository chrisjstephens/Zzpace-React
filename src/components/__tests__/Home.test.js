import React from 'react';
import { shallow } from 'enzyme';

import Home from '../Home.react.js';
import DailyDeal from '../DailyDeal.react.js';
import PlanetCards from '../PlanetCards.react.js';

let wrapped;

beforeEach(() => {
  wrapped = shallow(<Home />);
});

it('DailyDeals renders properly', () => {
  expect(wrapped.find(DailyDeal).length).toEqual(1);
});

it('PlanetCards renders properly', () => {
  expect(wrapped.find(PlanetCards).length).toEqual(1);
});

import * as React from 'react';
import { shallow, mount } from 'enzyme';

import { IdentityContainer } from '../IdentityContainer';
import { Identity } from '../../components/Identity';

const handleLoginChange = jest.fn();
const props = {
  appId:'abc',
  handleLoginChange: handleLoginChange,
  portalUrl: 'https://testportal'
}

afterEach(() => {
  handleLoginChange.mockReset();
});

it('renders the identity container', () => {
  const identityComponent = shallow(<IdentityContainer {...props}  />);
  expect(identityComponent.find(Identity)).toHaveLength(1);
});

it('logout', () => {
  const identityComponent = mount(<IdentityContainer {...props} />);
  identityComponent.find('button').simulate('click');
  expect(handleLoginChange.mock.calls.length).toBe(1);
});
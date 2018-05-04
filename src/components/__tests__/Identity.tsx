import * as React from 'react';
import { shallow } from 'enzyme';

import { Identity } from '../Identity';

const handleLogin = jest.fn();
const handleLogout = jest.fn();
const CredentialMock = jest.fn<__esri.Credential>(() => ({
  userId: 'testuser'
}));

afterEach(() => {
  handleLogin.mockReset();
  handleLogout.mockReset();
});

it('renders the login button', () => {
  const identityComponent = shallow(<Identity handleLogin={handleLogin} handleLogout={handleLogout}/>);
  expect(identityComponent.text()).toEqual('Login');

  identityComponent.simulate('click');
  expect(handleLogin.mock.calls.length).toBe(1);
  expect(handleLogout.mock.calls.length).toBe(0);
});

it('renders the logout button', () => {
  const credential = new CredentialMock();
  const identityComponent = shallow(<Identity credential={credential} handleLogin={handleLogin} handleLogout={handleLogout}/>);
  expect(identityComponent.text()).toContain('Logged in as testuser');

  identityComponent.find('button').simulate('click');
  expect(handleLogin.mock.calls.length).toBe(0);
  expect(handleLogout.mock.calls.length).toBe(1);
});
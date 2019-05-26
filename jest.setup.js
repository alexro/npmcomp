/** Used in jest.config.js */
import React from 'react';
import { configure, mount, shallow, render } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

global.React = React;
global.mount = mount;
global.shallow = shallow;
global.render = render;

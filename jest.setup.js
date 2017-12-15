/* eslint "import/no-extraneous-dependencies": ["error", { "devDependencies": true }] */

import '@babel/polyfill';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

import Enzyme from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import 'jest-enzyme';

Enzyme.configure({ adapter: new Adapter() });

// jest.mock('react-redux', () => {
//     return {
//         useSelector: jest.fn().mockImplementation(() => {
//             return {};
//         }),
//         useDispatch: jest.fn().mockImplementation(() => null),
//     };
// });

// jest.mock('custom-lib', () => {
//     return {};
// });

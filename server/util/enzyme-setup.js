global.requestAnimationFrame = cb => setTimeout(cb, 0);
global.matchMedia = rule => ({matches: rule.includes('min')});

const Enzyme = require('enzyme');
const EnzymeAdapter = require('enzyme-adapter-react-16');

// Setup enzyme's react adapter
Enzyme.configure({adapter: new EnzymeAdapter()});

process.env.PORT = 3002;

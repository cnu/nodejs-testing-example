const assert = require('assert/strict');

const {
    calcAge,
    canDrive,
} = require('./calc');

// Calculates how old someone is and depending on the year this test could pass or fail
describe('calculates age', () => {
    it('calculates age', () => {
        return assert.equal(calcAge(2000), 24);
    });
});

// Calculates whether someone can drive or not
describe('checks license', () => {
    it('checks license', () => {
        return assert.match(`${canDrive(21)}`, /Full Driving Licence/);
    });
    // it('checks learner license', () => {
    //     return assert.match(`${canDrive(17)}`, /Learner's License/);
    // });
});

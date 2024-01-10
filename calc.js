const DRIVING_AGE = 18;

const calcAge = (dob) => {
    const digits = {
        year: 'numeric',
    };
    const year = new Date().toLocaleDateString('en-US', digits);
    // console.log(year);
    return year - dob;
};

const canDrive = (age) => {
    if (age >= DRIVING_AGE) {
        return 'Full Driving Licence';
    } else {
        return 'Learner License';
    }
};

module.exports = {
    calcAge,
    canDrive,
};
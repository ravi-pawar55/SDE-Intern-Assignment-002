const Validator = require('validatorjs');

const validator = async (body, rules, customMessages, callback) => {
    const validation = new Validator(body, rules, customMessages);
    validation.passes(() => callback(null, true));
    validation.fails(() => callback(validation.errors, false));
};

const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]/;
// Tighten password 
Validator.register('strict', value => passwordRegex.test(value),
    'Password must contain at least one uppercase letter, one lowercase letter, and one number');
    
module.exports = validator;
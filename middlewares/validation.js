const validator = require('../helpers/validate');

exports.validateSignup = async (req, res, next) => {
    const validationRule = {
        "email": "required|string|email",
        "name": "required|string",
        "password": "required|string|min:8|confirmed",
    };

    await validator(req.body, validationRule, {}, (err, status) => {
        if (!status) {
            res.status(412)
                .send({
                    success: false,
                    message: 'Validation failed',
                    data: err
                });
        } else {
            next();
        }
    }).catch( err => console.log(err))
}

exports.validateSignin = async (req, res, next) => {
    validationRule = {
        "email": "required|string|email",
        "password": "required|string|min:8|strict",
    };

    await validator(req.body, validationRule, {}, (err, status) => {
        if (!status) {
            res.status(412)
                .send({
                    success: false,
                    message: 'Validation failed',
                    data: err
                });
        } else {
            next();
        }
    }).catch( err => console.log(err))
}


 

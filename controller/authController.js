const Schüler = require('../models/UserSchüler');
const Lehrer = require('../models/UserLehrer');


module.exports.register_get = (req, res) => {
    res.render('register');
}

module.exports.login_get = (req, res) => {
    res.render('login');
}

module.exports.register_post = async (req, res) => {
    const {username, name, lehrer, password} = req.body;
    try {
        const schüler = await Schüler.create({ username, name, lehrer, password});
        res.status(201).json(schüler);
    }
    catch(err) {
        console.log(err);
        res.status(400).send('error, user not created');
    }
}

module.exports.login_post = async (req, res) => {
    res.send('new login');
}
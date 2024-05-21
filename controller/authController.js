module.exports.register_get = (req, res) => {
    res.render('register');
}

module.exports.login_get = (req, res) => {
    res.render('login');
}

module.exports.register_post = (req, res) => {
    res.send('new register');
}

module.exports.login_post = (req, res) => {
    res.send('new login');
}
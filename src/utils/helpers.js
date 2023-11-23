const jwt = require('jsonwebtoken');


function isTokenExpired(req) {
    const secret = process.env.SECRET_KEY;
    const token = req.headers.authorization.split(" ")[1];
    const payload = jwt.verify(token, secret);

    if (Date.now() > payload.exp) {
        return true;
    }
    return false;
}

module.exports = isTokenExpired;

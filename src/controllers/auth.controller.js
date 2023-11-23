const pool = require('../db/postgres');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const login = async (req, res) => {
    const { username, password } = req.body;

    const response = await pool.query('SELECT * FROM app_user WHERE username = $1', [username]);
    const user = response.rows[0];
    const secret = process.env.SECRET_KEY;

    if (user) {
        const match = await bcrypt.compare(password, user.password);
        if (match) {
            const exp = Date.now() + 60 * 1000;

            const token = jwt.sign({
                    "userid": user.userid,
                    "username": user.username,
                    exp: exp
            }, secret);
           
            res.json({
                message: 'Login success',
                body: {
                    user: user,
                    token: token
                }
            });
        } else {
            res.status(401).json({message: 'Invalid credential'});
        }
    } else {
        res.status(401).json({message: 'Invalid credential'});
    }
}

module.exports = { login }
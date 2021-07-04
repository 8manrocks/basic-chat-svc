const authenticateJwt = (req, res, next) => {
    try {
        const jwt = require("jsonwebtoken");
        const token = req.headers.token;
        if (token) {
            jwt.verify(token, 'secret_sauce', (err, user) => {
                if (err) {
                    console.log(err, 'authentication failed')
                    return res.send(500).json({
                        message: 'Jwt expired'
                    });
                } else {
                    req.username = user.username;
                    next();
                }
            });
        } 
    } catch (error) {
        return res.send(500).json({
            message: 'Internal Server Error'
        });
    }
};

module.exports = authenticateJwt;
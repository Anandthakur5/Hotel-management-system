const jwt = require('jsonwebtoken');

const jwtAuthMiddleware = (req, res, next) => {

    const authorization = req.headers.authorization
    if(!authorization) return res.status(401).json({ error: 'Token not found' });

    const token = req.headers.authorization.split(' ')[1];
    if(!token) return res.status(401).json({ error: "Unauthorized"});

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Attach user information to the request object
        req.user = decoded
        next();
    } catch (error) {
        console.log(error);
        res.status(401).json({ error: 'Invalid token' });
    }
}

// Function to generate JWT token
const generateToken = (userData) => {
    return jwt.sign(userData, process.env.JWT_SECRET);
}

module.exports = {jwtAuthMiddleware, generateToken};
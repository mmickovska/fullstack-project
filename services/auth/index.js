const express = require('express');
const config = require('../../pkg/config');
const { expressjwt : jwt } = require('express-jwt');
const auth = require('./handlers/auth');
const db = require('../../pkg/db');
const cors = require('cors');

db.init();

const api = express();

api.use(cors({
    origin: '*'
}));
api.use(express.json());
api.use(jwt({
    algorithms: ['HS256'],
    secret: config.get('security').jwt_secret
}).unless({
    path: [
        '/api/v1/auth/create-account',
        '/api/v1/auth/login',
        '/api/v1/auth/update-user'
    ]
}));

api.post('/api/v1/auth/create-account', auth.create);
api.post('/api/v1/auth/login', auth.login);
api.put('/api/v1/auth/update-user', auth.updateUser);

api.post('/api/v1/auth/validate-token', auth.validate);

api.use(function (err, req, res, next) {
    if(err.name === "UnauthorizedError") {
        res.status(401).send("Invalid token!");
    } else {
        next(err);
    }
});

api.listen(config.get('services').auth.port, err => {
    if(err) {
        return console.log(err);
    }
    console.log(`Service [auth] successfully started on port ${config.get('services').auth.port}!`);
});
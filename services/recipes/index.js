const express = require('express');
const config = require('../../pkg/config');
const db = require('../../pkg/db');
const jwt = require('express-jwt');
const recipes = require('./handlers/recipes');
const cors = require('cors');

db.init();

const api = express();

api.use(cors({
    origin: '*'
}));
api.use(express.json());
api.use(jwt.expressjwt({
    algorithms: ['HS256'],
    secret: config.get('security').jwt_secret
}));

api.get('/api/v1/auth/recipes', recipes.getAll);
api.get('/api/v1/auth/recipes/category', recipes.getRecipesByCategory);
api.get('/api/v1/auth/recipes/me', recipes.getMine);

api.post('/api/v1/auth/recipes/create', recipes.create);
api.put('/api/v1/auth/recipes/:id', recipes.update);
api.delete('/api/v1/auth/recipes/:id', recipes.remove);

api.listen(config.get('services').recipes.port, err => {
    if(err) {
        return console.log(err);
    }
    console.log(`Service [recipes] successfully started on port ${config.get('services').recipes.port}!`);
});
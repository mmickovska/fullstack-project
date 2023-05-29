const config = require('../../pkg/config');
const express = require('express');
const fileUpload = require('express-fileupload');
const storage = require('./handlers/storage');
const cors = require('cors');

const api = express();

api.use(cors({
    origin: '*'
}));

api.use(fileUpload());

api.post('/api/v1/storage', storage.upload);
api.get('/api/v1/storage/:file', storage.download);

api.listen(config.get('services').storage.port, err => {
    if(err) {
        return console.log(err);
    }
    console.log(`Service [storage] successfully started on port ${config.get('services').storage.port}!`);
});
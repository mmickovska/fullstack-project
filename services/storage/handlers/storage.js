const { resolve } = require('path');
const strings = require('../../../pkg/strings');

const upload = async (req, res) => {
    try {
        let fileTypes = ['image/png', 'image/jpg', 'image/jpeg', 'image/pjpeg', 'image/svg+xml', 'image/gif'];
        let maxFileSize = (1024 * 1024) * 10;
        if(!fileTypes.includes(req.files.photo.mimetype)) {
            return res.status(400).send("Bad request!");
        }

        if(maxFileSize < req.files.photo.size) {
            return res.status(400).send("Bad request!");
        }

        let newFileName = `${strings.random(10)}__${req.files.photo.name}`; 
        let uploadedPath = `C:\\Users\\User\\OneDrive\\Desktop\\final-project-recipes-web-page\\web\\public\\images\\${newFileName}`;
        await req.files.photo.mv(uploadedPath);
        let uploadedPathAbsolute = resolve(`http://127.0.0.1:10001/uploads/${newFileName}`);
        res.status(201).send({filename: uploadedPathAbsolute});
    } catch (err) {
        console.log(err);
        return res.status(500).send("Internal Server Error!");
    }
};

const download = async (req, res) => {
    try {
        let filePath = `${__dirname}/../../../uploads/${newFileName}`;
        return res.download(filePath, req.params.file.split('__')[1]);
    } catch (err) {
        console.log(err);
        return res.status(500).send("Internal Server Error!");
    }
};

module.exports = {
    upload,
    download
};
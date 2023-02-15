const strings = require('../../../pkg/strings');

const upload = async (req, res) => {
    let fileTypes = ['image/png', 'image/jpg', 'image/jpeg', 'image/pjpeg', 'image/svg+xml', 'image/gif'];
    let maxFileSize = (1024 * 1024) * 10;
    if(!fileTypes.includes(req.files.photo.mimetype)) {
        return res.status(400).send("Bad request!");
    }

    if(maxFileSize < req.files.photo.size) {
        return res.status(400).send("Bad request!");
    }

    let newFileName = `${strings.random(10)}__${req.files.photo.name}`; 
    await req.files.photo.mv(`${__dirname}/../../../uploads/${newFileName}`);
    res.status(201).send({filename: newFileName});
};

const download = async (req, res) => {
    let filePath = `${__dirname}/../../../uploads/${req.params.file}`;
    res.download(filePath, req.params.file.split('__')[1]);
};

module.exports = {
    upload,
    download
};
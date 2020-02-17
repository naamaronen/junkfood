const mongoose = require("mongoose");
const Image = require("../model/Image");
const multer = require("multer");


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './source/images/');
    },
    filename: (req, file, cb) => {
        const fileName = file.originalname;
        cb(null, Date.now() + '-' + fileName)
    }
});

const upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
            cb(null, true);
        } else {
            cb(null, false);
            return cb(new Error('Only .png, .jpg and .jpeg formats are allowed!'));
        }
    }
});

module.exports = app => {
    app.post("/api/upload", upload.single('imageData'), function (req, res) {
        console.log("Image.post/api/reviews");
        const newImage = new Image({
            imageData: req.file.path
        });

        newImage.save()
            .then((result) => {
                res.state(200).json({
                    success:true,
                    document:result
                });
            })
            .catch((err)=>next(err));
        })
    };


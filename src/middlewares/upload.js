import multer from "multer";

const baseDir = process.cwd();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, baseDir + '/public/images')
    },
    filename: function (req, file, cb) {
        cb(null, `${file.originalname}`)
    }
});

const imageFilter = function (req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
        return cb(new Error('Hanya menerima file gambar (jpg/jpeg/png)'));
    }
    cb(null, true);
}

const upload = multer({ storage: storage, fileFilter: imageFilter });

export default upload;
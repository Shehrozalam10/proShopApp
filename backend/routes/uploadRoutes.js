import path from 'path'
import express from 'express';
import multer from 'multer';
// import Message from '../../frontend/src/component/Message';

const router = express.Router();

const storage = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, 'uploads/');
    },
    filename(req, file, cb) {
        cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
    },
});

// Check file type
function checkFileType(file, cb) {
    const filetypes = /jpg|jpeg|png/;
      const mimetypes = /image\/jpe?g|image\/png|image\/webp/;

    // Check ext
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    // Check mime
    const mimetype = filetypes.test(file.mimetype);

    // If both are true
    if (extname && mimetype) {
        return cb(null, true);
    } else {
        cb('Images only!');
    }
}

// Upload route
router.post('/', multer({
    storage,
    // fileFilter: function (req, file, cb) {
    //     checkFileType(file, cb);
    // }
}).single('images'), (req, res) => {

    // Return the path of the image

   res.send({
    Message: 'Image Uploaded',
    images:`/${req.file.path}`
   });
});


export default router;
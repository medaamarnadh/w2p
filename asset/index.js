var express = require('express');
var router = express.Router();
var fs = require('fs');
var aws = require('aws-sdk')
var multer = require('multer')
var multerS3 = require('multer-s3')
var s3 = new aws.S3({
secretAccessKey: '',
    accessKeyId: '',
    region: 'us-east-1'
});
 
// aws.config.update({
    
// }); 
var upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: 'web-print',
    metadata: function (req, file, cb) {
      cb(null, {fieldName: file.fieldname});
    },
    // key: function (req, file, cb) {
    //   cb(null, Date.now().toString())
    // },
    filename: function (req, file, cb) {
            cb(null, file.originalname); //use Date.now() for unique file keys
        }
  })
})

/* GET users listing. */
router.get('/', function (req, res) {
    res.status(200)
        .send('<form method="POST" enctype="multipart/form-data">'
            + '<input type="file" name="file"/><input type="submit"/>'
            + '</form>')
        .end();
});
// router.post('/',upload.single('file'),function(req,res){
// 	console.log(req.body);
// 	console.log(req.files.file1);
//             //  res.status(200)
//             // .send('File uploaded to S3: ' 
//             //         + data.Location.replace(/</g, '&lt;') 
//             //         + '<br/><img src="' + data.Location.replace(/"/g, '&quot;') + '"/>')
//             // .end();
//             res.send('file uploaded successfully');
// });
router.post('/', upload.single('file'), function (req, res, next) {
	console.log(req.file);
    res.send("Uploaded!");
});



module.exports = router;

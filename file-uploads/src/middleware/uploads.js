const multer= require('multer');
const path= require('path');

const storage = multer.diskStorage({
    destination: function (req, file, callback) {
      callback(null, path.join(__dirname, '../upload'))
    },
    filename: function (req, file, callback) {
      const uniquePrefix = Date.now();
      callback(null,uniquePrefix + "-" + file.originalname);
    }
  });


  function fileFilter (req, file, callback) {

    // The function should call `callback` with a boolean
    // to indicate if the file should be accepted
  
    // To reject this file pass `false`, like so:

    if(file.mimetype === "image/jpeg" || file.mimetype === "image/png"){
       
        callback(null, true)
        
    }else{
        callback(null, false)
        
    }
  
    // To accept the file pass `true`, like so:
  
    // You can always pass an error if something goes wrong:
     callback(new Error('I don\'t have a clue!'))
  
  }


const options = {
    storage:storage,
    fileFilter:fileFilter,
    Limits:{
        fileSize:1024 * 1024 * 1024 * 5,
    },
}
const uploads=multer(options)


module.exports=uploads;
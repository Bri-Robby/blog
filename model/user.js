 /**
 * Created by Robby on 2016/10/6.
 */
 var mongoose = require('mongoose');


 var userSchema = new mongoose.Schema({
     name: {
       type: String,
       unique: true
     },
     password: String
 });

 module.exports = mongoose.model('user',userSchema);
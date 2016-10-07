/**
 * Created by Robby on 2016/10/6.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;
var blogSchema = new Schema({
    author: {
        type: ObjectId,//ͨ��ObjectId����User
        ref: 'user'
    },
    title: String,//����
    content: String//����
});

module.exports = mongoose.model('blog',blogSchema);

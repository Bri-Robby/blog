/**
 * Created by Robby on 2016/10/6.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;
var blogSchema = new Schema({
    author: {
        type: ObjectId,//通过ObjectId关联User
        ref: 'user'
    },
    title: String,//标题
    content: String//内容
});

module.exports = mongoose.model('blog',blogSchema);

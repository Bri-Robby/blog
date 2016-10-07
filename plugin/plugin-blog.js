/**
 * Created by Robby on 2016/10/6.
 */
var ModelBlog = require('../model/blog');
module.exports.blog = {
    //新增
    add: {
        get: function(req, res, next){
            res.render('add', {title: '发表博客'});
        },
        post: function (req, res, next) {
            var postData = {
                author: req.session.user._id,
                title: req.body.title,
                content: req.body.content
            }
            ModelBlog.create(postData, function (err, data) {
                if (err) console.log(err);
                //res.send(data);
                res.redirect('/view/' + data._id);
            })
        }
    },
    //列表
    list: {
        get: function (req, res, next) {
            ModelBlog.find({}, null, {sort: {_id: -1}}).populate('author').exec(function (err, data) {
                if (err)console.log(err);

                res.render('list', {
                    title: '微博列表',
                    list: data
                });
            });
        }
    },
    //查看单条
    view: {
        get: function(req, res, next){
            var getData = {
                _id: req.params._id
            }
            ModelBlog.findOne(getData, function(err, data){
                if(err)console.log(err);
                if(data){
                    res.render('view', {
                        title: data.title,
                        view: data
                    });
                }else{
                    res.send('此微博不存在！')
                }
            })
        }
    },
    //修改微博
    edit: {
        get: function(req, res, next){
            var _id = req.params._id;
            ModelBlog.findOne({
                _id: _id
            },function(err, data){
                if(err) console.log(err);
                res.render('edit',{
                    title: '修改博客',
                    view: data
                });
            });
        },
        post: function(req, res, next){
            var body = req.body;
            console.log(body._id);
            var resJson = {
                status: false,
                msg: '',
                data: null
            };
            ModelBlog.update({
                _id: body._id
            },{
                $set: {
                    title: body.title,
                    content: body.content
                }
            },function(err){
                if(err){
                    resJson.msg = '修改失败';
                    resJson.data = err;
                }else{
                    resJson.msg = '修改成功';
                    resJson.status = true;
                }
                res.send(resJson);
            });
        }
    }
}


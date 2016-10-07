/**
 * Created by Robby on 2016/10/6.
 */
var ModelUser = require('../model/user');
//登录
module.exports.login = {
    get: function (req, res, next) {
        res.render('login', {title: '登录'});
    },
    post: function (req, res, next) {
        var postData = {
            name: req.body.name
        };
        var resJson = {
            status: false,
            msg: ''
        };
        ModelUser.findOne(postData, function (err, data) {
            if (err) {
                resJson.msg = '登录失败！' + err;
                res.send(resJson);
            }
            if (data) {
                if (data.password == req.body.password) {
                    req.session.user = data;
                    resJson.msg = '登录成功';
                    resJson.status = true;
                    res.send(resJson);
                    //res.redirect('/user/' + data._id);
                } else {
                    resJson.msg = '登录失败！密码错误！';
                    res.send(resJson);
                }
            } else {
                resJson.msg = '登录失败！该用户没有注册！';
                res.send(resJson);
            }
        });
    }
};
//注册
module.exports.reg = {
    get: function (req, res, next) {
        res.render('reg', {title: '注册'});
    },
    post: function (req, res, next) {
        var postData = {
            name: req.body.name,
            password: req.body.password
        };
        var resJson = {
            status: false,
            msg: ''
        };
        ModelUser.findOne({
            name: req.body.name
        }, function (err, data) {
            if (err) {
                resJson.msg = '注册失败：' + err;
                res.send(resJson);
            }
            if (data) {
                resJson.msg = '用户名已被使用！';
                res.send(resJson);
            } else {
                ModelUser.create(postData, function (err, data) {
                    if (err) {
                        resJson.msg = '注册失败：' + err;
                        res.send(resJson);
                    }
                    req.session.user = data;
                    resJson.status = true;
                    resJson.msg = '注册成功';
                    res.send(resJson);
                });
            }
        });
    }
};
//退出
module.exports.logout = {
    get: function (req, res, next) {
        delete req.session.user;
        res.redirect('/');
    }
};
//用户资料
module.exports.user = {
    get: function (req, res, next) {
        var getData = {
            _id: req.params._id
        };
        console.log(getData);
        if (getData._id) {
            ModelUser.findById(getData._id, function (err, data) {
                if (err)console.log(err);
                if (data) {
                    res.render('user', {
                        title: data.name + '的个人资料',
                        view: data
                    });
                } else {
                    res.send('查询不到此用户！');
                }
            })
        } else {
            res.send('用户不存在');
        }
    }
};
//登录后可以访问的模块和不可以访问的模块
module.exports.loginVerify = {
    ok: function (req, res, next) {
        var user = req.session.user;
        if (!user) {
            res.redirect('/login');
        }
        next();
    },
    no: function(req, res, next){
        var user = req.session.user;
        if(user){
            res.redirect('/user/'+user._id);
        }else{
            next();
        }
    }
};
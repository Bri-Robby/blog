/**
 * Created by Robby on 2016/10/6.
 */

var PluginUser = require('../plugin/plugin-user');
var PluginBlog = require('../plugin/plugin-blog');
module.exports = function(app){
    app.use(function(req, res, next){
        var user = req.session.user;
        if(user){
            app.locals.user = user;
        }else {
            app.locals.user = user;
        }
        next();
    })

    app.get('/', PluginBlog.blog.list.get);

    //注册
    app.get('/reg', PluginUser.loginVerify.no, PluginUser.reg.get);
    app.post('/reg', PluginUser.reg.post);
    //登录
    app.get('/login', PluginUser.loginVerify.no, PluginUser.login.get);
    app.post('/login', PluginUser.login.post);
    //退出
    app.get('/logout', PluginUser.loginVerify.ok, PluginUser.logout.get);
    //个人资料
    app.get('/user/:_id', PluginUser.loginVerify.ok, PluginUser.user.get);
    //博客操作
    //新增
    app.get('/add', PluginUser.loginVerify.ok, PluginBlog.blog.add.get);
    app.post('/add', PluginBlog.blog.add.post);
    //列表
    app.get('/list', PluginBlog.blog.list.get);
    //单个微博查询
    app.get('/view/:_id', PluginBlog.blog.view.get);
    //修改微博
    app.get('/list/:_id/edit', PluginUser.loginVerify.ok, PluginBlog.blog.edit.get);
    app.post('/list/:_id/edit', PluginBlog.blog.edit.post);
}

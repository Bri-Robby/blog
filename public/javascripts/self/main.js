/**
 * Created by Robby on 2016/10/7.
 */
$(document).ready(function () {
    $('ul.nav > li').click(function (e) {
        //e.preventDefault();
        $('ul.nav > li').removeClass('active');
        $(this).addClass('active');
    });

});
function regSubmit(){
    $.post('/reg',{
        name: $('#name').val(),
        password: $('#password').val()
    },function(data){
        $('.alert').css('display','block');
        if(data.status){
            $('.alert').removeClass('alert-danger');
            $('.alert').addClass('alert-success');
            $('.alert').html(data.msg);
            setTimeout(function(){
                location.href = '/';
            },2000);
        }else{
            $('.alert').removeClass('alert-success');
            $('.alert').addClass('alert-danger');
            $('.alert').html(data.msg);
        }
    });
    return false;
}
function loginSubmit(){
    $.post('/login',{
        name: $('#name').val(),
        password: $('#password').val()
    },function(data){
        $('.alert').css('display','block');
        if(data.status){
            $('.alert').removeClass('alert-danger');
            $('.alert').addClass('alert-success');
            $('.alert').html(data.msg);
            setTimeout(function(){
                location.href = '/';
            },2000);
        }else{
            $('.alert').removeClass('alert-success');
            $('.alert').addClass('alert-danger');
            $('.alert').html(data.msg);
        }
    });
    return false;
}

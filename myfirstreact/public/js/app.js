$(document).ready(function(){
    $(".btn1,.btn2, .btn3").click(function(){
      $.get('/worod', function(){
        $('body').load('./html/worod.html');
      });
    });

    $("#btn1").click(function(){
        $.post('/login', {
            password : $("#password").val(),
            username : $("#username").val()
        },function(data){
          if (data.msg) {
            alert(data.msg)
          }else{
            alert(data.msg);
            $("body").load('./darg.html');
          }
        });
    });
  });
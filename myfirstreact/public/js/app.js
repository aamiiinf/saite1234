$(document).ready(function(){
    $(".btn1,.btn2, .btn3").click(function(){
      $.get('/worod', function(){
        $("body").load('worod.html')
      });
    });

    $("#btn2").click(function(){
      $(".ol").append("<li><h2>1</h2><p>2</p><p>3</p><p>4</p></li>");
    });

    $("#btn1").click(function(){
        $.post('/login', {
            password : $("#password").val(),
            username : $("#username").val()
        },function(data){
          if (data.msg) {
            alert(data.msg)
          }else{
            $("body").load('../index.html')
          }
        });
    });
  });
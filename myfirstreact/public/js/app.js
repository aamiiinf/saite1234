$(document).ready(function(){
    $(".btn1,.btn2, .btn3").click(function(){
      $.get('/worod', function(){
        $("body").load('worod.html')
      });
    });
  });
  $(document).ready(function(){
    $("button").click(function(){
      $.get('/sand', function(){
          alert(' ثبت نام با موفقیت  انجام شد ')
      });
    });
  });
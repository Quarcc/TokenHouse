var shownav = document.getElementsByClassName("login-hidden-nav");

$(document).ready(function(){
    $("#mm-login").click(function(){
      $(".login-hidden-nav").css("display", "block");
      $(".public-displayed-nav").css("display", "none");
    });
  });

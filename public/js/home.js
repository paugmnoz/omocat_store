var h =  window.innerHeight;

var welcomeSection = document.getElementsByClassName("welcome");


var slideIndex = 1;
showDivs(slideIndex);

function plusDivs(n) {
    showDivs(slideIndex += n);
}

function showDivs(n) {
    var i;
    var x = document.getElementsByClassName("slide");
    if (n > x.length) {slideIndex = 1}
    if (n < 1) {slideIndex = x.length} ;
    for (i = 0; i < x.length; i++) {
        x[i].style.display = "none";
    }
    x[slideIndex-1].style.display = "block";
}

$(window).scroll(function() {

    if ($(this).scrollTop()>0)
     {
        $('.promo').fadeIn();
        $('.typoLogo').fadeOut();
        $('.menuOptions').fadeIn();
        $('.bottommenuOptions').fadeOut();

     }
    else
     {
      $('.typoLogo').fadeIn();
      $('.promo').fadeOut();

      $('.menuOptions').fadeOut();
      $('.bottommenuOptions').fadeIn();

     }
 });


 var promo = document.getElementById("promo");
 promo.addEventListener('click', function(){
     console.log("sdfasdlhfañsdjfkmasdñ");
     promo.remove();
 });
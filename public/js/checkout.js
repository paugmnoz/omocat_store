/*console.log(arreglo);
var lista = document.querySelector('.lista');
arreglo.forEach(function(elemento){
    lista.innerHTML += '<li>'+ elemento + '</li>';
});*/

fetch(  'https://' + window.location + '/productosPorIds?ids=' + arreglo)
    .then(function (res) {
        return res.json();
    })
    .then(function (res) {
//        console.log(res);

        var lista = document.querySelector('.lista');
        var subtotal= document.querySelector('.subtotal');
        var total = document.querySelector('.total');
        var temp_subtotal = 0;
        var temp_total = 0;

        res.forEach(function (elem, position) {
            lista.innerHTML += '<li  class="cartListItem"> <div class="cartItem"> <div class="img_item"> <img src="'+ elem.img_principal +'" alt=""> </div>'+ '<div class="txt_item"> <h4>' + elem.nombre + '</h4> <p>' + elem.artista +'</p></div><div class="priceItem"><p><strong>$'+ elem.precio +'.00</p></div><a href="checkout"><button class="delete">X</button></a></div></li>';

            temp_subtotal += elem.precio;
            temp_total = temp_subtotal+5;
            subtotal.innerHTML =  '$'+ temp_subtotal+'.00';
            total.innerHTML = '$'+ temp_total+ '.00';

            document.querySelectorAll('.delete').forEach(function (button) {
                button.addEventListener('click', function () {
                    console.log('holi borrar');

                    var id = button.parentElement.getAttribute('data-id')
               
                    //agregar al arreglo
                    arreglo.splice(position, 1);
                    console.log('se fue');

                    actualizarCarrito();
                    localStorage.setItem('arreglo', JSON.stringify(arreglo));
                    lista.innerHTML = "";
                 
                });

            });

     
        });
    });

    document.querySelector('.submit').addEventListener('click', function(){
        localStorage.removeItem('arreglo');
    }

    );
    window.sr = ScrollReveal();


sr.reveal('.reveal', {
    duration: 2000
});
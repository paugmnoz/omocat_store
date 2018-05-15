/*console.log(arreglo);
var lista = document.querySelector('.lista');
arreglo.forEach(function(elemento){
    lista.innerHTML += '<li>'+ elemento + '</li>';
});*/

fetch('http://localhost:1889/productosPorIds?ids=' + arreglo)
    .then(function (res) {
        return res.json();
    })
    .then(function (res) {
        console.log(res);

        var lista = document.querySelector('.lista');
        res.forEach(function (elem, position) {
            lista.innerHTML += '<li  class="cartListItem"> <div class="cartItem"> <div class="img_item"> <img src="'+ elem.img_principal +'" alt=""> </div>'+ '<div class="txt_item"> <h4>' + elem.nombre + '</h4> <p>' + elem.artista +'</p></div><div class="priceItem"><p><strong>$'+ elem.precio +'.00</p></div><a href="checkout"><button class="delete">X</button></a></div></li>';

            document.querySelectorAll('.delete').forEach(function (button) {
                button.addEventListener('click', function () {
                    console.log('holi borrar');
            
                    var id = button.parentElement.getAttribute('data-id')
               
                    //agregar al arreglo
                    arreglo.splice(position, 1);
                    console.log('se fue al carrito');
                    actualizarCarrito();
                    localStorage.setItem('arreglo', JSON.stringify(arreglo));
                    lista.innerHTML = "";
                 
                });

            });

        });
    });

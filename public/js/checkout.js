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
            lista.innerHTML += '<li>' + elem.nombre + '<button class="delete">X</button>' + '</li>';

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

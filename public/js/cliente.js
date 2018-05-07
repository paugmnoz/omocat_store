actualizarCarrito = function () {
    document.querySelector('.carrito').innerHTML = arreglo.length;
}

var arreglo = JSON.parse(localStorage.getItem('arreglo'));

actualizarCarrito();
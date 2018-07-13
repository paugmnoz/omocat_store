function actualizarCarrito () {
    document.querySelector('.carrito').innerHTML = arreglo.length;
}

var arreglo = JSON.parse(localStorage.getItem('arreglo') || '[]');
if(arreglo == null) arreglo = [];
console.log(arreglo);

actualizarCarrito();

console.log( window.location.hostname);


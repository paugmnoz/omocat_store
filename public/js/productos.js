document.querySelectorAll('.add').forEach(function (button) {
    button.addEventListener('click', function () {
        console.log('holi boton');

        var id = button.parentElement.getAttribute('data-id')
        //no agregar si ya está en la lista de compra
        if (arreglo.indexOf(id) >= 0) {
            console.log('paila');
            return;
        }
        //agregar al arreglo
        arreglo.push(id);
        console.log('se fue al carrito');

        actualizarCarrito();
        localStorage.setItem('arreglo', JSON.stringify(arreglo));
    });
});
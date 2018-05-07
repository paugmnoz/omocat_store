    /* var slider =  document.querySelector('#slider');
    slider.value;
    //
   
    document.querySelector('button').addEventListener('click',, function(e){
        e.preventDefault();
        location.href='/?min=' +slider.value + '&max='+slider.value
    }); */

document.querySelectorAll(".add").forEach(function (button) {
    button.addEventListener('click', function () {
        var id = button.parentElement.getAttribute('data-id')
        //no agregar si ya está en la lista de compra
        if (arreglo.indexOf(id) >= 0) {
            console.log('paila');
            return;
        }
        //agregar al arreglo
        arreglo.push(id);
        actualizarCarrito();
        localStorage.setItem('arreglo', JSON.stringify(arreglo));
    });
});
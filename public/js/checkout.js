/*console.log(arreglo);
var lista = document.querySelector('.lista');
arreglo.forEach(function(elemento){
    lista.innerHTML += '<li>'+ elemento + '</li>';
});*/

fetch('http://localhost:1889/productosPorIds?ids' + arreglo)
    .then(function (res) {
        return res.json();
    })
    .then(function (res) {
        console.log(res);

        var lista = document.querySelector('.lista');
        res.forEach(function (elem) {
            lista.innerHTML += '<li><img width="100" src="'
             + elem.img_principal + '">' + elem.nombre + '</li>';
        });
    });
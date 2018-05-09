const MongoClient = require('mongodb').MongoClient,
    ObjectID = require('mongodb').ObjectID,
    express = require('express'),
    engines = require('consolidate'),

    fs = require('fs');

var app = express(),
    db;

app.engine('hbs', engines.handlebars);

app.set('views', './views');
app.set('view engine', 'hbs');
app.use(express.static('public'));

//Conectarse a la base de datos
MongoClient.connect(`mongodb+srv://cluster0-fxkcz.mongodb.net/OmocatProducts`, 
{
    auth: {
        user: 'polagmnoz',
        password: 'p964908.'
    }

}, 
function (err, client) {
    if (err) throw err;

    db = client.db('OmocatProducts');
    //iniciar servidor
    var server = app.listen( process.env.port || 1889);
});



app.get('/', (req, res) => {
    /*    db.collection('camisas')
        .find()
        .toArray((err, result) => {
            res.render('index', {
                camisas: result
            });//fin res.render
        })*/
    var product = db.collection('camisas')
        .find();

    if (req.query.artista)
        product.filter({
            artista: req.query.artista
        });

    product.toArray((err, result) => {
        res.render('index', {
            camisas: result
        }); //fin res.render
    });

}); //fin get


app.get('/checkout', (req, res) => {

    res.render('checkout'); //fin res.render

});

app.get('/camisa/:id', (req, res) => {
    db.collection('camisas').find({
            nombre: req.params.id
        })
        .toArray((err, result) => 
            res.render(result) //fin res.render
        )
});


app.get('/productosPorIds', (req, res) => {
    console.log(req.query.ids);
    res.send({
        mensaje: 'ok, todo esta bien'
    });

    var arreglo = req.query.ids.split(',');
    arreglo = arreglo.map(function (id) {
        return new ObjectID(id);
    });
    var product = db.collection('camisas')
        .find({
            _id: {
                $in: arreglo
            }
        })

        .toArray((err, result) => {
            res.send(result);
        });


});
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
MongoClient.connect(`mongodb+srv://cluster0-fxkcz.mongodb.net/test`, {
        auth: {
            user: 'polagmnoz',
            password: 'p964908.'
        }

    },
    function (err, client) {
        if (err) {
            throw err;
        } else {

            db = client.db('OmocatProducts');
            //iniciar servidor
            var server = app.listen(process.env.PORT || 1889);
        }
    });
   
app.get('/', (req, res) => {
    /*    db.collection('camisas')
        .find()
        .toArray((err, result) => {
            res.render('index', {
                camisas: result
            });//fin res.render
        })*/
    var product = db.collection('sweaters')
        .find();

    if (req.query.artista)
        product.filter({
            artista: req.query.artista
        });

        if (req.query.color)
        product.filter({
            color: req.query.color
        });

        if (req.query.color)
        product.filter({
            color: req.query.color
        });

        if(req.query.min & req.query.max) {
            var {min, max} = req.query;
            console.log(max)
    
            product.filter({
                precio: {
                    $gt: parseFloat(min-1), $lt: parseFloat(max+1)
                }
            }
               
               );
            }
  
    

    product.toArray((err, result) => {
        res.render('index', {
            sweaters: result
        }); //fin res.render
    });

}); //fin get


app.get('/checkout', (req, res) => {

    res.render('checkout'); //fin res.render

});

app.get('/sweater/:id', (req, res) => {
    db.collection('sweaters').find({
            uri_name:  req.params.id
        })
        .toArray((err, result) => {
            //res.render(result) //fin res.render
            res.render('sweater_detail', {
                  prod: result                
                });
           });
});

app.get('/viz', (req, res) => {
//width and height define
var width = 960,
    height = 500,
    active = d3.select(null);

//append svg element to html body with height and width
var svg = d3.select("#viz").append("svg")
    .attr("width", width)
    .attr("height", height);
/*
svg.append("rect")
    .attr("class", "background")
    .attr("width", width)
    .attr("height", height);*/

//to make groups
var g = svg.append("g");

//select colors for data viz (dots)
var colors = d3.scale.category10();

//add database for viz
d3.csv("/db/artistsDB.csv", function (error, artists) {
    d3.json('/db/omocat_fill_coordinator.json', function (error, logoCoords) {
        g.selectAll("circle").data(artists)
            .enter().append("circle")
            .attr("cx", (d, i) => logoCoords[i][0])
            .attr("cy", (d, i) => logoCoords[i][1] - 200)
            .attr("r", 2)
    });
});
            res.render('viz', {
                });
        
});

app.get('/productosPorIds', (req, res) => {
    console.log('asdas' + req.query.ids);
    /*  res.send({
          mensaje: 'ok, todo esta bien'
      });*/

    var arreglo = req.query.ids.split(',');
    arreglo = arreglo.map(function (id) {
        return new ObjectID(id);
    });
    var product = db.collection('sweaters')
        .find({
            _id: {
                $in: arreglo
            }
        })
        .toArray((err, result) => {
            res.send(result);
        });
});
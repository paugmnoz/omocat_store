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

var projection = d3.geo.albersUsa()
    .scale(1000)
    .translate([width / 2, height / 2]);

var path = d3.geo.path()
    .projection(projection);

//add database for viz
d3.json("./us.json", function (error, usmap) {
    d3.csv("/db/artistsDB.csv", function (error, artists) {
        d3.json('/db/omocat_fill_coordinator.json', function (error, logoCoords) {
            g.selectAll("circle").data(artists)
                .enter().append("circle")
                .attr("cx", (d, i) => logoCoords[i][0])
                .attr("cy", (d, i) => logoCoords[i][1] - 200)
                .attr("r", 2)

            console.log(g);

        });

    });
});
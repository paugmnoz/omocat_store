window.sr = ScrollReveal();

//width and height define
var width = 960,
    height = 600,
    active = d3.select(null);

//append svg element to html body with height and width
var svg = d3.select("#cat-viz").append("svg")
    .classed("cat-svg-container", true)
    .attr("width", '100%')
    .attr("height", height);

    /*var svg = d3.select("#cat-viz").append("svg")
    .classed("cat-svg-container", true)
    .attr("width", '100%')
    .attr("height", height);*/

// 
var mapsvg = d3.select("#map-viz").append("svg")
    .classed("map-container", true)
    .attr("width", '100%')
    .attr("height", height);
    mapsvg.append("rect")
    .attr("class", "background")
    .attr("width",  '100%')
    .attr("height", height)

/*
svg.append("rect")
    .attr("class", "background")
    .attr("width", width)
    .attr("height", height);*/

//to make groups
var g = svg.append("g")
.classed("catviz", true)

var gmap = mapsvg.append("g")
    .classed("mapviz", true)


//select colors for data viz (dots)
//var colors = d3.scale.category10();

var projection = d3.geo.albersUsa()
  ;

var path = d3.geo.path()
    .projection(projection);

function getRandomInt(max) {
    return Math.floor(Math.random(3) * Math.floor(max));
}

function setRandomCoord(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}
//add database for viz
d3.json("/db/us.json", function (error, usmap) {
    d3.csv("/db/artistsDB.csv", function (error, artists) {
        d3.json('/db/omocat_fill_coordinator.json', function (error, logoCoords) {
            d3.json('/db/wave_coordinator.json', function (error, rectCoords) {
                d3.select('.catviz').style('transform', 'translate(30%, 30%)');

                g.selectAll(".cat-circles").data(artists)
                    .enter().append("circle")
                    .classed("cat-circles", true)
                    .attr("cx", (d, i) => rectCoords[i][0])
                    .attr("cy", (d, i) => rectCoords[i][1] - 200)
                    .attr("r", 1)
                    .attr("fill", function (d) {
                        if (d.field === 'ComicBook') {
                            return "#FF102B";
                        } else if (d.field === 'Animation') {
                            return "#FFC300";
                        } else if (d.field === 'CartoonCharacter') {
                            return "#46CDDF";
                        }
                    })
                    .transition()
                    .duration(2000)
                    .delay(1000)
                    .attr("r", (d, i) => getRandomInt(5))
                    .attr("cx", (d, i) => logoCoords[i][0])
                    .attr("cy", (d, i) => logoCoords[i][1] - 200);

                d3.selectAll('.cat-circles').on("mouseover", handleMouserOver)
                d3.selectAll('.cat-circles').on("mouseout", handleMouseOut)

                d3.selectAll('circle').on("mouseover", handleMouserOver)
                d3.selectAll('circle').on("mouseout", handleMouseOut)


                function handleMouserOver(d, i) {
                    var circle = d3.select(this);

                    d3.select(this).attr({
                        r: (d, i) => setRandomCoord(25, 45)
                    });

                    // Specify where to put label of text
                    svg
                        .append("text")
                        .classed("text-viz", true)
                        .attr({
                            id: "t-" + i,
                            x: logoCoords[i][0],
                            y: logoCoords[i][1] - 200
                        })
                        .text(d.name);

                    console.log(circle);
                    d3.select('#t-' + i).style('transform', 'translate(30%, 30%)');
                }

                function handleMouseOut(d, i) {
                    // Use D3 to select element, change color and size

                    d3.select(this).attr({
                        r: (d, i) => setRandomCoord(3, 5)
                    });

                    // Select text by id and then remove
                    d3.select("#t-" + i).remove();
                    //d3.select("#r-" + i).remove();
                    console.log("t-" + i);
                }


                /// MAP VISUALIZATION
                d3.select('.mapviz').style('transform', 'translate(20%, 0%)');

                gmap.selectAll("path")
                    .data(topojson.feature(usmap, usmap.objects.states).features)
                    .enter().append("path")
                    .attr("d", path)
                    .attr("class", "feature")

                    gmap.selectAll("path")
                    .append("path")
                    .datum(topojson.mesh(usmap, usmap.objects.states, function (a, b) {
                        return a !== b;
                    }))
                    .attr("class", "mesh")
                    .attr("d", path);

                gmap.selectAll(".map-circles").data(artists)
                    .enter().append("circle")
                    .classed("map-circles", true)

                    .attr("cx", d => projection([d.lon, d.lat]) ? projection([d.lon, d.lat])[0] : -1000)
                    .attr("cy", d => projection([d.lon, d.lat]) ? projection([d.lon, d.lat])[1] : -8000)
                   .attr("r", 3)
                    .attr("fill", function (d) {
                        if (d.field === 'ComicBook') {
                            return "#FF102B";
                        } else if (d.field === 'Animation') {
                            return "#FFC300";
                        } else if (d.field === 'CartoonCharacter') {
                            return "#46CDDF";
                        }
                    })

                    
                d3.selectAll('.map-circles').on("mouseover", handleMouserOver)
                d3.selectAll('.map-circles').on("mouseout", handleMouseOut)
                  
                //    

            });

        });
    });
});

sr.reveal('.reveal', {duration: 2000});
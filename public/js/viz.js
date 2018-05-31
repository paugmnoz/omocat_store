//width and height define
var width = 960,
    height = 600,
    active = d3.select(null);

//append svg element to html body with height and width
var svg = d3.select("#viz").append("svg")
    .classed("cat-svg-container", true)
    .attr("width", '100%')
    .attr("height", height);
/*
svg.append("rect")
    .attr("class", "background")
    .attr("width", width)
    .attr("height", height);*/

//to make groups
var g = svg.append("g")
    .classed("catviz", true)


//select colors for data viz (dots)
//var colors = d3.scale.category10();

var projection = d3.geo.albersUsa()
    .scale(1000)
    .translate([width / 2, height / 2]);

var path = d3.geo.path()
    .projection(projection);

function getRandomInt(max) {
    return Math.floor(Math.random(3) * Math.floor(max));
}

function setRandomCoord(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}
//add database for viz
d3.json("./us.json", function (error, usmap) {
    d3.csv("/db/artistsDB.csv", function (error, artists) {
        d3.json('/db/omocat_fill_coordinator.json', function (error, logoCoords) {
            d3.json('/db/wave_coordinator.json', function (error, rectCoords) {
                d3.select('.catviz').style('transform', 'translate(30%, 30%)');

                g.selectAll("circle").data(artists)
                    .enter().append("circle")
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
                    .delay(100)
                    .attr("r", (d, i) => getRandomInt(5))
                    .attr("cx", (d, i) => logoCoords[i][0])
                    .attr("cy", (d, i) => logoCoords[i][1] - 200)
                    .on("mouseover", handleMouserOver)
                    .on("mouseout", handleMouseOut);


                console.log(g);

                function handleMouserOver(d, i) {
                    var circle = d3.select(this);

                    // Specify where to put label of text
                    svg
                        .append("text")
                        .attr("id", "t-" + i)
                        .attr("font-family", "sans-serif")
                        .attr("font-size", "50px")
                        .attr("fill", "black")
                        .attr("x", logoCoords[i][0])
                        .attr("y", logoCoords[i][1] - 200)
                        .text("Hello there!");
                    console.log(circle);
                    d3.select('#t-' + i).style('transform', 'translate(30%, 30%)');
                }

                function handleMouseOut(d, i) {
                    // Use D3 to select element, change color and size


                    // Select text by id and then remove
                    d3.select("#t-" + i).remove();
                    console.log("t-" + i);
                }
                //    


            });

        });
    });
});
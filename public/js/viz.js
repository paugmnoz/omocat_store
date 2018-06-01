window.sr = ScrollReveal();


sr.reveal('.reveal', {
    duration: 2000
});

//sound
var snd = new Audio("sound/pop2.mp3");

//width and height define
var width = 960,
    height = 600,
    active = d3.select(null);

//Width and height div
var w = 600;
var h = 250;

//append svg element to html body with height and width
var svg = d3.select("#cat-viz").append("svg")
    .classed("cat-svg-container", true)
    .attr("width", '100%')
    .attr("height", height);

// To paint map
var mapsvg = d3.select("#map-viz").append("svg")
    .classed("map-container", true)
    .attr("width", '100%')
    .attr("height", height);
mapsvg.append("rect")
    .attr("class", "background")
    .attr("width", '100%')
    .attr("height", height)

// To paint visit us
var visitsvg = d3.select("#visit-viz").append("svg")
    .classed("visit-container", true)
    .attr("width", '100%')
    .attr("height", '150px');
visitsvg.append("rect")
    .attr("class", "background_none")
    .attr("width", '100%')
    .attr("height", '150px')

//to make groups
var g = svg.append("g")
    .classed("catviz", true)

var gmap = mapsvg.append("g")
    .classed("mapviz", true)

var gvisit = visitsvg.append("g")
    .classed("visitviz", true)

var comic_btn = d3.select('#comicBook');
var animation_btn = d3.select('#Animation');
var cartoon_btn = d3.select('#CartoonCharacter');
var all_btn = d3.select('#all').classed("selected", true);

//select colors for data viz (dots)
//var colors = d3.scale.category10();

var projection = d3.geo.albersUsa();

var path = d3.geo.path()
    .projection(projection);

function getRandomInt(max) {
    return Math.floor(Math.random(3) * Math.floor(max));
}

function setRandomCoord(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}


function playSound(file, speed = 1, pitchShift = 1, loop = false, autoplay = true) {

    if (pitchShift) {

        audioCtx = new(window.AudioContext || window.webkitAudioContext)();
        source = audioCtx.createBufferSource();
        request = new XMLHttpRequest();

        request.open('GET', file, true);

        request.responseType = 'arraybuffer';


        request.onload = function () {
            var audioData = request.response;

            audioCtx.decodeAudioData(audioData, function (buffer) {
                    myBuffer = buffer;
                    songLength = buffer.duration;
                    source.buffer = myBuffer;
                    source.playbackRate.value = speed;
                    source.connect(audioCtx.destination);
                    source.loop = loop;
                },

                function (e) {
                    "Error with decoding audio data" + e.error
                });

        }

        request.send();
        source.play = source.start
    } else {
        source = new Audio(file)
        source.playbackRate = speed
        source.loop = loop
    }
    if (autoplay) {
        source.play()
    }
    return source
}

var source

function play(p) {
    source = playSound('sound/pop2.mp3', pitch = p);
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
                    .classed("cat-highlighted", true)
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

                comic_btn.on('click', function () {
                    comic_btn.classed("selected", true)
                    animation_btn.classed("selected", false)
                    cartoon_btn.classed("selected", false)
                    all_btn.classed("selected", false)
                    d3.selectAll('.cat-circles')
                    .classed("cat-highlighted", function (d) {
                        if (d.field === 'ComicBook') {
                            return true;
                        } else if (d.field === 'Animation') {
                            return false;
                        } else if (d.field === 'CartoonCharacter') {
                            return false;
                        }
                    })
                        .transition()
                        .duration(500)
                        .delay(500)
                        .attr("fill", function (d) {
                            if (d.field === 'ComicBook') {
                                return "#FF102B";
                            } else if (d.field === 'Animation') {
                                return "#f2efef";
                            } else if (d.field === 'CartoonCharacter') {
                                return "#f2efef";
                            }
                        })
                });

                animation_btn.on('click', function () {
                    comic_btn.classed("selected", false)
                    animation_btn.classed("selected", true)
                    cartoon_btn.classed("selected", false)
                    all_btn.classed("selected", false)
                    d3.selectAll('.cat-circles')
                    .classed("cat-highlighted", function (d) {
                        if (d.field === 'ComicBook') {
                            return false;
                        } else if (d.field === 'Animation') {
                            return true;
                        } else if (d.field === 'CartoonCharacter') {
                            return false;
                        }
                    })
                        .transition()
                        .duration(500)
                        .delay(500)
                        .attr("fill", function (d) {
                            if (d.field === 'ComicBook') {
                                return "#f2efef";
                            } else if (d.field === 'Animation') {
                                return "#FFC300";
                            } else if (d.field === 'CartoonCharacter') {
                                return "#f2efef";
                            }
                        })
                });

                cartoon_btn.on('click', function () {
                    comic_btn.classed("selected", false)
                    animation_btn.classed("selected", false)
                    cartoon_btn.classed("selected", true)
                    all_btn.classed("selected", false)
                    d3.selectAll('.cat-circles')
                    .classed("cat-highlighted", function (d) {
                        if (d.field === 'ComicBook') {
                            return false;
                        } else if (d.field === 'Animation') {
                            return false;
                        } else if (d.field === 'CartoonCharacter') {
                            return true;
                        }
                    })
                        .transition()
                        .duration(500)
                        .delay(500)
                        .attr("fill", function (d) {
                            if (d.field === 'ComicBook') {
                                return "#f2efef";
                            } else if (d.field === 'Animation') {
                                return "#f2efef";
                            } else if (d.field === 'CartoonCharacter') {
                                return "#46CDDF";
                            }
                        })
                });

                all_btn.on('click', function () {
                    comic_btn.classed("selected", false)
                    animation_btn.classed("selected", false)
                    cartoon_btn.classed("selected", false)
                    all_btn.classed("selected", true)
                    d3.selectAll('.cat-circles')
                    .classed("cat-highlighted", function (d) {
                        if (d.field === 'ComicBook') {
                            return true;
                        } else if (d.field === 'Animation') {
                            return true;
                        } else if (d.field === 'CartoonCharacter') {
                            return true;
                        }
                    })
                        .transition()
                        .duration(500)
                        .delay(500)
                        .attr("fill", function (d) {
                            if (d.field === 'ComicBook') {
                                return "#FF102B";
                            } else if (d.field === 'Animation') {
                                return "#FFC300";
                            } else if (d.field === 'CartoonCharacter') {
                                return "#46CDDF";
                            }
                        })
                });
                d3.selectAll('.cat-highlighted').on("mouseover", handleMouserOver)
                d3.selectAll('.cat-highlighted').on("mouseout", handleMouseOut)

                d3.selectAll('circle').on("mouseover", handleMouserOver)
                d3.selectAll('circle').on("mouseout", handleMouseOut)


                function handleMouserOver(d, i) {
                    console.log(d3.select(this).classed('cat-highlighted'));

                    if(d3.select(this).classed('cat-highlighted')===true){

                        d3.select(this).attr({
                            r: (d, i) => setRandomCoord(25, 45)
                        });
    
                        //Update the tooltip position and value
                        d3.select("#tooltip")
                            .style("left", logoCoords[i][0] + "px")
                            .style("top", logoCoords[i][1] - 200 + "px")
                            .select("#value")
                            .text(d.name);
    
                        d3.select("#value2")
                            .text(d.field);
                        d3.select(".colorheader")
                            .style(
                                "background-color",
                                function () {
                                    if (d.field === 'ComicBook') {
                                        console.log('helloooooo');
                                        return "#FF102B";
                                    } else if (d.field === 'Animation') {
                                        return "#FFC300";
                                    } else if (d.field === 'CartoonCharacter') {
                                        return "#46CDDF";
                                    }
                                }
                            )
    
                        //Show the tooltip
                        d3.select("#tooltip").classed("hidden", false).style('transform', 'translate(280%, 280%)');
    
                        //trigger sound
                        play(setRandomCoord(0.25, 3));
                    }

                }

                function handleMouserOverMap(d, i) {

                    d3.select(this).attr({
                        r: (d, i) => setRandomCoord(25, 45)
                    });


                    //Update the tooltip position and value
                    d3.select("#tooltip")
                        .style("left", projection([d.lon, d.lat])[0] + "px")
                        .style("top", projection([d.lon, d.lat])[1] + "px")
                        .select("#value")
                        .text(d.name);

                    d3.select("#value2")
                        .text(d.city);
                    d3.select(".colorheader")
                        .style(
                            "background-color",
                            function () {
                                if (d.field === 'ComicBook') {
                                    console.log('helloooooo');
                                    return "#FF102B";
                                } else if (d.field === 'Animation') {
                                    return "#FFC300";
                                } else if (d.field === 'CartoonCharacter') {
                                    return "#46CDDF";
                                }
                            }
                        )

                    //Show the tooltip
                    d3.select("#tooltip").classed("hidden", false).style('transform', 'translate(220%, 950%)');

                    //trigger sound
                    snd.play();

                }

                function handleMouseOut(d, i) {
                    // Use D3 to select element, change color and size
                    d3.select(this).attr({
                        r: (d, i) => setRandomCoord(3, 5)
                    });
                    //Show the tooltip
                    d3.select("#tooltip").classed("hidden", true)
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
                    .attr("cx", (d, i) => rectCoords[i][0])
                    .attr("cy", (d, i) => rectCoords[i][1] - 200)
                    .attr("fill", "#46CDDF")
                    .transition()
                    .duration(2000)
                    .delay(3000)
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


                d3.selectAll('.map-circles').on("mouseover", handleMouserOverMap)
                d3.selectAll('.map-circles').on("mouseout", handleMouseOut)



                //    


            });

        });
    });
});

d3.csv("/db/artistsDB850.csv", function (error, artists850) {
    d3.json('/db/visitus_coordinator.json', function (error, rectCoords) {
        //VISIT US VIZ
        d3.select('.visitviz').style('transform', 'translate(25%, 110%)');

        gvisit.selectAll(".visit-circles").data(artists850)
            .enter().append("circle")
            .classed("visit-circles", true)
            .attr("cx", (d, i) => rectCoords[i][0])
            .attr("cy", (d, i) => rectCoords[i][1] - 200)
            .attr("r", setRandomCoord(2, 3))
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
            .delay(3000)

    });
});
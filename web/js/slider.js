// Configure D3 slider
d3.select('#slider').call(
    d3.slider().axis(true)
        .min(1996)
        .max(2013)
        .step(1)
        .on("slide", function(evt, value) {
            d3.select('#slider-year').text(value);
            //d3.select("#viz").remove()
            d3.select('#viz').select('svg').remove();
            renderChart(value);
            console.log("slide event called on " + value);
        })
);
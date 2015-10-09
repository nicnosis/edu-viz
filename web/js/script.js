var margin = {top: 20, right: 20, bottom: 20, left: 50},
    width = 800 - margin.left - margin.right,
    height = 600 - margin.top - margin.bottom;

/*
 * value accessor - returns the value to encode for a given data object.
 * scale - maps value to a visual display encoding, such as a pixel position.
 * map function - maps from data value to display value
 * axis - sets up axis
 */


// setup x
var xValue = function(d) { return d.INSTNM; }, // data -> value
    xScale = d3.scale.ordinal().rangeRoundBands([0, width],.1), // value -> display
    xMap = function(d) { return xScale(xValue(d)) ; }, // data -> display
    xAxis = d3.svg.axis().scale(xScale).orient("bottom");

// setup y
var yValue = function(d) { return d.PELL_DEBT_MDN; },   // data -> value
    yScale = d3.scale.linear().range([height, 0]),      // value -> display
    yMap = function(d) { return yScale(yValue(d)) ; },  // data -> display
    yAxis = d3.svg.axis().scale(yScale).orient("left").tickFormat(function(d) { return d ; });

// Add graph canvas to chart div
var svg = d3.select("#chart").append("svg")
    .attr("class", "viz")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

// Initialize d3 tip
var tip = d3.tip()
    .attr('class', 'd3-tip')
    .offset([-10, 0])
    .html(function(d) {
        return "<b>" + d.INSTNM + " - 2013</b><br>" + d.PELL_DEBT_MDN;
    });
svg.call(tip);

// Load data
d3.csv ("MERGED2013_PP.csv", function(error, data) {

    // Get data of interest
    data = data.filter(function(d) { return (d.CCBASIC == 15 || d.CCBASIC == "15"); });
    data = data.filter(function(d) { return !isNaN(d.PELL_DEBT_MDN); });
    data.forEach(function(d) {
        //populateSchoolArray(d, schools);
        //printSchools(schools);
        d["PELL_DEBT_MDN"] = +d["PELL_DEBT_MDN"];
    });

    // Axes
    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis)
        .append("text");

    svg.append("g")
        .attr("class", "y axis")
        .call(yAxis)
        .append("text");

    // Set scale domains
    xScale.domain(d3.extent(data, function(d) { return d.INSTNM; }));
    yScale.domain(d3.extent(data, function(d) { return d.PELL_DEBT_MDN; }));

    // Render circles
    svg.selectAll(".dot")
        .data(data)
        .enter().append("circle")
        .attr("class", "dot")
        .attr("r", 5)
        .attr('cx', xMap)
        .attr('cy', yMap)
        .on('mouseover', function(d) {
            tip.show(d);
        })
        .on('mouseout', function(d) {
            tip.hide(d);
        });
});
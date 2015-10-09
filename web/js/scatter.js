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
var xValue = function(d) { return d.FIRSTGEN_DEBT_MDN; },       // data  -> value
    xScale = d3.scale.linear().range([0, width]),               // value -> display
    xMap = function(d) { return xScale(xValue(d)) ; },          // data  -> display
    xAxis = d3.svg.axis().scale(xScale).orient("bottom");

// setup y
var yValue = function(d) { return d.PELL_DEBT_MDN; },   // data  -> value
    yScale = d3.scale.linear().range([height, 0]),      // value -> display
    yMap = function(d) { return yScale(yValue(d)) ; },  // data  -> display
    yAxis = d3.svg.axis().scale(yScale).orient("left");

// Scale and accessor for circle radius (student population)
function radius(d) { return d.UGDS; };
var radiusScale = d3.scale.sqrt().domain([0, 70000]).range([0, 15]);

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
        return "<b>" + d.INSTNM + " - 2013</b><br>" +
            "Degree-seeking undergraduates: " + d.UGDS +
            "<br/>Median Pell Grantee Debt: $" + d.PELL_DEBT_MDN +
            "<br/> Median First Generation Debt: $" + d.FIRSTGEN_DEBT_MDN;
    });
svg.call(tip);

// Load data
d3.csv ("MERGED2013_PP.csv", function(error, data) {

    // Get data of interest
    data = data.filter(function(d) { return (d.CCBASIC == 15 || d.CCBASIC == "15"); });
    data = data.filter(function(d) { return !(isNaN(d.PELL_DEBT_MDN) || isNaN(d.FIRSTGEN_DEBT_MDN)); });
    data.forEach(function(d) {
        //populateSchoolArray(d, schools);
        //printSchools(schools);
        d.UGDS                = +d.UGDS;
        d.PELL_DEBT_MDN     = +d.PELL_DEBT_MDN;
        d.FIRSTGEN_DEBT_MDN = +d.FIRSTGEN_DEBT_MDN;
    });

    // Draw gridlines for x axis
    svg.selectAll("line.verticalGrid").data(xScale.ticks()).enter()
        .append("line")
        .attr(
        {
            "class": "verticalGrid",
            "x1" : function(d) { return xScale(d); },
            "x2" : function(d) { return xScale(d); },
            "y1" : height,
            "y2" : 0,
            "fill" : "none",
            "stroke" : "#ccc",
            "stroke-width" : "0.75px",
            "stroke-opacity" : 0.7
        }
    );

    // Draw gridlines for y axis
    svg.selectAll('line.horizontalGrid').data(yScale.ticks()).enter()
        .append('line')
        .attr(
        {
            "class": "horizontalGrid",
            "x1" : 0,
            "x2" : width,
            "y1" : function(d) { return yScale(d); },
            "y2" : function(d) { return yScale(d); },
            "fill" : "none",
            "stroke" : "#ccc",
            "stroke-width" : "0.75px",
            "stroke-opacity" : 0.7
        }
    );

    // Set scale domains
    xScale.domain(d3.extent(data, function(d) { return d.FIRSTGEN_DEBT_MDN; })).nice();
    yScale.domain(d3.extent(data, function(d) { return d.PELL_DEBT_MDN;     })).nice();

    // Axes
    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis)
        .append("text")
        .attr("class", "label")
        .attr("x", width)
        .attr("y", -6)
        .style("text-anchor", "end")
        //.text("Median First Generation Debt");

    svg.append("g")
        .attr("class", "y axis")
        .call(yAxis)
        .append("text")
        .attr("class", "label")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", ".71em")
        .style("text-anchor", "end")
        //.text("Median Pell Grantee Debt");

    // Render circles
    svg.selectAll(".dot")
        .data(data)
        .enter().append("circle")
        .attr("class", function(d) {
            var s = "dot ";
            switch (d.CONTROL) {
                case '1':
                    return s + "public";
                    break;
                case '2':
                    return s + "private-nonprofit";
                    break;
                case '3':
                    return s + "private-for-profit";
                    break;

                default: break;
            }

            return s;
        })
        .attr("r", function(d) { return radiusScale(radius(d)) ; })
        .attr('cx', xMap)
        .attr('cy', yMap)
        .sort(function order(a, b) {
            return radius(b) - radius(a);
        })
        .on('mouseover', function(d) {
            tip.show(d);
        })
        .on('mouseout', function(d) {
            tip.hide(d);
        });
});
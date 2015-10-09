d3.csv ("MERGED2013_PP.csv", function(error, data) {

    //data = data.filter(function(d) {return d.STABBR == "NY"});
    data = data.filter(function(d) { return (d.CCBASIC == 15 || d.CCBASIC == "15") });

    var schools = [];

    data.forEach(function(d) {
        populateSchoolArray(d, schools);

        var text = "";

        jQuery.each(schools, function(i, val) {
            text += val.INSTNM + " is a research university in " + val.CITY + "</br>";
        });

        $("#content").html(text);
    });
});
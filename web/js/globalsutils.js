function populateSchoolArray(d, schools) {
    // Coerce numbers
    d.LATITUDE = +d.LATITUDE;
    d.LONGITUDE = +d.LONGITUDE;
    d.CCBASIC = +d.CCBASIC; // Carnegie classification

    d.PAR_ED_PCT_1STGEN = +d.PAR_ED_PCT_1STGEN;

    d.IND_INC_PCT_M1 = +d.IND_INC_PCT_M1; // Ind students with fam income - medium
    d.IND_INC_PCT_M2 = +d.IND_INC_PCT_M2;
    d.IND_INC_PCT_H1 = +d.IND_INC_PCT_H1; // High
    d.IND_INC_PCT_H2 = +d.IND_INC_PCT_H2;

    d.IND_INC_AVG = +d.IND_INC_AVG; //independent/dependent income avg
    d.DEP_INC_AVG = +d.DEP_INC_AVG;

    d.LO_INC_DEBT_MDN = +d.LO_INC_DEBT_MDN; //median debts by family income
    d.MD_INC_DEBT_MDN = +d.MD_INC_DEBT_MDN;
    d.HI_INC_DEBT_MDN = +d.HI_INC_DEBT_MDN;

    d.DEP_DEBT_MDN      = +d.DEP_DEBT_MDN; // median debts
    d.IND_DEBT_MDN      = +d.IND_DEBT_MDN;
    d.PELL_DEBT_MDN     = +d.PELL_DEBT_MDN;
    d.NOPELL_DEBT_MDN   = +d.NOPELL_DEBT_MDN;

    d.FIRSTGEN_DEBT_MDN     = d.FIRSTGEN_DEBT_MDN; // first-/non-first-gen debt
    d.NOTFIRSTGEN_DEBT_MDN  = d.NOTFIRSTGEN_DEBT_MDN;

    schools.push({
        "INSTNM" : d.INSTNM,
        "CITY" : d.CITY,
        "ZIP" : d.ZIP,
        "LONGITUDE" : d.LONGITUDE,
        "LATITUDE" : d.LATITUDE,
        "CCBASIC" : d.CCBASIC
    });
};

function printSchools(schools) {
    var text = "";

    jQuery.each(schools, function(i, val) {
        text += val.INSTNM + " is a research university in " + val.CITY + "</br>";
    });

    $("#content").html(text);
}
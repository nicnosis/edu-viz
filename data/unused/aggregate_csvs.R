# Load csvs
require(data.table)
setwd("~/Code/ProPublica/data_manipulation")

paths <- list()
files <- list.files(pattern='\\.csv') #list of files ending with .csv
lst   <- lapply(files, fread)
nm1 <- gsub('\\D+', '', files)
names(lst) <- nm1

for(i in 0:17) 
{
  paths[i]<- paste("MERGED",1996+i,"_PP.csv",sep="")
}

# define list of variables to keep
keeps <- list(
  "CONTROL",
  "INSTNM",
  "STABBR",
  "CITY",
  "ZIP",
  "UGDS",
  "LONGITUDE",
  "LATITUDE",
  "CCBASIC",
  "PAR_ED_PCT_MS",
  "PAR_ED_PCT_HS",
  "PAR_ED_PCT_PS",
  "PAR_ED_PCT_1STGEN",
  "IND_INC_PCT_M1",
  "IND_INC_PCT_M2",
  "IND_INC_PCT_H1",
  "IND_INC_PCT_H2",
  "IND_INC_AVG",
  "DEP_INC_AVG",
  "LO_INC_DEBT_MDN",
  "MD_INC_DEBT_MDN",
  "HI_INC_DEBT_MDN",
  "LO_INC_DEBT_MDN",
  "MD_INC_DEBT_MDN",
  "HI_INC_DEBT_MDN",
  "DEP_DEBT_MDN",
  "IND_DEBT_MDN",
  "PELL_DEBT_MDN",
  "NOPELL_DEBT_MDN",
  "FIRSTGEN_DEBT_MDN",
  "NOTFIRSTGEN_DEBT_MDN"
)

#out <- rbindlist(lapply(paths, fread), use.names=TRUE)
#out <- rbindlist(lapply(files, fread) , idcol='Grp')
out <- rbindlist(lst, idcol=TRUE)
#nm1 <- gsub('\\D+', '', files)
#filteredOut <- out[, unlist(keeps), with=FALSE]
#filteredOut <- out[, unlist(keeps), with=FALSE][, YEAR:= nm1[as.numeric(Grp)]]
filteredOut <- out[, c(unlist(keeps), '.id'), with=FALSE]
write.table(filteredOut, "../longitudinal.csv", sep=",")


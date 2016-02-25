library(sqldf)

db <- dbConnect(SQLite(), dbname="Test.sqlite")

sqldf("attach 'Test1.sqlite' as new")

# make loop to load all of the CSVs
#!/bin/bash
unset LANG

cd 1_raw-data
for filename in merg*.csv; do
	echo $filename
	sed -e "s/NULL//g" $filename > nonulls.csv
	sed -e "s/PrivacySuppressed//g" nonulls.csv >  clean_$filename

	mv clean_$filename ../2_cleaned-data
done
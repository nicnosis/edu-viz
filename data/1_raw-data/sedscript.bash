#!/bin/bash
unset LANG
for filename in MERG*.csv; do
	echo $filename
	sed -e "s/NULL//g" $filename > nonulls.csv
	sed -e "s/PrivacySuppressed//g" nonulls.csv >  clean_$filename
done
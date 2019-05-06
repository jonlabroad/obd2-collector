#!/bin/bash

date > date_$RANDOM.txt
date
git pull origin master || true
cd collector
./connect.sh
python3 ./start.py
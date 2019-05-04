#!/bin/bash

git pull origin master || true
cd collector
python3 ./start.py
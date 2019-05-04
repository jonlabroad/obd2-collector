#!/bin/bash

git pull origin master || true
python3 collector/start.py
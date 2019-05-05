import os
import time
import json
import glob
import logging

import dynamoDBClient
import s3Client

def readFile(filename):
    f = open(filename)
    data = []
    for line in f:
        dataLine = json.loads(line)
        data.append(dataLine)
        
    return data

path = '../collector/cache'
while(True):
    files = [f for f in glob.glob(path + "/OBD_*_*.json")]
    print(files)
    for f in files:
        try:
            s3Client.upload(files)
        except Exception:
            logging.exception('Could complete data write for: ' + f)
            time.sleep(30)

    time.sleep(60)

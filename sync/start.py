import os
import time
import json
import glob
import logging

import dynamoDBClient

def readFile(filename):
    f = open(filename)
    data = []
    for line in f:
        dataLine = json.loads(line)
        data.append(dataLine)
        
    return data

path = 'C:/Users/jonla/Documents/code/odb2-collector/collector/'
while(True):
    files = [f for f in glob.glob(path + "OBD_*_*.json")]
    print(files)
    for f in files:
        try:
            dataset = readFile(f)
            dynamoDBClient.writeDataset(dataset)
            os.remove(f)
        except Exception:
            logging.exception('Could complete data write for: ' + f)

    time.sleep(60)

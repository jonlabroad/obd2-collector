import json

import jdlDate

def writeData(data):
    print(data)
    t = jdlDate.getCalendarDateTime()
    dataToWrite = {}
    dataToWrite['timestamp'] = t

    dataObject = {}
    for attr, value in data.items():
        dataObject[attr] = str(value.value)

    dataToWrite['data'] = dataObject
    f = openFile(t)
    f.write(json.dumps(dataToWrite))
    f.close()

def openFile(calendarDateTime):
    f = open(getFilename(calendarDateTime), 'w')
    return f

def getFilename(calendarDateTime):
    return "OBD_" + calendarDateTime['calendarDate'] + "_" + calendarDateTime['hourMinSec'] + ".json"

import json

import jdlDate

def writeData(data):
    t = jdlDate.getCalendarDateTime()
    dataToWrite = {}
    dataToWrite['timestamp'] = t
    dataToWrite['data'] = data
    f = openFile(t)
    f.write(json.dumps(dataToWrite))
    f.close()

def openFile(calendarDateTime):
    f = open(getFilename(calendarDateTime), 'w')
    return f

def getFilename(calendarDateTime):
    return "OBD_" + calendarDateTime['calendarDate'] + "_" + calendarDateTime['hourMinSec'] + ".json"

import json

import jdlDate

currentFile = None
lastFileOpen = None
fileIntervalSec = 60

def updateFile():
    global currentFile
    global lastFileOpen

    localTime = jdlDate.getLocalTime()
    time = jdlDate.getUtc(localTime)
    if currentFile is None or (time - lastFileOpen > fileIntervalSec):
        if currentFile is not None:
            currentFile.close()

        calendarDateTime = jdlDate.getCalendarDateTime()
        currentFile = openFile(calendarDateTime)
        lastFileOpen = time

    return currentFile

def writeData(data):
    t = jdlDate.getCalendarDateTime()
    dataToWrite = {}
    dataToWrite['timestamp'] = t

    dataObject = {}
    for attr, value in data.items():
        dataObject[attr] = {}
        if isinstance(value.value, str):
            dataObject[attr]['value'] = value.value
        else:
            dataObject[attr]['value'] = value.value.magnitude
            dataObject[attr]['units'] = str(value.value.units)

    dataToWrite['data'] = dataObject

    currentFile.write(json.dumps(dataToWrite) + '\n')

def openFile(calendarDateTime):
    f = open(getFilename(calendarDateTime), 'a')
    return f

def getFilename(calendarDateTime):
    return "OBD_" + calendarDateTime['calendarDate'] + "_" + calendarDateTime['hourMinSec'] + ".json"
